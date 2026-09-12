"use client";

import { useEffect, useRef } from "react";

type Streak = {
  x: number;
  y: number;
  len: number;
  vy: number;
  alpha: number;
};

function seedStreak(wide: boolean, random: () => number): Streak {
  return {
    x: wide ? 0.42 + random() * 0.56 : 0.4 + random() * 0.58,
    y: random(),
    len: 8 + random() * 18,
    vy: 0.35 + random() * 0.55,
    alpha: 0.08 + random() * 0.16,
  };
}

export function HeroRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const surface = canvasRef.current;
    if (!surface) return;
    const layer = surface.getContext("2d", { alpha: true });
    if (!layer) return;
    const canvas = surface;
    const ctx = layer;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let wide = window.innerWidth >= 1024;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let last = performance.now();
    let running = true;

    const random = Math.random;
    let streaks: Streak[] = [];

    function populate() {
      const streakCount = wide ? 22 : 10;
      streaks = Array.from({ length: streakCount }, () => seedStreak(wide, random));
    }

    function drawStreak(streak: Streak) {
      const px = streak.x * width;
      const py = streak.y * height;
      ctx.save();
      const line = ctx.createLinearGradient(px, py, px, py + streak.len);
      line.addColorStop(0, "rgba(0, 182, 248, 0)");
      line.addColorStop(0.35, `rgba(247, 251, 253, ${streak.alpha})`);
      line.addColorStop(1, "rgba(0, 182, 248, 0)");
      ctx.strokeStyle = line;
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, py + streak.len);
      ctx.stroke();
      ctx.restore();
    }

    function paint() {
      ctx.clearRect(0, 0, width, height);
      for (const streak of streaks) drawStreak(streak);
    }

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      wide = window.innerWidth >= 1024;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const nextW = parent.clientWidth;
      const nextH = parent.clientHeight;
      if (nextW === width && nextH === height && canvas.width) return;
      width = nextW;
      height = nextH;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();
      if (width > 0 && height > 0) paint();
    }

    function tick(now: number) {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 16.67, 2.2);
      last = now;

      ctx.clearRect(0, 0, width, height);

      for (const streak of streaks) {
        streak.y += (streak.vy * dt) / 100;
        if (streak.y > 1.1) {
          Object.assign(streak, seedStreak(wide, random), { y: -0.05 });
        }
        drawStreak(streak);
      }
    }

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();
    last = performance.now();
    tick(last);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden
    />
  );
}
