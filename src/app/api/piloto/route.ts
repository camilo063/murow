import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
