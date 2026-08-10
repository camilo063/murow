import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta-sans",
})

export const metadata: Metadata = {
  title: {
    default: "PAYWL — Motor de Paywall para Medios Digitales en LATAM",
    template: "%s | PAYWL",
  },
  description:
    "Motor de paywall SaaS para medios latinoamericanos. Reglas flexibles, MercadoPago integrado, datos 100% tuyos. Piloto gratuito 3 meses.",
  metadataBase: new URL("https://paywl.io"),
  keywords: [
    "paywall",
    "medios digitales",
    "suscripciones",
    "LATAM",
    "MercadoPago",
    "paywall Colombia",
    "monetizacion contenido",
    "motor de paywall",
    "SaaS medios",
  ],
  authors: [{ name: "Nivelics SAS" }],
  creator: "Nivelics SAS",
  publisher: "Nivelics SAS",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://paywl.io",
    siteName: "PAYWL",
    title: "PAYWL — Motor de Paywall para Medios Digitales en LATAM",
    description:
      "Motor de paywall SaaS para medios latinoamericanos. Reglas flexibles, MercadoPago integrado, datos 100% tuyos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PAYWL - The Paywall Engine for Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAYWL — Motor de Paywall para Medios Digitales en LATAM",
    description:
      "Motor de paywall SaaS para medios latinoamericanos. Reglas flexibles, MercadoPago integrado, datos 100% tuyos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://paywl.io",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={plusJakartaSans.variable}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon/favicon-96x96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0A2540" />
      </head>
      <body className="antialiased bg-white">{children}</body>
    </html>
  )
}
