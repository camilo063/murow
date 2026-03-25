import { prisma } from "@/lib/prisma"
import HeroSection from "@/components/sections/HeroSection"
import PainSection from "@/components/sections/PainSection"
import WhatIsSection from "@/components/sections/WhatIsSection"
import RulesSection from "@/components/sections/RulesSection"
import PricingSection from "@/components/sections/PricingSection"
import ComparisonSection from "@/components/sections/ComparisonSection"
import ImplementationSection from "@/components/sections/ImplementationSection"
import AnalyticsSection from "@/components/sections/AnalyticsSection"
import IntegrationsSection from "@/components/sections/IntegrationsSection"
import CaseStudySection from "@/components/sections/CaseStudySection"
import WhyPaywlSection from "@/components/sections/WhyMurowSection"
import FaqSection from "@/components/sections/FaqSection"
import CtaSection from "@/components/sections/CtaSection"
import {
  OrganizationSchema,
  SoftwareApplicationSchema,
  FAQPageSchema,
} from "@/components/seo/StructuredData"

export default async function HomePage() {
  const [
    hero,
    trustLogos,
    trustStats,
    painCards,
    pillars,
    rules,
    plans,
    competitors,
    steps,
    metrics,
    integrations,
    caseStudy,
    differentiators,
    faqs,
    ctaData,
    sectionContents,
    exitStrategyItems,
  ] = await Promise.all([
    prisma.heroSection.findFirst({ where: { isActive: true } }),
    prisma.trustLogo.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.trustStat.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.painCard.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.productPillar.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.paywallRule.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.pricingPlan.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.competitor.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.implementationStep.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.dashboardMetric.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.integration.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.caseStudy.findFirst({ where: { isMain: true } }),
    prisma.differentiator.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.faqItem.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.ctaSection.findFirst({ where: { isActive: true } }),
    prisma.sectionContent.findMany(),
    prisma.exitStrategyItem.findMany({ orderBy: { sortOrder: "asc" } }),
  ])

  // Build section headers lookup
  const headers: Record<string, { title: string; subtitle: string }> = {}
  for (const sc of sectionContents) {
    headers[sc.sectionKey] = { title: sc.title, subtitle: sc.subtitle }
  }

  return (
    <>
      <OrganizationSchema />
      <SoftwareApplicationSchema />
      {faqs.length > 0 && (
        <FAQPageSchema
          faqs={faqs.map((f) => ({ question: f.question, answer: f.answer }))}
        />
      )}

      {hero && (
        <HeroSection
          headline={hero.headline}
          subheadline={hero.subheadline}
          ctaPrimaryText={hero.ctaPrimaryText}
          ctaPrimaryLink={hero.ctaPrimaryLink}
          ctaSecondaryText={hero.ctaSecondaryText}
          ctaSecondaryLink={hero.ctaSecondaryLink}
          badgeText={hero.badgeText}
          trustLogos={trustLogos.map((l) => l.name)}
          trustStats={trustStats.map((s) => ({
            value: s.value,
            label: s.label,
          }))}
        />
      )}

      {painCards.length > 0 && (
        <PainSection
          sectionTitle={headers["pain"]?.title}
          sectionSubtitle={headers["pain"]?.subtitle}
          cards={painCards.map((c) => ({
            icon: c.icon,
            headline: c.headline,
            description: c.description,
          }))}
        />
      )}

      {pillars.length > 0 && (
        <WhatIsSection
          sectionTitle={headers["what-is"]?.title}
          sectionSubtitle={headers["what-is"]?.subtitle}
          pillars={pillars.map((p) => ({
            icon: p.icon,
            title: p.title,
            description: p.description,
            impactNote: p.impactNote,
          }))}
        />
      )}

      {rules.length > 0 && (
        <RulesSection
          sectionTitle={headers["rules"]?.title}
          sectionSubtitle={headers["rules"]?.subtitle}
          rules={rules.map((r) => ({
            ruleNumber: r.ruleNumber,
            icon: r.icon,
            name: r.name,
            visibleName: r.visibleName,
            description: r.description,
            useCase: r.useCase,
            example: r.example,
          }))}
        />
      )}

      {plans.length > 0 && (
        <PricingSection
          sectionTitle={headers["pricing"]?.title}
          sectionSubtitle={headers["pricing"]?.subtitle}
          plans={plans.map((p) => ({
            name: p.name,
            slug: p.slug,
            priceMonthly: p.priceMonthly,
            priceAnnual: p.priceAnnual,
            focus: p.focus,
            targetAudience: p.targetAudience,
            isRecommended: p.isRecommended,
            features: p.features,
          }))}
        />
      )}

      {competitors.length > 0 && (
        <ComparisonSection
          sectionTitle={headers["comparison"]?.title}
          sectionSubtitle={headers["comparison"]?.subtitle}
          competitors={competitors.map((c) => ({
            name: c.name,
            setup: c.setup,
            monthly: c.monthly,
            localPayment: c.localPayment,
            spanishSupport: c.spanishSupport,
            ownData: c.ownData,
            implementation: c.implementation,
            isHighlighted: c.isHighlighted,
          }))}
        />
      )}

      {steps.length > 0 && (
        <ImplementationSection
          sectionTitle={headers["implementation"]?.title}
          sectionSubtitle={headers["implementation"]?.subtitle}
          steps={steps.map((s) => ({
            stepNumber: s.stepNumber,
            title: s.title,
            timeframe: s.timeframe,
            activities: s.activities.split(". ").filter(Boolean),
            deliverables: s.deliverables.split(". ").filter(Boolean),
          }))}
        />
      )}

      {metrics.length > 0 && (
        <AnalyticsSection
          sectionTitle={headers["analytics"]?.title}
          sectionSubtitle={headers["analytics"]?.subtitle}
          metrics={metrics.map((m) => ({
            title: m.title,
            description: m.description,
          }))}
        />
      )}

      {integrations.length > 0 && (
        <IntegrationsSection
          sectionTitle={headers["integrations"]?.title}
          sectionSubtitle={headers["integrations"]?.subtitle}
          integrations={integrations.map((i) => ({
            category: i.category,
            name: i.name,
            status: i.status,
            details: i.details,
          }))}
        />
      )}

      {caseStudy && (
        <CaseStudySection
          sectionTitle={headers["case-study"]?.title}
          caseStudy={{
            clientName: caseStudy.clientName,
            description: caseStudy.description,
            challenge: caseStudy.challenge,
            solution: caseStudy.solution,
            metrics: caseStudy.metrics,
            testimonial: caseStudy.testimonial,
            author: caseStudy.author,
          }}
          logos={trustLogos.map((l) => l.name)}
        />
      )}

      {differentiators.length > 0 && (
        <WhyPaywlSection
          sectionTitle={headers["why-paywl"]?.title}
          sectionSubtitle={headers["why-paywl"]?.subtitle}
          differentiators={differentiators.map((d) => ({
            title: d.title,
            points: d.points,
          }))}
          exitStrategyItems={exitStrategyItems.map((e) => ({
            title: e.title,
            description: e.description,
          }))}
        />
      )}

      {faqs.length > 0 && (
        <FaqSection
          sectionTitle={headers["faq"]?.title}
          sectionSubtitle={headers["faq"]?.subtitle}
          faqs={faqs.map((f) => ({
            id: f.id,
            question: f.question,
            answer: f.answer,
          }))}
        />
      )}

      {ctaData && (
        <CtaSection
          headline={ctaData.headline}
          subheadline={ctaData.subheadline}
          ctaPrimaryText={ctaData.ctaPrimaryText}
          ctaPrimaryLink={ctaData.ctaPrimaryLink}
          ctaSecondaryText={ctaData.ctaSecondaryText}
          ctaSecondaryLink={ctaData.ctaSecondaryLink}
          disclaimerText={ctaData.disclaimerText}
        />
      )}
      {!ctaData && <CtaSection />}
    </>
  )
}
