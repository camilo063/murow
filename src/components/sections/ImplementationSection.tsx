"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Step {
  stepNumber: number;
  title: string;
  timeframe: string;
  activities: string[];
  deliverables: string[];
}

interface ImplementationSectionProps {
  steps: Step[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

/* ------------------------------------------------------------------ */
/*  Timeline line that draws on scroll                                 */
/* ------------------------------------------------------------------ */
function TimelineLine({ vertical }: { vertical?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDraw(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (vertical) {
    return (
      <div ref={ref} className="mx-auto h-12 w-0.5 overflow-hidden bg-slate-200">
        <div
          className="h-full w-full transition-transform duration-700"
          style={{
            background: "#00B4D8",
            transform: draw ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="hidden h-0.5 flex-1 overflow-hidden bg-slate-200 lg:block"
    >
      <div
        className="h-full w-full transition-transform duration-700"
        style={{
          background: "#00B4D8",
          transform: draw ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ImplementationSection({
  steps,
  sectionTitle,
  sectionSubtitle,
}: ImplementationSectionProps) {
  return (
    <section
      id="como-funciona"
      className="py-20 md:py-28"
      style={{ background: "#F0F7FF" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2
            className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl"
            style={{ color: "#0A2540" }}
          >
            {sectionTitle || "En menos de 2 meses estás operando. Sin tocar tu CMS."}
          </h2>
          <p className="text-lg" style={{ color: "#4A5568" }}>
            {sectionSubtitle || "Nivelics se encarga de la implementación completa. Tu equipo solo necesita responder unas preguntas y aprobar."}
          </p>
        </motion.div>

        {/* ---- Desktop: Horizontal timeline ---- */}
        <div className="hidden lg:block">
          {/* Circles + lines */}
          <div className="mb-8 flex items-center">
            {steps.map((step, i) => (
              <div key={step.stepNumber} className="contents">
                {/* Circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-lg font-extrabold text-white"
                  style={{ background: "#00B4D8" }}
                >
                  {step.stepNumber}
                </motion.div>
                {/* Line */}
                {i < steps.length - 1 && <TimelineLine />}
              </div>
            ))}
          </div>

          {/* Cards row */}
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <h3
                  className="mb-1 text-lg font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {step.title}
                </h3>
                <span
                  className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: "#E0F4FB", color: "#0077A8" }}
                >
                  {step.timeframe}
                </span>

                <div className="mb-4">
                  <p
                    className="mb-1 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#4A5568" }}
                  >
                    Actividades
                  </p>
                  <ul className="space-y-1">
                    {step.activities.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-1.5 text-sm"
                        style={{ color: "#4A5568" }}
                      >
                        <span style={{ color: "#00B4D8" }}>&#8226;</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p
                    className="mb-1 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#4A5568" }}
                  >
                    Entregables
                  </p>
                  <ul className="space-y-1">
                    {step.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-1.5 text-sm"
                        style={{ color: "#4A5568" }}
                      >
                        <span style={{ color: "#FF6B35" }}>&#10003;</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---- Mobile: Vertical timeline ---- */}
        <div className="lg:hidden">
          {steps.map((step, i) => (
            <div key={step.stepNumber}>
              {/* Circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-extrabold text-white"
                style={{ background: "#00B4D8" }}
              >
                {step.stepNumber}
              </motion.div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                className="mt-4 rounded-xl bg-white p-6 shadow-sm"
              >
                <h3
                  className="mb-1 text-lg font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {step.title}
                </h3>
                <span
                  className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ background: "#E0F4FB", color: "#0077A8" }}
                >
                  {step.timeframe}
                </span>

                <div className="mb-4">
                  <p
                    className="mb-1 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#4A5568" }}
                  >
                    Actividades
                  </p>
                  <ul className="space-y-1">
                    {step.activities.map((a) => (
                      <li
                        key={a}
                        className="flex items-start gap-1.5 text-sm"
                        style={{ color: "#4A5568" }}
                      >
                        <span style={{ color: "#00B4D8" }}>&#8226;</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p
                    className="mb-1 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#4A5568" }}
                  >
                    Entregables
                  </p>
                  <ul className="space-y-1">
                    {step.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-1.5 text-sm"
                        style={{ color: "#4A5568" }}
                      >
                        <span style={{ color: "#FF6B35" }}>&#10003;</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Connecting line */}
              {i < steps.length - 1 && <TimelineLine vertical />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
