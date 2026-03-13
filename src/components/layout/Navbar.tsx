"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Producto", href: "#producto" },
  { label: "Precios", href: "/precios" },
  { label: "Integraciones", href: "/integraciones" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-navbar"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-sans text-xl font-extrabold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[#0A2540]" : "text-white"
            }`}
          >
            PAYWL
          </Link>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled
                      ? "text-[#4A5568] hover:text-[#0A2540]"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled
                      ? "text-[#4A5568] hover:text-[#0A2540]"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA buttons — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#demo"
              className={`rounded-btn px-4 py-1.5 text-sm font-semibold border transition-all duration-300 ${
                scrolled
                  ? "border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
                  : "border-white/60 text-white hover:border-white hover:bg-white/10"
              }`}
            >
              Ver Demo
            </Link>
            <Link
              href="/piloto"
              className="rounded-btn bg-[#FF6B35] px-4 py-1.5 text-sm font-semibold text-white hover:brightness-110 transition-all"
            >
              Piloto Gratuito
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <button
            type="button"
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled ? "text-[#0A2540]" : "text-white"
            }`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-16 right-0 bottom-0 w-72 bg-white shadow-xl md:hidden overflow-y-auto"
            >
              <div className="flex flex-col gap-2 p-6">
                {navLinks.map((link) =>
                  link.href.startsWith("#") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-btn px-3 py-2.5 text-sm font-medium text-slate-gray hover:bg-sky-blue hover:text-deep-navy transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-btn px-3 py-2.5 text-sm font-medium text-slate-gray hover:bg-sky-blue hover:text-deep-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}

                <hr className="my-3 border-gray-200" />

                <Link
                  href="#demo"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-btn border border-deep-navy px-4 py-2.5 text-center text-sm font-semibold text-deep-navy hover:bg-deep-navy hover:text-white transition-colors"
                >
                  Ver Demo
                </Link>
                <Link
                  href="/piloto"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-btn bg-vibrant-orange px-4 py-2.5 text-center text-sm font-semibold text-white hover:brightness-110 transition-all"
                >
                  Piloto Gratuito
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
