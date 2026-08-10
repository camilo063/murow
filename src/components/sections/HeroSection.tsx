"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  useCountUp – animates a number from 0 to `end` over `duration` ms */
/* ------------------------------------------------------------------ */
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const start = useCallback(() => setStarted(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [start]);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return { count, ref };
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  badgeText: string;
  trustLogos: string[];
  trustStats: { value: string; label: string }[];
}

/* ------------------------------------------------------------------ */
/*  Animated stat                                                      */
/* ------------------------------------------------------------------ */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const prefix = value.startsWith("+") ? "+" : "";
  const { count, ref } = useCountUp(numericValue, 2200);
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        ref={ref}
        className="text-3xl font-extrabold md:text-4xl"
        style={{ color: "#00B4D8" }}
      >
        {prefix}{count}
      </span>
      <span className="text-sm text-slate-600">{label}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard mock (glassmorphism)                                     */
/* ------------------------------------------------------------------ */
function DashboardMock() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-cyan-400/20 blur-2xl" />

      <div
        className="relative overflow-hidden rounded-2xl border border-white/20 p-6"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Header bar */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs font-medium text-white/50">
            PAYWL Dashboard
          </span>
        </div>

        {/* Stat cards */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          {[
            { label: "Suscriptores", val: "1,247" },
            { label: "Conversion", val: "4.8%" },
            { label: "MRR", val: "$6.2k" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            >
              <p className="text-[10px] text-white/40">{s.label}</p>
              <p className="text-sm font-bold text-white">{s.val}</p>
            </div>
          ))}
        </div>

        {/* Chart bars */}
        <div className="mb-4 flex items-end gap-2">
          {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{
                background:
                  i === 5
                    ? "linear-gradient(to top, #00B4D8, #0077A8)"
                    : "rgba(255,255,255,0.15)",
                height: 0,
              }}
              animate={{ height: `${h}px` }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.6 }}
            />
          ))}
        </div>

        {/* Mini table */}
        <div className="space-y-2">
          {["Paywall Metered", "Paywall Hard", "Registro"].map((r, i) => (
            <div
              key={r}
              className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
            >
              <span>{r}</span>
              <span className="font-semibold text-white">
                {[82, 34, 56][i]}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function HeroSection({
  headline,
  subheadline,
  ctaPrimaryText,
  ctaPrimaryLink,
  ctaSecondaryText,
  ctaSecondaryLink,
  badgeText,
  trustLogos,
  trustStats,
}: HeroSectionProps) {
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section>
      {/* ---- Hero ---- */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0A2540 0%, #0077A8 100%)",
        }}
      >
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-orange-400/10 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 pb-20 pt-28 lg:flex-row lg:gap-16 lg:pb-28 lg:pt-36">
          {/* Left */}
          <div className="flex w-full flex-col items-center text-center lg:w-[60%] lg:items-start lg:text-left">
            <motion.span
              {...fade(0)}
              className="mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
              style={{ background: "#FF6B35" }}
            >
              {badgeText}
            </motion.span>

            <motion.h1
              {...fade(0.1)}
              className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-plus-jakarta-sans, 'Plus Jakarta Sans', sans-serif)" }}
            >
              {headline}
            </motion.h1>

            <motion.p
              {...fade(0.2)}
              className="mb-8 max-w-xl text-lg text-white/70 md:text-xl"
            >
              {subheadline}
            </motion.p>

            <motion.div
              {...fade(0.3)}
              className="flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <Link
                href={ctaPrimaryLink}
                className="inline-flex items-center rounded-lg px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
                style={{ background: "#FF6B35" }}
              >
                {ctaPrimaryText}
              </Link>
              <Link
                href={ctaSecondaryLink}
                className="inline-flex items-center rounded-lg border-2 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                style={{ borderColor: "#00B4D8" }}
              >
                {ctaSecondaryText}
              </Link>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="w-full lg:w-[40%]"
          >
            <DashboardMock />
          </motion.div>
        </div>
      </div>

      {/* ---- Trust bar ---- */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-slate-400">
            Medios que conf&iacute;an en Nivelics
          </p>

          {/* Logos */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-8">
            {trustLogos.map((name) => (
              <span
                key={name}
                className="cursor-default text-lg font-bold text-slate-300 transition-colors duration-300 hover:text-slate-700"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-12 border-t border-slate-100 pt-8">
            {trustStats.map((s) => (
              <AnimatedStat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
