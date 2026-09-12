"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { pricePanelVisual } from "@/content/photos";

export function PriceStage({ alt }: { alt: string }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 22, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 80, damping: 22, mass: 0.4 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [4, -4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-2.2, 2.2]);
  const transform = useMotionTemplate`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative aspect-[3/4] w-full self-start overflow-hidden border border-white/10 lg:sticky lg:top-28 lg:max-h-[calc(100svh-8rem)]"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        className="absolute inset-[-3%] will-change-transform"
        style={reduce ? undefined : { transform, transformStyle: "preserve-3d" }}
      >
        <Image
          src={pricePanelVisual.src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-contain object-center"
        />
      </motion.div>
      <div className="hero-sheen" aria-hidden />
      <div
        className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-ink/25"
        aria-hidden
      />
    </div>
  );
}
