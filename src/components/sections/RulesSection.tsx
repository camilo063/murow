"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/components/ui/icon-map";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Rule {
  ruleNumber: number;
  icon: string;
  name: string;
  visibleName: string;
  description: string;
  useCase: string;
  example: string;
}

interface RulesSectionProps {
  rules: Rule[];
}

/* ------------------------------------------------------------------ */
/*  Decorative toggle (always "on")                                    */
/* ------------------------------------------------------------------ */
function ToggleSwitch() {
  return (
    <motion.div
      className="relative h-6 w-11 rounded-full"
      style={{ background: "#00B4D8" }}
    >
      <motion.div
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
        initial={{ left: 2 }}
        animate={{ left: 22 }}
        transition={{
          duration: 0.4,
          delay: 0.6,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function RulesSection({ rules }: RulesSectionProps) {
  return (
    <section id="reglas" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2
            className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl"
            style={{ color: "#0A2540" }}
          >
            5 tipos de muro. Los activas cuando los necesitas.
          </h2>
          <p className="text-lg" style={{ color: "#4A5568" }}>
            Activa, desactiva y combina reglas en tiempo real desde el panel de
            control, sin c&oacute;digo.
          </p>
        </motion.div>

        {/* Cards grid: 3 + 2 centered */}
        <div className="grid gap-8 md:grid-cols-3">
          {rules.map((rule, i) => {
            const Icon = getIcon(rule.icon);
            /* Center last 2 cards when there are 5 */
            const isLastRow = rules.length === 5 && i >= 3;

            return (
              <motion.div
                key={rule.ruleNumber}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg ${
                  isLastRow && i === 3 ? "md:col-start-1 lg:col-start-1" : ""
                }`}
                style={
                  isLastRow
                    ? {
                        gridColumn:
                          i === 3 ? undefined : undefined,
                      }
                    : undefined
                }
              >
                {/* Top row: number + toggle */}
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="text-4xl font-extrabold"
                    style={{ color: "#E2E8F0" }}
                  >
                    {String(rule.ruleNumber).padStart(2, "0")}
                  </span>
                  <ToggleSwitch />
                </div>

                {/* Icon */}
                <div
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ background: "#F0F7FF" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#00B4D8" }} />
                </div>

                {/* Content */}
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {rule.visibleName}
                </h3>
                <p
                  className="mb-4 text-sm leading-relaxed"
                  style={{ color: "#4A5568" }}
                >
                  {rule.description}
                </p>
                <p
                  className="mb-4 text-sm italic"
                  style={{ color: "#4A5568" }}
                >
                  {rule.useCase}
                </p>

                {/* Example quote */}
                <div
                  className="rounded-lg border-l-[3px] px-4 py-3 text-sm"
                  style={{
                    borderColor: "#FF6B35",
                    background: "#FFF7F2",
                    color: "#4A5568",
                  }}
                >
                  &ldquo;{rule.example}&rdquo;
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* If 5 cards, center the last row on large screens */}
        {rules.length === 5 && (
          <style jsx global>{`
            @media (min-width: 768px) {
              #reglas .grid > :nth-child(4) {
                grid-column-start: 1;
              }
              #reglas .grid > :nth-child(5) {
                grid-column-start: 2;
              }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              /* keep 1-col on small tablets if desired */
            }
          `}</style>
        )}
      </div>
    </section>
  );
}
