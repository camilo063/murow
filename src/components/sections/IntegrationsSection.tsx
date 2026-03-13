"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plug } from "lucide-react";
import Link from "next/link";

interface Integration {
  category: string;
  name: string;
  status: string;
  details: string;
}

interface IntegrationsSectionProps {
  integrations: Integration[];
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase();

  if (normalized === "DISPONIBLE") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 border border-green-200">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        DISPONIBLE
      </span>
    );
  }

  if (normalized === "PROXIMAMENTE" || normalized === "PRÓXIMAMENTE") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-0.5 text-[11px] font-semibold text-yellow-700 border border-yellow-200">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
        PROXIMAMENTE
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2.5 py-0.5 text-[11px] font-semibold text-gray-500 border border-gray-200">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      ROADMAP
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function IntegrationsSection({ integrations }: IntegrationsSectionProps) {
  // Group by category
  const grouped = integrations.reduce<Record<string, Integration[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section id="integraciones" className="bg-[#F0F7FF] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-[#00B4D8]/10 px-4 py-1.5 text-sm font-medium text-[#0077A8] mb-6">
            <Plug className="h-4 w-4" />
            Integraciones
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4 leading-tight">
            Se conecta con lo que ya usas.{" "}
            <span className="text-[#00B4D8]">Y con lo que usaras manana.</span>
          </h2>
          <p className="text-lg text-[#4A5568] leading-relaxed">
            MUROW no te obliga a cambiar tu stack. Se integra con las herramientas que tu equipo ya
            conoce y domina, para que la transicion sea invisible y el impacto inmediato.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-12 mb-16"
        >
          {categories.map((category) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="text-xl font-bold text-[#0A2540] mb-5 flex items-center gap-3">
                <span className="h-px flex-1 max-w-[2rem] bg-[#00B4D8]" />
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[category].map((integration, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: j * 0.05 }}
                    className="group rounded-xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-[#00B4D8]/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h4 className="text-base font-semibold text-[#0A2540] group-hover:text-[#0077A8] transition-colors">
                        {integration.name}
                      </h4>
                      <StatusBadge status={integration.status} />
                    </div>
                    <p className="text-sm text-[#4A5568] leading-relaxed">{integration.details}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center rounded-2xl bg-white border border-gray-100 p-8 md:p-12 shadow-sm"
        >
          <p className="text-lg font-semibold text-[#0A2540] mb-2">
            No ves la integracion que necesitas?
          </p>
          <p className="text-[#4A5568] mb-6 max-w-lg mx-auto">
            Nuestro equipo evalua cada solicitud y prioriza las integraciones mas demandadas por la comunidad.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF6B35] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#FF6B35]/25 hover:bg-[#e55a2a] transition-colors duration-200"
          >
            Solicitar integracion
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
