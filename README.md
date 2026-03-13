# MUROW — The Paywall Engine for Media

Motor de paywall SaaS para medios digitales en America Latina. Construido por [Nivelics SAS](https://nivelics.com).

## Que es MUROW

MUROW es una plataforma SaaS que permite a medios digitales latinoamericanos monetizar su contenido con suscripciones de pago. Ofrece:

- **5 tipos de muro** configurables sin codigo (Hard, Metered, Lead Wall, Mobile Rule, Loyalty Wall)
- **Arquitectura desacoplada** — no modifica tu CMS, solo agrega un script JS de < 15KB
- **Pasarelas locales** — MercadoPago, PSE, Wompi, Stripe
- **Soberania de datos** — los datos de suscriptores viven en AWS y son 100% del medio
- **Panel de administracion** — CRUD completo para gestionar todo el contenido del sitio

## Tech Stack

| Capa | Tecnologia |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS + tailwindcss-animate |
| UI Components | Radix UI (Accordion, Dialog, Select, Switch, Tabs) |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Base de datos | SQLite via Prisma 7 + @prisma/adapter-better-sqlite3 |
| Autenticacion | NextAuth.js v4 (Credentials provider) |
| Formularios | React Hook Form + Zod |
| Node.js | v20 (requerido, usar nvm) |

## Requisitos

- **Node.js 20** (no compatible con Node 24)
- npm

## Instalacion

```bash
# Usar Node 20
nvm use 20

# Instalar dependencias
npm install

# Generar cliente Prisma
npx prisma generate

# Aplicar migraciones
npx prisma migrate dev

# Poblar la base de datos con contenido
npm run db:seed

# Iniciar servidor de desarrollo (puerto 3001)
npm run dev
```

## URLs

| URL | Descripcion |
|-----|------------|
| http://localhost:3001 | Sitio web publico |
| http://localhost:3001/admin | Panel de administracion |
| http://localhost:3001/piloto | Landing de conversion |
| http://localhost:3001/precios | Planes y precios + calculadora ROI |
| http://localhost:3001/docs | Documentacion tecnica |
| http://localhost:3001/blog | Blog / Recursos |
| http://localhost:3001/integraciones | Catalogo de integraciones |

## Credenciales Admin

| Campo | Valor |
|-------|-------|
| Email | `admin@murow.io` |
| Password | `Mur0w@dm1n2026!` |

## Scripts

```bash
npm run dev          # Servidor de desarrollo (puerto 3001)
npm run build        # Build de produccion
npm run start        # Servidor de produccion
npm run db:seed      # Poblar base de datos
npm run db:migrate   # Ejecutar migraciones
npm run db:reset     # Reset completo + seed
npm run db:studio    # Abrir Prisma Studio (UI de BD)
npm run lint         # ESLint
```

## Estructura del Proyecto

Ver [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) para la estructura completa.

## Variables de Entorno

Ver [docs/ENV.md](docs/ENV.md) para la configuracion de variables.

## Licencia

Confidencial — Nivelics SAS 2026. Uso exclusivo.
