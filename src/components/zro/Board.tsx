import { forwardRef, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import { tileColumn, tileKind, type TileKind } from "@/lib/zro-board";
import { TILE_ICONS, PAWN } from "@/lib/zro-assets";

// Board geometry (CSS px). Tiles are 66x38 diamonds; neighbours step 41px
// sideways and 24px up, which leaves the small gaps seen between tiles.
const STEP_X = 41;
const STEP_Y = 24;
const BOTTOM_PAD = 160; // room for the roll button + bottom bar
const TOP_PAD = 200;
const AHEAD = 70; // how many tiles to render past the pawn
const BEHIND = 14;
/** Whole board is drawn this much larger than its logical size. */
const ZOOM = 1.22;

export type BoardHandle = {
  /** Hops the pawn tile by tile from `from` to `to`. Resolves when it lands. */
  hop: (from: number, to: number) => Promise<void>;
};

type Props = { position: number; width: number };

const tileX = (i: number, width: number) => width / 2 + (tileColumn(i) - 1.5) * STEP_X;

const Board = forwardRef<BoardHandle, Props>(function Board({ position, width: screenWidth }, ref) {
  const width = screenWidth / ZOOM;
  const scrollRef = useRef<HTMLDivElement>(null);
  // While hopping, items up to the pawn's live tile disappear as it passes.
  const [visualPos, setVisualPos] = useState(position);

  const count = Math.max(position, visualPos) + AHEAD;
  const height = BOTTOM_PAD + count * STEP_Y + TOP_PAD;
  const tileY = (i: number) => height - BOTTOM_PAD - i * STEP_Y;

  const px = useMotionValue(tileX(visualPos, width));
  const py = useMotionValue(tileY(visualPos));

  // Keep the pawn glued to its tile when the board grows or the width changes.
  useLayoutEffect(() => {
    px.set(tileX(visualPos, width));
    py.set(tileY(visualPos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, width]);

  const scrollToTile = (i: number, smooth: boolean) => {
    const el = scrollRef.current;
    if (!el) return;
    const top = tileY(i) * ZOOM - el.clientHeight * 0.6;
    el.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  };

  useLayoutEffect(() => {
    scrollToTile(visualPos, false);
    // first paint only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    hop: async (from, to) => {
      for (let i = from; i < to; i++) {
        const x0 = tileX(i, width), x1 = tileX(i + 1, width);
        const y0 = tileY(i), y1 = tileY(i + 1);
        scrollToTile(i + 1, true);
        await Promise.all([
          animate(px, [x0, (x0 + x1) / 2, x1], { duration: 0.32, ease: "easeInOut" }),
          animate(py, [y0, Math.min(y0, y1) - 22, y1], { duration: 0.32, ease: "easeOut" }),
        ]);
        setVisualPos(i + 1);
      }
    },
  }));

  const start = Math.max(0, visualPos - BEHIND);
  const tiles = useMemo(() => {
    const out: { i: number; x: number; y: number; kind: TileKind }[] = [];
    for (let i = start; i < count; i++) out.push({ i, x: tileX(i, width), y: tileY(i), kind: tileKind(i) });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, count, width, height]);

  // The board is moved only by the game (scrollTo); players can't drag it.
  return (
    <div ref={scrollRef} className="no-scrollbar fixed inset-0 touch-none select-none overflow-hidden">
      <div className="relative mx-auto" style={{ width, height, zoom: ZOOM }}>
        {tiles.map((t) => {
          const z = (100000 - t.i) * 2;
          const icon = t.i > visualPos ? TILE_ICONS[t.kind] : null;
          return (
            <div key={t.i}>
              <div
                className={`tile ${t.kind === "box" ? "tile-special" : ""}`}
                style={{ left: t.x - 33, top: t.y - 19, zIndex: z }}
              >
                <div className="tile-face tile-side" />
                <div className="tile-face tile-top" />
              </div>
              {icon && (
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="tile-item pointer-events-none absolute max-w-none"
                  style={{
                    left: t.x,
                    top: t.y + icon.lift,
                    width: icon.size,
                    height: icon.size,
                    zIndex: z + 1,
                  }}
                />
              )}
            </div>
          );
        })}

        <motion.div
          className="pointer-events-none absolute left-0 top-0"
          style={{ x: px, y: py, zIndex: 250000 }}
        >
          <img
            src={PAWN}
            alt="قطعتك"
            width={42}
            height={42}
            className="absolute max-w-none"
            style={{ width: 42, height: 42, left: -21, top: -36, filter: "drop-shadow(0 6px 6px oklch(0.1 0.1 270 / 0.6))" }}
          />
        </motion.div>
      </div>
    </div>
  );
});

export default Board;
