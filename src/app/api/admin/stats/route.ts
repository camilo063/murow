import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    blogPosts,
    pilotoLeads,
    contactoLeads,
    faqItems,
    caseStudies,
    integrations,
    pricingPlans,
    competitors,
    painCards,
    productPillars,
    paywallRules,
    differentiators,
    implementationSteps,
    dashboardMetrics,
    trustStats,
    trustLogos,
    pageMeta,
    siteConfig,
    navbarLinks,
    footerLinks,
    sectionContent,
    exitStrategyItems,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.pilotoLead.count(),
    prisma.contactoLead.count(),
    prisma.faqItem.count(),
    prisma.caseStudy.count(),
    prisma.integration.count(),
    prisma.pricingPlan.count(),
    prisma.competitor.count(),
    prisma.painCard.count(),
    prisma.productPillar.count(),
    prisma.paywallRule.count(),
    prisma.differentiator.count(),
    prisma.implementationStep.count(),
    prisma.dashboardMetric.count(),
    prisma.trustStat.count(),
    prisma.trustLogo.count(),
    prisma.pageMeta.count(),
    prisma.siteConfig.count(),
    prisma.navbarLink.count(),
    prisma.footerLink.count(),
    prisma.sectionContent.count(),
    prisma.exitStrategyItem.count(),
  ]);

  return NextResponse.json({
    blogPosts,
    leads: pilotoLeads,
    contactoLeads,
    faqItems,
    caseStudies,
    integrations,
    pricingPlans,
    competitors,
    painCards,
    productPillars,
    paywallRules,
    differentiators,
    implementationSteps,
    dashboardMetrics,
    trustStats,
    trustLogos,
    pageMeta,
    siteConfig,
    navbarLinks,
    footerLinks,
    sectionContent,
    exitStrategyItems,
  });
}
