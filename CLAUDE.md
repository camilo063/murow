# PAYWL — Contexto para Claude / LLMs

## Identidad del Proyecto

PAYWL (pronunciado "MU-row") es el sitio web comercial de un producto SaaS de paywall para medios digitales en America Latina. El nombre viene de "muro" (barrera de contenido) con una W al final para darle identidad de marca internacional. Es un producto de **Nivelics SAS**, empresa colombiana con presencia en USA y 14 anos de experiencia en medios digitales.

## Que hace este repositorio

Este repositorio contiene el **sitio web de marketing + panel de administracion** de PAYWL. NO es el motor de paywall en si (ese es un backend separado). Este sitio:

1. **Presenta el producto** a potenciales clientes (medios digitales en LATAM)
2. **Captura leads** via formulario de piloto gratuito
3. **Administra todo el contenido** del sitio via panel CMS propio
4. **Posiciona organicamente** via SEO agresivo (meta tags, Schema.org, robots.txt, llms.txt, sitemap)

## Stack Tecnico

- **Framework**: Next.js 14 con App Router, TypeScript
- **Base de datos**: SQLite via Prisma 7 con adapter better-sqlite3
- **Autenticacion admin**: NextAuth.js v4 con Credentials
- **Estilos**: Tailwind CSS con design tokens de marca
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Formularios**: React Hook Form + Zod
- **Node.js**: Requiere v20 (incompatible con v24). Usar `nvm use 20`

## Estructura Clave

```
src/
  app/
    (public)/          # Paginas publicas (layout con Navbar + Footer)
      page.tsx         # Homepage — 13 secciones, server component que fetch de Prisma
      piloto/          # Landing de conversion con formulario
      precios/         # Planes + calculadora ROI
      blog/            # Listado + [slug] individual
      docs/            # Documentacion tecnica
      integraciones/   # Catalogo de integraciones
      privacidad/      # Politica de privacidad
      terminos/        # Terminos de servicio
      contacto/        # Formulario de contacto
    admin/             # Panel de administracion (protegido con NextAuth)
      login/           # Login page
      [section]/       # CRUD dinamico para todas las secciones
    api/
      auth/            # NextAuth endpoints
      admin/           # API CRUD para admin ([section]/route.ts)
      piloto/          # Endpoint para formulario de piloto
      contacto/        # Endpoint para formulario de contacto
  components/
    sections/          # 13 secciones del homepage (HeroSection, PainSection, etc.)
    layout/            # Navbar, Footer
    admin/             # DataTable, FormModal, section-config
    forms/             # PilotoForm, ROICalculator, ContactoForm
    docs/              # DocsContent (documentacion tecnica)
    seo/               # StructuredData (Schema.org JSON-LD)
    ui/                # icon-map
  lib/
    prisma.ts          # Cliente Prisma singleton con adapter SQLite
    auth.ts            # Configuracion NextAuth
    utils.ts           # cn() utility
  generated/prisma/    # Cliente Prisma generado (NO editar)
prisma/
  schema.prisma        # Modelos de datos
  seed.ts              # Script de poblado de base de datos
  migrations/          # Migraciones SQL
```

## Colores de Marca

| Nombre | HEX | Uso |
|--------|-----|-----|
| Deep Navy | #0A2540 | Fondos hero, headers, texto principal |
| Electric Cyan | #00B4D8 | CTAs, highlights, links activos |
| Vibrant Orange | #FF6B35 | Badges, precios, urgencia |
| Sky Blue | #F0F7FF | Fondos de secciones alternas |
| Slate Gray | #4A5568 | Cuerpo de texto |

## Base de Datos

El archivo SQLite esta en `./dev.db` (raiz del proyecto, NO en prisma/). Prisma 7 requiere el adapter pattern — no soporta `url` en el schema, la conexion se configura en `prisma.config.ts` y en `src/lib/prisma.ts`.

### Modelos principales

- `User` — Admin users (login)
- `HeroSection` — Contenido del hero
- `TrustStat`, `TrustLogo` — Barra de confianza
- `PainCard` — Tarjetas de problemas
- `ProductPillar` — Pilares del producto
- `PaywallRule` — 5 reglas de negocio
- `PricingPlan` — 3 planes de precios
- `Competitor` — Tabla comparativa
- `ImplementationStep` — Timeline de implementacion
- `DashboardMetric` — Metricas del dashboard
- `Integration` — Integraciones (CMS, pagos, CRM, analytics)
- `CaseStudy` — Casos de exito
- `Differentiator` — Diferenciadores
- `FaqItem` — Preguntas frecuentes
- `BlogPost` — Articulos del blog
- `PilotoLead` — Leads del formulario
- `PageMeta` — SEO meta tags por pagina

## Patrones Importantes

1. **Secciones como default exports**: Todos los componentes de seccion usan `export default function`
2. **Framer Motion ease**: Las strings de ease requieren `as const` para TypeScript
3. **Admin dinamico**: Un solo `[section]/page.tsx` maneja CRUD de todas las secciones, configurado via `section-config.ts`
4. **Datos como props**: El homepage es server component que fetch de Prisma y pasa props a secciones client
5. **Puerto 3001**: El proyecto corre en puerto 3001 (3000 esta reservado para otro proyecto)

## Comandos Utiles

```bash
nvm use 20                    # SIEMPRE antes de cualquier comando
npm run dev                   # Dev server en :3001
npm run build                 # Build de produccion
npm run db:seed               # Poblar BD
npm run db:studio             # UI visual de la BD
npx prisma migrate dev        # Nueva migracion
```

## Credenciales Admin

- Email: `admin@paywl.io`
- Password: `Mur0w@dm1n2026!`
