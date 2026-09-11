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
import { heroVisual } from "@/content/hero";
import { MapsButton } from "@/components/MapsButton";

type Props = {
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  availability: string;
  location: string;
  directions: string;
  seePrices: string;
  imageAlt: string;
  facts: string[];
};

export function HeroStage({
  kicker,
  titleLine1,
  titleLine2,
  availability,
  location,
  directions,
  seePrices,
  imageAlt,
  facts,
}: Props) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 22, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 80, damping: 22, mass: 0.4 });
  const x = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const y = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [2.4, -2.4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-1.4, 1.4]);
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    px.set(0);
    py.set(0);
  }

  const enter = reduce
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      id="hero"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate min-h-dvh overflow-hidden bg-ink"
    >
      <div className="absolute inset-0" style={{ perspective: "1400px" }}>
        <motion.div
          className="absolute inset-[-4%] will-change-transform"
          style={reduce ? undefined : { transform, transformStyle: "preserve-3d" }}
        >
          <Image
            src={heroVisual.src}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[78%_58%] sm:object-[72%_55%] lg:object-[70%_52%]"
          />
        </motion.div>
        <div className="hero-sheen hidden lg:block" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-ink/5 sm:via-ink/45 lg:via-ink/25 lg:to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-ink via-ink/70 to-transparent lg:h-[38%] lg:via-ink/40"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-ink/80 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1440px] items-end px-4 pb-10 pt-24 sm:px-6 sm:pb-14 lg:items-center lg:px-8 lg:pt-16 lg:pb-16">
        <div className="w-full max-w-[44rem]">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: reduce ? 0 : 0.08 }}
            className="text-[11px] tracking-[0.32em] text-cyan uppercase"
          >
            {kicker}
          </motion.p>
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: reduce ? 0 : 0.16 }}
            className="mt-4 font-heading text-[2.35rem] leading-[0.92] font-bold tracking-[-0.05em] text-foam uppercase sm:text-5xl lg:text-[3.85rem] xl:text-[4.5rem]"
          >
            <span className="block sm:whitespace-nowrap">{titleLine1}</span>
            <span className="mt-1 block text-cyan sm:whitespace-nowrap [text-shadow:0_0_32px_rgb(0_182_248_/_0.35)]">
              {titleLine2}
            </span>
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: reduce ? 0 : 0.28 }}
            className="mt-5 inline-flex items-center gap-3 text-[12px] tracking-[0.22em] text-foam uppercase sm:text-[13px]"
          >
            <span className="h-px w-8 bg-cyan" aria-hidden />
            {availability}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...enter, delay: reduce ? 0 : 0.36 }}
            className="mt-3 max-w-sm text-[15px] text-steel"
          >
            {location}
          </motion.p>
          {facts.length ? (
            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...enter, delay: reduce ? 0 : 0.4 }}
              className="mt-5 flex flex-col gap-1.5 text-[13px] tracking-[0.08em] text-steel uppercase"
            >
              {facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 bg-cyan" aria-hidden />
                  {fact}
                </li>
              ))}
            </motion.ul>
          ) : null}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: reduce ? 0 : 0.42 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MapsButton label={directions} variant="primary" className="min-h-12 px-7" />
            <a
              href="#prices"
              className="inline-flex min-h-12 items-center justify-center border border-steel/35 px-7 text-[13px] font-medium tracking-[0.14em] text-foam uppercase transition-colors duration-200 hover:border-cyan hover:text-cyan"
            >
              {seePrices}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
