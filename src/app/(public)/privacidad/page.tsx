import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Politica de Privacidad — PAYWL by Nivelics SAS",
  description:
    "Politica de privacidad y tratamiento de datos personales de PAYWL, operado por Nivelics SAS. Conoce como protegemos tu informacion.",
  openGraph: {
    title: "Politica de Privacidad — PAYWL",
    description:
      "Conoce como PAYWL protege tu informacion personal.",
    url: "https://paywl.io/privacidad",
  },
};

const sectionClass = "mb-10";
const headingClass = "mb-4 text-xl font-bold";
const paraClass = "mb-3 text-sm leading-relaxed";
const listClass = "mb-3 ml-6 list-disc space-y-1 text-sm leading-relaxed";

export default function PrivacidadPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://paywl.io" },
          { name: "Politica de Privacidad", url: "https://paywl.io/privacidad" },
        ]}
      />

      <section className="pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1
            className="mb-2 text-3xl font-extrabold md:text-4xl"
            style={{ color: "#0A2540" }}
          >
            Politica de Privacidad
          </h1>
          <p className="mb-12 text-sm" style={{ color: "#4A5568" }}>
            Ultima actualizacion: 1 de marzo de 2026
          </p>

          <div style={{ color: "#4A5568" }}>
            {/* 1. Responsable */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                1. Responsable del tratamiento
              </h2>
              <p className={paraClass}>
                El responsable del tratamiento de los datos personales recopilados a
                traves de la plataforma PAYWL es:
              </p>
              <ul className={listClass}>
                <li>
                  <strong>Razon social:</strong> Nivelics SAS
                </li>
                <li>
                  <strong>NIT:</strong> 900.XXX.XXX-X
                </li>
                <li>
                  <strong>Domicilio:</strong> Colombia
                </li>
                <li>
                  <strong>Correo de contacto:</strong>{" "}
                  <a
                    href="mailto:privacidad@nivelics.com"
                    className="underline"
                    style={{ color: "#00B4D8" }}
                  >
                    privacidad@nivelics.com
                  </a>
                </li>
              </ul>
            </div>

            {/* 2. Datos recopilados */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                2. Datos recopilados
              </h2>
              <p className={paraClass}>
                Recopilamos los siguientes datos personales cuando utilizas nuestros
                servicios o completas formularios en el sitio:
              </p>
              <ul className={listClass}>
                <li>Nombre completo</li>
                <li>Correo electronico corporativo</li>
                <li>Cargo y nombre de la empresa/medio</li>
                <li>Pais de residencia</li>
                <li>Informacion sobre el medio digital (page views, CMS, modelo de suscripcion)</li>
                <li>Direccion IP y datos de navegacion (cookies)</li>
                <li>Cualquier informacion adicional proporcionada voluntariamente</li>
              </ul>
            </div>

            {/* 3. Finalidad */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                3. Finalidad del tratamiento
              </h2>
              <p className={paraClass}>
                Los datos personales seran utilizados para las siguientes finalidades:
              </p>
              <ul className={listClass}>
                <li>Gestionar solicitudes de piloto gratuito y contacto comercial</li>
                <li>Proveer, mantener y mejorar los servicios de la plataforma PAYWL</li>
                <li>Enviar comunicaciones relacionadas con el servicio contratado</li>
                <li>Enviar informacion comercial y de marketing (con consentimiento previo)</li>
                <li>Cumplir obligaciones legales y regulatorias</li>
                <li>Generar estadisticas anonimizadas de uso</li>
              </ul>
            </div>

            {/* 4. Derechos del titular */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                4. Derechos del titular
              </h2>
              <p className={paraClass}>
                De acuerdo con la Ley 1581 de 2012 y normas concordantes, como titular
                de datos personales tienes derecho a:
              </p>
              <ul className={listClass}>
                <li>Conocer, actualizar y rectificar tus datos personales</li>
                <li>Solicitar prueba de la autorizacion otorgada</li>
                <li>Ser informado sobre el uso que se ha dado a tus datos</li>
                <li>Revocar la autorizacion y/o solicitar la supresion de tus datos</li>
                <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC)</li>
                <li>Acceder de forma gratuita a tus datos personales</li>
              </ul>
              <p className={paraClass}>
                Para ejercer estos derechos, envia un correo a{" "}
                <a
                  href="mailto:privacidad@nivelics.com"
                  className="underline"
                  style={{ color: "#00B4D8" }}
                >
                  privacidad@nivelics.com
                </a>{" "}
                con tu nombre completo, numero de identificacion y descripcion de la
                solicitud.
              </p>
            </div>

            {/* 5. Transferencia internacional */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                5. Transferencia internacional de datos
              </h2>
              <p className={paraClass}>
                Los datos personales podran ser almacenados y procesados en servidores
                de Amazon Web Services (AWS) ubicados en Estados Unidos y otras
                regiones. AWS cumple con estandares internacionales de seguridad
                incluyendo SOC 2, ISO 27001 y el EU-US Data Privacy Framework.
              </p>
              <p className={paraClass}>
                Al utilizar nuestros servicios, autorizas la transferencia internacional
                de tus datos bajo las garantias de seguridad descritas en esta politica.
              </p>
            </div>

            {/* 6. Retencion */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                6. Retencion de datos
              </h2>
              <p className={paraClass}>
                Los datos personales seran conservados durante el tiempo necesario para
                cumplir con las finalidades descritas, o mientras exista una relacion
                comercial activa. Los datos de leads que no se conviertan en clientes
                seran eliminados transcurridos 24 meses desde su recopilacion, salvo
                obligacion legal en contrario.
              </p>
            </div>

            {/* 7. Seguridad */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                7. Medidas de seguridad
              </h2>
              <p className={paraClass}>
                Implementamos medidas tecnicas, administrativas y fisicas para proteger
                tus datos personales, incluyendo:
              </p>
              <ul className={listClass}>
                <li>Cifrado de datos en transito (TLS 1.3) y en reposo (AES-256)</li>
                <li>Control de acceso basado en roles</li>
                <li>Monitoreo continuo de la infraestructura</li>
                <li>Backups automaticos y plan de recuperacion ante desastres</li>
                <li>Auditorias periodicas de seguridad</li>
              </ul>
            </div>

            {/* 8. Cookies */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                8. Politica de cookies
              </h2>
              <p className={paraClass}>
                Nuestro sitio web utiliza cookies propias y de terceros para:
              </p>
              <ul className={listClass}>
                <li>
                  <strong>Cookies esenciales:</strong> necesarias para el funcionamiento
                  del sitio
                </li>
                <li>
                  <strong>Cookies analiticas:</strong> para medir el rendimiento y uso
                  del sitio (Google Analytics)
                </li>
                <li>
                  <strong>Cookies de marketing:</strong> para personalizar la
                  experiencia y medir campanas (solo con consentimiento)
                </li>
              </ul>
              <p className={paraClass}>
                Puedes gestionar tus preferencias de cookies desde la configuracion de
                tu navegador.
              </p>
            </div>

            {/* 9. Contacto */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                9. Contacto
              </h2>
              <p className={paraClass}>
                Para cualquier consulta relacionada con esta politica de privacidad o el
                tratamiento de tus datos personales, puedes contactarnos a traves de:
              </p>
              <ul className={listClass}>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:privacidad@nivelics.com"
                    className="underline"
                    style={{ color: "#00B4D8" }}
                  >
                    privacidad@nivelics.com
                  </a>
                </li>
                <li>
                  <strong>Sitio web:</strong>{" "}
                  <a
                    href="https://paywl.io/contacto"
                    className="underline"
                    style={{ color: "#00B4D8" }}
                  >
                    paywl.io/contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
