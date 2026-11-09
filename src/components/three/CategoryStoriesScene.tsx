'use client';

import { ComponentType, useEffect, useMemo, useRef, useState } from 'react';
import { ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StageCanvas, { StudioLighting } from './StageCanvas';
import BoxesStory from './stories/BoxesStory';
import BrochureStory from './stories/BrochureStory';
import CanStory from './stories/CanStory';
import CardsStory from './stories/CardsStory';
import FolderStory from './stories/FolderStory';
import PouchDisplayStory from './stories/PouchDisplayStory';
import { StoryProps, StoryTextures, buildStoryTextures } from './stories/storyTextures';
import { readBrandPalette } from './utils/canvasKit';
import { productCategories } from '@/data/categories';
import { smoothStep } from '@/lib/useScrollTrack';

/** Order must match `productCategories` in src/data/categories.ts */
const STORY_COMPONENTS: Array<ComponentType<StoryProps>> = [
  CanStory,
  CardsStory,
  BrochureStory,
  BoxesStory,
  FolderStory,
  PouchDisplayStory,
];

/**
 * One continuous studio: the six products sit along a gentle S-curve, and a single
 * camera flies between them, using a different "shot" for each (front, side, high, low …).
 */
const productPosition = (index: number): THREE.Vector3 => new THREE.Vector3(Math.sin(index * 1.1) * 7, 0, -index * 11);

/** camera offset (relative to the product) = the "shot" used for that category */
const CAMERA_SHOTS: Array<[number, number, number]> = [
  [0, 0.8, 9.6], //   stickers — straight on
  [-4.6, 1.8, 8.2], // cards — from the left
  [4.6, 3.2, 8.4], //  brochures — from the right, slightly above
  [0, 6.4, 8.6], //    boxes — high angle so the sheet fold reads clearly
  [-3.9, 0.5, 8.0], // folders — low and from the left
  [3.3, 2.0, 9.4], //  pouches — from the right
];

const BASE_FOV = 32;
const SHIFT_RIGHT = 2.0;

/** Position along the journey: a long dwell on each product, then a smooth flight to the next. */
function computeFlightPosition(chapterFloat: number, chapterCount: number): number {
  let position = 0;
  for (let index = 0; index < chapterCount - 1; index += 1) {
    position += smoothStep(index + 0.5 - 0.3, index + 0.5 + 0.3, chapterFloat);
  }
  return position;
}

function useStoryTextures(): StoryTextures | null {
  const [textures, setTextures] = useState<StoryTextures | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let built: StoryTextures | null = null;
    buildStoryTextures(readBrandPalette())
      .then((result) => {
        if (isCancelled) {
          result.dispose();
          return;
        }
        built = result;
        setTextures(result);
      })
      .catch((error) => console.error('Failed to build category story textures', error));
    return () => {
      isCancelled = true;
      built?.dispose();
    };
  }, []);

  return textures;
}

/** Where the camera stands and looks for one product: looks slightly left of the product so it sits right of centre. */
function computeShot(index: number, isNarrow: boolean, positionOut: THREE.Vector3, targetOut: THREE.Vector3): void {
  const product = productPosition(index);
  const [dx, dy, dz] = CAMERA_SHOTS[index];
  const distanceScale = isNarrow ? 1.5 : 1;
  positionOut.set(product.x + dx * distanceScale, product.y + dy * distanceScale, product.z + dz * distanceScale);

  const forwardX = product.x - positionOut.x;
  const forwardZ = product.z - positionOut.z;
  const length = Math.hypot(forwardX, forwardZ) || 1;
  // right = forward × up
  const rightX = -forwardZ / length;
  const rightZ = forwardX / length;
  const shift = isNarrow ? 0 : SHIFT_RIGHT;
  targetOut.set(product.x - rightX * shift, product.y - (isNarrow ? 0.9 : 0.05), product.z - rightZ * shift);
}

interface StoriesStageProps {
  getProgress: () => number;
  onActiveChange: (index: number) => void;
}

const shotA = { position: new THREE.Vector3(), target: new THREE.Vector3() };
const shotB = { position: new THREE.Vector3(), target: new THREE.Vector3() };
const scratchPosition = new THREE.Vector3();
const scratchTarget = new THREE.Vector3();
const scratchSide = new THREE.Vector3();
const scratchColor = new THREE.Color();

function StoriesStage({ getProgress, onActiveChange }: StoriesStageProps) {
  const textures = useStoryTextures();
  const chapterCount = STORY_COMPONENTS.length;
  const smoothProgress = useRef(0);
  const flight = useRef(0);
  const lastActive = useRef(-1);
  const productGroups = useRef<Array<THREE.Group | null>>([]);
  const shadowGroup = useRef<THREE.Group>(null);
  const rimLight = useRef<THREE.PointLight>(null);
  const drivers = useMemo(() => Array.from({ length: chapterCount }, () => ({ current: 0 })), [chapterCount]);

  useFrame((state, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, getProgress(), 6, delta);
    const aspect = state.size.width / state.size.height;
    const isNarrow = aspect < 1.05;

    const chapterFloat = -0.5 + smoothProgress.current * chapterCount;
    flight.current = THREE.MathUtils.damp(flight.current, computeFlightPosition(chapterFloat, chapterCount), 2.8, delta);
    const position = flight.current;
    const fromIndex = Math.min(chapterCount - 1, Math.floor(position));
    const toIndex = Math.min(chapterCount - 1, fromIndex + 1);
    const t = fromIndex === toIndex ? 0 : position - fromIndex;
    const flightEnergy = Math.sin(t * Math.PI);

    productGroups.current.forEach((group, index) => {
      if (!group) return;
      group.visible = Math.abs(index - position) < 1.4;
      group.position.copy(productPosition(index));
      drivers[index].current = smoothStep(index - 0.4, index + 0.08, chapterFloat);
    });

    // ── camera: interpolate between the two shots, with a swooping arc in the middle of each flight
    computeShot(fromIndex, isNarrow, shotA.position, shotA.target);
    computeShot(toIndex, isNarrow, shotB.position, shotB.target);
    scratchPosition.copy(shotA.position).lerp(shotB.position, t);
    scratchTarget.copy(shotA.target).lerp(shotB.target, t);

    scratchSide.subVectors(shotB.position, shotA.position);
    const travelLength = Math.hypot(scratchSide.x, scratchSide.z) || 1;
    const sideSign = fromIndex % 2 === 0 ? 1 : -1;
    scratchPosition.x += (-scratchSide.z / travelLength) * flightEnergy * 3.2 * sideSign;
    scratchPosition.z += (scratchSide.x / travelLength) * flightEnergy * 3.2 * sideSign;
    scratchPosition.y += flightEnergy * 2.4;

    const time = state.clock.elapsedTime;
    const camera = state.camera as THREE.PerspectiveCamera;
    camera.position.set(
      scratchPosition.x + state.pointer.x * 0.5 + Math.sin(time * 0.35) * 0.25,
      scratchPosition.y + state.pointer.y * 0.25 + Math.sin(time * 0.5) * 0.07,
      scratchPosition.z,
    );
    camera.lookAt(scratchTarget);
    camera.rotateZ(Math.sin(position * Math.PI * 2) * 0.03 * flightEnergy);
    const targetFov = BASE_FOV + flightEnergy * 14;
    if (Math.abs(camera.fov - targetFov) > 0.01) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
    }

    // the floor shadow and a coloured rim light travel with the camera's focus
    const focus = productPosition(fromIndex).lerp(productPosition(toIndex), t);
    if (shadowGroup.current) shadowGroup.current.position.set(focus.x, 0, focus.z);
    if (rimLight.current && textures) {
      rimLight.current.position.set(focus.x + 3, 2.6, focus.z + 3.2);
      const accent = productCategories[Math.round(position)]?.accent ?? 'blue';
      scratchColor.set(textures.palette[accent]);
      rimLight.current.color.lerp(scratchColor, 1 - Math.exp(-4 * delta));
    }

    const activeIndex = Math.round(THREE.MathUtils.clamp(chapterFloat, 0, chapterCount - 1));
    if (activeIndex !== lastActive.current) {
      lastActive.current = activeIndex;
      onActiveChange(activeIndex);
    }
  });

  return (
    <>
      <StudioLighting keyIntensity={1.3} />
      <pointLight ref={rimLight} intensity={14} distance={14} color="white" />
      <group ref={shadowGroup}>
        <ContactShadows position={[0, -1.27, 0]} opacity={0.4} scale={30} blur={2.6} far={4} resolution={512} />
      </group>
      {textures &&
        STORY_COMPONENTS.map((Story, index) => (
          <group
            key={index}
            position={productPosition(index)}
            ref={(node) => {
              productGroups.current[index] = node;
            }}
          >
            <Story build={drivers[index]} textures={textures} />
          </group>
        ))}
    </>
  );
}

export default function CategoryStoriesScene(props: StoriesStageProps) {
  return (
    <StageCanvas cameraPosition={[0, 0.8, 9.6]} fov={BASE_FOV}>
      <StoriesStage {...props} />
    </StageCanvas>
  );
}
