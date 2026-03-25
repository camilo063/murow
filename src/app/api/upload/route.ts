import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "File type not allowed. Use JPG, PNG, WebP, SVG or GIF." },
      { status: 400 }
    );
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: "File too large. Max 5MB." },
      { status: 400 }
    );
  }

  // Generate unique filename
  const ext = path.extname(file.name) || `.${file.type.split("/")[1]}`;
  const safeName = file.name
    .replace(ext, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .substring(0, 50);
  const uniqueName = `${safeName}-${Date.now()}${ext}`;

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  // Write file
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(uploadsDir, uniqueName);
  await writeFile(filePath, buffer);

  const url = `/uploads/${uniqueName}`;
  return NextResponse.json({ url, filename: uniqueName });
}
