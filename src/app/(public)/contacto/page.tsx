import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import ContactoForm from "@/components/forms/ContactoForm";

export const metadata: Metadata = {
  title: "Contacto — PAYWL by Nivelics SAS",
  description:
    "Contacta al equipo de PAYWL. Resolvemos tus dudas sobre paywall, integraciones, precios y programa piloto gratuito.",
  openGraph: {
    title: "Contacto — PAYWL",
    description:
      "Contacta al equipo de PAYWL para resolver tus dudas.",
    url: "https://paywl.io/contacto",
  },
};

export default async function ContactoPage() {
  const config = await prisma.contactoConfig.findFirst();

  const headline = config?.headline || "Hablemos";
  const subheadline = config?.subheadline || "Tienes preguntas sobre PAYWL? Nuestro equipo esta listo para ayudarte.";
  const email = config?.email || "contacto@nivelics.com";
  const calendlyUrl = config?.calendlyUrl || "https://calendly.com";
  const location = config?.location || "Nivelics SAS\nColombia · USA";

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://paywl.io" },
          { name: "Contacto", url: "https://paywl.io/contacto" },
        ]}
      />

      <section
        className="pt-28 pb-20"
        style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h1
              className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl"
              style={{ color: "#0A2540" }}
            >
              {headline}
            </h1>
            <p className="text-lg" style={{ color: "#4A5568" }}>
              {subheadline}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-5">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Email */}
              <div>
                <h3
                  className="mb-2 text-sm font-bold uppercase tracking-wider"
                  style={{ color: "#4A5568" }}
                >
                  Email
                </h3>
                <a
                  href={`mailto:${email}`}
                  className="text-lg font-semibold transition hover:underline"
                  style={{ color: "#00B4D8" }}
                >
                  {email}
                </a>
              </div>

              {/* Calendly */}
              <div>
                <h3
                  className="mb-2 text-sm font-bold uppercase tracking-wider"
                  style={{ color: "#4A5568" }}
                >
                  Agendar llamada
                </h3>
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                  <p className="mb-4 text-sm" style={{ color: "#4A5568" }}>
                    Prefiere hablar directamente? Agenda una llamada de 30 minutos con
                    nuestro equipo.
                  </p>
                  {/* Calendly embed placeholder */}
                  <div
                    className="flex h-32 items-center justify-center rounded-lg"
                    style={{ background: "#F0F7FF" }}
                  >
                    <p className="text-sm font-medium" style={{ color: "#4A5568" }}>
                      Calendly embed
                    </p>
                  </div>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold transition hover:bg-gray-50"
                    style={{ color: "#0A2540", borderColor: "#0A2540" }}
                  >
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Agendar en Calendly
                  </a>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3
                  className="mb-2 text-sm font-bold uppercase tracking-wider"
                  style={{ color: "#4A5568" }}
                >
                  Oficinas
                </h3>
                <p className="text-sm whitespace-pre-line" style={{ color: "#4A5568" }}>
                  {location}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ContactoForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
