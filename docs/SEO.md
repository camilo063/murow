# Estrategia SEO

## Meta Tags

### Meta tags globales
Definidos en `src/app/layout.tsx` con el objeto `metadata` de Next.js:

- `title` — Template: `%s | PAYWL — Paywall Engine para Medios`
- `description` — Descripcion general del producto
- `keywords` — Keywords principales del negocio
- `openGraph` — Titulo, descripcion, URL, imagen, tipo `website`
- `twitter` — Card `summary_large_image`
- `robots` — `index, follow` con `max-snippet: -1, max-image-preview: large`
- `alternates.canonical` — `https://paywl.io`

### Meta tags por pagina
Cada pagina define su propio `export const metadata: Metadata` con titulo, descripcion y keywords especificos.

Paginas con meta tags personalizados:
- `/` (homepage) — via layout.tsx
- `/piloto` — Landing de conversion
- `/precios` — Planes y calculadora ROI
- `/docs` — Documentacion tecnica
- `/blog` — Blog de recursos
- `/integraciones` — Catalogo de integraciones

### Meta tags dinamicos desde BD
La tabla `PageMeta` permite sobreescribir meta tags por ruta desde el admin:
- `path` — Ruta de la pagina (ej: `/`, `/piloto`)
- `title` — Meta title
- `description` — Meta description
- `ogImage` — URL de imagen Open Graph

## Datos Estructurados (Schema.org)

Implementados como JSON-LD en `src/components/seo/StructuredData.tsx`:

### OrganizationSchema
- `@type: Organization`
- Nombre, URL, logo, descripcion
- Redes sociales (sameAs)
- Se incluye en el homepage

### SoftwareApplicationSchema
- `@type: SoftwareApplication`
- Categoria, sistema operativo, precio
- Ofertas con planes y precios
- Se incluye en el homepage y `/precios`

### FAQPageSchema
- `@type: FAQPage`
- Array de `Question` + `acceptedAnswer`
- Se genera dinamicamente desde las FaqItems de la BD
- Se incluye en el homepage (seccion FAQ)

### BreadcrumbSchema
- `@type: BreadcrumbList`
- Navegacion jerarquica para cada pagina
- Se incluye en todas las paginas internas

### ArticleSchema (Blog)
- `@type: Article`
- Titulo, autor, fechas, descripcion
- Se incluye en cada post individual del blog

## Archivos SEO

### robots.txt
Ubicacion: `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /_next/
Sitemap: https://paywl.io/sitemap.xml
```

### sitemap.xml
Generado dinamicamente por `src/app/sitemap.ts`.

Paginas incluidas:
- `/` — Homepage (priority 1.0, daily)
- `/piloto` — Landing conversion (priority 0.9, weekly)
- `/precios` — Precios (priority 0.8, weekly)
- `/docs` — Documentacion (priority 0.7, monthly)
- `/blog` — Blog index (priority 0.7, daily)
- `/integraciones` — Integraciones (priority 0.6, monthly)
- Posts individuales del blog (priority 0.6, weekly)

### llms.txt
Ubicacion: `public/llms.txt`

Archivo de texto estructurado para modelos de lenguaje (LLMs). Contiene:
- Identidad del producto
- Propuesta de valor
- Planes y precios
- Integraciones disponibles
- URLs de contacto

## Performance SEO (Core Web Vitals)

### Estrategias implementadas

| Metrica | Estrategia |
|---------|-----------|
| LCP | Server components cargan datos. Hero renderiza inmediatamente. Imagenes con priority. |
| FID/INP | Componentes cliente solo donde hay interactividad. Event handlers ligeros. |
| CLS | Layouts fijos. No hay contenido que salte. Fuentes con `display: swap`. |

### Optimizaciones
- **Server Components:** El homepage carga datos en el servidor con Prisma. Solo las secciones con animaciones/interactividad son client components.
- **Fuentes:** Inter se carga via `next/font/google` con `display: swap` y subset `latin`.
- **Bundle:** Imports de Lucide son individuales (no `import * from 'lucide-react'`).
- **Imagenes:** Next.js Image optimization con `next/image`.
- **CSS:** Tailwind purga clases no usadas en produccion.

## Keywords Principales

| Keyword | Pagina objetivo |
|---------|----------------|
| paywall medios digitales | Homepage |
| muro de pago periodicos | Homepage |
| monetizar contenido digital | Homepage, Blog |
| suscripciones medios LATAM | Homepage, Piloto |
| paywall SaaS | Precios |
| integracion paywall WordPress | Docs, Integraciones |
| MercadoPago suscripciones | Docs |
| SDK paywall JavaScript | Docs |
| alternativa Piano paywall | Homepage (comparacion) |
| calculadora ROI paywall | Precios |

## Checklist SEO

- [x] Meta title y description en todas las paginas
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Schema.org JSON-LD (Organization, Software, FAQ, Breadcrumb, Article)
- [x] robots.txt
- [x] sitemap.xml dinamico
- [x] llms.txt para modelos de lenguaje
- [x] Canonical URLs
- [x] HTML lang="es"
- [x] Heading hierarchy (H1 → H2 → H3)
- [x] Alt text en imagenes
- [x] URLs semanticas y limpias
- [x] Carga server-side de contenido critico
- [x] Font optimization con next/font
