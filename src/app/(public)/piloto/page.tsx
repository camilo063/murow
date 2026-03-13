import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";
import PilotoForm from "@/components/forms/PilotoForm";

export const metadata: Metadata = {
  title: "Piloto Gratuito 3 Meses — MUROW Paywall",
  description:
    "Implementa el motor de paywall MUROW en tu medio digital gratis durante 3 meses. Sin costo de implementacion, sin clausulas ocultas. Tu data es tuya.",
  openGraph: {
    title: "Piloto Gratuito 3 Meses — MUROW Paywall",
    description:
      "Implementa el motor de paywall MUROW en tu medio digital gratis durante 3 meses.",
    url: "https://murow.io/piloto",
  },
};

const trustBullets = [
  { text: "$0 implementacion", sub: "Nosotros hacemos todo el setup" },
  { text: "3 meses de uso activo", sub: "Sin compromiso despues del piloto" },
  { text: "Tu data es tuya", sub: "Soberania total de datos desde el dia 1" },
];

const afterSteps = [
  {
    number: "1",
    title: "Llamada de descubrimiento",
    description:
      "Un especialista te contacta en 24h para entender tu medio, tu stack y tus objetivos.",
  },
  {
    number: "2",
    title: "Configuracion del entorno",
    description:
      "En 48h creamos tu instancia, configuramos integraciones y preparamos las reglas iniciales.",
  },
  {
    number: "3",
    title: "Go-live en 2 semanas",
    description:
      "Implementamos el paywall en tu sitio con soporte hands-on de nuestro equipo.",
  },
  {
    number: "4",
    title: "90 dias de piloto",
    description:
      "Soporte dedicado, optimizacion de reglas y reportes de performance. Sin costo.",
  },
];

export default function PilotoPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://murow.io" },
          { name: "Piloto Gratuito", url: "https://murow.io/piloto" },
        ]}
      />

      {/* Minimal header — only logo */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center">
            <Link
              href="/"
              className="font-sans text-xl font-extrabold tracking-tight"
              style={{ color: "#0A2540" }}
            >
              MUROW
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section
        className="py-16 md:py-24"
        style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Left column */}
            <div className="lg:sticky lg:top-24">
              <h1
                className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl"
                style={{ color: "#0A2540" }}
              >
                3 meses de MUROW.{" "}
                <span style={{ color: "#00B4D8" }}>Gratis.</span>{" "}
                <span className="block">Sin letra pequena.</span>
              </h1>
              <p
                className="mb-10 max-w-lg text-lg leading-relaxed"
                style={{ color: "#4A5568" }}
              >
                Implementamos el motor de paywall completo en tu medio digital sin costo
                de setup ni mensualidad durante 90 dias. Si no ves resultados, cancelas
                sin penalidad.
              </p>

              {/* Trust bullets */}
              <ul className="space-y-4">
                {trustBullets.map((bullet) => (
                  <li key={bullet.text} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#00B4D8" }}
                    >
                      <svg
                        className="h-3.5 w-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <div>
                      <p
                        className="text-base font-semibold"
                        style={{ color: "#0A2540" }}
                      >
                        {bullet.text}
                      </p>
                      <p className="text-sm" style={{ color: "#4A5568" }}>
                        {bullet.sub}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — form */}
            <div>
              <PilotoForm />
            </div>
          </div>
        </div>
      </section>

      {/* Que pasa despues? */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mb-12 text-center text-3xl font-extrabold md:text-4xl"
            style={{ color: "#0A2540" }}
          >
            Que pasa despues?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {afterSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-gray-100 p-6 transition hover:shadow-md"
              >
                <span
                  className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ background: "#0A2540" }}
                >
                  {step.number}
                </span>
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{ color: "#0A2540" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#4A5568" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
