"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingDown,
  FileText,
  Globe,
  Users,
  DollarSign,
  Activity,
  FileBarChart,
} from "lucide-react";

interface Metric {
  title: string;
  description: string;
}

interface AnalyticsSectionProps {
  metrics: Metric[];
}

const metricIcons = [BarChart3, TrendingDown, FileText, Globe, Users, DollarSign];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#0A2540] p-6 shadow-2xl overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#00B4D8]/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#FF6B35]/10 blur-3xl" />

      {/* Top bar */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/50">
          <Activity className="w-3 h-3 text-[#00B4D8]" />
          <span>MUROW Dashboard — En vivo</span>
        </div>
        <div className="text-xs text-white/30">Mar 2026</div>
      </div>

      {/* Metric cards row */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Suscriptores activos", value: "12,847", change: "+18%", color: "text-green-400" },
          { label: "MRR", value: "$34.2K", change: "+24%", color: "text-green-400" },
          { label: "Churn rate", value: "2.1%", change: "-0.8%", color: "text-[#00B4D8]" },
          { label: "Articulos publicados", value: "342", change: "+12%", color: "text-green-400" },
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4"
          >
            <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">
              {card.label}
            </p>
            <p className="text-xl font-bold text-white">{card.value}</p>
            <p className={`text-xs font-medium mt-1 ${card.color}`}>{card.change}</p>
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="relative rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium text-white/60">Ingresos por suscripcion (ultimos 12 meses)</p>
          <div className="flex gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#00B4D8]/20 text-[#00B4D8]">Mensual</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/40">Anual</span>
          </div>
        </div>
        {/* Bar chart placeholder */}
        <div className="flex items-end gap-1.5 h-32">
          {[35, 42, 38, 55, 48, 62, 58, 72, 68, 78, 85, 92].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm transition-all duration-300"
                style={{
                  height: `${h}%`,
                  background: i >= 10
                    ? "linear-gradient(to top, #00B4D8, #00B4D8cc)"
                    : "linear-gradient(to top, #00B4D880, #00B4D840)",
                }}
              />
              <span className="text-[8px] text-white/30">
                {["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="relative grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4">
          <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Top contenido</p>
          {["Investigacion: Crisis climatica...", "Entrevista exclusiva: Min...", "Opinion: Reforma fiscal..."].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-white/5 last:border-0">
                <span className="text-xs text-[#00B4D8] font-bold">#{i + 1}</span>
                <span className="text-xs text-white/60 truncate">{item}</span>
              </div>
            )
          )}
        </div>
        <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4">
          <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">Conversion funnel</p>
          {[
            { label: "Visitantes", w: "100%", val: "48.2K" },
            { label: "Registrados", w: "60%", val: "28.9K" },
            { label: "Trial", w: "25%", val: "12.1K" },
            { label: "Pagos", w: "12%", val: "5.8K" },
          ].map((step, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between text-[10px] text-white/50 mb-0.5">
                <span>{step.label}</span>
                <span>{step.val}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00B4D8] to-[#00B4D8]/60"
                  style={{ width: step.w }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsSection({ metrics }: AnalyticsSectionProps) {
  return (
    <section id="analytics" className="bg-white py-20 md:py-28">
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
            Sabes exactamente que funciona y que no.{" "}
            <span className="text-[#00B4D8]">En tiempo real.</span>
          </h2>
          <p className="text-lg text-[#4A5568] leading-relaxed">
            El dashboard de MUROW no es solo un panel de metricas. Es un sistema de inteligencia
            editorial que te dice que contenido genera suscripciones, que formatos convierten mejor
            y donde esta tu proxima oportunidad de crecimiento.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-20"
        >
          <DashboardMockup />
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {metrics.slice(0, 6).map((metric, i) => {
            const Icon = metricIcons[i] || BarChart3;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#00B4D8]/30 transition-all duration-300"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F7FF] text-[#00B4D8] group-hover:bg-[#00B4D8] group-hover:text-white transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0A2540] mb-2">{metric.title}</h3>
                <p className="text-sm text-[#4A5568] leading-relaxed">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Monthly reports */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#0A2540] mb-3">
            Reportes mensuales que hablan tu idioma
          </h3>
          <p className="text-[#4A5568] max-w-2xl mx-auto">
            Cada mes recibes reportes accionables que traducen datos complejos en decisiones claras para tu equipo editorial y comercial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: FileBarChart,
              title: "Reporte de Performance",
              description:
                "Analisis detallado de crecimiento de suscriptores, ingresos recurrentes, contenido que mejor convierte, y recomendaciones editoriales basadas en datos reales de tu audiencia.",
              color: "from-[#00B4D8]/10 to-[#0077A8]/10",
              iconBg: "bg-[#00B4D8]",
            },
            {
              icon: TrendingDown,
              title: "Reporte de Interrupcion",
              description:
                "Identificacion temprana de senales de churn, segmentos en riesgo, contenido que no retiene, y estrategias probadas de recuperacion con playbooks listos para ejecutar.",
              color: "from-[#FF6B35]/10 to-[#FF6B35]/5",
              iconBg: "bg-[#FF6B35]",
            },
          ].map((report, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`rounded-2xl bg-gradient-to-br ${report.color} border border-gray-100 p-8`}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${report.iconBg} text-white`}
              >
                <report.icon className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-[#0A2540] mb-3">{report.title}</h4>
              <p className="text-sm text-[#4A5568] leading-relaxed">{report.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
