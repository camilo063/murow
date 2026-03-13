import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Map URL slugs to Prisma model names
const sectionModelMap: Record<string, string> = {
  hero: "heroSection",
  "trust-stats": "trustStat",
  "trust-logos": "trustLogo",
  "pain-cards": "painCard",
  "product-pillars": "productPillar",
  "paywall-rules": "paywallRule",
  "pricing-plans": "pricingPlan",
  competitors: "competitor",
  "implementation-steps": "implementationStep",
  "dashboard-metrics": "dashboardMetric",
  integrations: "integration",
  "case-studies": "caseStudy",
  differentiators: "differentiator",
  faq: "faqItem",
  "blog-posts": "blogPost",
  "piloto-leads": "pilotoLead",
  "page-meta": "pageMeta",
  "site-config": "siteConfig",
};

// Models that have a sortOrder field
const modelsWithSortOrder = new Set([
  "trustStat",
  "trustLogo",
  "painCard",
  "productPillar",
  "paywallRule",
  "pricingPlan",
  "competitor",
  "implementationStep",
  "dashboardMetric",
  "integration",
  "caseStudy",
  "differentiator",
  "faqItem",
]);

// Models that have a createdAt field
const modelsWithCreatedAt = new Set(["blogPost", "pilotoLead"]);

// Read-only sections
const readOnlySections = new Set(["piloto-leads"]);

function getModel(modelName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[modelName];
}

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { section: string } }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { section } = params;
  const modelName = sectionModelMap[section];
  if (!modelName) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }

  const model = getModel(modelName);

  // Build orderBy
  let orderBy: Record<string, string> = {};
  if (modelsWithSortOrder.has(modelName)) {
    orderBy = { sortOrder: "asc" };
  } else if (modelsWithCreatedAt.has(modelName)) {
    orderBy = { createdAt: "desc" };
  }

  const data = await model.findMany({
    orderBy: Object.keys(orderBy).length > 0 ? orderBy : undefined,
  });

  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { section } = params;
  if (readOnlySections.has(section)) {
    return NextResponse.json(
      { error: "This section is read-only" },
      { status: 403 }
    );
  }

  const modelName = sectionModelMap[section];
  if (!modelName) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }

  const body = await req.json();
  // Remove id if present (for creation)
  delete body.id;
  // Remove timestamps
  delete body.createdAt;
  delete body.updatedAt;

  const model = getModel(modelName);
  const record = await model.create({ data: body });
  return NextResponse.json(record, { status: 201 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { section } = params;
  if (readOnlySections.has(section)) {
    return NextResponse.json(
      { error: "This section is read-only" },
      { status: 403 }
    );
  }

  const modelName = sectionModelMap[section];
  if (!modelName) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }

  const body = await req.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  // Remove timestamps
  delete data.createdAt;
  delete data.updatedAt;

  const model = getModel(modelName);
  const record = await model.update({ where: { id }, data });
  return NextResponse.json(record);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { section: string } }
) {
  const authError = await checkAuth();
  if (authError) return authError;

  const { section } = params;
  if (readOnlySections.has(section)) {
    return NextResponse.json(
      { error: "This section is read-only" },
      { status: 403 }
    );
  }

  const modelName = sectionModelMap[section];
  if (!modelName) {
    return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const model = getModel(modelName);
  await model.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
