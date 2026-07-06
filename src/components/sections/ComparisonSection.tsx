"use client";

import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Competitor {
  name: string;
  setup: string;
  monthly: string;
  localPayment: string;
  spanishSupport: string;
  ownData: string;
  implementation: string;
  isHighlighted: boolean;
}

interface ComparisonSectionProps {
  competitors: Competitor[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

/* ------------------------------------------------------------------ */
/*  Status icon helper                                                 */
/* ------------------------------------------------------------------ */
function StatusIcon({ value }: { value: string }) {
  const v = value.toLowerCase().trim();
  if (v === "si" || v === "yes" || v === "true" || v === "check") {
    return <Check className="mx-auto h-5 w-5" style={{ color: "#00B4D8" }} />;
  }
  if (v === "no" || v === "false" || v === "x") {
    return <X className="mx-auto h-5 w-5 text-red-400" />;
  }
  if (v === "parcial" || v === "partial" || v === "warning") {
    return <AlertTriangle className="mx-auto h-5 w-5 text-amber-400" />;
  }
  return <span className="text-sm">{value}</span>;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function ComparisonSection({
  competitors,
  sectionTitle,
  sectionSubtitle,
}: ComparisonSectionProps) {
  const columns = [
    { key: "name", label: "Proveedor" },
    { key: "setup", label: "Setup" },
    { key: "monthly", label: "Mensualidad" },
    { key: "localPayment", label: "Pasarela LATAM" },
    { key: "spanishSupport", label: "Soporte ES" },
    { key: "ownData", label: "Datos propios" },
    { key: "implementation", label: "Implementacion" },
  ] as const;

  const statusColumns = [
    "localPayment",
    "spanishSupport",
    "ownData",
  ] as const;

  return (
    <section id="comparativa" className="bg-white py-20 md:py-28">
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
            {sectionTitle || "¿Por qué PAYWL y no otros 132dddd?"}
          </h2>
          <p className="text-lg" style={{ color: "#4A5568" }}>
            {sectionSubtitle || "Hicimos la investigación por ti."}
          </p>
        </motion.div>

        {/* Table wrapper */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr style={{ background: "#F0F7FF" }}>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="whitespace-nowrap px-5 py-4 text-left text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#4A5568" }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp, i) => {
                const isHL = comp.isHighlighted;
                return (
                  <motion.tr
                    key={comp.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`border-t transition ${
                      isHL ? "text-white" : "text-slate-700"
                    }`}
                    style={
                      isHL
                        ? { background: "#0A2540" }
                        : { background: i % 2 === 0 ? "#FFFFFF" : "#FAFBFC" }
                    }
                  >
                    {columns.map((col) => {
                      const val =
                        comp[col.key as keyof Competitor]?.toString() ?? "";
                      const isStatus = (
                        statusColumns as readonly string[]
                      ).includes(col.key);

                      return (
                        <td
                          key={col.key}
                          className={`whitespace-nowrap px-5 py-4 ${
                            col.key === "name" ? "font-bold" : ""
                          }`}
                        >
                          {isStatus ? <StatusIcon value={val} /> : val}
                        </td>
                      );
                    })}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
