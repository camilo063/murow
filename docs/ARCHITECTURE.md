# Arquitectura del Proyecto

## Vista General

```
paywl/
├── .env                        # Variables de entorno (NO commitear)
├── .nvmrc                      # Node 20
├── CLAUDE.md                   # Contexto para LLMs
├── README.md                   # Documentacion principal
├── dev.db                      # Base de datos SQLite
├── docs/                       # Documentacion del proyecto
│   ├── ARCHITECTURE.md         # Este archivo
│   ├── DATABASE.md             # Esquema de base de datos
│   ├── ENV.md                  # Variables de entorno
│   ├── ADMIN.md                # Panel de administracion
│   └── SEO.md                  # Estrategia SEO
├── prisma/
│   ├── schema.prisma           # Definicion de modelos
│   ├── prisma.config.ts        # Config de conexion (Prisma 7)
│   ├── seed.ts                 # Script de poblado
│   └── migrations/             # Historial de migraciones
├── public/
│   ├── robots.txt              # Directivas para crawlers
│   └── llms.txt                # Contexto para modelos de lenguaje
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # Componentes React
│   ├── generated/prisma/       # Cliente Prisma auto-generado
│   └── lib/                    # Utilidades compartidas
├── tailwind.config.ts          # Design tokens y temas
├── next.config.mjs             # Config de Next.js
├── tsconfig.json               # Config TypeScript
└── package.json                # Dependencias y scripts
```

## Capas de la Aplicacion

### 1. Capa de Presentacion (Frontend)

**Route Groups:**
- `(public)` — Paginas publicas con Navbar + Footer
- `admin` — Panel de administracion protegido

**Componentes organizados por funcion:**
- `components/sections/` — 13 secciones del homepage, cada una es un componente cliente con Framer Motion
- `components/layout/` — Navbar (client, scroll-aware) y Footer (server)
- `components/forms/` — Formularios interactivos (PilotoForm, ROICalculator, ContactoForm)
- `components/admin/` — Componentes del panel admin (DataTable, FormModal, section-config)
- `components/docs/` — Contenido de documentacion tecnica
- `components/seo/` — Schemas JSON-LD (Organization, SoftwareApplication, FAQPage, Breadcrumb)
- `components/ui/` — Utilidades UI (icon-map)

### 2. Capa de Datos (Backend)

**API Routes (`src/app/api/`):**

| Ruta | Metodo | Funcion |
|------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | Autenticacion NextAuth |
| `/api/admin/[section]` | GET/POST/PUT/DELETE | CRUD dinamico para todas las secciones |
| `/api/admin/stats` | GET | Estadisticas para dashboard admin |
| `/api/piloto` | POST | Recibe leads del formulario de piloto |
| `/api/contacto` | POST | Recibe mensajes del formulario de contacto |

**Base de datos:**
- SQLite almacenada como `dev.db` en raiz del proyecto
- Prisma 7 con adapter pattern (`@prisma/adapter-better-sqlite3`)
- Cliente singleton en `src/lib/prisma.ts`

### 3. Flujo de Datos Homepage

```
[Server Component] page.tsx
  └── Prisma queries (13 consultas en paralelo con Promise.all)
      └── Pasa data como props a cada seccion
          └── [Client Components] HeroSection, PainSection, etc.
              └── Framer Motion animations + interactividad
```

### 4. Flujo del Admin

```
[Client] /admin/login → NextAuth signIn()
  └── [Client] /admin/layout.tsx → useSession() + sidebar
      └── [Client] /admin/[section]/page.tsx
          └── Fetch GET /api/admin/[section]
          └── DataTable renderiza datos
          └── FormModal para Create/Edit
          └── DELETE con confirmacion
          └── API route mapea section slug → Prisma model
```

## Decisiones Tecnicas

### Por que SQLite y no PostgreSQL?
- El sitio es un CMS simple sin concurrencia alta
- SQLite permite zero-config, un solo archivo, facil backup
- Para produccion se puede migrar a PostgreSQL cambiando el adapter

### Por que Prisma 7 con adapter?
- Prisma 7 elimino `url` del schema en favor de adapters
- El adapter `better-sqlite3` maneja la conexion nativa
- La URL de conexion se define en `prisma.config.ts` (migraciones) y en `src/lib/prisma.ts` (runtime)

### Por que Next.js 14 y no 15?
- Estabilidad probada con el App Router
- Compatibilidad con todas las dependencias (NextAuth v4, Framer Motion, Radix)

### Por que un solo [section] dinamico en admin?
- Evita crear 18+ paginas casi identicas
- `section-config.ts` define campos, tipos y endpoints para cada seccion
- Un solo DataTable + FormModal + API route maneja todo el CRUD
