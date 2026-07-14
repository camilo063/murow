import { Resend } from "resend";

/**
 * Cliente Resend + envio de notificaciones de leads.
 *
 * Config via variables de entorno (ver .env):
 *  - RESEND_API_KEY          -> API key de Resend (obligatoria para enviar)
 *  - LEADS_FROM_EMAIL        -> remitente, dominio verificado (default: leads@paywl.io)
 *  - LEADS_NOTIFICATION_EMAIL-> destinatario(s) de las notificaciones (default: comercial@nivelics.co)
 *
 * Si RESEND_API_KEY no esta configurada, sendLeadNotification NO lanza error:
 * registra un warning y devuelve { sent: false } para que el guardado del lead
 * en la BD nunca se vea afectado por un fallo de correo.
 */

const FROM_EMAIL = process.env.LEADS_FROM_EMAIL || "PAYWL Leads <leads@paywl.io>";
const TO_EMAIL = process.env.LEADS_NOTIFICATION_EMAIL || "comercial@nivelics.co";

// Colores de marca PAYWL
const NAVY = "#0A2540";
const CYAN = "#00B4D8";
const ORANGE = "#FF6B35";
const SKY = "#F0F7FF";
const SLATE = "#4A5568";
const BORDER = "#E2E8F0";

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

type SendResult = { sent: boolean; error?: unknown };

export interface LeadContact {
  name: string;
  email: string;
  /** empresa / medio */
  company: string;
}

interface LeadNotificationInput {
  /** etiqueta del origen, ej. "Piloto Gratuito" o "Contacto" */
  leadType: string;
  subject: string;
  /** datos de contacto que se muestran destacados arriba */
  contact: LeadContact;
  /** filas de detalle que se renderizan como tabla */
  fields: { label: string; value: string }[];
}

function escapeHtml(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Fecha/hora legible en zona horaria de Colombia. */
function nowInBogota(): string {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      timeZone: "America/Bogota",
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

function renderHtml(input: LeadNotificationInput): string {
  const { leadType, contact, fields } = input;
  const timestamp = nowInBogota();

  const rows = fields
    .map(
      (f, i) => `
        <tr style="background:${i % 2 === 0 ? "#ffffff" : SKY};">
          <td style="padding:12px 20px;border-bottom:1px solid ${BORDER};font-weight:600;color:${NAVY};white-space:nowrap;vertical-align:top;width:38%;font-size:13px;">${escapeHtml(
            f.label
          )}</td>
          <td style="padding:12px 20px;border-bottom:1px solid ${BORDER};color:${SLATE};font-size:14px;line-height:1.5;">${escapeHtml(
            f.value || "—"
          )}</td>
        </tr>`
    )
    .join("");

  const mailtoSubject = encodeURIComponent(`Re: Tu solicitud en PAYWL`);
  const replyHref = `mailto:${contact.email}?subject=${mailtoSubject}`;

  return `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
  </head>
  <body style="margin:0;padding:0;background:${SKY};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${SLATE};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Nuevo lead de ${escapeHtml(
      leadType
    )}: ${escapeHtml(contact.name)} — ${escapeHtml(contact.company)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SKY};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BORDER};box-shadow:0 4px 24px rgba(10,37,64,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:${NAVY};padding:28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="color:${CYAN};font-weight:800;font-size:22px;letter-spacing:0.5px;">PAY<span style="color:#ffffff;">WL</span></span>
                    </td>
                    <td align="right">
                      <span style="display:inline-block;background:${ORANGE};color:#ffffff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;padding:6px 12px;border-radius:999px;">${escapeHtml(
                        leadType
                      )}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Title -->
            <tr>
              <td style="padding:28px 32px 8px;">
                <h1 style="margin:0;font-size:20px;line-height:1.3;color:${NAVY};font-weight:700;">🎯 Nuevo lead recibido</h1>
                <p style="margin:6px 0 0;font-size:13px;color:${SLATE};">${escapeHtml(
                  timestamp
                )} (hora Colombia)</p>
              </td>
            </tr>

            <!-- Contact highlight card -->
            <tr>
              <td style="padding:16px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${SKY};border:1px solid ${BORDER};border-radius:12px;">
                  <tr>
                    <td style="padding:20px 24px;">
                      <p style="margin:0;font-size:18px;font-weight:700;color:${NAVY};">${escapeHtml(
                        contact.name
                      )}</p>
                      <p style="margin:4px 0 0;font-size:14px;color:${SLATE};">${escapeHtml(
                        contact.company
                      )}</p>
                      <p style="margin:12px 0 0;font-size:14px;">
                        <a href="mailto:${escapeHtml(
                          contact.email
                        )}" style="color:${CYAN};font-weight:600;text-decoration:none;">${escapeHtml(
    contact.email
  )}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td style="padding:12px 32px 8px;">
                <a href="${replyHref}" style="display:inline-block;background:${CYAN};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:8px;">Responder a ${escapeHtml(
    contact.name.split(" ")[0]
  )} →</a>
              </td>
            </tr>

            <!-- Detail table -->
            <tr>
              <td style="padding:20px 32px 8px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:${SLATE};">Detalle completo</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};border-radius:10px;overflow:hidden;border-collapse:separate;">
                  ${rows}
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 32px 28px;">
                <hr style="border:none;border-top:1px solid ${BORDER};margin:0 0 16px;" />
                <p style="margin:0;font-size:12px;color:${SLATE};line-height:1.6;">
                  Este correo fue generado automaticamente desde el sitio <strong style="color:${NAVY};">PAYWL</strong>.
                  El lead ya quedo guardado en la base de datos. Responde directamente a este correo para contactar al prospecto.
                </p>
                <p style="margin:12px 0 0;font-size:11px;color:#94A3B8;">PAYWL — The Paywall Engine for Media · by Nivelics SAS</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderText(input: LeadNotificationInput): string {
  const header = `PAYWL — Nuevo lead (${input.leadType})`;
  const contactBlock = `Contacto:\n  ${input.contact.name}\n  ${input.contact.company}\n  ${input.contact.email}`;
  const details = input.fields
    .map((f) => `  ${f.label}: ${f.value || "—"}`)
    .join("\n");
  return `${header}\n${nowInBogota()} (hora Colombia)\n\n${contactBlock}\n\nDetalle:\n${details}\n\n— Notificacion automatica de PAYWL. El lead fue guardado en la BD.`;
}

/**
 * Envia una notificacion de nuevo lead. Nunca lanza: en caso de error de correo
 * devuelve { sent: false, error } y deja registro en consola.
 */
export async function sendLeadNotification(
  input: LeadNotificationInput
): Promise<SendResult> {
  const resend = getResend();
  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY no configurada — se omite el envio de correo. El lead fue guardado en la BD."
    );
    return { sent: false };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL.split(",").map((e) => e.trim()),
      replyTo: input.contact.email,
      subject: input.subject,
      html: renderHtml(input),
      text: renderText(input),
    });

    if (error) {
      console.error("[email] Resend devolvio un error:", error);
      return { sent: false, error };
    }
    console.log(`[email] Notificacion enviada (id: ${data?.id ?? "?"}) → ${TO_EMAIL}`);
    return { sent: true };
  } catch (error) {
    console.error("[email] Fallo al enviar la notificacion de lead:", error);
    return { sent: false, error };
  }
}
