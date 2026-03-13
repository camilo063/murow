"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: Faq[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  // Build FAQ structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A2540] mb-4">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-[#4A5568]">
            Todo lo que necesitas saber sobre MUROW antes de dar el siguiente paso.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <Accordion.Root type="single" collapsible className="divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Accordion.Item key={faq.id} value={faq.id} className="group">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-[#0077A8]">
                    <span className="text-base md:text-lg font-semibold text-[#0A2540] group-hover:text-[#0077A8] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#4A5568] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="pb-5 pr-8">
                    <p className="text-[#4A5568] leading-relaxed">{faq.answer}</p>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
