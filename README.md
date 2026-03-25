# PAYWL — The Paywall Engine for Media

Motor de paywall SaaS para medios digitales en America Latina. Construido por [Nivelics SAS](https://nivelics.com).

## Que es PAYWL

PAYWL es una plataforma SaaS que permite a medios digitales latinoamericanos monetizar su contenido con suscripciones de pago. Este repositorio contiene el **sitio web de marketing + panel de administracion CMS** del producto. NO es el motor de paywall en si (ese es un backend separado).

El sitio:

1. **Presenta el producto** a potenciales clientes (medios digitales en LATAM)
2. **Captura leads** via formularios de piloto gratuito y contacto
3. **Administra el 100% del contenido** del sitio via panel CMS propio en `/admin`
4. **Posiciona organicamente** via SEO (meta tags, Schema.org, robots.txt, llms.txt, sitemap)

## Tech Stack

| Capa | Tecnologia |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS + tailwindcss-animate |
| UI Components | Radix UI (Accordion, Dialog, Select, Switch, Tabs) |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Base de datos | PostgreSQL (Neon) via Prisma 7 + @prisma/adapter-neon |
| Autenticacion | NextAuth.js v4 (Credentials provider) |
| Formularios | React Hook Form + Zod |
| Node.js | v20 (requerido, usar `nvm use 20`) |

## Requisitos

- **Node.js 20** (no compatible con Node 24)
- npm
- Cuenta en [Neon](https://neon.tech) para PostgreSQL (o cualquier PostgreSQL compatible)

## Instalacion

```bash
# 1. Usar Node 20
nvm use 20

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores (ver seccion Variables de Entorno)

# 4. Sincronizar esquema con la base de datos
npx prisma db push

# 5. Generar cliente Prisma
npx prisma generate

# 6. Poblar la base de datos con contenido inicial
npx tsx prisma/seed.ts

# 7. Poblar modelos adicionales del admin (si es primera vez)
npx tsx prisma/seed-new-models.ts

# 8. Iniciar servidor de desarrollo (puerto 3001)
npm run dev
```

## Variables de Entorno

Crear archivo `.env` en la raiz del proyecto:

```env
# Base de datos (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="tu-secret-aleatorio-seguro"
NEXTAUTH_URL="http://localhost:3001"

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# HubSpot (opcional — para sincronizar leads)
HUBSPOT_API_KEY=""

# Resend (opcional — para emails transaccionales)
RESEND_API_KEY=""

# Calendly (opcional — embed en pagina de contacto)
NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/paywl/demo"
```

## URLs

| URL | Descripcion |
|-----|------------|
| http://localhost:3001 | Sitio web publico (homepage con 13 secciones) |
| http://localhost:3001/admin | Panel de administracion CMS |
| http://localhost:3001/admin/login | Login del admin |
| http://localhost:3001/piloto | Landing de conversion (formulario piloto) |
| http://localhost:3001/precios | Planes, precios y calculadora ROI |
| http://localhost:3001/contacto | Formulario de contacto |
| http://localhost:3001/blog | Blog / Recursos |
| http://localhost:3001/docs | Documentacion tecnica |
| http://localhost:3001/integraciones | Catalogo de integraciones |
| http://localhost:3001/privacidad | Politica de privacidad |
| http://localhost:3001/terminos | Terminos de servicio |

## Credenciales Admin

| Campo | Valor |
|-------|-------|
| Email | `admin@paywl.io` |
| Password | `P@ywl@dm1n2026!` |

## Scripts

```bash
npm run dev            # Servidor de desarrollo (puerto 3001)
npm run build          # Build de produccion
npm run start          # Servidor de produccion
npm run db:seed        # Poblar base de datos (seed principal)
npm run db:studio      # Abrir Prisma Studio (UI visual de la BD)
npm run lint           # ESLint
npx prisma db push     # Sincronizar esquema con BD
npx prisma generate    # Regenerar cliente Prisma
npx tsx prisma/seed-new-models.ts  # Seed de modelos del admin extendido
```

## Estructura del Proyecto

```
src/
  app/
    (public)/              # Paginas publicas (layout con Navbar + Footer dinamicos)
      layout.tsx           # Fetch de NavbarConfig/FooterConfig desde DB
      page.tsx             # Homepage — 13 secciones, server component
      piloto/              # Landing de conversion (lee PilotoConfig de DB)
      precios/             # Planes + calculadora ROI
      blog/                # Listado + [slug] individual
      docs/                # Documentacion tecnica
      integraciones/       # Catalogo de integraciones
      contacto/            # Formulario de contacto (lee ContactoConfig de DB)
      privacidad/          # Politica de privacidad
      terminos/            # Terminos de servicio
    admin/                 # Panel de administracion (protegido con NextAuth)
      login/               # Login page
      page.tsx             # Dashboard con stats de todos los modelos
      [section]/           # CRUD dinamico para las 28 secciones
    api/
      auth/                # NextAuth endpoints
      admin/
        [section]/route.ts # API CRUD dinamica (GET/POST/PUT/DELETE)
        stats/route.ts     # Conteo de registros para dashboard
      upload/route.ts      # Upload de imagenes (POST, max 5MB)
      piloto/              # Endpoint para formulario de piloto
      contacto/            # Endpoint para formulario de contacto (guarda en DB)
  components/
    sections/              # 13 secciones del homepage
    layout/                # Navbar (dinamico), Footer (dinamico)
    admin/                 # DataTable, FormModal (con ImageUpload), section-config
    forms/                 # PilotoForm, ROICalculator, ContactoForm
    docs/                  # DocsContent
    seo/                   # StructuredData (Schema.org JSON-LD)
    ui/                    # icon-map (Lucide icons)
  lib/
    prisma.ts              # Cliente Prisma singleton con adapter Neon
    auth.ts                # Configuracion NextAuth
    utils.ts               # cn() utility
  generated/prisma/        # Cliente Prisma generado (NO editar)
prisma/
  schema.prisma            # 29 modelos de datos
  prisma.config.ts         # Configuracion datasource
  seed.ts                  # Seed principal
  seed-new-models.ts       # Seed de modelos del admin extendido
public/
  uploads/                 # Imagenes subidas desde el admin
```

## Base de Datos — 29 Modelos

### Sistema
| Modelo | Descripcion |
|--------|------------|
| `User` | Usuarios admin (autenticacion) |
| `SiteConfig` | Configuracion clave-valor del sitio |

### Homepage — Secciones
| Modelo | Seccion del sitio |
|--------|------------------|
| `HeroSection` | Banner principal con CTAs |
| `TrustStat` | Estadisticas de confianza ("+50 proyectos", etc.) |
| `TrustLogo` | Logos de medios aliados |
| `PainCard` | Tarjetas de problemas del mercado |
| `ProductPillar` | 3 pilares del producto |
| `PaywallRule` | 5 tipos de reglas de paywall |
| `PricingPlan` | Planes de precios (Business, Performance, Enterprise) |
| `Competitor` | Tabla comparativa vs competidores |
| `ImplementationStep` | Timeline de implementacion |
| `DashboardMetric` | Metricas del panel analitico |
| `Integration` | Catalogo de integraciones |
| `CaseStudy` | Casos de exito con testimonios |
| `Differentiator` | Columnas de diferenciadores |
| `ExitStrategyItem` | Items de estrategia de salida |
| `FaqItem` | Preguntas frecuentes |
| `CtaSection` | Bloque CTA final de la pagina |
| `SectionContent` | Titulo y subtitulo de cada seccion (por sectionKey) |

### Layout
| Modelo | Descripcion |
|--------|------------|
| `NavbarConfig` | Logo, textos y links de los CTAs del navbar |
| `NavbarLink` | Links de navegacion del navbar |
| `FooterConfig` | Logo, tagline, slogan, copyright del footer |
| `FooterLink` | Links del footer agrupados por columna |

### Paginas
| Modelo | Descripcion |
|--------|------------|
| `BlogPost` | Articulos del blog |
| `ContactoConfig` | Configuracion de la pagina de contacto |
| `PilotoConfig` | Configuracion de la pagina de piloto |
| `PageMeta` | Meta tags SEO por ruta |

### Leads (solo lectura)
| Modelo | Descripcion |
|--------|------------|
| `PilotoLead` | Solicitudes de piloto gratuito |
| `ContactoLead` | Mensajes del formulario de contacto |

## Panel de Administracion

El admin en `/admin` tiene **28 secciones CRUD** organizadas en 5 grupos:

- **General**: Dashboard, Config del sitio, Meta tags SEO
- **Layout**: Config navbar, Links navbar, Config footer, Links footer
- **Secciones del homepage**: Hero, Stats, Logos, Pain Cards, Pilares, Reglas, Precios, Competidores, Implementacion, Metricas, Integraciones, Casos de exito, Diferenciadores, Estrategia de salida, FAQ, CTA final, Encabezados
- **Paginas**: Config piloto, Config contacto, Blog
- **Leads**: Leads piloto (read-only), Leads contacto (read-only)

### Caracteristicas del admin
- CRUD dinamico basado en `section-config.ts` — un solo `[section]/page.tsx` maneja todas las secciones
- Upload de imagenes con preview (tipo `image` en campos)
- Dashboard con conteo de registros de todos los modelos
- Labels del admin en espanol
- Sidebar agrupado por categorias

## Patrones Importantes

1. **Secciones como default exports**: Todos los componentes de seccion usan `export default function`
2. **Framer Motion ease**: Las strings de ease requieren `as const` para TypeScript
3. **Admin dinamico**: Un solo `[section]/page.tsx` maneja CRUD de todas las secciones, configurado via `section-config.ts`
4. **Datos como props**: El homepage es server component que fetch de Prisma y pasa props a secciones client
5. **Puerto 3001**: El proyecto corre en puerto 3001 (3000 esta reservado)
6. **Fallbacks con ??**: Todos los componentes tienen valores por defecto para no romperse si la DB esta vacia
7. **Prisma 7 + Neon**: Usa adapter pattern con `@prisma/adapter-neon` + WebSocket via `ws` para seeds
8. **Upload de imagenes**: `POST /api/upload` guarda en `public/uploads/`, max 5MB, tipos JPG/PNG/WebP/SVG/GIF

## Colores de Marca

| Nombre | HEX | Uso |
|--------|-----|-----|
| Deep Navy | `#0A2540` | Fondos hero, headers, texto principal |
| Electric Cyan | `#00B4D8` | CTAs, highlights, links activos |
| Dark Cyan | `#0077A8` | Gradientes, acentos secundarios |
| Vibrant Orange | `#FF6B35` | Badges, precios, urgencia |
| Sky Blue | `#F0F7FF` | Fondos de secciones alternas |
| Slate Gray | `#4A5568` | Cuerpo de texto |

## SEO

- Meta tags por pagina via modelo `PageMeta`
- Schema.org JSON-LD: Organization, SoftwareApplication, FAQPage, BreadcrumbList
- Sitemap automatico en `/sitemap.xml`
- Robots.txt configurado
- `llms.txt` para indexacion por LLMs

## Licencia

Confidencial — Nivelics SAS 2026. Uso exclusivo.
