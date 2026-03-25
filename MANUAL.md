# MANUAL DE ADMINISTRACION — PAYWL CMS

> Este documento es el input para generar un manual detallado paso a paso de como administrar el sitio web de PAYWL desde el panel de administracion.

---

## CONTEXTO GENERAL

PAYWL es el sitio web de marketing de un producto SaaS de paywall para medios digitales en America Latina. El sitio tiene un panel de administracion en `/admin` que permite gestionar el 100% del contenido visible sin tocar codigo.

### Acceso al admin
- **URL**: `https://[dominio]/admin`
- **Login**: `https://[dominio]/admin/login`
- **Credenciales**: Email y password configurados en la base de datos (modelo `User`)

### Estructura del admin
El sidebar izquierdo tiene 5 grupos con 28 secciones:
- **General** (3 secciones)
- **Layout** (4 secciones)
- **Secciones del homepage** (17 secciones)
- **Paginas** (3 secciones)
- **Leads** (2 secciones, solo lectura)

### Operaciones disponibles por seccion
- **Crear**: Boton "Add New" en la parte superior derecha
- **Editar**: Boton "Edit" en cada fila de la tabla
- **Eliminar**: Boton "Delete" con confirmacion
- **Solo lectura**: Leads de piloto y contacto solo permiten ver registros

---

## GRUPO 1: GENERAL

### 1.1 Dashboard (`/admin`)
- Muestra conteo de registros de todos los modelos
- 22 tarjetas con estadisticas en tiempo real
- No tiene CRUD, es solo visualizacion

### 1.2 Config del sitio (`/admin/site-config`)
- **Modelo**: `SiteConfig`
- **Uso**: Almacenar configuraciones clave-valor globales del sitio
- **Campos**:
  - `Clave` (text, requerido) — Identificador unico de la configuracion (ej: "site_name", "analytics_id")
  - `Valor` (textarea, requerido) — El valor de la configuracion
  - `Descripcion` (text) — Descripcion interna de para que sirve esta clave
- **Ejemplo de uso**: Almacenar textos globales, URLs de servicios externos, flags de funcionalidad

### 1.3 Meta tags SEO (`/admin/page-meta`)
- **Modelo**: `PageMeta`
- **Uso**: Controlar titulo, descripcion y imagen OG de cada pagina del sitio para SEO
- **Campos**:
  - `Ruta de pagina` (text, requerido) — Path de la pagina (ej: "/", "/precios", "/blog", "/piloto")
  - `Titulo` (text, requerido) — Tag `<title>` de la pagina
  - `Descripcion` (textarea, requerido) — Meta description para buscadores
  - `Imagen OG` (imagen, file upload) — Imagen para compartir en redes sociales (1200x630px recomendado)
- **Importante**: La ruta debe ser unica. Crear una entrada por cada pagina del sitio.

---

## GRUPO 2: LAYOUT

### 2.1 Config navbar (`/admin/navbar-config`)
- **Modelo**: `NavbarConfig`
- **Uso**: Controlar el logo y los botones CTA de la barra de navegacion superior
- **Campos**:
  - `Texto del logo` (text, requerido) — Texto que aparece como logo (ej: "PAYWL")
  - `Texto CTA primario` (text, requerido) — Texto del primer boton del navbar (ej: "Ver Demo")
  - `Enlace CTA primario` (text, requerido) — URL del primer boton (ej: "#demo")
  - `Texto CTA secundario` (text, requerido) — Texto del segundo boton (ej: "Piloto Gratuito")
  - `Enlace CTA secundario` (text, requerido) — URL del segundo boton (ej: "/piloto")
- **Nota**: Solo debe existir 1 registro. Si hay multiples, se usa el primero.

### 2.2 Links navbar (`/admin/navbar-links`)
- **Modelo**: `NavbarLink`
- **Uso**: Los links de navegacion que aparecen en el centro del navbar
- **Campos**:
  - `Etiqueta` (text, requerido) — Texto visible del link (ej: "Precios", "Blog")
  - `URL del enlace` (text, requerido) — URL destino. Usar "#seccion" para scroll interno, "/ruta" para paginas
  - `Orden` (number) — Posicion en el navbar (1, 2, 3...)
  - `Activo` (boolean) — Si esta desactivado, el link no aparece en el navbar
- **Ejemplo**: Producto (#producto), Precios (/precios), Blog (/blog), Docs (/docs)

### 2.3 Config footer (`/admin/footer-config`)
- **Modelo**: `FooterConfig`
- **Uso**: Controlar branding del footer
- **Campos**:
  - `Texto del logo` (text, requerido) — Logo del footer (ej: "PAYWL")
  - `Tagline` (text, requerido) — Frase debajo del logo (ej: "The Paywall Engine for Media")
  - `Slogan` (text, requerido) — Slogan de marca (ej: "Tus datos. Tu medio. Tu control.")
  - `Copyright` (text, requerido) — Texto de copyright del footer
- **Nota**: Solo debe existir 1 registro.

### 2.4 Links footer (`/admin/footer-links`)
- **Modelo**: `FooterLink`
- **Uso**: Links organizados en columnas del footer
- **Campos**:
  - `Nombre de columna` (text, requerido) — Nombre de la columna donde va el link (ej: "Producto", "Recursos", "Empresa"). Los links se agrupan automaticamente por este campo.
  - `Etiqueta` (text, requerido) — Texto visible del link
  - `URL del enlace` (text, requerido) — URL destino
  - `Orden` (number) — Posicion dentro de su columna
- **Importante**: El nombre de columna determina la agrupacion. Usar nombres consistentes (ej: siempre "Producto", no a veces "Productos").

---

## GRUPO 3: SECCIONES DEL HOMEPAGE

El homepage tiene 13 secciones visibles. Cada seccion tiene su titulo y subtitulo administrables via "Encabezados", y su contenido especifico en su propia seccion del admin.

### 3.1 Encabezados de secciones (`/admin/section-content`)
- **Modelo**: `SectionContent`
- **Uso**: Titulo y subtitulo de CADA seccion del homepage. Esto controla los textos grandes que aparecen arriba de cada bloque.
- **Campos**:
  - `Clave de seccion` (text, requerido, unico) — Identificador de la seccion. Claves validas:
    - `pain` — Seccion de problemas
    - `what-is` — Seccion "Que es PAYWL"
    - `rules` — Seccion de reglas
    - `pricing` — Seccion de precios
    - `comparison` — Seccion comparativa
    - `implementation` — Seccion de implementacion
    - `analytics` — Seccion de analytics
    - `integrations` — Seccion de integraciones
    - `case-study` — Seccion de casos de exito
    - `why-paywl` — Seccion "Por que PAYWL"
    - `faq` — Seccion de preguntas frecuentes
  - `Titulo` (textarea, requerido) — Titulo grande de la seccion
  - `Subtitulo` (textarea) — Parrafo descriptivo debajo del titulo
- **Importante**: NO crear claves nuevas que no esten en la lista. El frontend solo lee las 11 claves listadas.

### 3.2 Hero (`/admin/hero`)
- **Modelo**: `HeroSection`
- **Uso**: El banner principal del sitio con titulo grande, subtitulo, badge y 2 botones CTA
- **Campos**:
  - `Titulo principal` (text) — Headline del hero
  - `Subtitulo` (textarea) — Parrafo descriptivo
  - `Texto CTA primario` (text) — Boton naranja principal (ej: "Quiero el piloto gratuito")
  - `Enlace CTA primario` (text) — URL del boton principal (ej: "/piloto")
  - `Texto CTA secundario` (text) — Boton secundario (ej: "Ver como funciona")
  - `Enlace CTA secundario` (text) — URL del boton secundario (ej: "#que-es-paywl")
  - `Texto del badge` (text) — Badge naranja arriba del titulo
  - `Activo` (boolean) — Solo el hero activo se muestra. Si hay multiples, se usa el primero activo.

### 3.3 Stats de confianza (`/admin/trust-stats`)
- **Modelo**: `TrustStat`
- **Uso**: Estadisticas numericas que aparecen debajo del hero (ej: "+50 proyectos")
- **Campos**:
  - `Valor` (text) — El numero o valor (ej: "+50", "14", "+200K")
  - `Etiqueta` (text) — Descripcion del valor (ej: "proyectos digitales para medios")
  - `Orden` (number) — Posicion de izquierda a derecha

### 3.4 Logos de confianza (`/admin/trust-logos`)
- **Modelo**: `TrustLogo`
- **Uso**: Nombres de medios que aparecen como logos de texto debajo del hero
- **Campos**:
  - `Nombre` (text) — Nombre del medio (se muestra como texto estilizado)
  - `Orden` (number)
- **Nota**: Actualmente se muestran como texto, no como imagenes. Para imagenes reales, usar el campo nombre con el nombre exacto del medio.

### 3.5 Tarjetas de dolor (`/admin/pain-cards`)
- **Modelo**: `PainCard`
- **Uso**: 3 tarjetas que explican los problemas del mercado que PAYWL resuelve
- **Campos**:
  - `Icono (Lucide)` (text) — Nombre del icono de Lucide React (ej: "DollarSign", "Globe", "Shield")
  - `Titulo` (text) — Titulo de la tarjeta
  - `Descripcion` (textarea) — Texto explicativo
  - `Orden` (number)
- **Iconos disponibles**: Consultar https://lucide.dev/icons para nombres exactos

### 3.6 Pilares del producto (`/admin/product-pillars`)
- **Modelo**: `ProductPillar`
- **Uso**: 3 pilares que explican que es PAYWL
- **Campos**:
  - `Icono (Lucide)` (text) — Nombre del icono
  - `Titulo` (text) — Nombre del pilar
  - `Descripcion` (textarea) — Explicacion
  - `Nota de impacto` (text) — Frase resaltada debajo (con borde azul)
  - `Orden` (number)

### 3.7 Reglas de paywall (`/admin/paywall-rules`)
- **Modelo**: `PaywallRule`
- **Uso**: Las 5 reglas de negocio del paywall
- **Campos**:
  - `Numero de regla` (number) — 1 a 5
  - `Icono (Lucide)` (text) — Nombre del icono
  - `Nombre interno` (text) — ID interno de la regla
  - `Nombre visible` (text) — Nombre que ve el usuario
  - `Descripcion` (textarea) — Explicacion de la regla
  - `Caso de uso` (textarea) — Cuando usar esta regla
  - `Ejemplo` (textarea) — Ejemplo practico (aparece en recuadro naranja)
  - `Orden` (number)

### 3.8 Planes de precios (`/admin/pricing-plans`)
- **Modelo**: `PricingPlan`
- **Uso**: Los 3 planes de precios
- **Campos**:
  - `Nombre del plan` (text) — Ej: "Business", "Performance", "Enterprise"
  - `Slug (URL)` (text, unico) — Ej: "business", "performance", "enterprise"
  - `Precio mensual (USD)` (number) — Precio entero sin decimales
  - `Precio anual (USD)` (number) — Precio entero con descuento anual
  - `Enfoque` (text) — Frase corta del foco del plan
  - `Audiencia objetivo` (text) — Para quien es este plan
  - `Recomendado` (boolean) — Marca un plan como "Mas popular"
  - `Caracteristicas (JSON)` (json) — Lista de features, una por linea separada con `\n`
  - `Orden` (number)
- **Formato de features**: Escribir cada feature en una linea nueva. Ej:
  ```
  Hasta 500K page views/mes
  5 reglas de paywall
  Dashboard basico
  Soporte por email
  ```

### 3.9 Competidores (`/admin/competitors`)
- **Modelo**: `Competitor`
- **Uso**: Tabla comparativa PAYWL vs competidores
- **Campos**:
  - `Nombre` — Nombre del competidor
  - `Costo setup` — Costo de implementacion
  - `Mensualidad` — Costo mensual
  - `Pasarela local` — "Si", "No", "Parcial" (se muestra como icono check/X/warning)
  - `Soporte en espanol` — "Si", "No", "Parcial"
  - `Datos propios` — "Si", "No", "Parcial"
  - `Implementacion` — Tiempo de implementacion
  - `Destacado` (boolean) — Resalta la fila (usar para PAYWL)
  - `Orden` (number)

### 3.10 Implementacion (`/admin/implementation-steps`)
- **Modelo**: `ImplementationStep`
- **Uso**: Timeline de pasos de implementacion
- **Campos**:
  - `Numero de paso` (number) — 1, 2, 3, 4
  - `Titulo` (text) — Nombre del paso
  - `Tiempo estimado` (text) — Ej: "Semana 1-2"
  - `Actividades (JSON)` (json) — Lista de actividades separadas por ". " (punto y espacio)
  - `Entregables (JSON)` (json) — Lista de entregables separadas por ". "
  - `Orden` (number)
- **Formato**: Las actividades y entregables son strings separados por ". " (punto espacio), no JSON arrays.

### 3.11 Metricas dashboard (`/admin/dashboard-metrics`)
- **Modelo**: `DashboardMetric`
- **Uso**: Tarjetas de metricas que muestra el panel analitico de PAYWL
- **Campos**:
  - `Titulo` (text) — Nombre de la metrica (ej: "Tasa de conversion")
  - `Descripcion` (textarea) — Explicacion de la metrica
  - `Orden` (number)

### 3.12 Integraciones (`/admin/integrations`)
- **Modelo**: `Integration`
- **Uso**: Catalogo de integraciones del producto
- **Campos**:
  - `Categoria` (text) — Grupo (ej: "CMS", "Pasarelas de pago", "Analytics", "CRM")
  - `Nombre` (text) — Nombre de la integracion (ej: "WordPress", "Stripe")
  - `Estado` (select) — "Disponible", "Proximamente", "Planeado"
  - `Detalles` (text) — Descripcion corta
  - `Orden` (number)
- **Nota**: Las integraciones se agrupan automaticamente por categoria en el frontend.

### 3.13 Casos de exito (`/admin/case-studies`)
- **Modelo**: `CaseStudy`
- **Uso**: Casos de exito con metricas y testimonios
- **Campos**:
  - `Nombre del cliente` (text) — Nombre del medio
  - `Descripcion` (textarea) — Descripcion breve del medio
  - `Desafio` (textarea) — Problema que tenia
  - `Solucion` (textarea) — Como PAYWL lo resolvio
  - `Metricas (JSON)` (json) — JSON array con formato: `[{"label":"Conversion","value":"+340%"},{"label":"MRR","value":"$12K"}]`
  - `Testimonio` (textarea) — Cita textual del cliente
  - `Autor` (text) — Nombre de quien da el testimonio
  - `Caso principal` (boolean) — Solo el caso principal aparece destacado en el homepage
  - `Orden` (number)

### 3.14 Diferenciadores (`/admin/differentiators`)
- **Modelo**: `Differentiator`
- **Uso**: 3 columnas en la seccion "Por que PAYWL"
- **Campos**:
  - `Titulo` (text) — Titulo de la columna
  - `Puntos (JSON)` (json) — JSON array de strings: `["Punto 1","Punto 2","Punto 3"]`
  - `Orden` (number)

### 3.15 Estrategia de salida (`/admin/exit-strategy`)
- **Modelo**: `ExitStrategyItem`
- **Uso**: Items del "Exit Strategy" (compromiso de transparencia) en la seccion Por que PAYWL
- **Campos**:
  - `Titulo` (text) — Nombre del compromiso (ej: "Entrega de Data")
  - `Descripcion` (textarea) — Explicacion detallada
  - `Orden` (number)

### 3.16 Preguntas frecuentes (`/admin/faq`)
- **Modelo**: `FaqItem`
- **Uso**: Seccion FAQ con acordeon desplegable
- **Campos**:
  - `Pregunta` (text) — La pregunta
  - `Respuesta` (textarea) — La respuesta (texto plano)
  - `Orden` (number)
- **SEO**: Las FAQ se convierten automaticamente en Schema.org FAQPage para Google rich results.

### 3.17 CTA final (`/admin/cta-section`)
- **Modelo**: `CtaSection`
- **Uso**: Bloque de llamada a la accion al final del homepage
- **Campos**:
  - `Titulo principal` (text) — Headline grande
  - `Subtitulo` (textarea) — Parrafo descriptivo
  - `Texto CTA primario` (text) — Boton naranja (ej: "Quiero el piloto gratuito de 3 meses")
  - `Enlace CTA primario` (text) — URL del boton (ej: "/piloto")
  - `Texto CTA secundario` (text) — Boton outline (ej: "Hablar con un experto")
  - `Enlace CTA secundario` (text) — URL (ej: "https://calendly.com/paywl/demo")
  - `Texto de disclaimer` (textarea) — Texto pequeno debajo de los botones
  - `Activo` (boolean) — Solo se muestra si esta activo

---

## GRUPO 4: PAGINAS

### 4.1 Config piloto (`/admin/piloto-config`)
- **Modelo**: `PilotoConfig`
- **Uso**: Contenido de la pagina `/piloto` (landing de conversion)
- **Campos**:
  - `Titulo principal` (textarea) — Headline del hero (ej: "3 meses de PAYWL. Gratis. Sin letra pequena.")
  - `Subtitulo` (textarea) — Parrafo descriptivo debajo del titulo
  - `Descripcion` (textarea) — Descripcion adicional (opcional)
  - `Puntos de confianza (JSON)` (json) — Array de objetos con texto y subtexto:
    ```json
    [
      {"text": "$0 implementacion", "sub": "Nosotros hacemos todo el setup"},
      {"text": "3 meses de uso activo", "sub": "Sin compromiso despues del piloto"},
      {"text": "Tu data es tuya", "sub": "Soberania total de datos desde el dia 1"}
    ]
    ```
  - `Pasos siguientes (JSON)` (json) — Array de pasos que aparecen debajo del formulario:
    ```json
    [
      {"number": "1", "title": "Llamada de descubrimiento", "description": "Un especialista te contacta en 24h..."},
      {"number": "2", "title": "Configuracion del entorno", "description": "En 48h creamos tu instancia..."},
      {"number": "3", "title": "Go-live en 2 semanas", "description": "Implementamos el paywall..."},
      {"number": "4", "title": "90 dias de piloto", "description": "Soporte dedicado..."}
    ]
    ```
- **Nota**: Solo debe existir 1 registro.

### 4.2 Config contacto (`/admin/contacto-config`)
- **Modelo**: `ContactoConfig`
- **Uso**: Contenido de la pagina `/contacto`
- **Campos**:
  - `Titulo principal` (text) — Headline (ej: "Hablemos")
  - `Subtitulo` (textarea) — Texto debajo del titulo
  - `Email de contacto` (text) — Email que se muestra en la pagina
  - `Telefono` (text) — Numero de telefono (opcional)
  - `URL de Calendly` (text) — Link para agendar llamada
  - `Ubicacion` (textarea) — Direccion/ubicacion (soporta multiples lineas)
- **Nota**: Solo debe existir 1 registro.

### 4.3 Blog (`/admin/blog-posts`)
- **Modelo**: `BlogPost`
- **Uso**: Articulos del blog en `/blog`
- **Campos**:
  - `Titulo` (text) — Titulo del articulo
  - `Slug (URL)` (text, unico) — URL amigable (ej: "como-implementar-paywall")
  - `Extracto` (textarea) — Resumen corto para la lista de blog
  - `Contenido` (textarea) — Contenido completo del articulo
  - `Palabras clave` (text) — Keywords separadas por coma
  - `Meta titulo (SEO)` (text) — Title tag para SEO (si vacio, usa el titulo)
  - `Meta descripcion (SEO)` (textarea) — Meta description para SEO
  - `Publicado` (boolean) — Solo articulos publicados aparecen en el blog

---

## GRUPO 5: LEADS (SOLO LECTURA)

### 5.1 Leads piloto (`/admin/piloto-leads`)
- **Modelo**: `PilotoLead`
- **Uso**: Solicitudes recibidas del formulario de piloto gratuito
- **Campos visibles**: Nombre completo, Nombre del medio, Cargo, Email, Pais, Page views, CMS actual, Tiene suscripcion, Desafio, Fecha de envio
- **Solo lectura**: No se pueden crear, editar ni eliminar registros

### 5.2 Leads contacto (`/admin/contacto-leads`)
- **Modelo**: `ContactoLead`
- **Uso**: Mensajes recibidos del formulario de contacto
- **Campos visibles**: Nombre, Email, Empresa, Mensaje, Fecha de envio
- **Solo lectura**: No se pueden crear, editar ni eliminar registros

---

## UPLOAD DE IMAGENES

Los campos tipo imagen (como "Imagen OG" en Meta tags SEO) permiten subir archivos directamente:

- **Formatos aceptados**: JPG, PNG, WebP, SVG, GIF
- **Tamano maximo**: 5 MB
- **Almacenamiento**: `public/uploads/` del servidor
- **Flujo**: Click en "Subir imagen" → seleccionar archivo → se sube automaticamente → se muestra preview
- **Eliminar**: Click en el boton X rojo sobre la preview para quitar la imagen

---

## NOTAS TECNICAS PARA EL MANUAL

- El admin usa un patron dinamico: un solo componente `[section]/page.tsx` renderiza TODAS las secciones basandose en la configuracion de `section-config.ts`
- Los campos JSON deben ser JSON valido (arrays u objetos). Si el formato es incorrecto, el frontend puede no mostrar los datos correctamente.
- Los campos de "Orden" controlan la posicion visual de los elementos. Usar numeros consecutivos (1, 2, 3...).
- Los iconos usan nombres de Lucide React. Consultar la galeria completa en https://lucide.dev/icons
- Los modelos de configuracion (NavbarConfig, FooterConfig, ContactoConfig, PilotoConfig) deben tener UN solo registro. Si hay multiples, el sistema usa el primero.
- Las secciones de Leads son de solo lectura por diseno — los datos se generan cuando un visitante envia un formulario.
- El dashboard en `/admin` muestra conteos en tiempo real de todos los modelos.
