'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StageCanvas, { StudioLighting } from './StageCanvas';
import { DesignTask, CursorPlan, EXIT_DELAY, EXIT_SECONDS, TRAVEL_SECONDS, createDesignSchedule } from './hero/designSchedule';
import { HeroArt, buildHeroArt } from './hero/heroArt';
import {
  CursorMesh,
  CursorTrails,
  SelectionFrame,
  createCursorMesh,
  createCursorTrails,
  createSelectionFrame,
  createSoftShadow,
} from './hero/heroOverlays';
import { heroObjects } from './hero/heroObjects';
import {
  RevealUniforms,
  applyBuildClip,
  buildFrontOffset,
  createRevealUniforms,
  paintFrontOffset,
} from './hero/revealMaterial';
import { MOBILE_PRODUCT_COUNT, heroPlacements } from '@/data/heroLayout';
import { smoothStep } from '@/lib/useScrollTrack';

const CAMERA_Z = 12;
const FOV = 35;
const TAN_HALF_FOV = Math.tan(THREE.MathUtils.degToRad(FOV / 2));

const easeInOut = (value: number): number => smoothStep(0, 1, value);

function useHeroArt(): HeroArt | null {
  const [art, setArt] = useState<HeroArt | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let built: HeroArt | null = null;
    buildHeroArt()
      .then((result) => {
        if (isCancelled) {
          result.dispose();
          return;
        }
        built = result;
        setArt(result);
      })
      .catch((error) => console.error('Failed to build hero artwork', error));
    return () => {
      isCancelled = true;
      built?.dispose();
    };
  }, []);

  return art;
}

interface HeroItem {
  group: THREE.Group;
  uniforms: RevealUniforms;
  lineMaterial: THREE.LineBasicMaterial;
  frame: SelectionFrame;
  shadow: ReturnType<typeof createSoftShadow>;
  /** opaque meshes that cast a real shadow on the backdrop once the object is complete */
  casters: THREE.Mesh[];
  label: string;
  colorKey: string;
  radius: number;
  size: THREE.Vector3;
  phase: number;
}

interface Pose {
  x: number;
  y: number;
  z: number;
  radius: number;
}

function buildItem(art: HeroArt, id: string, index: number): HeroItem {
  const definition = heroObjects.find((candidate) => candidate.id === id);
  if (!definition) throw new Error(`Unknown hero object "${id}"`);

  const uniforms = createRevealUniforms(art.palette.blue);
  const group = definition.build(art, uniforms);

  // blueprint outlines that are drawn in together with the surfaces
  const lineMaterial = applyBuildClip(
    new THREE.LineBasicMaterial({ color: art.palette.blue, transparent: true, opacity: 0.9 }),
    uniforms,
  );
  const meshes: THREE.Mesh[] = [];
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) meshes.push(child);
  });
  meshes.forEach((mesh) => mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 28), lineMaterial)));

  const box = new THREE.Box3().setFromObject(group);
  const size = box.getSize(new THREE.Vector3());
  const radius = box.getBoundingSphere(new THREE.Sphere()).radius;
  return {
    group,
    uniforms,
    lineMaterial,
    frame: createSelectionFrame(art.palette.blue),
    shadow: createSoftShadow(art.palette.ink),
    casters: meshes.filter((mesh) => !(mesh.material as THREE.Material).transparent),
    label: definition.label,
    colorKey: definition.color,
    radius,
    size,
    phase: index * 1.7,
  };
}

function disposeItem(item: HeroItem): void {
  item.group.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
      child.geometry.dispose();
      if (child instanceof THREE.Mesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material: THREE.Material) => material.dispose());
      }
    }
  });
  item.lineMaterial.dispose();
  item.frame.dispose();
  item.shadow.dispose();
}

/** Position of a cursor while it works on `task` (`progress` runs 0 → 1 over the task). */
function taskPosition(task: DesignTask, progress: number, poses: Pose[], out: THREE.Vector3): THREE.Vector3 {
  const pose = poses[task.item];
  const eased = easeInOut(progress);
  const lanePhase = task.lane * Math.PI;
  if (task.kind === 'build') {
    // the designer sweeps left → right, zig-zagging like a pen (the second designer mirrors the first)
    return out.set(
      pose.x + buildFrontOffset(pose.radius, eased) - task.lane * pose.radius * 0.35,
      pose.y + Math.sin(progress * Math.PI * 5 + lanePhase) * pose.radius * 0.6,
      pose.z + 1,
    );
  }
  // the colourist fills top → bottom
  return out.set(
    pose.x + Math.sin(progress * Math.PI * 4 + lanePhase) * pose.radius * 0.7,
    pose.y + THREE.MathUtils.clamp(paintFrontOffset(pose.radius, eased), -pose.radius, pose.radius) - task.lane * pose.radius * 0.3,
    pose.z + 1,
  );
}

const scratchPrevious = new THREE.Vector3();
const scratchStart = new THREE.Vector3();

/** Flies `out` along a curved path from `from` to `to` (`eased` 0 → 1). */
function flyAlongCurve(from: THREE.Vector3, to: THREE.Vector3, eased: number, out: THREE.Vector3): void {
  out.lerpVectors(from, to, eased);
  const arc = Math.sin(eased * Math.PI);
  out.x += -(to.y - from.y) * 0.18 * arc;
  out.y += (to.x - from.x) * 0.18 * arc;
  out.z += arc * 0.6;
}

const scratchExit = new THREE.Vector3();

/**
 * Where a cursor is at timeline time `time`: waiting, flying along a curve, working on a task,
 * or leaving the stage. Returns its presence (1 = fully there, 0 = gone).
 */
function evaluateCursor(plan: CursorPlan, time: number, now: number, poses: Pose[], out: THREE.Vector3): number {
  scratchPrevious.set(plan.entry.x, plan.entry.y, plan.entry.z);
  let previousEnd = 0;

  for (const task of plan.tasks) {
    if (time < task.start) {
      const travel = Math.max(0.2, Math.min(task.start - previousEnd, TRAVEL_SECONDS));
      const travelStart = task.start - travel;
      if (time <= travelStart) {
        out.copy(scratchPrevious);
        out.x += Math.sin(now * 0.9 + plan.phase) * 0.1;
        out.y += Math.cos(now * 0.7 + plan.phase) * 0.08;
        return 1;
      }
      taskPosition(task, 0, poses, scratchStart);
      flyAlongCurve(scratchPrevious, scratchStart, easeInOut((time - travelStart) / travel), out);
      return 1;
    }
    if (time <= task.end) {
      taskPosition(task, (time - task.start) / (task.end - task.start), poses, out);
      return 1;
    }
    taskPosition(task, 1, poses, scratchPrevious);
    previousEnd = task.end;
  }

  // all work done: hover for a moment, then fly off the stage and disappear
  const exitProgress = (time - previousEnd - EXIT_DELAY) / EXIT_SECONDS;
  if (exitProgress <= 0) {
    out.copy(scratchPrevious);
    out.x += Math.sin(now * 0.9 + plan.phase) * 0.06;
    out.y += Math.cos(now * 0.7 + plan.phase) * 0.05;
    return 1;
  }
  const clamped = Math.min(exitProgress, 1);
  scratchExit.set(plan.exit.x, plan.exit.y, plan.exit.z);
  flyAlongCurve(scratchPrevious, scratchExit, clamped * clamped, out);
  return 1 - smoothStep(0.45, 1, clamped);
}

interface DesignStageProps {
  /** 0 → 1 while the hero is pinned and scrolled (can speed the sequence up) */
  getScrollProgress: () => number;
  reducedMotion: boolean;
}

/**
 * Multiplayer-cursor hero: many cursors fly in, "designers" draw each print product into
 * existence, then "colourists" paint them with their real colours. Runs on its own clock,
 * and scrolling pushes the timeline forward faster.
 */
function DesignStage({ getScrollProgress, reducedMotion }: DesignStageProps) {
  const art = useHeroArt();
  const startTime = useRef<number | null>(null);
  const timeline = useRef(0);

  const items = useMemo<HeroItem[] | null>(
    () => (art ? heroPlacements.map((placement, index) => buildItem(art, placement.id, index)) : null),
    [art],
  );
  const schedules = useMemo(
    () => ({ desktop: createDesignSchedule(heroPlacements.length), mobile: createDesignSchedule(MOBILE_PRODUCT_COUNT) }),
    [],
  );
  const cursors = useMemo<CursorMesh[] | null>(() => {
    if (!art) return null;
    const cursorCount = schedules.desktop.cursors.length;
    return Array.from({ length: cursorCount }, (_, index) => {
      const colorKey = schedules.desktop.cursors[index].colorKey;
      return createCursorMesh(art.palette[colorKey], art.palette.paper);
    });
  }, [art, schedules]);

  useEffect(() => {
    if (!items) return;
    return () => items.forEach(disposeItem);
  }, [items]);

  useEffect(() => {
    if (!cursors) return;
    return () => cursors.forEach((cursor) => cursor.dispose());
  }, [cursors]);

  const trails = useMemo<CursorTrails | null>(() => {
    if (!art) return null;
    return createCursorTrails(schedules.desktop.cursors.map((plan) => art.palette[plan.colorKey]));
  }, [art, schedules]);
  useEffect(() => {
    if (!trails) return;
    return () => trails.dispose();
  }, [trails]);

  const glintLight = useRef<THREE.PointLight>(null);
  const cameraPosition = useMemo(() => new THREE.Vector3(0, 0, CAMERA_Z), []);
  const cameraGoal = useMemo(() => new THREE.Vector3(), []);
  const tagGroups = useRef<Array<THREE.Group | null>>([]);
  const tagElements = useRef<Array<HTMLDivElement | null>>([]);

  const poses = useMemo<Pose[]>(() => heroPlacements.map(() => ({ x: 0, y: 0, z: 0, radius: 1 })), []);
  const cursorPosition = useMemo(() => new THREE.Vector3(), []);
  const cursorPositions = useMemo(() => schedules.desktop.cursors.map(() => new THREE.Vector3(0, 0, -50)), [schedules]);
  const cursorPresence = useMemo(() => schedules.desktop.cursors.map(() => 0), [schedules]);

  useFrame((state, delta) => {
    if (!items || !cursors) return;
    const now = state.clock.elapsedTime;
    if (startTime.current === null) startTime.current = now;

    const aspect = state.size.width / state.size.height;
    const isNarrow = aspect < 1;
    const schedule = isNarrow ? schedules.mobile : schedules.desktop;
    const activeCount = isNarrow ? MOBILE_PRODUCT_COUNT : items.length;

    // the timeline advances on its own; scrolling can only push it further ahead
    const autoSeconds = now - startTime.current;
    const scrollSeconds = getScrollProgress() * schedule.totalSeconds;
    const target = reducedMotion ? schedule.totalSeconds + 1 : Math.max(autoSeconds, scrollSeconds);
    timeline.current = THREE.MathUtils.damp(timeline.current, target, 9, delta);
    const time = timeline.current;

    // cinematic camera: glides towards whichever product is being designed / coloured right now
    // (poses are from the previous frame, which is fine for a smooth move)
    let focusWeight = 0;
    let focusX = 0;
    let focusY = 0;
    for (let index = 0; index < activeCount; index += 1) {
      const momentStart = schedule.buildWindows[index].start;
      const momentEnd = schedule.paintWindows[index].end;
      const weight = Math.sin(THREE.MathUtils.clamp((time - momentStart) / (momentEnd - momentStart), 0, 1) * Math.PI);
      focusWeight += weight;
      focusX += poses[index].x * weight;
      focusY += poses[index].y * weight;
    }
    const normaliser = Math.max(focusWeight, 1);
    const dolly = Math.min(focusWeight, 1);
    const cameraTarget = cameraGoal.set(
      state.pointer.x * 0.9 + (focusX / normaliser) * 0.14,
      state.pointer.y * 0.5 + (focusY / normaliser) * 0.14,
      CAMERA_Z - dolly * 1.3,
    );
    cameraPosition.set(
      THREE.MathUtils.damp(cameraPosition.x, cameraTarget.x, 3, delta),
      THREE.MathUtils.damp(cameraPosition.y, cameraTarget.y, 3, delta),
      THREE.MathUtils.damp(cameraPosition.z, cameraTarget.z, 3, delta),
    );
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt((focusX / normaliser) * 0.22, (focusY / normaliser) * 0.22, 0);

    items.forEach((item, index) => {
      const placement = heroPlacements[index];
      if (index >= activeCount) {
        item.group.visible = false;
        item.shadow.mesh.visible = false;
        item.frame.update(1, 1, 0);
        return;
      }
      const slot = isNarrow ? placement.mobile : placement.desktop;
      const halfHeight = TAN_HALF_FOV * (CAMERA_Z - slot.depth);
      const halfWidth = halfHeight * aspect;
      const pose = poses[index];
      const buildWindow = schedule.buildWindows[index];
      const paintWindow = schedule.paintWindows[index];

      const build = smoothStep(buildWindow.start, buildWindow.end, time);
      const paint = smoothStep(paintWindow.start, paintWindow.end, time);
      const bob = build >= 1 ? Math.sin(now * 0.7 + item.phase) * 0.06 : 0;
      // a small "pop" the moment the colour is complete
      const popProgress = THREE.MathUtils.clamp((time - paintWindow.end) / 0.7, 0, 1);
      const pop = 1 + Math.sin(popProgress * Math.PI) * 0.06;

      pose.x = slot.nx * halfWidth * 0.9;
      pose.y = slot.ny * halfHeight * 0.88 + bob;
      pose.z = slot.depth;
      pose.radius = item.radius * slot.scale;

      item.group.visible = time > buildWindow.start - 0.05;
      item.group.position.set(pose.x, pose.y, pose.z);
      // while the cursors work on an object it turns a full 360° on its own turntable
      const spin = easeInOut(THREE.MathUtils.clamp((time - buildWindow.start) / (paintWindow.end - buildWindow.start), 0, 1)) * Math.PI * 2;
      item.group.rotation.set(slot.tilt[0] - state.pointer.y * 0.08, slot.tilt[1] + spin + state.pointer.x * 0.18, slot.tilt[2]);
      const isComplete = build >= 0.999;
      item.casters.forEach((mesh) => {
        mesh.castShadow = isComplete;
      });
      item.group.scale.setScalar(slot.scale * pop);

      // soft floating drop shadow behind the object, fading in as it gets built
      const shadowStrength = smoothStep(buildWindow.start + 0.3, buildWindow.end + 0.6, time);
      item.shadow.mesh.visible = shadowStrength > 0.01;
      item.shadow.mesh.position.set(pose.x + 0.12, pose.y - item.size.y * slot.scale * 0.42, pose.z - 0.8);
      item.shadow.mesh.scale.set(item.size.x * slot.scale * 1.25 + 0.4, item.size.y * slot.scale * 0.5 + 0.3, 1);
      (item.shadow.mesh.material as THREE.MeshBasicMaterial).opacity = shadowStrength * 0.12;

      item.uniforms.uBuild.value = build;
      item.uniforms.uReveal.value = paint;
      item.uniforms.uOriginX.value = pose.x;
      item.uniforms.uOriginY.value = pose.y;
      item.uniforms.uRadius.value = pose.radius;
      item.lineMaterial.opacity = 0.9 * (1 - smoothStep(0.1, 0.9, paint));

      const frameOpacity =
        smoothStep(buildWindow.start - 0.05, buildWindow.start + 0.35, time) *
        (1 - smoothStep(paintWindow.end - 0.3, paintWindow.end + 0.5, time));
      item.frame.group.position.set(pose.x, pose.y, pose.z + 0.4);
      item.frame.group.quaternion.copy(state.camera.quaternion);
      item.frame.update(Math.max(item.size.x, item.size.z) * slot.scale + 0.25, item.size.y * slot.scale + 0.25, frameOpacity * 0.85);

      // glass name tag appears under the object once it has been coloured
      const tagGroup = tagGroups.current[index];
      if (tagGroup) tagGroup.position.set(pose.x, Math.max(pose.y - item.size.y * slot.scale * 0.5 - 0.02, -halfHeight * 0.88), pose.z + 0.8);
      const tagElement = tagElements.current[index];
      if (tagElement) {
        const tagOpacity = isNarrow ? 0 : smoothStep(paintWindow.end - 0.1, paintWindow.end + 0.6, time);
        tagElement.style.opacity = String(tagOpacity);
        tagElement.style.transform = `translateY(${(1 - tagOpacity) * 8}px)`;
      }
    });

    cursors.forEach((cursor, index) => {
      const plan = schedule.cursors[index];
      if (!plan) {
        cursor.group.visible = false;
        cursorPresence[index] = 0;
        return;
      }
      const presence = evaluateCursor(plan, time, now, poses, cursorPosition);
      cursorPresence[index] = presence;
      cursorPositions[index].copy(cursorPosition);
      // finished cursors shrink away and are removed from the scene
      cursor.group.visible = presence > 0.02;
      cursor.group.position.copy(cursorPosition);
      cursor.group.scale.setScalar(presence);
      cursor.group.quaternion.copy(state.camera.quaternion);
    });
    trails?.update(cursorPositions, cursorPresence, now, state.gl.getPixelRatio());
    // a travelling light glides across the scene so foil, metal and gloss keep glinting
    if (glintLight.current) glintLight.current.position.set(Math.sin(now * 0.55) * 6, 1.5 + Math.cos(now * 0.4) * 1.5, 5);
  });

  return (
    <>
      <StudioLighting keyIntensity={1.4} stripLights />
      <pointLight ref={glintLight} intensity={22} distance={16} color="white" />
      {/* key light that casts real shadows of the finished products onto the backdrop wall */}
      <directionalLight
        position={[3, 4.5, 11]}
        intensity={0.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-radius={9}
        shadow-blurSamples={20}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      />
      <mesh position={[0, 0, -3]} receiveShadow>
        <planeGeometry args={[60, 40]} />
        <shadowMaterial transparent opacity={0.12} color="black" />
      </mesh>
      {items?.map((item, index) => (
        <group key={heroPlacements[index].id}>
          <primitive object={item.group} />
          <primitive object={item.frame.group} />
          <primitive object={item.shadow.mesh} />
          <group
            ref={(node) => {
              tagGroups.current[index] = node;
            }}
          >
            <Html center zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
              <div
                ref={(node) => {
                  tagElements.current[index] = node;
                }}
                className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/70 bg-white/60 px-3 py-1 text-[11px] font-semibold tracking-wide text-ink shadow-lg backdrop-blur-md"
                style={{ opacity: 0 }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: `var(--color-brand-${item.colorKey})` }} />
                {item.label}
              </div>
            </Html>
          </group>
        </group>
      ))}
      {trails && <primitive object={trails.points} />}
      {/* film look: highlights bloom, filmic tone mapping, gentle vignette (no depth-of-field: it breaks the transparent canvas) */}
      <EffectComposer multisampling={4}>
        <Bloom intensity={0.35} luminanceThreshold={0.92} luminanceSmoothing={0.2} mipmapBlur />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        <Vignette eskil={false} offset={0.25} darkness={0.35} />
      </EffectComposer>
      {cursors?.map((cursor, index) => <primitive key={index} object={cursor.group} />)}
    </>
  );
}

export default function CursorDesignScene(props: { getScrollProgress: () => number }) {
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  return (
    <StageCanvas cameraPosition={[0, 0, CAMERA_Z]} fov={FOV} shadows="variance">
      <DesignStage getScrollProgress={props.getScrollProgress} reducedMotion={reducedMotion} />
    </StageCanvas>
  );
}
