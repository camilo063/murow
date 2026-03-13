"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface Differentiator {
  title: string;
  points: string;
}

interface WhyMurowSectionProps {
  differentiators: Differentiator[];
}

const exitStrategyItems = [
  {
    title: "Entrega de Data",
    description:
      "Todos tus datos de suscriptores, transacciones y metricas exportados en formatos estandar que puedes llevar a cualquier plataforma.",
  },
  {
    title: "Desconexion Segura",
    description:
      "Proceso guiado de migracion para que no pierdas ni un solo suscriptor durante la transicion.",
  },
  {
    title: "Cero Deuda",
    description:
      "Sin contratos de permanencia, sin penalizaciones. Tu decides cuando y como te vas.",
  },
  {
    title: "Documentacion de salida",
    description:
      "Manuales y guias tecnicas completas para que tu equipo pueda replicar todo lo construido.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function WhyMurowSection({ differentiators }: WhyMurowSectionProps) {
  return (
    <section id="por-que-murow" className="bg-[#0A2540] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Construido por quienes llevan 14 anos haciendo producto digital para medios en LATAM.
          </h2>
          <p className="text-lg text-[#00B4D8]/80 leading-relaxed">
            No somos una startup experimentando con medios. Somos el equipo que ya lo hizo, y ahora
            lo empaqueto para que tu no tengas que empezar de cero.
          </p>
        </motion.div>

        {/* Differentiator columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {differentiators.slice(0, 3).map((diff, i) => {
            let points: string[] = [];
            try {
              points = JSON.parse(diff.points);
            } catch {
              points = diff.points.split(",").map((p) => p.trim());
            }

            return (
              <motion.div key={i} variants={itemVariants} className="flex flex-col">
                <h3 className="text-xl font-bold text-white mb-5">{diff.title}</h3>
                <ul className="space-y-3 flex-1">
                  {points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#00B4D8] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70 leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Exit Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border-2 border-[#00B4D8]/40 p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Exit Strategy{" "}
              <span className="text-[#00B4D8]">— El Compromiso de Transparencia</span>
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Creemos que la mejor forma de retenerte es demostrando valor, no atandote con contratos.
              Por eso diseñamos un plan de salida claro desde el dia uno.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {exitStrategyItems.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4 rounded-xl bg-white/5 p-5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-white/50 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
