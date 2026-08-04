"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface CaseStudy {
  clientName: string;
  description: string;
  challenge: string;
  solution: string;
  metrics: string;
  testimonial: string;
  author: string;
}

interface CaseStudySectionProps {
  caseStudy: CaseStudy;
  logos: string[];
  sectionTitle?: string;
  nivelicsTitle?: string;
  nivelicsSubtitle?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function CaseStudySection({ caseStudy, logos, sectionTitle, nivelicsTitle, nivelicsSubtitle }: CaseStudySectionProps) {
  let parsedMetrics: { label: string; value: string }[] = [];
  try {
    parsedMetrics = JSON.parse(caseStudy.metrics);
  } catch {
    // If not JSON, try splitting by comma or use as-is
    parsedMetrics = caseStudy.metrics
      .split(",")
      .map((m) => ({ label: m.trim(), value: "X" }));
  }

  return (
    <section id="casos-de-exito" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4 leading-tight">
            {sectionTitle || <>Resultados reales.{" "}<span className="text-[#00B4D8]">No estimaciones.</span></>}
          </h2>
        </motion.div>

        {/* Main case study card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12 rounded-2xl border border-gray-100 bg-gradient-to-br from-[#F0F7FF] to-white p-8 md:p-12 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A2540] text-white text-sm font-bold">
              {caseStudy.clientName.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0A2540]">{caseStudy.clientName}</h3>
              <p className="text-sm text-[#4A5568]">{caseStudy.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#FF6B35] mb-2">
                El desafio
              </h4>
              <p className="text-[#4A5568] leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#00B4D8] mb-2">
                La solucion
              </h4>
              <p className="text-[#4A5568] leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>
        </motion.div>

        {/* 
          Metrics grid 
          Sección ya integrada, se comenenta mientras se confirma qué información iria aquí  
        */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {parsedMetrics.slice(0, 4).map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-center mb-2">
                <span className="text-4xl md:text-5xl font-bold text-[#0A2540]">
                  {metric.value || "X"}
                </span>
                <ArrowUpRight className="h-5 w-5 text-[#00B4D8] ml-1" />
              </div>
              <p className="text-sm text-[#4A5568]">{metric.label}</p>
            </motion.div>
          ))}
        </div> */}

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto mb-20 rounded-2xl bg-[#0A2540] p-8 md:p-12"
        >
          <Quote className="absolute top-6 left-6 h-10 w-10 text-[#00B4D8]/20" />
          <blockquote className="relative z-10">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed italic mb-6">
              &ldquo;{caseStudy.testimonial}&rdquo;
            </p>
            <footer className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#00B4D8]/20 flex items-center justify-center text-sm font-bold text-[#00B4D8]">
                {caseStudy.author
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{caseStudy.author}</p>
                <p className="text-white/50 text-xs">{caseStudy.clientName}</p>
              </div>
            </footer>
          </blockquote>
        </motion.div>

        {/* Nivelics + Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-[#0A2540] mb-2">
            {nivelicsTitle ?? <>Detras de PAYWL esta{" "}<span className="text-[#00B4D8]">Nivelics</span></>}
          </p>
          <p className="text-sm text-[#4A5568] mb-8 max-w-xl mx-auto">
            {nivelicsSubtitle ?? "14 anos construyendo producto digital para medios de comunicacion en Latinoamerica."}
          </p>

          {/* Logo strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {logos.map((logo, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="text-sm md:text-base font-semibold text-[#4A5568]/40 grayscale select-none tracking-wide uppercase"
              >
                {logo}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
