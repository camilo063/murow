"use client";

import { useEffect, useState } from "react";

interface Stats {
  blogPosts: number;
  leads: number;
  contactoLeads: number;
  faqItems: number;
  caseStudies: number;
  integrations: number;
  pricingPlans: number;
  competitors: number;
  painCards: number;
  productPillars: number;
  paywallRules: number;
  differentiators: number;
  implementationSteps: number;
  dashboardMetrics: number;
  trustStats: number;
  trustLogos: number;
  pageMeta: number;
  siteConfig: number;
  navbarLinks: number;
  footerLinks: number;
  sectionContent: number;
  exitStrategyItems: number;
}

const statCards: { key: keyof Stats; label: string; color: string }[] = [
  { key: "leads", label: "Piloto Leads", color: "bg-cyan-500" },
  { key: "contactoLeads", label: "Contacto Leads", color: "bg-cyan-600" },
  { key: "blogPosts", label: "Blog Posts", color: "bg-indigo-500" },
  { key: "faqItems", label: "FAQ Items", color: "bg-emerald-500" },
  { key: "caseStudies", label: "Case Studies", color: "bg-amber-500" },
  { key: "pricingPlans", label: "Pricing Plans", color: "bg-violet-500" },
  { key: "integrations", label: "Integrations", color: "bg-rose-500" },
  { key: "competitors", label: "Competitors", color: "bg-orange-500" },
  { key: "painCards", label: "Pain Cards", color: "bg-teal-500" },
  { key: "productPillars", label: "Product Pillars", color: "bg-blue-500" },
  { key: "paywallRules", label: "Paywall Rules", color: "bg-pink-500" },
  { key: "differentiators", label: "Differentiators", color: "bg-lime-600" },
  { key: "exitStrategyItems", label: "Exit Strategy", color: "bg-green-600" },
  { key: "implementationSteps", label: "Implementation Steps", color: "bg-sky-500" },
  { key: "dashboardMetrics", label: "Dashboard Metrics", color: "bg-fuchsia-500" },
  { key: "trustStats", label: "Trust Stats", color: "bg-gray-600" },
  { key: "trustLogos", label: "Trust Logos", color: "bg-slate-500" },
  { key: "navbarLinks", label: "Navbar Links", color: "bg-purple-500" },
  { key: "footerLinks", label: "Footer Links", color: "bg-purple-600" },
  { key: "sectionContent", label: "Section Headers", color: "bg-stone-500" },
  { key: "pageMeta", label: "Page Meta", color: "bg-yellow-600" },
  { key: "siteConfig", label: "Site Config", color: "bg-red-500" },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1426] mb-6">Dashboard</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-gray-200 animate-pulse"
            />
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.key}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-3 h-3 rounded-full ${card.color}`}
                />
                <span className="text-sm font-medium text-gray-500">
                  {card.label}
                </span>
              </div>
              <p className="text-3xl font-bold text-[#0B1426]">
                {stats[card.key] ?? 0}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Failed to load statistics.</p>
      )}
    </div>
  );
}
