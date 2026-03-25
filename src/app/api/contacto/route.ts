import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, company, message } = body;

    // Validate required fields
    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
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

    // Save to database
    await prisma.contactoLead.create({
      data: { name, email, company, message },
    });

    return NextResponse.json(
      { success: true, message: "Mensaje recibido correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Error interno del servidor. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
