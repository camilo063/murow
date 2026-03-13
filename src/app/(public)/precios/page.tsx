import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PricingSection from "@/components/sections/PricingSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import ROICalculator from "@/components/forms/ROICalculator";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Precios — PAYWL Paywall para Medios Digitales",
  description:
    "Planes claros desde $450 USD/mes. Sin sorpresas, sin clausulas ocultas. Incluye implementacion, soporte y actualizaciones. Piloto gratuito de 90 dias.",
  openGraph: {
    title: "Precios — PAYWL Paywall para Medios Digitales",
    description:
      "Planes claros desde $450 USD/mes. Piloto gratuito de 90 dias.",
    url: "https://paywl.io/precios",
  },
};

export default async function PreciosPage() {
  const [plans, competitors] = await Promise.all([
    prisma.pricingPlan.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.competitor.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://paywl.io" },
          { name: "Precios", url: "https://paywl.io/precios" },
        ]}
      />

      {/* Hero */}
      <section
        className="pt-28 pb-8"
        style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl"
            style={{ color: "#0A2540" }}
          >
            Invierte en crecer, no en{" "}
            <span style={{ color: "#00B4D8" }}>infraestructura</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg" style={{ color: "#4A5568" }}>
            Todos los planes incluyen implementacion completa, soporte en espanol y
            actualizaciones. Contrato minimo de 12 meses.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      {plans.length > 0 && (
        <PricingSection
          plans={plans.map((p) => ({
            name: p.name,
            slug: p.slug,
            priceMonthly: p.priceMonthly,
            priceAnnual: p.priceAnnual,
            focus: p.focus,
            targetAudience: p.targetAudience,
            isRecommended: p.isRecommended,
            features: p.features,
          }))}
        />
      )}

      {/* ROI Calculator */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <h2
              className="mb-4 text-3xl font-extrabold md:text-4xl"
              style={{ color: "#0A2540" }}
            >
              Calcula tu retorno
            </h2>
            <p className="text-lg" style={{ color: "#4A5568" }}>
              Ajusta los parametros para ver cuanto puede generar tu medio con PAYWL.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Comparison Table */}
      {competitors.length > 0 && (
        <ComparisonSection
          competitors={competitors.map((c) => ({
            name: c.name,
            setup: c.setup,
            monthly: c.monthly,
            localPayment: c.localPayment,
            spanishSupport: c.spanishSupport,
            ownData: c.ownData,
            implementation: c.implementation,
            isHighlighted: c.isHighlighted,
          }))}
        />
      )}

      {/* Bottom CTA */}
      <section
        className="py-20 md:py-28"
        style={{
          background: "linear-gradient(135deg, #0A2540 0%, #0077A8 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center text-white">
          <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
            Listo para monetizar tu contenido?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-gray-300">
            Comienza con un piloto gratuito de 90 dias. Sin riesgo, sin letra pequena.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/piloto"
              className="inline-flex items-center rounded-lg px-8 py-4 text-base font-bold text-white transition hover:brightness-110"
              style={{ background: "#FF6B35" }}
            >
              Solicitar piloto gratuito
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Hablar con ventas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
