import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Integraciones — MUROW Paywall",
  description:
    "MUROW se conecta con tu CMS, pasarelas de pago LATAM, analytics y mas. WordPress, Strapi, Ghost, MercadoPago, Wompi, PSE y decenas mas.",
  openGraph: {
    title: "Integraciones — MUROW Paywall",
    description:
      "Conecta MUROW con las herramientas que tu equipo ya usa.",
    url: "https://murow.io/integraciones",
  },
};

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

export default async function IntegracionesPage() {
  const integrations = await prisma.integration.findMany({
    orderBy: { sortOrder: "asc" },
  });

  // Group by category
  const grouped = integrations.reduce<
    Record<string, typeof integrations>
  >((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://murow.io" },
          { name: "Integraciones", url: "https://murow.io/integraciones" },
        ]}
      />

      {/* Hero */}
      <section
        className="pt-28 pb-16"
        style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl"
            style={{ color: "#0A2540" }}
          >
            Se conecta con lo que ya usas.{" "}
            <span style={{ color: "#00B4D8" }}>Y con lo que usaras manana.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg" style={{ color: "#4A5568" }}>
            MUROW no te obliga a cambiar tu stack. Se integra con las herramientas que
            tu equipo ya conoce y domina.
          </p>
        </div>
      </section>

      {/* Integrations by category */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category}>
                <h2
                  className="mb-6 flex items-center gap-3 text-xl font-bold"
                  style={{ color: "#0A2540" }}
                >
                  <span
                    className="h-px w-8"
                    style={{ background: "#00B4D8" }}
                  />
                  {category}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {grouped[category].map((integration) => (
                    <div
                      key={integration.id}
                      className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-[#00B4D8]/30 hover:shadow-md"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h3
                          className="text-base font-semibold transition group-hover:text-[#0077A8]"
                          style={{ color: "#0A2540" }}
                        >
                          {integration.name}
                        </h3>
                        <StatusBadge status={integration.status} />
                      </div>
                      {integration.details && (
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "#4A5568" }}
                        >
                          {integration.details}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA for custom integration */}
          <div className="mt-20 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm md:p-12">
            <h3
              className="mb-2 text-xl font-bold"
              style={{ color: "#0A2540" }}
            >
              No ves la integracion que necesitas?
            </h3>
            <p className="mx-auto mb-6 max-w-lg" style={{ color: "#4A5568" }}>
              Nuestro equipo evalua cada solicitud y prioriza las integraciones mas
              demandadas por la comunidad.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition hover:brightness-110"
              style={{ background: "#FF6B35" }}
            >
              Solicitar integracion
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
