import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "framer-motion";

// A real cube: 6 faces with pip layouts, tumbled with 3D transforms and
// stopped on the face the die actually rolled.
const CUBE = 68;
const HALF = CUBE / 2;

/** Rotation that brings each value's face to the front. */
const FACE_ROT: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  2: { x: -90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: 90, y: 0 },
  6: { x: 180, y: 0 },
};

const FACES: { value: number; transform: string }[] = [
  { value: 1, transform: `translateZ(${HALF}px)` },
  { value: 6, transform: `rotateY(180deg) translateZ(${HALF}px)` },
  { value: 3, transform: `rotateY(90deg) translateZ(${HALF}px)` },
  { value: 4, transform: `rotateY(-90deg) translateZ(${HALF}px)` },
  { value: 2, transform: `rotateX(90deg) translateZ(${HALF}px)` },
  { value: 5, transform: `rotateX(-90deg) translateZ(${HALF}px)` },
];

const PIPS: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

function Face({ value }: { value: number }) {
  const on = new Set((PIPS[value] ?? []).map(([r, c]) => `${r}-${c}`));
  return (
    <>
      {Array.from({ length: 9 }, (_, k) => {
        const r = Math.floor(k / 3);
        const c = k % 3;
        return (
          <span key={k} className="grid place-items-center">
            {on.has(`${r}-${c}`) && <i className="dice-pip block" />}
          </span>
        );
      })}
    </>
  );
}

/** Dims the board while a real dice cube tumbles, then shows the number it landed on. */
export default function DiceOverlay({ target, reveal }: { target: number; reveal: boolean }) {
  const rx = useMotionValue(-215);
  const ry = useMotionValue(-140);
  const rz = useMotionValue(12);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const base = FACE_ROT[target] ?? FACE_ROT[1]!;
    const spin = { duration: 1.2, ease: [0.18, 0.72, 0.24, 1] as const };
    animate(rx, base.x + 720, spin);
    animate(ry, base.y + 1080, spin);
    animate(rz, 0, { duration: 1.2, ease: "easeOut" });
  }, [target, rx, ry, rz]);

  return (
    <div className="animate-in fade-in duration-200 fixed inset-0 z-[500000] flex flex-col items-center justify-center gap-4 bg-background/60 backdrop-blur-[2px]">
      <div className="dice-stage" style={{ width: CUBE, height: CUBE }}>
        <motion.div className="dice-cube" style={{ rotateX: rx, rotateY: ry, rotateZ: rz }}>
          {FACES.map((f) => (
            <div key={f.value} className="dice-face" style={{ transform: f.transform }}>
              <Face value={f.value} />
            </div>
          ))}
        </motion.div>
      </div>
      {reveal && (
        <span className="animate-in zoom-in-50 fade-in duration-300 font-display text-[54px] font-extrabold leading-none tabular-nums">
          {target}
        </span>
      )}
    </div>
  );
}
