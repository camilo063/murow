import Link from "next/link";

interface FooterLink {
  columnName: string;
  label: string;
  href: string;
}

interface FooterProps {
  logoText?: string;
  tagline?: string;
  slogan?: string;
  copyright?: string;
  links?: FooterLink[];
}

const defaultFooterColumns = [
  {
    title: "Producto",
    links: [
      { label: "Caracteristicas", href: "#producto" },
      { label: "Precios", href: "/precios" },
      { label: "Integraciones", href: "/integraciones" },
      { label: "Como funciona", href: "#como-funciona" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Documentacion", href: "/docs" },
      { label: "Estado del sistema", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nivelics", href: "#" },
      { label: "Contacto", href: "/contacto" },
      { label: "Privacidad", href: "/privacidad" },
      { label: "Terminos", href: "/terminos" },
    ],
  },
];

export default function Footer({
  logoText = "PAYWL",
  tagline = "The Paywall Engine for Media",
  slogan = "Tus datos. Tu medio. Tu control.",
  copyright = "\u00A9 2026 PAYWL by Nivelics SAS \u00B7 Colombia \u00B7 USA",
  links,
}: FooterProps) {
  // Group links by column name if provided from DB
  let footerColumns: { title: string; links: { label: string; href: string }[] }[];

  if (links && links.length > 0) {
    const grouped: Record<string, { label: string; href: string }[]> = {};
    const columnOrder: string[] = [];
    for (const link of links) {
      if (!grouped[link.columnName]) {
        grouped[link.columnName] = [];
        columnOrder.push(link.columnName);
      }
      grouped[link.columnName].push({ label: link.label, href: link.href });
    }
    footerColumns = columnOrder.map((col) => ({ title: col, links: grouped[col] }));
  } else {
    footerColumns = defaultFooterColumns;
  }

  return (
    <footer className="bg-deep-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="block font-sans text-2xl font-extrabold text-white tracking-tight"
            >
              {logoText}
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {tagline}
            </p>
            <p className="text-sm font-medium text-electric-cyan">
              {slogan}
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <a
                        href={link.href}
                        className="text-sm text-gray-300 hover:text-electric-cyan transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-300 hover:text-electric-cyan transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-gray-500">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
