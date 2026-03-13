"use client"

import { useState } from "react"
import {
  BookOpen,
  Code,
  Server,
  Smartphone,
  CreditCard,
  Terminal,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Globe,
  Shield,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Sidebar navigation config                                         */
/* ------------------------------------------------------------------ */
const sections = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: BookOpen,
    items: [
      { id: "requisitos", label: "Requisitos previos" },
      { id: "instalacion", label: "Instalacion del SDK" },
      { id: "configuracion-basica", label: "Configuracion basica" },
      { id: "primer-muro", label: "Tu primer muro en 15 minutos" },
    ],
  },
  {
    id: "integracion-cms",
    label: "Integracion con CMS",
    icon: Globe,
    items: [
      { id: "strapi", label: "Strapi v5" },
      { id: "wordpress", label: "WordPress" },
      { id: "headless", label: "CMS Headless personalizado" },
    ],
  },
  {
    id: "api-reference",
    label: "API Reference",
    icon: Server,
    items: [
      { id: "api-access", label: "POST /api/v1/access" },
      { id: "api-subscriber", label: "GET /api/v1/subscriber/:id" },
      { id: "api-subscribe", label: "POST /api/v1/subscribe" },
      { id: "api-webhook", label: "POST /api/v1/webhook" },
    ],
  },
  {
    id: "sdk-javascript",
    label: "SDK JavaScript",
    icon: Code,
    items: [
      { id: "sdk-metodos", label: "Metodos disponibles" },
      { id: "sdk-eventos", label: "Eventos" },
      { id: "sdk-avanzado", label: "Configuracion avanzada" },
    ],
  },
  {
    id: "pasarelas",
    label: "Guias de Pasarelas",
    icon: CreditCard,
    items: [
      { id: "mercadopago", label: "MercadoPago" },
      { id: "stripe", label: "Stripe" },
      { id: "wompi", label: "Wompi" },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Code block component                                               */
/* ------------------------------------------------------------------ */
function CodeBlock({
  code,
  language = "javascript",
  title,
}: {
  code: string
  language?: string
  title?: string
}) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 my-6">
      {title && (
        <div className="flex items-center justify-between bg-slate-100 px-4 py-2 border-b border-slate-200">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Terminal className="h-4 w-4" />
            <span>{title}</span>
          </div>
          <span className="text-xs text-slate-400 uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="bg-[#0A2540] text-white p-4 overflow-x-auto text-sm leading-relaxed font-mono">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          title="Copiar codigo"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-white/60" />
          )}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Info callout                                                       */
/* ------------------------------------------------------------------ */
function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warning" | "tip"
  title: string
  children: React.ReactNode
}) {
  const styles = {
    info: "bg-blue-50 border-blue-300 text-blue-900",
    warning: "bg-amber-50 border-amber-300 text-amber-900",
    tip: "bg-emerald-50 border-emerald-300 text-emerald-900",
  }
  const icons = {
    info: Shield,
    warning: Zap,
    tip: Check,
  }
  const Icon = icons[type]

  return (
    <div className={`border-l-4 rounded-r-lg p-4 my-6 ${styles[type]}`}>
      <div className="flex items-center gap-2 font-semibold mb-1">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Endpoint card                                                      */
/* ------------------------------------------------------------------ */
function Endpoint({
  method,
  path,
  description,
  children,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE"
  path: string
  description: string
  children: React.ReactNode
}) {
  const methodColors = {
    GET: "bg-green-100 text-green-700",
    POST: "bg-blue-100 text-blue-700",
    PUT: "bg-amber-100 text-amber-700",
    DELETE: "bg-red-100 text-red-700",
  }

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden my-6">
      <div className="flex items-center gap-3 p-4 bg-slate-50 border-b border-slate-200">
        <span
          className={`px-3 py-1 rounded-md text-xs font-bold font-mono ${methodColors[method]}`}
        >
          {method}
        </span>
        <code className="text-sm font-mono text-[#0A2540] font-semibold">
          {path}
        </code>
      </div>
      <div className="p-4">
        <p className="text-slate-600 mb-4">{description}</p>
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Table                                                              */
/* ------------------------------------------------------------------ */
function ParamTable({
  params,
}: {
  params: { name: string; type: string; required: boolean; desc: string }[]
}) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
              Parametro
            </th>
            <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
              Tipo
            </th>
            <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
              Requerido
            </th>
            <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
              Descripcion
            </th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-slate-100">
              <td className="py-2 px-3 font-mono text-[#00B4D8]">{p.name}</td>
              <td className="py-2 px-3 font-mono text-slate-500">{p.type}</td>
              <td className="py-2 px-3">
                {p.required ? (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                    Si
                  </span>
                ) : (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                    No
                  </span>
                )}
              </td>
              <td className="py-2 px-3 text-slate-600">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main docs content                                                  */
/* ------------------------------------------------------------------ */
export default function DocsContent() {
  const [activeSection, setActiveSection] = useState("getting-started")

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <nav className="sticky top-24 space-y-1">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeSection === section.id
                        ? "bg-[#F0F7FF] text-[#00B4D8]"
                        : "text-[#4A5568] hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </a>
                  <div className="ml-9 space-y-0.5 mt-0.5">
                    {section.items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block px-3 py-1 text-xs text-slate-500 hover:text-[#00B4D8] transition-colors rounded"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 max-w-4xl">
          {/* ==================== GETTING STARTED ==================== */}
          <section id="getting-started" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mb-6 flex items-center gap-3">
              <BookOpen className="h-7 w-7 text-[#00B4D8]" />
              Getting Started
            </h2>

            {/* Requisitos */}
            <div id="requisitos" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">
                Requisitos previos
              </h3>
              <p className="text-slate-600 mb-4">
                Antes de comenzar la integracion de MUROW, asegurate de contar
                con lo siguiente:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Node.js 18+</strong> instalado en tu entorno de
                    desarrollo (solo si usas el SDK server-side)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>CMS con API REST o GraphQL</strong> — MUROW se
                    integra con cualquier CMS que exponga endpoints de contenido
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Acceso al HTML de tu sitio</strong> para insertar el
                    script tag de MUROW (acceso al template o theme)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#00B4D8] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Credenciales de MUROW</strong> — API Key y Tenant ID
                    proporcionados tras la activacion de tu cuenta
                  </span>
                </li>
              </ul>

              <Callout type="info" title="Entorno de pruebas">
                MUROW provee un ambiente de sandbox para que pruebes la
                integracion sin afectar a tus usuarios reales. Las credenciales
                de sandbox se entregan junto con las de produccion.
              </Callout>
            </div>

            {/* Instalacion */}
            <div id="instalacion" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">
                Instalacion del SDK JavaScript
              </h3>
              <p className="text-slate-600 mb-4">
                El SDK de MUROW se carga directamente como un script tag en tu
                sitio. Pesa menos de <strong>15KB comprimido</strong> y se
                distribuye desde una CDN global (CloudFront) para latencia
                minima.
              </p>

              <CodeBlock
                title="Insertar en el &lt;head&gt; de tu sitio"
                language="html"
                code={`<!-- MUROW Paywall SDK -->
<script
  src="https://cdn.murow.io/sdk/v1/murow.min.js"
  data-tenant="TU_TENANT_ID"
  data-key="TU_API_KEY"
  async
></script>`}
              />

              <p className="text-slate-600 mb-4">
                Alternativamente, si usas un framework con gestores de paquetes:
              </p>

              <CodeBlock
                title="Instalacion via npm"
                language="bash"
                code={`npm install @murow/sdk

# o con yarn
yarn add @murow/sdk`}
              />

              <CodeBlock
                title="Importacion en tu proyecto"
                language="javascript"
                code={`import { Murow } from '@murow/sdk';

const murow = new Murow({
  tenantId: 'TU_TENANT_ID',
  apiKey: 'TU_API_KEY',
  environment: 'production', // o 'sandbox' para pruebas
});`}
              />
            </div>

            {/* Configuracion basica */}
            <div id="configuracion-basica" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">
                Configuracion basica
              </h3>
              <p className="text-slate-600 mb-4">
                MUROW necesita un archivo de configuracion JSON que define las
                reglas de acceso y el comportamiento del muro. Este archivo
                puede estar embebido en el HTML o cargarse desde tu CMS.
              </p>

              <CodeBlock
                title="murow-config.json"
                language="json"
                code={`{
  "tenant": "TU_TENANT_ID",
  "rules": {
    "default": "metered",
    "metered": {
      "freeArticles": 3,
      "resetPeriod": "monthly"
    },
    "hardPaywall": {
      "sections": ["investigaciones", "opinion-premium"]
    }
  },
  "wall": {
    "theme": "default",
    "position": "inline",
    "blur": true,
    "previewParagraphs": 3
  },
  "payment": {
    "gateway": "mercadopago",
    "currency": "COP",
    "plans": ["mensual", "anual"]
  },
  "analytics": {
    "ga4": true,
    "metaPixel": false
  }
}`}
              />

              <Callout type="tip" title="Configuracion dinamica">
                Las reglas de acceso se pueden modificar en tiempo real desde el
                panel de administracion de MUROW. No es necesario redesplegar
                tu sitio para cambiar la configuracion de las reglas.
              </Callout>
            </div>

            {/* Primer muro */}
            <div id="primer-muro" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">
                Tu primer muro en 15 minutos
              </h3>
              <p className="text-slate-600 mb-4">
                Sigue estos pasos para tener un paywall funcional en tu sitio:
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B4D8] text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A2540] mb-1">
                      Inserta el SDK
                    </h4>
                    <p className="text-sm text-slate-600">
                      Agrega el script tag de MUROW en el{" "}
                      <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono">
                        {"<head>"}
                      </code>{" "}
                      de tu sitio.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B4D8] text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A2540] mb-1">
                      Inicializa MUROW
                    </h4>
                    <p className="text-sm text-slate-600 mb-3">
                      En las paginas de contenido, inicializa el SDK y verifica
                      el acceso del usuario:
                    </p>
                    <CodeBlock
                      language="javascript"
                      code={`// En cada pagina de articulo
murow.init();

// Verificar si el usuario tiene acceso
const access = await murow.check({
  contentId: 'articulo-123',
  contentType: 'article',
  section: 'investigaciones'
});

if (!access.granted) {
  // Mostrar el muro de suscripcion
  murow.wall({
    target: '#article-content',
    previewParagraphs: 3,
    blur: true
  });
}`}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B4D8] text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A2540] mb-1">
                      Configura la pasarela de pagos
                    </h4>
                    <p className="text-sm text-slate-600">
                      Desde el panel de MUROW, conecta tu cuenta de
                      MercadoPago, Stripe o Wompi. Los flujos de pago se
                      manejan automaticamente por el SDK.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B4D8] text-white flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A2540] mb-1">
                      Verifica en sandbox
                    </h4>
                    <p className="text-sm text-slate-600">
                      Usa las credenciales de sandbox para probar el flujo
                      completo: lectura gratuita, aparicion del muro,
                      suscripcion y acceso al contenido.
                    </p>
                  </div>
                </div>
              </div>

              <Callout type="info" title="Soporte durante la integracion">
                Durante los primeros 30 dias, el equipo tecnico de Nivelics te
                acompana directamente por WhatsApp para resolver cualquier
                duda de la integracion.
              </Callout>
            </div>
          </section>

          {/* ==================== INTEGRACION CMS ==================== */}
          <section id="integracion-cms" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mb-6 flex items-center gap-3">
              <Globe className="h-7 w-7 text-[#00B4D8]" />
              Integracion con CMS
            </h2>

            {/* Strapi */}
            <div id="strapi" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                Strapi v5
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  DISPONIBLE
                </span>
              </h3>
              <p className="text-slate-600 mb-4">
                Strapi v5 es el stack del piloto oficial de MUROW. La
                integracion utiliza un middleware de validacion de acceso que
                se ejecuta antes de servir el contenido.
              </p>

              <CodeBlock
                title="Middleware de validacion — src/middlewares/murow-access.ts"
                language="typescript"
                code={`import { Murow } from '@murow/sdk-node';

const murow = new Murow({
  tenantId: process.env.MUROW_TENANT_ID,
  apiKey: process.env.MUROW_API_KEY,
});

export default () => {
  return async (ctx, next) => {
    const { slug } = ctx.params;
    const userId = ctx.state?.user?.id || ctx.cookies.get('murow_uid');

    // Verificar acceso con MUROW Engine
    const access = await murow.checkAccess({
      userId,
      contentId: slug,
      contentType: ctx.request.url.includes('/articles')
        ? 'article'
        : 'page',
    });

    // Inyectar resultado en el response
    ctx.state.murowAccess = access;

    await next();

    // Si no tiene acceso, truncar el contenido
    if (!access.granted && ctx.response.body?.data?.content) {
      const paragraphs = ctx.response.body.data.content
        .split('</p>')
        .slice(0, 3);
      ctx.response.body.data.content = paragraphs.join('</p>') + '</p>';
      ctx.response.body.data.isPaywalled = true;
      ctx.response.body.data.wallConfig = access.wallConfig;
    }
  };
};`}
              />

              <CodeBlock
                title="Registrar middleware — config/middlewares.ts"
                language="typescript"
                code={`export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  // ... otros middlewares
  {
    name: 'global::murow-access',
    config: {},
  },
  'strapi::body',
  'strapi::query',
];`}
              />
            </div>

            {/* WordPress */}
            <div id="wordpress" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                WordPress
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  DISPONIBLE
                </span>
              </h3>
              <p className="text-slate-600 mb-4">
                Para WordPress, MUROW funciona con un plugin ligero que
                inyecta el SDK en el frontend y agrega filtros de contenido.
                El plugin esta actualmente en desarrollo activo.
              </p>

              <CodeBlock
                title="Instalacion del plugin (wp-cli)"
                language="bash"
                code={`# Proximamente disponible en el repositorio de WordPress
# Por ahora, instalacion manual:
cd wp-content/plugins/
git clone https://github.com/nivelics/murow-wp.git
wp plugin activate murow-wp`}
              />

              <CodeBlock
                title="Configuracion en wp-config.php"
                language="php"
                code={`// Credenciales de MUROW
define('MUROW_TENANT_ID', 'tu-tenant-id');
define('MUROW_API_KEY', 'tu-api-key');
define('MUROW_ENVIRONMENT', 'production'); // o 'sandbox'`}
              />

              <Callout type="warning" title="Plugin en desarrollo">
                El plugin de WordPress esta en fase beta. Para medios que usan
                WordPress, recomendamos la integracion via script tag directo
                en el theme hasta que el plugin sea estable.
              </Callout>
            </div>

            {/* Headless */}
            <div id="headless" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                CMS Headless personalizado
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  DISPONIBLE
                </span>
              </h3>
              <p className="text-slate-600 mb-4">
                Cualquier CMS headless que exponga una API REST o GraphQL
                puede integrarse con MUROW. El contrato de integracion
                estandar define los endpoints que tu CMS debe implementar y
                los que MUROW expone.
              </p>

              <CodeBlock
                title="Contrato de integracion — Diagrama de flujo"
                language="text"
                code={`┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Tu CMS      │────>│  MUROW Engine    │────>│  Pasarela Pago  │
│  (Frontend)  │<────│  (API REST)      │<────│  (MercadoPago)  │
└──────────────┘     └──────────────────┘     └─────────────────┘
       │                      │
       │  1. SDK verifica     │  2. Engine evalua
       │     acceso           │     reglas de negocio
       │                      │
       │  3. Si no tiene      │  4. Procesa pago
       │     acceso: muestra  │     y activa
       │     el muro          │     suscripcion
       │                      │
       └──────────────────────┘`}
              />

              <p className="text-slate-600">
                Para iniciar la integracion con un CMS personalizado,
                contacta al equipo tecnico de Nivelics para recibir el
                documento de contrato de integracion API con todos los
                endpoints, payloads y flujos documentados.
              </p>
            </div>
          </section>

          {/* ==================== API REFERENCE ==================== */}
          <section id="api-reference" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mb-4 flex items-center gap-3">
              <Server className="h-7 w-7 text-[#00B4D8]" />
              API Reference
            </h2>
            <p className="text-slate-600 mb-8">
              La API de MUROW utiliza REST sobre HTTPS. Todas las requests
              deben incluir el header{" "}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm">
                Authorization: Bearer TU_API_KEY
              </code>
              . La URL base es{" "}
              <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm">
                https://api.murow.io
              </code>
              .
            </p>

            {/* POST /api/v1/access */}
            <div id="api-access" className="scroll-mt-24">
              <Endpoint
                method="POST"
                path="/api/v1/access"
                description="Valida si un usuario tiene acceso a un contenido especifico segun las reglas de negocio configuradas. Esta es la llamada principal que el SDK realiza automaticamente."
              >
                <h4 className="font-semibold text-[#0A2540] mb-2">
                  Request Body
                </h4>
                <ParamTable
                  params={[
                    {
                      name: "userId",
                      type: "string",
                      required: false,
                      desc: "ID del usuario. Si no se provee, se usa la cookie murow_uid.",
                    },
                    {
                      name: "contentId",
                      type: "string",
                      required: true,
                      desc: "Identificador unico del articulo o contenido.",
                    },
                    {
                      name: "contentType",
                      type: "string",
                      required: false,
                      desc: 'Tipo de contenido: "article", "page", "video". Default: "article".',
                    },
                    {
                      name: "section",
                      type: "string",
                      required: false,
                      desc: "Seccion o categoria del contenido.",
                    },
                    {
                      name: "device",
                      type: "string",
                      required: false,
                      desc: 'Tipo de dispositivo: "mobile", "desktop", "tablet". Se detecta automaticamente si no se envía.',
                    },
                  ]}
                />

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-6">
                  Response (200 OK)
                </h4>
                <CodeBlock
                  language="json"
                  code={`{
  "granted": false,
  "reason": "metered_limit_reached",
  "articlesRead": 3,
  "articlesLimit": 3,
  "resetDate": "2026-04-01T00:00:00Z",
  "wallConfig": {
    "type": "metered",
    "previewParagraphs": 3,
    "blur": true,
    "plans": [
      {
        "id": "mensual",
        "name": "Suscripcion Mensual",
        "price": 15000,
        "currency": "COP",
        "period": "month"
      }
    ]
  }
}`}
                />
              </Endpoint>
            </div>

            {/* GET /api/v1/subscriber/:id */}
            <div id="api-subscriber" className="scroll-mt-24">
              <Endpoint
                method="GET"
                path="/api/v1/subscriber/:id"
                description="Obtiene el estado completo de un suscriptor: plan activo, historial de pagos, fecha de renovacion y estado de la cuenta."
              >
                <h4 className="font-semibold text-[#0A2540] mb-2">
                  Path Parameters
                </h4>
                <ParamTable
                  params={[
                    {
                      name: "id",
                      type: "string",
                      required: true,
                      desc: "ID del suscriptor en MUROW.",
                    },
                  ]}
                />

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-6">
                  Response (200 OK)
                </h4>
                <CodeBlock
                  language="json"
                  code={`{
  "id": "sub_abc123",
  "email": "lector@ejemplo.com",
  "status": "active",
  "plan": {
    "id": "mensual",
    "name": "Suscripcion Mensual",
    "price": 15000,
    "currency": "COP"
  },
  "currentPeriod": {
    "start": "2026-03-01T00:00:00Z",
    "end": "2026-04-01T00:00:00Z"
  },
  "paymentMethod": "mercadopago",
  "createdAt": "2026-01-15T10:30:00Z",
  "articlesRead": 47,
  "lastLogin": "2026-03-12T08:15:00Z"
}`}
                />
              </Endpoint>
            </div>

            {/* POST /api/v1/subscribe */}
            <div id="api-subscribe" className="scroll-mt-24">
              <Endpoint
                method="POST"
                path="/api/v1/subscribe"
                description="Crea una nueva suscripcion. Inicia el flujo de pago con la pasarela configurada y registra al suscriptor en MUROW."
              >
                <h4 className="font-semibold text-[#0A2540] mb-2">
                  Request Body
                </h4>
                <ParamTable
                  params={[
                    {
                      name: "email",
                      type: "string",
                      required: true,
                      desc: "Email del nuevo suscriptor.",
                    },
                    {
                      name: "planId",
                      type: "string",
                      required: true,
                      desc: "ID del plan de suscripcion seleccionado.",
                    },
                    {
                      name: "paymentGateway",
                      type: "string",
                      required: false,
                      desc: 'Pasarela de pago: "mercadopago", "stripe", "wompi". Default: la configurada en el tenant.',
                    },
                    {
                      name: "metadata",
                      type: "object",
                      required: false,
                      desc: "Datos adicionales para adjuntar al suscriptor (utm_source, referrer, etc.).",
                    },
                  ]}
                />

                <h4 className="font-semibold text-[#0A2540] mb-2 mt-6">
                  Response (201 Created)
                </h4>
                <CodeBlock
                  language="json"
                  code={`{
  "subscriberId": "sub_xyz789",
  "status": "pending_payment",
  "paymentUrl": "https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=abc123",
  "expiresAt": "2026-03-12T22:30:00Z"
}`}
                />
              </Endpoint>
            </div>

            {/* POST /api/v1/webhook */}
            <div id="api-webhook" className="scroll-mt-24">
              <Endpoint
                method="POST"
                path="/api/v1/webhook"
                description="Endpoint para recibir notificaciones de eventos desde las pasarelas de pago. Configura esta URL en el panel de tu pasarela (MercadoPago, Stripe, Wompi)."
              >
                <h4 className="font-semibold text-[#0A2540] mb-2">
                  Eventos soportados
                </h4>
                <div className="overflow-x-auto my-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
                          Evento
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
                          Descripcion
                        </th>
                        <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
                          Accion en MUROW
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-3 font-mono text-[#00B4D8]">
                          payment.approved
                        </td>
                        <td className="py-2 px-3">Pago aprobado</td>
                        <td className="py-2 px-3">
                          Activa la suscripcion del usuario
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-3 font-mono text-[#00B4D8]">
                          payment.rejected
                        </td>
                        <td className="py-2 px-3">Pago rechazado</td>
                        <td className="py-2 px-3">
                          Marca intento fallido, notifica al usuario
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-3 font-mono text-[#00B4D8]">
                          subscription.renewed
                        </td>
                        <td className="py-2 px-3">
                          Renovacion automatica exitosa
                        </td>
                        <td className="py-2 px-3">
                          Extiende el periodo activo
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="py-2 px-3 font-mono text-[#00B4D8]">
                          subscription.cancelled
                        </td>
                        <td className="py-2 px-3">Suscripcion cancelada</td>
                        <td className="py-2 px-3">
                          Desactiva acceso al final del periodo pagado
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-mono text-[#00B4D8]">
                          chargeback
                        </td>
                        <td className="py-2 px-3">Contracargo</td>
                        <td className="py-2 px-3">
                          Suspende la cuenta y notifica al medio
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Callout type="warning" title="Seguridad del webhook">
                  Todos los webhooks incluyen una firma HMAC-SHA256 en el
                  header{" "}
                  <code className="font-mono">X-Murow-Signature</code>. Valida
                  esta firma antes de procesar cualquier evento.
                </Callout>
              </Endpoint>
            </div>
          </section>

          {/* ==================== SDK JAVASCRIPT ==================== */}
          <section id="sdk-javascript" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mb-6 flex items-center gap-3">
              <Smartphone className="h-7 w-7 text-[#00B4D8]" />
              SDK JavaScript
            </h2>

            {/* Metodos */}
            <div id="sdk-metodos" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">
                Metodos disponibles
              </h3>

              <div className="space-y-6">
                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="font-mono font-bold text-[#0A2540] mb-2">
                    murow.init(config?)
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Inicializa el SDK. Se llama automaticamente si usas el
                    script tag. Solo necesitas llamarlo manualmente si usas el
                    paquete npm.
                  </p>
                  <CodeBlock
                    language="javascript"
                    code={`murow.init({
  tenantId: 'TU_TENANT_ID',
  apiKey: 'TU_API_KEY',
  debug: false, // true para ver logs en consola
});`}
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="font-mono font-bold text-[#0A2540] mb-2">
                    murow.check(options)
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Verifica si el usuario actual tiene acceso a un contenido.
                    Retorna una promesa con el resultado de la evaluacion de
                    reglas.
                  </p>
                  <CodeBlock
                    language="javascript"
                    code={`const result = await murow.check({
  contentId: 'articulo-123',
  contentType: 'article',    // 'article' | 'page' | 'video'
  section: 'investigaciones', // opcional
});

// result.granted: boolean
// result.reason: 'subscribed' | 'free_tier' | 'metered_limit_reached' | ...
// result.wallConfig: configuracion del muro a mostrar`}
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="font-mono font-bold text-[#0A2540] mb-2">
                    murow.wall(options)
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Renderiza el muro de suscripcion en el DOM. Maneja
                    automaticamente el blur del contenido, el formulario de
                    registro/login y el flujo de pago.
                  </p>
                  <CodeBlock
                    language="javascript"
                    code={`murow.wall({
  target: '#article-content',  // Selector CSS del contenedor
  previewParagraphs: 3,        // Parrafos visibles antes del muro
  blur: true,                  // Efecto blur en contenido oculto
  theme: 'default',            // 'default' | 'minimal' | 'custom'
  customCSS: '',               // CSS personalizado (solo con theme: 'custom')
  onShow: () => {},            // Callback cuando el muro se muestra
  onConvert: (subscriber) => {}, // Callback cuando el usuario se suscribe
  onDismiss: () => {},         // Callback cuando el usuario cierra el muro
});`}
                  />
                </div>

                <div className="border border-slate-200 rounded-xl p-5">
                  <h4 className="font-mono font-bold text-[#0A2540] mb-2">
                    murow.track(event, data?)
                  </h4>
                  <p className="text-sm text-slate-600 mb-3">
                    Envia eventos de analytics al dashboard de MUROW. Los
                    eventos de conversion se envian automaticamente, pero
                    puedes enviar eventos personalizados.
                  </p>
                  <CodeBlock
                    language="javascript"
                    code={`// Evento personalizado
murow.track('article_shared', {
  contentId: 'articulo-123',
  platform: 'twitter',
});

// Eventos enviados automaticamente por el SDK:
// - 'page_view'
// - 'wall_shown'
// - 'wall_converted'
// - 'wall_dismissed'
// - 'login_success'
// - 'payment_started'
// - 'payment_completed'`}
                  />
                </div>
              </div>
            </div>

            {/* Eventos */}
            <div id="sdk-eventos" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">
                Eventos
              </h3>
              <p className="text-slate-600 mb-4">
                El SDK emite eventos que puedes escuchar para integrar con tu
                propio sistema de analytics o para ejecutar logica
                personalizada.
              </p>

              <CodeBlock
                language="javascript"
                code={`// Escuchar cuando el muro se muestra
murow.on('wall.shown', (data) => {
  console.log('Muro mostrado:', data.wallType, data.contentId);
  // Enviar a GA4
  gtag('event', 'paywall_shown', {
    wall_type: data.wallType,
    content_id: data.contentId,
  });
});

// Escuchar cuando un usuario se suscribe
murow.on('wall.converted', (data) => {
  console.log('Nueva suscripcion:', data.subscriberId, data.planId);
  // Enviar a tu CRM
  fetch('/api/crm/new-subscriber', {
    method: 'POST',
    body: JSON.stringify(data),
  });
});

// Escuchar cuando el usuario cierra el muro
murow.on('wall.dismissed', (data) => {
  console.log('Muro cerrado:', data.contentId);
});`}
              />

              <div className="overflow-x-auto my-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
                        Evento
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
                        Datos
                      </th>
                      <th className="text-left py-2 px-3 font-semibold text-[#0A2540]">
                        Descripcion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr className="border-b border-slate-100">
                      <td className="py-2 px-3 font-mono text-[#00B4D8]">
                        wall.shown
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">
                        {"{ wallType, contentId }"}
                      </td>
                      <td className="py-2 px-3">
                        El muro fue renderizado en pantalla
                      </td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2 px-3 font-mono text-[#00B4D8]">
                        wall.converted
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">
                        {"{ subscriberId, planId, email }"}
                      </td>
                      <td className="py-2 px-3">
                        El usuario completo la suscripcion
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-mono text-[#00B4D8]">
                        wall.dismissed
                      </td>
                      <td className="py-2 px-3 font-mono text-xs">
                        {"{ contentId, timeVisible }"}
                      </td>
                      <td className="py-2 px-3">
                        El usuario cerro el muro sin suscribirse
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Avanzado */}
            <div id="sdk-avanzado" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4">
                Configuracion avanzada
              </h3>

              <h4 className="font-semibold text-[#0A2540] mb-2 mt-6">
                Lazy Loading
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                Por defecto, el SDK se carga de forma asincrona y no bloquea
                el rendering de la pagina. Para mayor control:
              </p>
              <CodeBlock
                language="html"
                code={`<!-- Cargar el SDK solo cuando el usuario hace scroll -->
<script
  src="https://cdn.murow.io/sdk/v1/murow.min.js"
  data-tenant="TU_TENANT_ID"
  data-key="TU_API_KEY"
  data-lazy="true"
  data-lazy-threshold="0.5"
  async
></script>`}
              />

              <h4 className="font-semibold text-[#0A2540] mb-2 mt-8">
                Custom Wall UI
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                Si necesitas un diseno completamente personalizado para el
                muro, puedes usar el modo headless:
              </p>
              <CodeBlock
                language="javascript"
                code={`// Modo headless: tu controlas la UI, MUROW maneja la logica
const access = await murow.check({ contentId: 'articulo-123' });

if (!access.granted) {
  // Renderizar tu propio componente de muro
  document.getElementById('custom-wall').innerHTML = \`
    <div class="mi-paywall">
      <h2>Contenido exclusivo para suscriptores</h2>
      <p>Has leido \${access.articlesRead} de \${access.articlesLimit} articulos gratuitos.</p>
      <button onclick="murow.startCheckout('\${access.wallConfig.plans[0].id}')">
        Suscribirme por \${access.wallConfig.plans[0].price} \${access.wallConfig.plans[0].currency}/mes
      </button>
    </div>
  \`;
}`}
              />

              <h4 className="font-semibold text-[#0A2540] mb-2 mt-8">
                Analytics Callbacks
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                Integra MUROW con cualquier plataforma de analytics:
              </p>
              <CodeBlock
                language="javascript"
                code={`murow.init({
  tenantId: 'TU_TENANT_ID',
  apiKey: 'TU_API_KEY',
  analytics: {
    // Google Analytics 4
    ga4: {
      measurementId: 'G-XXXXXXXXXX',
      sendPageView: true,
      sendConversion: true,
    },
    // Meta Pixel
    metaPixel: {
      pixelId: '123456789',
      trackPurchase: true,
    },
    // Callback personalizado para cualquier plataforma
    custom: (event, data) => {
      // Enviar a Mixpanel, Amplitude, etc.
      mixpanel.track(event, data);
    },
  },
});`}
              />
            </div>
          </section>

          {/* ==================== PASARELAS ==================== */}
          <section id="pasarelas" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0A2540] mb-6 flex items-center gap-3">
              <CreditCard className="h-7 w-7 text-[#00B4D8]" />
              Guias de Integracion por Pasarela
            </h2>

            {/* MercadoPago */}
            <div id="mercadopago" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                MercadoPago
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  DISPONIBLE
                </span>
              </h3>
              <p className="text-slate-600 mb-2">
                <strong>Paises soportados:</strong> Colombia, Mexico,
                Argentina, Chile, Peru, Uruguay
              </p>
              <p className="text-slate-600 mb-4">
                MUROW utiliza la API de Suscripciones Preaprobadas de
                MercadoPago para manejar cobros recurrentes automaticos.
              </p>

              <h4 className="font-semibold text-[#0A2540] mb-2">
                1. Configura tus credenciales
              </h4>
              <p className="text-sm text-slate-600 mb-3">
                En el panel de MUROW, ve a Configuracion &gt; Pasarelas de Pago
                &gt; MercadoPago e ingresa tus credenciales:
              </p>
              <CodeBlock
                title="Credenciales requeridas"
                language="text"
                code={`Access Token:     APP_USR-xxxxxxxxxxxx-xxxxxx-xxxxxxxxx-xxxxxxxxx
Public Key:       APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Client ID:        xxxxxxxxxxxx
Client Secret:    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Webhook URL:      https://api.murow.io/api/v1/webhook/mercadopago/TU_TENANT_ID`}
              />

              <h4 className="font-semibold text-[#0A2540] mb-2 mt-6">
                2. Flujo de suscripcion
              </h4>
              <CodeBlock
                language="javascript"
                code={`// El SDK maneja todo el flujo automaticamente:
// 1. Usuario hace clic en "Suscribirme"
// 2. MUROW crea una preferencia de pago en MercadoPago
// 3. Usuario es redirigido al checkout de MercadoPago
// 4. MercadoPago procesa el pago y envía webhook
// 5. MUROW activa la suscripcion automaticamente

// Si necesitas personalizar el flujo:
const checkout = await murow.startCheckout({
  planId: 'mensual',
  gateway: 'mercadopago',
  successUrl: 'https://tumedio.com/bienvenido',
  failureUrl: 'https://tumedio.com/pago-fallido',
  pendingUrl: 'https://tumedio.com/pago-pendiente',
});

// checkout.redirectUrl → URL del checkout de MercadoPago`}
              />

              <Callout type="tip" title="Modo sandbox">
                Usa credenciales de prueba de MercadoPago para testear el
                flujo completo sin cobros reales. MUROW detecta
                automaticamente el ambiente basado en las credenciales
                proporcionadas.
              </Callout>
            </div>

            {/* Stripe */}
            <div id="stripe" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                Stripe
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  DISPONIBLE
                </span>
              </h3>
              <p className="text-slate-600 mb-4">
                MUROW integra Stripe Billing para medios que operan en
                mercados internacionales o que ya tienen una cuenta de Stripe.
              </p>

              <h4 className="font-semibold text-[#0A2540] mb-2">
                Configuracion
              </h4>
              <CodeBlock
                title="Credenciales requeridas"
                language="text"
                code={`Secret Key:       sk_live_xxxxxxxxxxxxxxxxxxxx
Publishable Key:  pk_live_xxxxxxxxxxxxxxxxxxxx
Webhook Secret:   whsec_xxxxxxxxxxxxxxxxxxxx
Webhook URL:      https://api.murow.io/api/v1/webhook/stripe/TU_TENANT_ID`}
              />

              <CodeBlock
                title="Configuracion de productos en Stripe"
                language="javascript"
                code={`// MUROW crea automaticamente los productos y precios
// en tu cuenta de Stripe basandose en los planes
// configurados en el panel de MUROW.

// Tambien puedes vincular productos existentes:
// Panel MUROW > Pasarelas > Stripe > Mapeo de Productos

// Ejemplo de mapeo:
{
  "plan_mensual": "price_1234567890",  // Stripe Price ID
  "plan_anual": "price_0987654321"
}`}
              />

              <Callout type="info" title="Stripe + LATAM">
                Stripe esta disponible en Colombia, Mexico y Brasil. Para
                otros paises de LATAM donde Stripe no opera, usa MercadoPago
                o Wompi como alternativa.
              </Callout>
            </div>

            {/* Wompi */}
            <div id="wompi" className="scroll-mt-24 mb-10">
              <h3 className="text-xl font-bold text-[#0A2540] mb-4 flex items-center gap-2">
                Wompi
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  DISPONIBLE
                </span>
              </h3>
              <p className="text-slate-600 mb-4">
                Wompi es la pasarela de pagos de Bancolombia, ideal para
                medios colombianos que quieren ofrecer pagos con PSE, tarjeta
                de credito y Nequi.
              </p>

              <h4 className="font-semibold text-[#0A2540] mb-2">
                Configuracion
              </h4>
              <CodeBlock
                title="Credenciales requeridas"
                language="text"
                code={`Public Key:       pub_prod_xxxxxxxxxxxxxxxxxxxx
Private Key:      prv_prod_xxxxxxxxxxxxxxxxxxxx
Events Secret:    prod_events_xxxxxxxxxxxxxxxxxxxx
Integrity Secret: prod_integrity_xxxxxxxxxxxxxxxxxxxx
Webhook URL:      https://api.murow.io/api/v1/webhook/wompi/TU_TENANT_ID`}
              />

              <h4 className="font-semibold text-[#0A2540] mb-2 mt-6">
                Metodos de pago soportados via Wompi
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {[
                  {
                    name: "Tarjeta de credito/debito",
                    desc: "Visa, Mastercard, American Express",
                  },
                  {
                    name: "PSE",
                    desc: "Transferencia bancaria (Colombia)",
                  },
                  {
                    name: "Nequi",
                    desc: "Billetera digital (Colombia)",
                  },
                  {
                    name: "Corresponsales bancarios",
                    desc: "Efectivo via Efecty, Baloto",
                  },
                ].map((method) => (
                  <div
                    key={method.name}
                    className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg"
                  >
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-[#0A2540]">
                        {method.name}
                      </p>
                      <p className="text-xs text-slate-500">{method.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <CodeBlock
                title="Flujo de pago con Wompi"
                language="javascript"
                code={`// MUROW maneja el widget de Wompi automaticamente
const checkout = await murow.startCheckout({
  planId: 'mensual',
  gateway: 'wompi',
  // Wompi soporta pagos recurrentes via tokenizacion
  // MUROW gestiona la renovacion automatica
});

// Para pagos recurrentes, MUROW:
// 1. Tokeniza la tarjeta del usuario via Wompi
// 2. Almacena el token de forma segura (PCI-DSS compliant)
// 3. Ejecuta el cobro automatico cada periodo
// 4. Notifica al medio y al suscriptor del resultado`}
              />
            </div>
          </section>

          {/* ==================== SOPORTE ==================== */}
          <section className="scroll-mt-24 mb-16">
            <div className="bg-[#F0F7FF] rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-[#0A2540] mb-3">
                Necesitas ayuda con la integracion?
              </h3>
              <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                Nuestro equipo tecnico te acompana durante todo el proceso.
                Contactanos para resolver cualquier duda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:soporte@nivelics.com"
                  className="inline-flex items-center justify-center gap-2 bg-[#00B4D8] text-white font-semibold px-6 py-3 rounded-lg hover:scale-[1.02] transition-transform"
                >
                  <ExternalLink className="h-4 w-4" />
                  soporte@nivelics.com
                </a>
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 border-2 border-[#0A2540] text-[#0A2540] font-semibold px-6 py-3 rounded-lg hover:bg-[#0A2540] hover:text-white transition-colors"
                >
                  Formulario de contacto
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
