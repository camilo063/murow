"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/components/ui/icon-map";

interface PainCard {
  icon: string;
  headline: string;
  description: string;
}

interface PainSectionProps {
  cards: PainCard[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export default function PainSection({ cards, sectionTitle, sectionSubtitle }: PainSectionProps) {
  return (
    <section id="problema" className="bg-white py-20 md:py-28">
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
            {sectionTitle || "\u00BFPor qu\u00E9 los medios en LATAM pierden suscriptores antes de empezar?"}
          </h2>
          <p className="text-lg" style={{ color: "#4A5568" }}>
            {sectionSubtitle || "Las soluciones globales no fueron dise\u00F1adas para el mercado latinoamericano."}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, i) => {
            const Icon = getIcon(card.icon);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-l-[3px] hover:shadow-lg"
                style={{
                  // @ts-expect-error CSS custom property
                  "--tw-border-l-color": "#00B4D8",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderLeftColor =
                    "#00B4D8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderLeftColor = "";
                }}
              >
                <div
                  className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{ background: "#F0F7FF" }}
                >
                  <Icon className="h-6 w-6" style={{ color: "#00B4D8" }} />
                </div>
                <h3
                  className="mb-3 text-xl font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {card.headline}
                </h3>
                <p className="leading-relaxed" style={{ color: "#4A5568" }}>
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
