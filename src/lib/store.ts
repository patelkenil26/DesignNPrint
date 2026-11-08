import { create } from 'zustand';

export interface SceneState {
  scrollProgress: number; // 0.0 to 1.0
  activeChapter: number;  // 0: Card, 1: Dieline Fold, 2: Box, 3: Retail, 4: Pedestal
  mouse: { x: number; y: number }; // normalized -1 to 1
  serviceColor: string; // Dynamic color from ColorThief or theme default
  isCanvasReady: boolean;
  
  // Actions
  setScrollProgress: (progress: number) => void;
  setActiveChapter: (chapter: number) => void;
  setMouse: (x: number, y: number) => void;
  setServiceColor: (color: string) => void;
  setIsCanvasReady: (ready: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  scrollProgress: 0,
  activeChapter: 0,
  mouse: { x: 0, y: 0 },
  serviceColor: '#e11d48', // Default vibrant accent
  isCanvasReady: false,

  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveChapter: (activeChapter) => set({ activeChapter }),
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setServiceColor: (serviceColor) => set({ serviceColor }),
  setIsCanvasReady: (isCanvasReady) => set({ isCanvasReady }),
}));

