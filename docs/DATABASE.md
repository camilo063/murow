# Esquema de Base de Datos

## Motor

- **SQLite** via Prisma 7 con `@prisma/adapter-better-sqlite3`
- Archivo: `./dev.db` (raiz del proyecto)
- Schema: `prisma/schema.prisma`

## Modelos

### User
Usuarios del panel de administracion.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| email | String (unique) | Email de login |
| password | String | Hash bcrypt |
| name | String | Nombre visible |
| role | String | "admin" por defecto |
| createdAt | DateTime | Fecha de creacion |
| updatedAt | DateTime | Ultima actualizacion |

### HeroSection
Contenido de la seccion hero del homepage.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| headline | String | Titulo H1 principal |
| subheadline | String | Subtitulo |
| ctaPrimaryText | String | Texto boton primario |
| ctaPrimaryLink | String | URL boton primario |
| ctaSecondaryText | String | Texto boton secundario |
| ctaSecondaryLink | String | URL boton secundario |
| badgeText | String | Texto del badge flotante |
| isActive | Boolean | Si se muestra o no |

### TrustStat
Estadisticas de la barra de confianza (ej: "+50 proyectos", "12 paises").

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| value | String | Valor numerico como texto |
| label | String | Etiqueta descriptiva |
| sortOrder | Int | Orden de aparicion |

### TrustLogo
Logos de clientes en la barra de confianza.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| name | String | Nombre del medio (ej: "El Tiempo") |
| sortOrder | Int | Orden de aparicion |

### PainCard
Tarjetas de la seccion de problemas.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| icon | String | Nombre del icono Lucide (ej: "DollarSign") |
| headline | String | Titulo de la tarjeta |
| description | String | Texto descriptivo |
| sortOrder | Int | Orden |

### ProductPillar
Pilares del producto (Motor de Reglas, CRM, Soberania de Datos).

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| icon | String | Nombre icono Lucide |
| title | String | Titulo del pilar |
| description | String | Descripcion completa |
| impactNote | String | Nota de impacto comparativo |
| sortOrder | Int | Orden |

### PaywallRule
Las 5 reglas de negocio del paywall.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| ruleNumber | Int | Numero de regla (1-5) |
| icon | String | Nombre icono Lucide |
| name | String | Nombre interno (ej: "Hard Paywall") |
| visibleName | String | Nombre visible al usuario |
| description | String | Descripcion de la regla |
| useCase | String | Caso de uso editorial |
| example | String | Ejemplo practico |
| sortOrder | Int | Orden |

### PricingPlan
Planes de precios (Business, Performance, Enterprise).

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| name | String | Nombre del plan |
| slug | String (unique) | Slug URL |
| priceMonthly | Int | Precio mensual en USD |
| priceAnnual | Int | Precio anual en USD (con 20% descuento) |
| focus | String | Enfoque del plan |
| targetAudience | String | Para quien es |
| isRecommended | Boolean | Si es el plan destacado |
| features | String | JSON array de features |
| sortOrder | Int | Orden |

### Competitor
Tabla comparativa de competidores.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| name | String | Nombre del competidor |
| setup | String | Costo de setup |
| monthly | String | Costo mensual |
| localPayment | String | Soporte pasarelas locales |
| spanishSupport | String | Soporte en espanol |
| ownData | String | Propiedad de datos |
| implementation | String | Tiempo de implementacion |
| isHighlighted | Boolean | Si es la fila destacada (MUROW) |
| sortOrder | Int | Orden |

### ImplementationStep
Pasos del timeline de implementacion.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| stepNumber | Int | Numero de paso |
| title | String | Titulo del paso |
| timeframe | String | Tiempo estimado (ej: "Semanas 1-2") |
| activities | String | Actividades (texto concatenado con ". ") |
| deliverables | String | Entregables (texto concatenado con ". ") |
| sortOrder | Int | Orden |

### DashboardMetric
Metricas del dashboard de analytics.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| title | String | Nombre de la metrica |
| description | String | Descripcion |
| sortOrder | Int | Orden |

### Integration
Catalogo de integraciones por categoria.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| category | String | Categoria (CMS, Pasarelas de Pago, CRM, Analytics, Autenticacion) |
| name | String | Nombre de la integracion |
| status | String | DISPONIBLE, PROXIMAMENTE, ROADMAP |
| details | String | Detalles adicionales |
| sortOrder | Int | Orden |

### CaseStudy
Casos de exito / social proof.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| clientName | String | Nombre del cliente |
| description | String | Descripcion del cliente |
| challenge | String | Desafio que enfrentaba |
| solution | String | Solucion implementada |
| metrics | String | JSON array de metricas |
| testimonial | String | Cita testimonial |
| author | String | Autor del testimonio |
| isMain | Boolean | Si es el caso principal |
| sortOrder | Int | Orden |

### Differentiator
Diferenciadores de MUROW vs competencia.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| title | String | Titulo del diferenciador |
| points | String | JSON array de puntos |
| sortOrder | Int | Orden |

### FaqItem
Preguntas frecuentes.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| question | String | Pregunta |
| answer | String | Respuesta |
| sortOrder | Int | Orden |

### BlogPost
Articulos del blog.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| title | String | Titulo del articulo |
| slug | String (unique) | Slug URL |
| excerpt | String | Extracto corto |
| content | String | Contenido HTML completo |
| keywords | String | Keywords SEO |
| metaTitle | String | Meta title para SEO |
| metaDesc | String | Meta description |
| published | Boolean | Si esta publicado |
| createdAt | DateTime | Fecha de creacion |
| updatedAt | DateTime | Ultima actualizacion |

### PilotoLead
Leads capturados del formulario de piloto gratuito.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| fullName | String | Nombre completo |
| mediaName | String | Nombre del medio |
| position | String | Cargo |
| email | String | Email corporativo |
| country | String | Pais |
| pageViews | String | Rango de page views |
| currentCms | String | CMS actual |
| hasSubscription | String | Si tiene modelo de suscripciones |
| challenge | String | Mayor desafio (opcional) |
| createdAt | DateTime | Fecha de envio |

### PageMeta
Meta tags SEO por pagina.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| path | String (unique) | Ruta de la pagina (ej: "/", "/piloto") |
| title | String | Meta title |
| description | String | Meta description |
| ogImage | String | URL de imagen Open Graph |

### SiteConfig
Configuracion general del sitio (key-value).

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | String (cuid) | PK |
| key | String (unique) | Clave de configuracion |
| value | String | Valor |
| description | String | Descripcion de la clave |

## Notas sobre campos JSON

Algunos campos almacenan JSON como string y se parsean en el frontend:
- `PricingPlan.features` — Array de features del plan
- `CaseStudy.metrics` — Array de metricas del caso
- `Differentiator.points` — Array de puntos diferenciadores

Usar `JSON.parse()` al leer y `JSON.stringify()` al escribir.

## Seed

El script `prisma/seed.ts` pobla todas las tablas con el contenido del documento maestro MUROW. Se ejecuta con:

```bash
npm run db:seed
```

Para resetear completamente la BD y repoblar:

```bash
npm run db:reset
```
