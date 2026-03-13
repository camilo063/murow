import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Terminos de Servicio — PAYWL by Nivelics SAS",
  description:
    "Terminos y condiciones de uso de la plataforma PAYWL, operada por Nivelics SAS. Condiciones generales del servicio SaaS de paywall.",
  openGraph: {
    title: "Terminos de Servicio — PAYWL",
    description:
      "Condiciones generales del servicio SaaS de paywall PAYWL.",
    url: "https://paywl.io/terminos",
  },
};

const sectionClass = "mb-10";
const headingClass = "mb-4 text-xl font-bold";
const paraClass = "mb-3 text-sm leading-relaxed";
const listClass = "mb-3 ml-6 list-disc space-y-1 text-sm leading-relaxed";

export default function TerminosPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://paywl.io" },
          { name: "Terminos de Servicio", url: "https://paywl.io/terminos" },
        ]}
      />

      <section className="pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1
            className="mb-2 text-3xl font-extrabold md:text-4xl"
            style={{ color: "#0A2540" }}
          >
            Terminos de Servicio
          </h1>
          <p className="mb-12 text-sm" style={{ color: "#4A5568" }}>
            Ultima actualizacion: 1 de marzo de 2026
          </p>

          <div style={{ color: "#4A5568" }}>
            {/* 1. Aceptacion */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                1. Aceptacion de los terminos
              </h2>
              <p className={paraClass}>
                Al acceder y utilizar la plataforma PAYWL (en adelante, &quot;el Servicio&quot;),
                operada por Nivelics SAS (en adelante, &quot;Nivelics&quot;), aceptas quedar
                vinculado por estos Terminos de Servicio. Si no estas de acuerdo con
                alguna parte de estos terminos, no debes utilizar el Servicio.
              </p>
            </div>

            {/* 2. Descripcion del servicio */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                2. Descripcion del servicio
              </h2>
              <p className={paraClass}>
                PAYWL es una plataforma SaaS (Software as a Service) que provee un motor
                de paywall configurable para medios de comunicacion digitales. El
                Servicio incluye:
              </p>
              <ul className={listClass}>
                <li>Motor de reglas de paywall configurable</li>
                <li>Dashboard de analytics en tiempo real</li>
                <li>Integraciones con sistemas CMS y pasarelas de pago</li>
                <li>Soporte tecnico en espanol</li>
                <li>Actualizaciones y mejoras continuas de la plataforma</li>
              </ul>
            </div>

            {/* 3. Registro y cuenta */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                3. Registro y cuenta
              </h2>
              <p className={paraClass}>
                Para utilizar el Servicio debes crear una cuenta proporcionando
                informacion veraz y actualizada. Eres responsable de mantener la
                confidencialidad de tus credenciales de acceso y de todas las
                actividades que ocurran bajo tu cuenta.
              </p>
            </div>

            {/* 4. Planes y facturacion */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                4. Planes y facturacion
              </h2>
              <p className={paraClass}>
                El Servicio se ofrece mediante planes de suscripcion con contrato
                minimo de 12 meses. Los precios estan publicados en la pagina de
                precios y pueden ser actualizados con 60 dias de preaviso. La
                facturacion se realiza de forma mensual o anual segun el plan
                seleccionado.
              </p>
            </div>

            {/* 5. Programa piloto */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                5. Programa piloto gratuito
              </h2>
              <p className={paraClass}>
                Nivelics ofrece un programa piloto de 90 dias sin costo. Al finalizar
                el periodo piloto, el cliente puede optar por contratar un plan de pago
                o cancelar sin penalidad. Los datos generados durante el piloto seran
                entregados al cliente en formato estandar.
              </p>
            </div>

            {/* 6. Propiedad de los datos */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                6. Propiedad de los datos
              </h2>
              <p className={paraClass}>
                Los datos de tus suscriptores, lectores y contenido son de tu propiedad
                exclusiva. Nivelics actua unicamente como encargado del tratamiento de
                dichos datos. Al terminar la relacion contractual, te entregaremos una
                copia completa de tus datos en formato estandar dentro de los 30 dias
                siguientes.
              </p>
            </div>

            {/* 7. Uso aceptable */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                7. Uso aceptable
              </h2>
              <p className={paraClass}>
                Te comprometes a utilizar el Servicio de manera licita y conforme a
                estos terminos. Queda prohibido:
              </p>
              <ul className={listClass}>
                <li>Utilizar el Servicio para actividades ilegales</li>
                <li>Intentar acceder a sistemas o datos de otros clientes</li>
                <li>Realizar ingenieria inversa del software</li>
                <li>Revender o sublicenciar el Servicio sin autorizacion</li>
                <li>Exceder deliberadamente los limites del plan contratado</li>
              </ul>
            </div>

            {/* 8. Disponibilidad */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                8. Disponibilidad del servicio
              </h2>
              <p className={paraClass}>
                Nivelics se compromete a mantener una disponibilidad del Servicio del
                99.9% mensual (SLA). Las ventanas de mantenimiento programado seran
                comunicadas con al menos 48 horas de anticipacion. En caso de
                incumplimiento del SLA, el cliente tendra derecho a creditos en su
                facturacion segun lo establecido en el contrato de servicio.
              </p>
            </div>

            {/* 9. Limitacion de responsabilidad */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                9. Limitacion de responsabilidad
              </h2>
              <p className={paraClass}>
                En la maxima medida permitida por la ley, la responsabilidad total de
                Nivelics por cualquier reclamacion relacionada con el Servicio no
                excedera el monto total pagado por el cliente durante los 12 meses
                anteriores al evento que dio lugar a la reclamacion.
              </p>
            </div>

            {/* 10. Terminacion */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                10. Terminacion
              </h2>
              <p className={paraClass}>
                Cualquiera de las partes puede terminar el contrato al finalizar el
                periodo contratado con 30 dias de preaviso. Nivelics se reserva el
                derecho de suspender o terminar el acceso al Servicio en caso de
                incumplimiento de estos terminos, previa notificacion al cliente.
              </p>
            </div>

            {/* 11. Ley aplicable */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                11. Ley aplicable y jurisdiccion
              </h2>
              <p className={paraClass}>
                Estos terminos se regiran e interpretaran de acuerdo con las leyes de la
                Republica de Colombia. Cualquier controversia sera resuelta por los
                tribunales competentes de la ciudad de Bogota, Colombia, salvo acuerdo
                diferente entre las partes.
              </p>
            </div>

            {/* 12. Contacto */}
            <div className={sectionClass}>
              <h2 className={headingClass} style={{ color: "#0A2540" }}>
                12. Contacto
              </h2>
              <p className={paraClass}>
                Para consultas sobre estos terminos, contactanos en:{" "}
                <a
                  href="mailto:contacto@nivelics.com"
                  className="underline"
                  style={{ color: "#00B4D8" }}
                >
                  contacto@nivelics.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
