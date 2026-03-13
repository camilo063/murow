# Panel de Administracion

## Acceso

| Campo | Valor |
|-------|-------|
| URL | `http://localhost:3001/admin` |
| Email | `admin@paywl.io` |
| Password | `P@ywl@dm1n2026!` |

## Autenticacion

- **Proveedor:** NextAuth.js v4 con Credentials provider
- **Estrategia:** JWT (sin base de datos de sesiones)
- **Config:** `src/lib/auth.ts`
- **API Route:** `src/app/api/auth/[...nextauth]/route.ts`

### Flujo de login
1. El usuario accede a `/admin` → redireccion a `/admin/login` si no esta autenticado
2. Envia email + password → NextAuth valida contra la tabla `User` (bcrypt)
3. Si es valido, se genera un JWT con `role: "admin"` en el token
4. El layout de admin verifica la sesion con `useSession()`

## Arquitectura

El admin usa un patron de **CRUD dinamico** con un solo set de componentes:

```
src/app/admin/
├── layout.tsx              # Auth guard + sidebar + topbar
├── page.tsx                # Dashboard con estadisticas
├── login/page.tsx          # Pagina de login
└── [section]/page.tsx      # Pagina CRUD dinamica
```

### Componentes clave

| Archivo | Funcion |
|---------|---------|
| `components/admin/section-config.ts` | Define campos, tipos y endpoints de las 18 secciones |
| `components/admin/DataTable.tsx` | Tabla con columnas dinamicas, acciones Edit/Delete |
| `components/admin/FormModal.tsx` | Modal con formulario generado desde la config de campos |
| `components/admin/SessionWrapper.tsx` | Wrapper de `SessionProvider` de NextAuth |

### API Route dinamica

Un solo archivo `src/app/api/admin/[section]/route.ts` maneja todo el CRUD:

| Metodo | Funcion |
|--------|---------|
| `GET` | Lista todos los registros de la seccion |
| `POST` | Crea un nuevo registro |
| `PUT` | Actualiza un registro existente (requiere `id` en body) |
| `DELETE` | Elimina un registro (requiere `id` en query string) |

La API mapea el slug de la URL al modelo de Prisma correspondiente.

## Secciones Administrables

| Slug | Modelo Prisma | Descripcion |
|------|---------------|-------------|
| `hero` | HeroSection | Contenido del hero del homepage |
| `trust-stats` | TrustStat | Estadisticas de la barra de confianza |
| `trust-logos` | TrustLogo | Logos de clientes |
| `pain-cards` | PainCard | Tarjetas de problemas |
| `product-pillars` | ProductPillar | Pilares del producto |
| `paywall-rules` | PaywallRule | Reglas de paywall |
| `pricing-plans` | PricingPlan | Planes de precios |
| `competitors` | Competitor | Tabla comparativa |
| `implementation-steps` | ImplementationStep | Timeline de implementacion |
| `dashboard-metrics` | DashboardMetric | Metricas del dashboard |
| `integrations` | Integration | Catalogo de integraciones |
| `case-studies` | CaseStudy | Casos de exito |
| `differentiators` | Differentiator | Diferenciadores PAYWL |
| `faq` | FaqItem | Preguntas frecuentes |
| `blog-posts` | BlogPost | Articulos del blog |
| `piloto-leads` | PilotoLead | Leads capturados (solo lectura) |
| `page-meta` | PageMeta | Meta tags SEO por pagina |
| `site-config` | SiteConfig | Configuracion general key-value |

## Tipos de Campo

La config de campos en `section-config.ts` soporta estos tipos:

| Tipo | Input | Uso |
|------|-------|-----|
| `text` | `<input type="text">` | Campos cortos (titulos, nombres, URLs) |
| `textarea` | `<textarea>` | Campos largos (descripciones, contenido) |
| `number` | `<input type="number">` | Numeros (precios, orden, step numbers) |
| `boolean` | Switch toggle | Flags (isActive, isRecommended, published) |
| `json` | `<textarea>` con validacion JSON | Arrays serializados (features, metrics) |
| `select` | `<select>` dropdown | Opciones predefinidas (status de integracion) |

## Secciones de solo lectura

La seccion `piloto-leads` tiene `readOnly: true`, lo que significa:
- No muestra botones de Crear/Editar/Eliminar
- Solo permite visualizar los leads recibidos del formulario publico

## Agregar una nueva seccion

1. Crear el modelo en `prisma/schema.prisma`
2. Ejecutar `npx prisma migrate dev --name add-new-model`
3. Agregar la config en `section-config.ts`:
   - Definir `endpoint`, `title`, y `fields`
4. Agregar el link en el array `sidebarLinks`
5. Agregar el mapeo slug → modelo en `src/app/api/admin/[section]/route.ts`

No se necesita crear paginas nuevas — el `[section]/page.tsx` dinamico las maneja automaticamente.

## Dashboard

La pagina principal del admin (`/admin`) muestra:
- Total de registros por seccion
- Leads recibidos recientes
- Accesos rapidos a las secciones mas usadas

Endpoint: `GET /api/admin/stats`
