"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Plan {
  name: string;
  slug: string;
  priceMonthly: number;
  priceAnnual: number;
  focus: string;
  targetAudience: string;
  isRecommended: boolean;
  features: string;
}

interface PricingSectionProps {
  plans: Plan[];
  sectionTitle?: string;
  sectionSubtitle?: string;
  pilotTitle?: string;
  pilotBullets?: string[];
  pilotCtaText?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function PricingSection({ plans, sectionTitle, sectionSubtitle, pilotTitle, pilotBullets, pilotCtaText }: PricingSectionProps) {
  const [annual, setAnnual] = useState(false);

  return (
    <section
      id="precios"
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
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <h2
            className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl"
            style={{ color: "#0A2540" }}
          >
            {sectionTitle || "Precios claros. Sin sorpresas. Sin cláusulas ocultas."}
          </h2>
          <p className="text-lg" style={{ color: "#4A5568" }}>
            {sectionSubtitle || "Contrato mínimo de 12 meses. Todos los planes incluyen soporte, implementación y actualizaciones."}
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="mx-auto mb-12 flex items-center justify-center gap-4">
          <span
            className={`text-sm font-semibold transition ${
              !annual ? "text-slate-800" : "text-slate-400"
            }`}
          >
            Mensual
          </span>
          <button
            type="button"
            aria-label="Toggle annual billing"
            onClick={() => setAnnual(!annual)}
            className="relative h-7 w-14 rounded-full transition-colors"
            style={{ background: annual ? "#00B4D8" : "#CBD5E1" }}
          >
            <span
              className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all"
              style={{ left: annual ? 30 : 2 }}
            />
          </button>
          <span
            className={`text-sm font-semibold transition ${
              annual ? "text-slate-800" : "text-slate-400"
            }`}
          >
            Anual
          </span>
          {annual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-1 rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ background: "#FF6B35" }}
            >
              -20%
            </motion.span>
          )}
        </div>

        {/* Plan cards */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {plans.map((plan, i) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly;
            const features = plan.features
              .split("\n")
              .map((f) => f.trim())
              .filter(Boolean);

            return (
              <motion.div
                key={plan.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative flex flex-col rounded-2xl bg-white p-8 shadow-sm ${
                  plan.isRecommended
                    ? "ring-2 shadow-lg"
                    : "border border-slate-100"
                }`}
                style={
                  plan.isRecommended
                    ? { boxShadow: "0 0 0 2px #00B4D8" }
                    : undefined
                }
              >
                {/* Badge */}
                {plan.isRecommended && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                    style={{ background: "#00B4D8" }}
                  >
                    M&aacute;s popular
                  </span>
                )}

                <h3
                  className="mb-1 text-xl font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="mb-6 text-sm"
                  style={{ color: "#4A5568" }}
                >
                  {plan.targetAudience}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={annual ? "a" : "m"}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="text-4xl font-extrabold"
                      style={{ color: "#0A2540" }}
                    >
                      ${price.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                  <span className="ml-1 text-sm" style={{ color: "#4A5568" }}>
                    USD/mes
                  </span>
                </div>

                <p
                  className="mb-6 text-sm font-medium"
                  style={{ color: "#0077A8" }}
                >
                  {plan.focus}
                </p>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0"
                        style={{ color: "#00B4D8" }}
                      />
                      <span style={{ color: "#4A5568" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/piloto"
                  className={`block rounded-lg py-3 text-center text-sm font-semibold transition hover:brightness-110 ${
                    plan.isRecommended ? "text-white" : "text-white"
                  }`}
                  style={{
                    background: plan.isRecommended ? "#FF6B35" : "#0A2540",
                  }}
                >
                  Comenzar piloto
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Pilot banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-16 max-w-4xl rounded-2xl p-8 text-white md:p-10"
          style={{
            background: "linear-gradient(135deg, #0A2540 0%, #0077A8 100%)",
          }}
        >
          <h3 className="mb-4 text-2xl font-bold text-white">
            {pilotTitle ?? "Programa Piloto de 30 días"}
          </h3>
          <ul className="mb-6 space-y-2">
            {(pilotBullets ?? [
              "Implementacion completa sin costo adicional",
              "Soporte dedicado durante todo el piloto",
              "Cancela si no ves resultados — sin penalidad",
            ]).map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4" style={{ color: "#00B4D8" }} />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/piloto"
            className="inline-flex items-center rounded-lg px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            style={{ background: "#FF6B35" }}
          >
            {pilotCtaText ?? "Solicitar piloto gratuito"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
