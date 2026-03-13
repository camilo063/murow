export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nivelics SAS",
    url: "https://paywl.io",
    logo: "https://paywl.io/logo.svg",
    description:
      "Empresa de tecnologia con 14 anos de experiencia construyendo producto digital para medios en America Latina.",
    foundingDate: "2012",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contacto@nivelics.com",
      contactType: "sales",
      availableLanguage: ["Spanish", "English"],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PAYWL",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Motor de paywall SaaS para medios digitales en America Latina. Reglas de negocio flexibles, integracion con pasarelas locales y soberania total de datos.",
    offers: [
      {
        "@type": "Offer",
        name: "Business",
        price: "450",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Performance",
        price: "850",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "Enterprise",
        price: "1900",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
      },
    ],
    creator: {
      "@type": "Organization",
      name: "Nivelics SAS",
    },
    featureList: [
      "Hard Paywall",
      "Metered Paywall",
      "Lead Wall",
      "Mobile Rule",
      "Loyalty Wall",
      "MercadoPago Integration",
      "PSE Integration",
      "Wompi Integration",
      "Real-time Analytics Dashboard",
      "A/B Testing",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQPageSchema({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
