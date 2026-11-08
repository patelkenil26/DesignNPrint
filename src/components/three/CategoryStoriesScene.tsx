'use client';

import { ComponentType, useEffect, useMemo, useRef, useState } from 'react';
import { ContactShadows } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import StageCanvas, { StudioLighting } from './StageCanvas';
import BoxesStory from './stories/BoxesStory';
import CanStory from './stories/CanStory';
import BrochureStory from './stories/BrochureStory';
import CardsStory from './stories/CardsStory';
import FolderStory from './stories/FolderStory';
import PouchDisplayStory from './stories/PouchDisplayStory';
import { StoryProps, StoryTextures, buildStoryTextures } from './stories/storyTextures';
import { readBrandPalette } from './utils/canvasKit';
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

/** world distance between neighbouring chapters while they glide past each other (cover-flow style) */
const CHAPTER_SPACING = 3.4;

/** Position along the chapters, with a short glide between each pair and a plateau while a chapter plays. */
function computeSlidePosition(chapterFloat: number, chapterCount: number): number {
  let slide = 0;
  for (let index = 0; index < chapterCount - 1; index += 1) {
    slide += smoothStep(index + 0.5 - 0.17, index + 0.5 + 0.17, chapterFloat);
  }
  return slide;
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

interface StoriesStageProps {
  getProgress: () => number;
  onActiveChange: (index: number) => void;
}

function StoriesStage({ getProgress, onActiveChange }: StoriesStageProps) {
  const textures = useStoryTextures();
  const chapterCount = STORY_COMPONENTS.length;
  const smoothProgress = useRef(0);
  const smoothSlide = useRef(0);
  const lastActive = useRef(-1);
  const wrappers = useRef<Array<THREE.Group | null>>([]);
  const drivers = useMemo(() => Array.from({ length: chapterCount }, () => ({ current: 0 })), [chapterCount]);

  useFrame((state, delta) => {
    smoothProgress.current = THREE.MathUtils.damp(smoothProgress.current, getProgress(), 6, delta);
    const aspect = state.size.width / state.size.height;
    const isNarrow = aspect < 1.05;

    const chapterFloat = -0.5 + smoothProgress.current * chapterCount;
    smoothSlide.current = THREE.MathUtils.damp(
      smoothSlide.current,
      computeSlidePosition(chapterFloat, chapterCount),
      5.5,
      delta,
    );
    const slide = smoothSlide.current;

    wrappers.current.forEach((wrapper, index) => {
      if (!wrapper) return;
      const offset = index - slide;
      const distance = Math.abs(offset);
      wrapper.visible = distance < 0.995;
      // cover-flow: neighbours turn away, sink back and shrink while the focused item sits front and centre
      wrapper.position.set(
        offset * CHAPTER_SPACING + (isNarrow ? 0 : 2.0),
        (isNarrow ? 0.9 : 0) - Math.min(1, distance) * 0.3,
        -Math.min(1, distance) * 4.5,
      );
      wrapper.rotation.y = -offset * 1.15;
      wrapper.scale.setScalar((isNarrow ? 0.72 : 1) * Math.max(0.001, 1 - Math.pow(Math.min(1, distance), 1.15)));
      drivers[index].current = smoothStep(index - 0.38, index + 0.1, chapterFloat);
    });

    const activeIndex = Math.round(THREE.MathUtils.clamp(chapterFloat, 0, chapterCount - 1));
    if (activeIndex !== lastActive.current) {
      lastActive.current = activeIndex;
      onActiveChange(activeIndex);
    }

    state.camera.position.set(state.pointer.x * 0.5, 0.7 + state.pointer.y * 0.25, isNarrow ? 13 : 9.6);
    state.camera.lookAt(0, -0.1, 0);
  });

  return (
    <>
      <StudioLighting keyIntensity={1.3} />
      <ContactShadows position={[0, -1.27, 0]} opacity={0.38} scale={30} blur={2.6} far={4} resolution={512} />
      {textures &&
        STORY_COMPONENTS.map((Story, index) => (
          <group
            key={index}
            ref={(node) => {
              wrappers.current[index] = node;
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
    <StageCanvas cameraPosition={[0, 0.7, 9.6]} fov={32}>
      <StoriesStage {...props} />
    </StageCanvas>
  );
}
