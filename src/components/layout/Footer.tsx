import Link from "next/link";

const footerColumns = [
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

export default function Footer() {
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
              MUROW
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The Paywall Engine for Media
            </p>
            <p className="text-sm font-medium text-electric-cyan">
              Tus datos. Tu medio. Tu control.
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
            &copy; 2026 MUROW by Nivelics SAS &middot; Colombia &middot; USA
          </p>
        </div>
      </div>
    </footer>
  );
}
