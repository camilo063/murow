export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "json" | "select";
  required?: boolean;
  options?: { label: string; value: string }[];
}

export interface SectionConfig {
  endpoint: string;
  title: string;
  fields: FieldDef[];
  readOnly?: boolean;
}

export const sectionConfigs: Record<string, SectionConfig> = {
  hero: {
    endpoint: "/api/admin/hero",
    title: "Hero Section",
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "subheadline", label: "Subheadline", type: "textarea", required: true },
      { name: "ctaPrimaryText", label: "Primary CTA Text", type: "text", required: true },
      { name: "ctaPrimaryLink", label: "Primary CTA Link", type: "text", required: true },
      { name: "ctaSecondaryText", label: "Secondary CTA Text", type: "text", required: true },
      { name: "ctaSecondaryLink", label: "Secondary CTA Link", type: "text", required: true },
      { name: "badgeText", label: "Badge Text", type: "text" },
      { name: "isActive", label: "Active", type: "boolean" },
    ],
  },
  "trust-stats": {
    endpoint: "/api/admin/trust-stats",
    title: "Trust Bar Stats",
    fields: [
      { name: "value", label: "Value", type: "text", required: true },
      { name: "label", label: "Label", type: "text", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "trust-logos": {
    endpoint: "/api/admin/trust-logos",
    title: "Trust Bar Logos",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "pain-cards": {
    endpoint: "/api/admin/pain-cards",
    title: "Pain Cards",
    fields: [
      { name: "icon", label: "Icon", type: "text", required: true },
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "product-pillars": {
    endpoint: "/api/admin/product-pillars",
    title: "Product Pillars",
    fields: [
      { name: "icon", label: "Icon", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "impactNote", label: "Impact Note", type: "text" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "paywall-rules": {
    endpoint: "/api/admin/paywall-rules",
    title: "Paywall Rules",
    fields: [
      { name: "ruleNumber", label: "Rule Number", type: "number", required: true },
      { name: "icon", label: "Icon", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "visibleName", label: "Visible Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "useCase", label: "Use Case", type: "textarea", required: true },
      { name: "example", label: "Example", type: "textarea", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "pricing-plans": {
    endpoint: "/api/admin/pricing-plans",
    title: "Pricing Plans",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "priceMonthly", label: "Monthly Price", type: "number", required: true },
      { name: "priceAnnual", label: "Annual Price", type: "number", required: true },
      { name: "focus", label: "Focus", type: "text", required: true },
      { name: "targetAudience", label: "Target Audience", type: "text", required: true },
      { name: "isRecommended", label: "Recommended", type: "boolean" },
      { name: "features", label: "Features (JSON)", type: "json", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  competitors: {
    endpoint: "/api/admin/competitors",
    title: "Competitors",
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "setup", label: "Setup", type: "text", required: true },
      { name: "monthly", label: "Monthly", type: "text", required: true },
      { name: "localPayment", label: "Local Payment", type: "text", required: true },
      { name: "spanishSupport", label: "Spanish Support", type: "text", required: true },
      { name: "ownData", label: "Own Data", type: "text", required: true },
      { name: "implementation", label: "Implementation", type: "text", required: true },
      { name: "isHighlighted", label: "Highlighted", type: "boolean" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "implementation-steps": {
    endpoint: "/api/admin/implementation-steps",
    title: "Implementation Steps",
    fields: [
      { name: "stepNumber", label: "Step Number", type: "number", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "timeframe", label: "Timeframe", type: "text", required: true },
      { name: "activities", label: "Activities (JSON)", type: "json", required: true },
      { name: "deliverables", label: "Deliverables (JSON)", type: "json", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "dashboard-metrics": {
    endpoint: "/api/admin/dashboard-metrics",
    title: "Dashboard Metrics",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  integrations: {
    endpoint: "/api/admin/integrations",
    title: "Integrations",
    fields: [
      { name: "category", label: "Category", type: "text", required: true },
      { name: "name", label: "Name", type: "text", required: true },
      { name: "status", label: "Status", type: "select", required: true, options: [
        { label: "Active", value: "active" },
        { label: "Coming Soon", value: "coming_soon" },
        { label: "Planned", value: "planned" },
      ]},
      { name: "details", label: "Details", type: "text" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "case-studies": {
    endpoint: "/api/admin/case-studies",
    title: "Case Studies",
    fields: [
      { name: "clientName", label: "Client Name", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "challenge", label: "Challenge", type: "textarea", required: true },
      { name: "solution", label: "Solution", type: "textarea", required: true },
      { name: "metrics", label: "Metrics (JSON)", type: "json", required: true },
      { name: "testimonial", label: "Testimonial", type: "textarea", required: true },
      { name: "author", label: "Author", type: "text", required: true },
      { name: "isMain", label: "Main Case Study", type: "boolean" },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  differentiators: {
    endpoint: "/api/admin/differentiators",
    title: "Differentiators",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "points", label: "Points (JSON)", type: "json", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  faq: {
    endpoint: "/api/admin/faq",
    title: "FAQ",
    fields: [
      { name: "question", label: "Question", type: "text", required: true },
      { name: "answer", label: "Answer", type: "textarea", required: true },
      { name: "sortOrder", label: "Sort Order", type: "number" },
    ],
  },
  "blog-posts": {
    endpoint: "/api/admin/blog-posts",
    title: "Blog Posts",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "slug", label: "Slug", type: "text", required: true },
      { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
      { name: "content", label: "Content", type: "textarea", required: true },
      { name: "keywords", label: "Keywords", type: "text" },
      { name: "metaTitle", label: "Meta Title", type: "text" },
      { name: "metaDesc", label: "Meta Description", type: "textarea" },
      { name: "published", label: "Published", type: "boolean" },
    ],
  },
  "piloto-leads": {
    endpoint: "/api/admin/piloto-leads",
    title: "Piloto Leads",
    readOnly: true,
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "mediaName", label: "Media Name", type: "text", required: true },
      { name: "position", label: "Position", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "country", label: "Country", type: "text", required: true },
      { name: "pageViews", label: "Page Views", type: "text", required: true },
      { name: "currentCms", label: "Current CMS", type: "text", required: true },
      { name: "hasSubscription", label: "Has Subscription", type: "text", required: true },
      { name: "challenge", label: "Challenge", type: "textarea" },
      { name: "createdAt", label: "Submitted At", type: "text" },
    ],
  },
  "page-meta": {
    endpoint: "/api/admin/page-meta",
    title: "Page Meta (SEO)",
    fields: [
      { name: "path", label: "Path", type: "text", required: true },
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "ogImage", label: "OG Image URL", type: "text" },
    ],
  },
  "site-config": {
    endpoint: "/api/admin/site-config",
    title: "Site Config",
    fields: [
      { name: "key", label: "Key", type: "text", required: true },
      { name: "value", label: "Value", type: "textarea", required: true },
      { name: "description", label: "Description", type: "text" },
    ],
  },
};

export const sidebarLinks = [
  { label: "Dashboard", href: "/admin", slug: "" },
  { label: "Hero Section", href: "/admin/hero", slug: "hero" },
  { label: "Trust Stats", href: "/admin/trust-stats", slug: "trust-stats" },
  { label: "Trust Logos", href: "/admin/trust-logos", slug: "trust-logos" },
  { label: "Pain Cards", href: "/admin/pain-cards", slug: "pain-cards" },
  { label: "Product Pillars", href: "/admin/product-pillars", slug: "product-pillars" },
  { label: "Paywall Rules", href: "/admin/paywall-rules", slug: "paywall-rules" },
  { label: "Pricing Plans", href: "/admin/pricing-plans", slug: "pricing-plans" },
  { label: "Competitors", href: "/admin/competitors", slug: "competitors" },
  { label: "Implementation Steps", href: "/admin/implementation-steps", slug: "implementation-steps" },
  { label: "Dashboard Metrics", href: "/admin/dashboard-metrics", slug: "dashboard-metrics" },
  { label: "Integrations", href: "/admin/integrations", slug: "integrations" },
  { label: "Case Studies", href: "/admin/case-studies", slug: "case-studies" },
  { label: "Differentiators", href: "/admin/differentiators", slug: "differentiators" },
  { label: "FAQ", href: "/admin/faq", slug: "faq" },
  { label: "Blog Posts", href: "/admin/blog-posts", slug: "blog-posts" },
  { label: "Piloto Leads", href: "/admin/piloto-leads", slug: "piloto-leads" },
  { label: "Page Meta", href: "/admin/page-meta", slug: "page-meta" },
  { label: "Site Config", href: "/admin/site-config", slug: "site-config" },
];
