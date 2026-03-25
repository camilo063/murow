export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "boolean" | "json" | "select" | "image";
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
    title: "Seccion Hero",
    fields: [
      { name: "headline", label: "Titulo principal", type: "text", required: true },
      { name: "subheadline", label: "Subtitulo", type: "textarea", required: true },
      { name: "ctaPrimaryText", label: "Texto CTA primario", type: "text", required: true },
      { name: "ctaPrimaryLink", label: "Enlace CTA primario", type: "text", required: true },
      { name: "ctaSecondaryText", label: "Texto CTA secundario", type: "text", required: true },
      { name: "ctaSecondaryLink", label: "Enlace CTA secundario", type: "text", required: true },
      { name: "badgeText", label: "Texto del badge", type: "text" },
      { name: "isActive", label: "Activo", type: "boolean" },
    ],
  },
  "trust-stats": {
    endpoint: "/api/admin/trust-stats",
    title: "Estadisticas de confianza",
    fields: [
      { name: "value", label: "Valor", type: "text", required: true },
      { name: "label", label: "Etiqueta", type: "text", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "trust-logos": {
    endpoint: "/api/admin/trust-logos",
    title: "Logos de confianza",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "pain-cards": {
    endpoint: "/api/admin/pain-cards",
    title: "Tarjetas de problemas",
    fields: [
      { name: "icon", label: "Icono (Lucide)", type: "text", required: true },
      { name: "headline", label: "Titulo", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "product-pillars": {
    endpoint: "/api/admin/product-pillars",
    title: "Pilares del producto",
    fields: [
      { name: "icon", label: "Icono (Lucide)", type: "text", required: true },
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "impactNote", label: "Nota de impacto", type: "text" },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "paywall-rules": {
    endpoint: "/api/admin/paywall-rules",
    title: "Reglas de Paywall",
    fields: [
      { name: "ruleNumber", label: "Numero de regla", type: "number", required: true },
      { name: "icon", label: "Icono (Lucide)", type: "text", required: true },
      { name: "name", label: "Nombre interno", type: "text", required: true },
      { name: "visibleName", label: "Nombre visible", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "useCase", label: "Caso de uso", type: "textarea", required: true },
      { name: "example", label: "Ejemplo", type: "textarea", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "pricing-plans": {
    endpoint: "/api/admin/pricing-plans",
    title: "Planes de precios",
    fields: [
      { name: "name", label: "Nombre del plan", type: "text", required: true },
      { name: "slug", label: "Slug (URL)", type: "text", required: true },
      { name: "priceMonthly", label: "Precio mensual (USD)", type: "number", required: true },
      { name: "priceAnnual", label: "Precio anual (USD)", type: "number", required: true },
      { name: "focus", label: "Enfoque", type: "text", required: true },
      { name: "targetAudience", label: "Audiencia objetivo", type: "text", required: true },
      { name: "isRecommended", label: "Recomendado", type: "boolean" },
      { name: "features", label: "Caracteristicas (JSON)", type: "json", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  competitors: {
    endpoint: "/api/admin/competitors",
    title: "Competidores",
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "setup", label: "Costo setup", type: "text", required: true },
      { name: "monthly", label: "Mensualidad", type: "text", required: true },
      { name: "localPayment", label: "Pasarela local", type: "text", required: true },
      { name: "spanishSupport", label: "Soporte en espanol", type: "text", required: true },
      { name: "ownData", label: "Datos propios", type: "text", required: true },
      { name: "implementation", label: "Implementacion", type: "text", required: true },
      { name: "isHighlighted", label: "Destacado", type: "boolean" },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "implementation-steps": {
    endpoint: "/api/admin/implementation-steps",
    title: "Pasos de implementacion",
    fields: [
      { name: "stepNumber", label: "Numero de paso", type: "number", required: true },
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "timeframe", label: "Tiempo estimado", type: "text", required: true },
      { name: "activities", label: "Actividades (JSON)", type: "json", required: true },
      { name: "deliverables", label: "Entregables (JSON)", type: "json", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "dashboard-metrics": {
    endpoint: "/api/admin/dashboard-metrics",
    title: "Metricas del dashboard",
    fields: [
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  integrations: {
    endpoint: "/api/admin/integrations",
    title: "Integraciones",
    fields: [
      { name: "category", label: "Categoria", type: "text", required: true },
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "status", label: "Estado", type: "select", required: true, options: [
        { label: "Disponible", value: "active" },
        { label: "Proximamente", value: "coming_soon" },
        { label: "Planeado", value: "planned" },
      ]},
      { name: "details", label: "Detalles", type: "text" },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "case-studies": {
    endpoint: "/api/admin/case-studies",
    title: "Casos de exito",
    fields: [
      { name: "clientName", label: "Nombre del cliente", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "challenge", label: "Desafio", type: "textarea", required: true },
      { name: "solution", label: "Solucion", type: "textarea", required: true },
      { name: "metrics", label: "Metricas (JSON)", type: "json", required: true },
      { name: "testimonial", label: "Testimonio", type: "textarea", required: true },
      { name: "author", label: "Autor", type: "text", required: true },
      { name: "isMain", label: "Caso principal", type: "boolean" },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  differentiators: {
    endpoint: "/api/admin/differentiators",
    title: "Diferenciadores",
    fields: [
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "points", label: "Puntos (JSON)", type: "json", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  faq: {
    endpoint: "/api/admin/faq",
    title: "Preguntas frecuentes",
    fields: [
      { name: "question", label: "Pregunta", type: "text", required: true },
      { name: "answer", label: "Respuesta", type: "textarea", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "blog-posts": {
    endpoint: "/api/admin/blog-posts",
    title: "Articulos del blog",
    fields: [
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "slug", label: "Slug (URL)", type: "text", required: true },
      { name: "excerpt", label: "Extracto", type: "textarea", required: true },
      { name: "content", label: "Contenido", type: "textarea", required: true },
      { name: "keywords", label: "Palabras clave", type: "text" },
      { name: "metaTitle", label: "Meta titulo (SEO)", type: "text" },
      { name: "metaDesc", label: "Meta descripcion (SEO)", type: "textarea" },
      { name: "published", label: "Publicado", type: "boolean" },
    ],
  },
  "piloto-leads": {
    endpoint: "/api/admin/piloto-leads",
    title: "Leads de piloto",
    readOnly: true,
    fields: [
      { name: "fullName", label: "Nombre completo", type: "text", required: true },
      { name: "mediaName", label: "Nombre del medio", type: "text", required: true },
      { name: "position", label: "Cargo", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "country", label: "Pais", type: "text", required: true },
      { name: "pageViews", label: "Page views", type: "text", required: true },
      { name: "currentCms", label: "CMS actual", type: "text", required: true },
      { name: "hasSubscription", label: "Tiene suscripcion", type: "text", required: true },
      { name: "challenge", label: "Desafio", type: "textarea" },
      { name: "createdAt", label: "Fecha de envio", type: "text" },
    ],
  },
  "page-meta": {
    endpoint: "/api/admin/page-meta",
    title: "Meta tags (SEO)",
    fields: [
      { name: "path", label: "Ruta de pagina", type: "text", required: true },
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "ogImage", label: "Imagen OG", type: "image" },
    ],
  },
  "site-config": {
    endpoint: "/api/admin/site-config",
    title: "Configuracion del sitio",
    fields: [
      { name: "key", label: "Clave", type: "text", required: true },
      { name: "value", label: "Valor", type: "textarea", required: true },
      { name: "description", label: "Descripcion", type: "text" },
    ],
  },
  "cta-section": {
    endpoint: "/api/admin/cta-section",
    title: "Seccion CTA final",
    fields: [
      { name: "headline", label: "Titulo principal", type: "text", required: true },
      { name: "subheadline", label: "Subtitulo", type: "textarea", required: true },
      { name: "ctaPrimaryText", label: "Texto CTA primario", type: "text", required: true },
      { name: "ctaPrimaryLink", label: "Enlace CTA primario", type: "text", required: true },
      { name: "ctaSecondaryText", label: "Texto CTA secundario", type: "text", required: true },
      { name: "ctaSecondaryLink", label: "Enlace CTA secundario", type: "text", required: true },
      { name: "disclaimerText", label: "Texto de disclaimer", type: "textarea" },
      { name: "isActive", label: "Activo", type: "boolean" },
    ],
  },
  "navbar-config": {
    endpoint: "/api/admin/navbar-config",
    title: "Configuracion del navbar",
    fields: [
      { name: "logoText", label: "Texto del logo", type: "text", required: true },
      { name: "ctaPrimaryText", label: "Texto CTA primario", type: "text", required: true },
      { name: "ctaPrimaryLink", label: "Enlace CTA primario", type: "text", required: true },
      { name: "ctaSecondaryText", label: "Texto CTA secundario", type: "text", required: true },
      { name: "ctaSecondaryLink", label: "Enlace CTA secundario", type: "text", required: true },
    ],
  },
  "navbar-links": {
    endpoint: "/api/admin/navbar-links",
    title: "Links del navbar",
    fields: [
      { name: "label", label: "Etiqueta", type: "text", required: true },
      { name: "href", label: "URL del enlace", type: "text", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
      { name: "isActive", label: "Activo", type: "boolean" },
    ],
  },
  "footer-config": {
    endpoint: "/api/admin/footer-config",
    title: "Configuracion del footer",
    fields: [
      { name: "logoText", label: "Texto del logo", type: "text", required: true },
      { name: "tagline", label: "Tagline", type: "text", required: true },
      { name: "slogan", label: "Slogan", type: "text", required: true },
      { name: "copyright", label: "Copyright", type: "text", required: true },
    ],
  },
  "footer-links": {
    endpoint: "/api/admin/footer-links",
    title: "Links del footer",
    fields: [
      { name: "columnName", label: "Nombre de columna", type: "text", required: true },
      { name: "label", label: "Etiqueta", type: "text", required: true },
      { name: "href", label: "URL del enlace", type: "text", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "section-content": {
    endpoint: "/api/admin/section-content",
    title: "Encabezados de secciones",
    fields: [
      { name: "sectionKey", label: "Clave de seccion", type: "text", required: true },
      { name: "title", label: "Titulo", type: "textarea", required: true },
      { name: "subtitle", label: "Subtitulo", type: "textarea" },
    ],
  },
  "exit-strategy": {
    endpoint: "/api/admin/exit-strategy",
    title: "Estrategia de salida",
    fields: [
      { name: "title", label: "Titulo", type: "text", required: true },
      { name: "description", label: "Descripcion", type: "textarea", required: true },
      { name: "sortOrder", label: "Orden", type: "number" },
    ],
  },
  "contacto-leads": {
    endpoint: "/api/admin/contacto-leads",
    title: "Leads de contacto",
    readOnly: true,
    fields: [
      { name: "name", label: "Nombre", type: "text", required: true },
      { name: "email", label: "Email", type: "text", required: true },
      { name: "company", label: "Empresa", type: "text", required: true },
      { name: "message", label: "Mensaje", type: "textarea", required: true },
      { name: "createdAt", label: "Fecha de envio", type: "text" },
    ],
  },
  "contacto-config": {
    endpoint: "/api/admin/contacto-config",
    title: "Config pagina contacto",
    fields: [
      { name: "headline", label: "Titulo principal", type: "text", required: true },
      { name: "subheadline", label: "Subtitulo", type: "textarea" },
      { name: "email", label: "Email de contacto", type: "text", required: true },
      { name: "phone", label: "Telefono", type: "text" },
      { name: "calendlyUrl", label: "URL de Calendly", type: "text" },
      { name: "location", label: "Ubicacion", type: "textarea" },
    ],
  },
  "piloto-config": {
    endpoint: "/api/admin/piloto-config",
    title: "Config pagina piloto",
    fields: [
      { name: "headline", label: "Titulo principal", type: "textarea", required: true },
      { name: "subheadline", label: "Subtitulo", type: "textarea", required: true },
      { name: "description", label: "Descripcion", type: "textarea" },
      { name: "trustBullets", label: "Puntos de confianza (JSON)", type: "json", required: true },
      { name: "afterSteps", label: "Pasos siguientes (JSON)", type: "json", required: true },
    ],
  },
};

export interface SidebarGroup {
  group: string;
  links: { label: string; href: string; slug: string }[];
}

export const sidebarGroups: SidebarGroup[] = [
  {
    group: "General",
    links: [
      { label: "Dashboard", href: "/admin", slug: "" },
      { label: "Config del sitio", href: "/admin/site-config", slug: "site-config" },
      { label: "Meta tags (SEO)", href: "/admin/page-meta", slug: "page-meta" },
    ],
  },
  {
    group: "Layout",
    links: [
      { label: "Config navbar", href: "/admin/navbar-config", slug: "navbar-config" },
      { label: "Links navbar", href: "/admin/navbar-links", slug: "navbar-links" },
      { label: "Config footer", href: "/admin/footer-config", slug: "footer-config" },
      { label: "Links footer", href: "/admin/footer-links", slug: "footer-links" },
    ],
  },
  {
    group: "Secciones del homepage",
    links: [
      { label: "Encabezados", href: "/admin/section-content", slug: "section-content" },
      { label: "Hero", href: "/admin/hero", slug: "hero" },
      { label: "Stats de confianza", href: "/admin/trust-stats", slug: "trust-stats" },
      { label: "Logos de confianza", href: "/admin/trust-logos", slug: "trust-logos" },
      { label: "Tarjetas de dolor", href: "/admin/pain-cards", slug: "pain-cards" },
      { label: "Pilares del producto", href: "/admin/product-pillars", slug: "product-pillars" },
      { label: "Reglas de paywall", href: "/admin/paywall-rules", slug: "paywall-rules" },
      { label: "Planes de precios", href: "/admin/pricing-plans", slug: "pricing-plans" },
      { label: "Competidores", href: "/admin/competitors", slug: "competitors" },
      { label: "Implementacion", href: "/admin/implementation-steps", slug: "implementation-steps" },
      { label: "Metricas dashboard", href: "/admin/dashboard-metrics", slug: "dashboard-metrics" },
      { label: "Integraciones", href: "/admin/integrations", slug: "integrations" },
      { label: "Casos de exito", href: "/admin/case-studies", slug: "case-studies" },
      { label: "Diferenciadores", href: "/admin/differentiators", slug: "differentiators" },
      { label: "Estrategia salida", href: "/admin/exit-strategy", slug: "exit-strategy" },
      { label: "Preguntas frecuentes", href: "/admin/faq", slug: "faq" },
      { label: "CTA final", href: "/admin/cta-section", slug: "cta-section" },
    ],
  },
  {
    group: "Paginas",
    links: [
      { label: "Config piloto", href: "/admin/piloto-config", slug: "piloto-config" },
      { label: "Config contacto", href: "/admin/contacto-config", slug: "contacto-config" },
      { label: "Blog", href: "/admin/blog-posts", slug: "blog-posts" },
    ],
  },
  {
    group: "Leads",
    links: [
      { label: "Leads piloto", href: "/admin/piloto-leads", slug: "piloto-leads" },
      { label: "Leads contacto", href: "/admin/contacto-leads", slug: "contacto-leads" },
    ],
  },
];

// Flat array for backward compatibility
export const sidebarLinks = sidebarGroups.flatMap((g) => g.links);
