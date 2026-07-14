import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      mediaName,
      position,
      email,
      country,
      pageViews,
      currentCms,
      hasSubscription,
      challenge,
    } = body;

    // Validate required fields
    if (
      !fullName ||
      !mediaName ||
      !position ||
      !email ||
      !country ||
      !pageViews ||
      !currentCms ||
      !hasSubscription
    ) {
      return NextResponse.json(
        { error: "Todos los campos obligatorios deben ser completados." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El email proporcionado no es valido." },
        { status: 400 }
      );
    }

    const lead = await prisma.pilotoLead.create({
      data: {
        fullName,
        mediaName,
        position,
        email,
        country,
        pageViews,
        currentCms,
        hasSubscription,
        challenge: challenge || "",
      },
    });

    // Notificar al equipo comercial. No bloquea la respuesta si el correo falla:
    // el lead ya quedo guardado en la BD.
    await sendLeadNotification({
      leadType: "Piloto Gratuito",
      subject: `Nuevo lead de piloto: ${mediaName}`,
      contact: { name: fullName, email, company: mediaName },
      fields: [
        { label: "Nombre", value: fullName },
        { label: "Medio", value: mediaName },
        { label: "Cargo", value: position },
        { label: "Email", value: email },
        { label: "Pais", value: country },
        { label: "Pageviews/mes", value: pageViews },
        { label: "CMS actual", value: currentCms },
        { label: "Tiene suscripcion", value: hasSubscription },
        { label: "Reto principal", value: challenge || "" },
      ],
    });

    return NextResponse.json(
      { success: true, id: lead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating piloto lead:", error);
    return NextResponse.json(
      { error: "Error interno del servidor. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
