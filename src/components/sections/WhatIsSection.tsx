"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getIcon } from "@/components/ui/icon-map";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Pillar {
  icon: string;
  title: string;
  description: string;
  impactNote: string;
}

interface WhatIsSectionProps {
  pillars: Pillar[];
}

/* ------------------------------------------------------------------ */
/*  Animated arrow SVG (horizontal)                                    */
/* ------------------------------------------------------------------ */
function ArrowH({ label }: { label: string }) {
  const ref = useRef<SVGSVGElement>(null);
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
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        ref={ref}
        width="120"
        height="24"
        viewBox="0 0 120 24"
        className="hidden lg:block"
      >
        <line
          x1="0"
          y1="12"
          x2="105"
          y2="12"
          stroke="#00B4D8"
          strokeWidth="2"
          strokeDasharray="105"
          strokeDashoffset={draw ? 0 : 105}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        <polygon
          points="105,6 120,12 105,18"
          fill="#00B4D8"
          opacity={draw ? 1 : 0}
          style={{ transition: "opacity 0.3s ease 0.7s" }}
        />
      </svg>
      {/* Vertical arrow for mobile */}
      <svg
        width="24"
        height="60"
        viewBox="0 0 24 60"
        className="block lg:hidden"
      >
        <line
          x1="12"
          y1="0"
          x2="12"
          y2="48"
          stroke="#00B4D8"
          strokeWidth="2"
          strokeDasharray="48"
          strokeDashoffset={draw ? 0 : 48}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
        <polygon
          points="6,48 12,60 18,48"
          fill="#00B4D8"
          opacity={draw ? 1 : 0}
          style={{ transition: "opacity 0.3s ease 0.7s" }}
        />
      </svg>
      <span
        className="whitespace-nowrap text-[11px] font-medium"
        style={{ color: "#0077A8" }}
      >
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Architecture block                                                 */
/* ------------------------------------------------------------------ */
function ArchBlock({
  title,
  highlighted,
}: {
  title: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl border-2 px-6 py-5 text-center text-sm font-bold shadow-sm transition md:text-base ${
        highlighted
          ? "scale-105 border-cyan-500 bg-white shadow-lg"
          : "border-slate-200 bg-white"
      }`}
      style={highlighted ? { color: "#0A2540" } : { color: "#4A5568" }}
    >
      {title}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function WhatIsSection({ pillars }: WhatIsSectionProps) {
  return (
    <section id="que-es-murow" className="py-20 md:py-28" style={{ background: "#F0F7FF" }}>
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
            MUROW: el motor que vive fuera de tu CMS y trabaja para tu audiencia
          </h2>
          <p className="text-lg" style={{ color: "#4A5568" }}>
            Una arquitectura desacoplada que se integra con cualquier CMS o
            sitio web mediante API REST, sin modificar tu infraestructura
            existente.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-20 flex max-w-4xl flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-0"
        >
          <ArchBlock title="Tu CMS / Sitio Web" />
          <ArrowH label="API REST < 50ms" />
          <ArchBlock title="MUROW Engine" highlighted />
          <ArrowH label="Webhook" />
          <ArchBlock title="Tu Pasarela de Pagos" />
        </motion.div>

        {/* Pillar cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = getIcon(p.icon);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-xl bg-white p-8 shadow-sm"
              >
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ background: "#E0F4FB" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "#0077A8" }} />
                </div>
                <h3
                  className="mb-3 text-lg font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {p.title}
                </h3>
                <p
                  className="mb-4 leading-relaxed"
                  style={{ color: "#4A5568" }}
                >
                  {p.description}
                </p>
                <div
                  className="rounded-lg border-l-[3px] px-4 py-3 text-sm font-medium"
                  style={{
                    borderColor: "#00B4D8",
                    background: "#F0F7FF",
                    color: "#0077A8",
                  }}
                >
                  {p.impactNote}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
