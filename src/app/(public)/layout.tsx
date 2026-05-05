import { prisma } from "@/lib/prisma"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export const dynamic = "force-dynamic"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [navbarConfig, navbarLinks, footerConfig, footerLinks] = await Promise.all([
    prisma.navbarConfig.findFirst(),
    prisma.navbarLink.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.footerConfig.findFirst(),
    prisma.footerLink.findMany({ orderBy: { sortOrder: "asc" } }),
  ])

  return (
    <>
      <Navbar
        logoText={navbarConfig?.logoText}
        ctaPrimaryText={navbarConfig?.ctaPrimaryText}
        ctaPrimaryLink={navbarConfig?.ctaPrimaryLink}
        ctaSecondaryText={navbarConfig?.ctaSecondaryText}
        ctaSecondaryLink={navbarConfig?.ctaSecondaryLink}
        links={navbarLinks.map((l) => ({ label: l.label, href: l.href }))}
      />
      <main>{children}</main>
      <Footer
        logoText={footerConfig?.logoText}
        tagline={footerConfig?.tagline}
        slogan={footerConfig?.slogan}
        copyright={footerConfig?.copyright}
        links={footerLinks.map((l) => ({
          columnName: l.columnName,
          label: l.label,
          href: l.href,
        }))}
      />
    </>
  )
}
