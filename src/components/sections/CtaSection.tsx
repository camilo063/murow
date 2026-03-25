"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

interface CtaSectionProps {
  headline?: string;
  subheadline?: string;
  ctaPrimaryText?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryText?: string;
  ctaSecondaryLink?: string;
  disclaimerText?: string;
}

export default function CtaSection({
  headline = "Tu medio merece monetizar sin depender de nadie.",
  subheadline = "Unete a los medios digitales latinoamericanos que tomaron el control de sus suscripciones.",
  ctaPrimaryText = "Quiero el piloto gratuito de 3 meses",
  ctaPrimaryLink = "/piloto",
  ctaSecondaryText = "Hablar con un experto",
  ctaSecondaryLink = "https://calendly.com/paywl/demo",
  disclaimerText = "Sin tarjeta de credito. Sin compromisos. Configura tu medio en menos de 48 horas y empieza a validar resultados desde la primera semana.",
}: CtaSectionProps = {}) {
  return (
    <section
      id="cta-final"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: "linear-gradient(135deg, #0A2540 0%, #0077A8 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#00B4D8]/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#FF6B35]/10 blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-white/5 blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            {headline}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {subheadline}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link
              href={ctaPrimaryLink}
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#FF6B35]/30 hover:bg-[#e55a2a] hover:shadow-[#FF6B35]/40 transition-all duration-200 hover:scale-[1.02]"
            >
              {ctaPrimaryText}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={ctaSecondaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 hover:border-white/50 transition-all duration-200"
            >
              <Calendar className="h-5 w-5" />
              {ctaSecondaryText}
            </a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-sm text-white/40 max-w-lg mx-auto"
          >
            {disclaimerText}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
