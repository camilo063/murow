import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbSchema } from "@/components/seo/StructuredData"
import DocsContent from "@/components/docs/DocsContent"

export const metadata: Metadata = {
  title: "Documentacion Tecnica — PAYWL Paywall Engine",
  description:
    "Documentacion tecnica para integrar PAYWL en tu medio digital. SDK JavaScript, API Reference, integraciones con CMS y pasarelas de pago.",
  keywords: [
    "PAYWL documentacion",
    "paywall API",
    "SDK JavaScript paywall",
    "integracion paywall CMS",
    "MercadoPago suscripciones API",
  ],
}

export default function DocsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://paywl.io" },
          { name: "Documentacion", url: "https://paywl.io/docs" },
        ]}
      />

      {/* Hero */}
      <section className="bg-[#0A2540] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-2 text-sm text-[#00B4D8] mb-4">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-white/60">Documentacion</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Documentacion Tecnica
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl">
            Todo lo que necesitas para integrar PAYWL en tu medio digital.
            Desde la instalacion del SDK hasta la configuracion avanzada de
            reglas y pasarelas de pago.
          </p>
          <div className="flex gap-3 mt-8">
            <a
              href="#getting-started"
              className="bg-[#00B4D8] text-white font-semibold px-6 py-3 rounded-lg hover:scale-[1.02] transition-transform"
            >
              Comenzar
            </a>
            <a
              href="#api-reference"
              className="border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:border-white/60 transition-colors"
            >
              API Reference
            </a>
          </div>
        </div>
      </section>

      <DocsContent />
    </>
  )
}
