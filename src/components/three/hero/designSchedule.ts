/**
 * Who draws and who paints what, and when (seconds on the hero timeline).
 * "Designer" cursors sweep an object into existence (left → right), then "colourist"
 * cursors follow, painting it with its real print colours (top → bottom). Two cursors share
 * every object (lane 0 / lane 1), and every cursor leaves the stage once its work is done.
 */
export type CursorColorKey = 'blue' | 'red' | 'green' | 'yellow';

export interface DesignTask {
  kind: 'build' | 'paint';
  item: number;
  start: number;
  end: number;
  /** which of the two cursors sharing the object this is (offsets its pen path) */
  lane: 0 | 1;
}

export interface CursorPlan {
  colorKey: CursorColorKey;
  tasks: DesignTask[];
  /** off-screen start position */
  entry: { x: number; y: number; z: number };
  /** off-screen position the cursor leaves towards once finished */
  exit: { x: number; y: number; z: number };
  phase: number;
}

export interface DesignSchedule {
  cursors: CursorPlan[];
  buildWindows: Array<{ start: number; end: number }>;
  paintWindows: Array<{ start: number; end: number }>;
  /** the sequence is complete (all cursors gone) at this moment */
  totalSeconds: number;
}

export const BUILD_DURATION = 1.3;
export const PAINT_DURATION = 1.6;
/** every product gets its own moment: a new one starts this many seconds after the previous */
export const MOMENT_SPACING = 1.25;
/** colour starts this long after the drawing of the same product started */
const PAINT_LAG = 1.1;
/** longest time a cursor spends flying between two tasks */
export const TRAVEL_SECONDS = 1.1;
/** a finished cursor waits this long, then flies away over EXIT_SECONDS */
export const EXIT_DELAY = 0.3;
export const EXIT_SECONDS = 1.0;

const CURSOR_COLORS: CursorColorKey[] = ['blue', 'red', 'green', 'yellow', 'red', 'blue', 'yellow', 'green', 'blue'];

export function createDesignSchedule(productCount: number): DesignSchedule {
  const buildWindows = Array.from({ length: productCount }, (_, index) => {
    const start = 0.9 + index * MOMENT_SPACING;
    return { start, end: start + BUILD_DURATION };
  });
  const paintWindows = Array.from({ length: productCount }, (_, index) => {
    const start = 0.9 + PAINT_LAG + index * MOMENT_SPACING;
    return { start, end: start + PAINT_DURATION };
  });

  // cursors work in pairs; a pair handles every `pairCount`-th object
  const pairCount = productCount >= 6 ? 3 : 2;

  const cursors: CursorPlan[] = [];
  const addCursor = (cursorIndex: number, tasks: DesignTask[]) => {
    const angle = cursorIndex * 2.4 + 0.5;
    const exitAngle = angle + Math.PI * 0.8;
    cursors.push({
      colorKey: CURSOR_COLORS[cursorIndex % CURSOR_COLORS.length],
      tasks,
      entry: { x: Math.cos(angle) * 10, y: Math.sin(angle) * 6.5, z: 1.5 },
      exit: { x: Math.cos(exitAngle) * 10, y: Math.sin(exitAngle) * 6.5, z: 1.5 },
      phase: cursorIndex * 1.3,
    });
  };

  const addCrew = (kind: DesignTask['kind'], windows: Array<{ start: number; end: number }>, firstCursorIndex: number) => {
    for (let pair = 0; pair < pairCount; pair += 1) {
      for (const lane of [0, 1] as const) {
        const tasks: DesignTask[] = [];
        for (let item = pair; item < productCount; item += pairCount) {
          tasks.push({ kind, item, ...windows[item], lane });
        }
        addCursor(firstCursorIndex + pair * 2 + lane, tasks);
      }
    }
  };
  addCrew('build', buildWindows, 0);
  addCrew('paint', paintWindows, pairCount * 2);

  const lastWorkEnd = paintWindows[productCount - 1].end;
  return { cursors, buildWindows, paintWindows, totalSeconds: lastWorkEnd + EXIT_DELAY + EXIT_SECONDS + 0.2 };
}
