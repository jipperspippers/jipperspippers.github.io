import { useEffect, useRef } from "react";
import "./background.css";

const CELL = 14;          // grid pitch
const DOT = 8;            // drawn square, smaller than the pitch so dots stay chunky
const OFF = (CELL - DOT) / 2;
const GLOW_RADIUS = 130;  // how far the cursor reaches
const DROP_COUNT = 16;
const RIPPLE_SPEED = 280; // px per second
const RIPPLE_BAND = 26;   // thickness of the expanding ring
const RIPPLE_LIFE = 1.4;  // seconds
const LEVELS = 10;        // brightness steps; dots are bucketed per step so that a
                          // frame only sets fillStyle once per step, not once per dot

const BASE = "#191a26";
const RAIN = [157, 199, 200];
const GLOW = [247, 206, 91];
const FLASH = [255, 255, 255];

// The page sits on near-black, so scaling toward 0 reads as a clean fade out.
// Every shade is built up front: nothing allocates a colour string per frame.
function shades([r, g, b]) {
  return Array.from({ length: LEVELS }, (_, i) => {
    const k = (i + 1) / LEVELS;
    return `rgb(${Math.round(r * k)},${Math.round(g * k)},${Math.round(b * k)})`;
  });
}

const GLOW_SHADES = shades(GLOW);
const RAIN_SHADES = shades(RAIN);
const FLASH_SHADES = shades(FLASH);

const levelOf = (intensity) =>
  Math.max(0, Math.min(LEVELS - 1, Math.floor(intensity * LEVELS)));

function Background() {
  const gridRef = useRef(null);
  const fxRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, active: false });
  const ripples = useRef([]);
  const drops = useRef([]);

  useEffect(() => {
    const grid = gridRef.current;
    const fx = fxRef.current;
    const gridCtx = grid.getContext("2d");
    const ctx = fx.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = performance.now();

    // Dot coordinates waiting to be drawn, grouped by brightness step.
    const buckets = Array.from({ length: LEVELS }, () => []);
    const heads = [];

    const clearBuckets = () => {
      for (const bucket of buckets) bucket.length = 0;
    };

    const flush = (palette) => {
      for (let l = LEVELS - 1; l >= 0; l--) {
        const bucket = buckets[l];
        if (!bucket.length) continue;
        ctx.fillStyle = palette[l];
        for (let i = 0; i < bucket.length; i += 2) {
          ctx.fillRect(bucket[i], bucket[i + 1], DOT, DOT);
        }
      }
    };

    const spawnDrop = (scattered) => ({
      col: Math.floor(Math.random() * cols),
      y: scattered ? Math.random() * height : -Math.random() * height * 0.5,
      speed: 90 + Math.random() * 220,
      tail: 4 + Math.floor(Math.random() * 8),
    });

    // The dim grid never changes, so it lives on its own canvas and is only
    // repainted on resize. The animated dots sit on top and cover it exactly.
    const drawGrid = () => {
      gridCtx.clearRect(0, 0, width, height);
      gridCtx.fillStyle = BASE;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          gridCtx.fillRect(col * CELL + OFF, row * CELL + OFF, DOT, DOT);
        }
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      // Backing store stays at 1x: the browser upscales with nearest-neighbour,
      // which is the look we want and keeps the fill area down on HiDPI screens.
      for (const canvas of [grid, fx]) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
      drops.current = Array.from({ length: DROP_COUNT }, () => spawnDrop(true));
      drawGrid();
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.clearRect(0, 0, width, height);

      const p = pointer.current;
      if (p.active) {
        clearBuckets();
        const colStart = Math.max(0, Math.floor((p.x - GLOW_RADIUS) / CELL));
        const colEnd = Math.min(cols - 1, Math.ceil((p.x + GLOW_RADIUS) / CELL));
        const rowStart = Math.max(0, Math.floor((p.y - GLOW_RADIUS) / CELL));
        const rowEnd = Math.min(rows - 1, Math.ceil((p.y + GLOW_RADIUS) / CELL));

        for (let row = rowStart; row <= rowEnd; row++) {
          for (let col = colStart; col <= colEnd; col++) {
            const dx = col * CELL + CELL / 2 - p.x;
            const dy = row * CELL + CELL / 2 - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > GLOW_RADIUS) continue;
            const k = 1 - dist / GLOW_RADIUS;
            const intensity = k * k;
            if (intensity < 0.12) continue;
            buckets[levelOf(intensity)].push(col * CELL + OFF, row * CELL + OFF);
          }
        }
        flush(GLOW_SHADES);
      }

      clearBuckets();
      heads.length = 0;
      for (const drop of drops.current) {
        if (!reduced) drop.y += drop.speed * dt;
        if (drop.y - drop.tail * CELL > height) Object.assign(drop, spawnDrop(false));

        const head = Math.floor(drop.y / CELL);
        for (let i = 0; i < drop.tail; i++) {
          const row = head - i;
          if (row < 0 || row > rows) continue;
          const x = drop.col * CELL + OFF;
          const y = row * CELL + OFF;
          if (i === 0) {
            heads.push(x, y);
            continue;
          }
          const k = 1 - i / drop.tail;
          buckets[levelOf(0.2 + 0.8 * k * k)].push(x, y);
        }
      }
      flush(RAIN_SHADES);
      ctx.fillStyle = FLASH_SHADES[LEVELS - 1];
      for (let i = 0; i < heads.length; i += 2) {
        ctx.fillRect(heads[i], heads[i + 1], DOT, DOT);
      }

      for (let i = ripples.current.length - 1; i >= 0; i--) {
        const ripple = ripples.current[i];
        ripple.t += dt;
        const fade = 1 - ripple.t / RIPPLE_LIFE;
        if (fade <= 0) {
          ripples.current.splice(i, 1);
          continue;
        }

        clearBuckets();
        const radius = ripple.t * RIPPLE_SPEED;
        const reach = radius + RIPPLE_BAND;
        const colStart = Math.max(0, Math.floor((ripple.x - reach) / CELL));
        const colEnd = Math.min(cols - 1, Math.ceil((ripple.x + reach) / CELL));
        const rowStart = Math.max(0, Math.floor((ripple.y - reach) / CELL));
        const rowEnd = Math.min(rows - 1, Math.ceil((ripple.y + reach) / CELL));

        for (let row = rowStart; row <= rowEnd; row++) {
          for (let col = colStart; col <= colEnd; col++) {
            const dx = col * CELL + CELL / 2 - ripple.x;
            const dy = row * CELL + CELL / 2 - ripple.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const offset = Math.abs(dist - radius);
            if (offset > RIPPLE_BAND / 2) continue;
            const edge = 1 - offset / (RIPPLE_BAND / 2);
            buckets[levelOf(fade * edge)].push(col * CELL + OFF, row * CELL + OFF);
          }
        }
        flush(FLASH_SHADES);
      }

      raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    const onDown = (e) => {
      if (reduced) return;
      ripples.current.push({ x: e.clientX, y: e.clientY, t: 0 });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={gridRef} className="background" aria-hidden="true" />
      <canvas ref={fxRef} className="background background-fx" aria-hidden="true" />
    </>
  );
}

export default Background;
