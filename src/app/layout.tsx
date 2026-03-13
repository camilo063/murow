import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "MUROW — Motor de Paywall para Medios Digitales en LATAM",
    template: "%s | MUROW",
  },
  description:
    "Motor de paywall SaaS para medios latinoamericanos. Reglas flexibles, MercadoPago integrado, datos 100% tuyos. Piloto gratuito 3 meses.",
  metadataBase: new URL("https://murow.io"),
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
    url: "https://murow.io",
    siteName: "MUROW",
    title: "MUROW — Motor de Paywall para Medios Digitales en LATAM",
    description:
      "Motor de paywall SaaS para medios latinoamericanos. Reglas flexibles, MercadoPago integrado, datos 100% tuyos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MUROW - The Paywall Engine for Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MUROW — Motor de Paywall para Medios Digitales en LATAM",
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
    canonical: "https://murow.io",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#0A2540" />
      </head>
      <body className="antialiased bg-white">{children}</body>
    </html>
  )
}
