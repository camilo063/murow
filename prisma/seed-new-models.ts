import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// Required for Node.js runtime (no native WebSocket)
neonConfig.webSocketConstructor = ws;
// Use fetch-based connection for the HTTP transport
neonConfig.useSecureWebSocket = true;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}
console.log('Connecting to:', connectionString.substring(0, 35) + '...');
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding new admin models...\n');

  // ─── CtaSection ─────────────────────────────────────────────
  const existingCta = await prisma.ctaSection.findFirst();
  if (!existingCta) {
    await prisma.ctaSection.create({
      data: {
        headline: 'Tu medio merece monetizar sin depender de nadie.',
        subheadline: 'Unete a los medios digitales latinoamericanos que tomaron el control de sus suscripciones.',
        ctaPrimaryText: 'Quiero el piloto gratuito de 3 meses',
        ctaPrimaryLink: '/piloto',
        ctaSecondaryText: 'Hablar con un experto',
        ctaSecondaryLink: 'https://calendly.com/paywl/demo',
        disclaimerText: 'Sin tarjeta de credito. Sin compromisos. Configura tu medio en menos de 48 horas y empieza a validar resultados desde la primera semana.',
        isActive: true,
      },
    });
    console.log('✅ CtaSection created');
  } else {
    console.log('⏭️  CtaSection already exists');
  }

  // ─── NavbarConfig ───────────────────────────────────────────
  const existingNavConfig = await prisma.navbarConfig.findFirst();
  if (!existingNavConfig) {
    await prisma.navbarConfig.create({
      data: {
        logoText: 'PAYWL',
        ctaPrimaryText: 'Ver Demo',
        ctaPrimaryLink: '#demo',
        ctaSecondaryText: 'Piloto Gratuito',
        ctaSecondaryLink: '/piloto',
      },
    });
    console.log('✅ NavbarConfig created');
  } else {
    console.log('⏭️  NavbarConfig already exists');
  }

  // ─── NavbarLinks ────────────────────────────────────────────
  const existingNavLinks = await prisma.navbarLink.count();
  if (existingNavLinks === 0) {
    await Promise.all([
      prisma.navbarLink.create({ data: { label: 'Producto', href: '#producto', sortOrder: 1, isActive: true } }),
      prisma.navbarLink.create({ data: { label: 'Precios', href: '/precios', sortOrder: 2, isActive: true } }),
      prisma.navbarLink.create({ data: { label: 'Integraciones', href: '/integraciones', sortOrder: 3, isActive: true } }),
      prisma.navbarLink.create({ data: { label: 'Blog', href: '/blog', sortOrder: 4, isActive: true } }),
      prisma.navbarLink.create({ data: { label: 'Docs', href: '/docs', sortOrder: 5, isActive: true } }),
    ]);
    console.log('✅ NavbarLinks created: 5');
  } else {
    console.log(`⏭️  NavbarLinks already exist: ${existingNavLinks}`);
  }

  // ─── FooterConfig ───────────────────────────────────────────
  const existingFooterConfig = await prisma.footerConfig.findFirst();
  if (!existingFooterConfig) {
    await prisma.footerConfig.create({
      data: {
        logoText: 'PAYWL',
        tagline: 'The Paywall Engine for Media',
        slogan: 'Tus datos. Tu medio. Tu control.',
        copyright: '© 2026 PAYWL by Nivelics SAS · Colombia · USA',
      },
    });
    console.log('✅ FooterConfig created');
  } else {
    console.log('⏭️  FooterConfig already exists');
  }

  // ─── FooterLinks ────────────────────────────────────────────
  const existingFooterLinks = await prisma.footerLink.count();
  if (existingFooterLinks === 0) {
    await Promise.all([
      prisma.footerLink.create({ data: { columnName: 'Producto', label: 'Caracteristicas', href: '#producto', sortOrder: 1 } }),
      prisma.footerLink.create({ data: { columnName: 'Producto', label: 'Precios', href: '/precios', sortOrder: 2 } }),
      prisma.footerLink.create({ data: { columnName: 'Producto', label: 'Integraciones', href: '/integraciones', sortOrder: 3 } }),
      prisma.footerLink.create({ data: { columnName: 'Producto', label: 'Como funciona', href: '#como-funciona', sortOrder: 4 } }),
      prisma.footerLink.create({ data: { columnName: 'Recursos', label: 'Blog', href: '/blog', sortOrder: 5 } }),
      prisma.footerLink.create({ data: { columnName: 'Recursos', label: 'Documentacion', href: '/docs', sortOrder: 6 } }),
      prisma.footerLink.create({ data: { columnName: 'Recursos', label: 'Estado del sistema', href: '#', sortOrder: 7 } }),
      prisma.footerLink.create({ data: { columnName: 'Recursos', label: 'Changelog', href: '#', sortOrder: 8 } }),
      prisma.footerLink.create({ data: { columnName: 'Empresa', label: 'Sobre Nivelics', href: '#', sortOrder: 9 } }),
      prisma.footerLink.create({ data: { columnName: 'Empresa', label: 'Contacto', href: '/contacto', sortOrder: 10 } }),
      prisma.footerLink.create({ data: { columnName: 'Empresa', label: 'Privacidad', href: '/privacidad', sortOrder: 11 } }),
      prisma.footerLink.create({ data: { columnName: 'Empresa', label: 'Terminos', href: '/terminos', sortOrder: 12 } }),
    ]);
    console.log('✅ FooterLinks created: 12');
  } else {
    console.log(`⏭️  FooterLinks already exist: ${existingFooterLinks}`);
  }

  // ─── SectionContent ─────────────────────────────────────────
  const existingSections = await prisma.sectionContent.count();
  if (existingSections === 0) {
    await Promise.all([
      prisma.sectionContent.create({ data: { sectionKey: 'pain', title: '¿Por qué los medios en LATAM pierden suscriptores antes de empezar?', subtitle: 'Las soluciones globales no fueron diseñadas para el mercado latinoamericano.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'what-is', title: 'PAYWL: el motor que vive fuera de tu CMS y trabaja para tu audiencia', subtitle: 'Una arquitectura desacoplada que se integra con cualquier CMS o sitio web mediante API REST, sin modificar tu infraestructura existente.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'rules', title: '5 tipos de muro. Los activas cuando los necesitas.', subtitle: 'Activa, desactiva y combina reglas en tiempo real desde el panel de control, sin código.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'pricing', title: 'Precios claros. Sin sorpresas. Sin cláusulas ocultas.', subtitle: 'Contrato mínimo de 12 meses. Todos los planes incluyen soporte, implementación y actualizaciones.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'comparison', title: '¿Por qué PAYWL y no Piano, Pelcro o Evolok?', subtitle: 'Hicimos la investigación por ti.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'implementation', title: 'En menos de 2 meses estás operando. Sin tocar tu CMS.', subtitle: 'Nivelics se encarga de la implementación completa. Tu equipo solo necesita responder unas preguntas y aprobar.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'analytics', title: 'Sabes exactamente que funciona y que no. En tiempo real.', subtitle: 'El dashboard de PAYWL no es solo un panel de metricas. Es un sistema de inteligencia editorial que te dice que contenido genera suscripciones, que formatos convierten mejor y donde esta tu proxima oportunidad de crecimiento.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'integrations', title: 'Se conecta con lo que ya usas. Y con lo que usaras manana.', subtitle: 'PAYWL no te obliga a cambiar tu stack. Se integra con las herramientas que tu equipo ya conoce y domina, para que la transicion sea invisible y el impacto inmediato.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'case-study', title: 'Resultados reales. No estimaciones.', subtitle: '' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'why-paywl', title: 'Construido por quienes llevan 14 anos haciendo producto digital para medios en LATAM.', subtitle: 'No somos una startup experimentando con medios. Somos el equipo que ya lo hizo, y ahora lo empaqueto para que tu no tengas que empezar de cero.' } }),
      prisma.sectionContent.create({ data: { sectionKey: 'faq', title: 'Preguntas frecuentes', subtitle: 'Todo lo que necesitas saber sobre PAYWL antes de dar el siguiente paso.' } }),
    ]);
    console.log('✅ SectionContent created: 11');
  } else {
    console.log(`⏭️  SectionContent already exist: ${existingSections}`);
  }

  // ─── ExitStrategyItems ──────────────────────────────────────
  const existingExit = await prisma.exitStrategyItem.count();
  if (existingExit === 0) {
    await Promise.all([
      prisma.exitStrategyItem.create({ data: { title: 'Entrega de Data', description: 'Todos tus datos de suscriptores, transacciones y metricas exportados en formatos estandar que puedes llevar a cualquier plataforma.', sortOrder: 1 } }),
      prisma.exitStrategyItem.create({ data: { title: 'Desconexion Segura', description: 'Proceso guiado de migracion para que no pierdas ni un solo suscriptor durante la transicion.', sortOrder: 2 } }),
      prisma.exitStrategyItem.create({ data: { title: 'Cero Deuda', description: 'Sin contratos de permanencia, sin penalizaciones. Tu decides cuando y como te vas.', sortOrder: 3 } }),
      prisma.exitStrategyItem.create({ data: { title: 'Documentacion de salida', description: 'Manuales y guias tecnicas completas para que tu equipo pueda replicar todo lo construido.', sortOrder: 4 } }),
    ]);
    console.log('✅ ExitStrategyItems created: 4');
  } else {
    console.log(`⏭️  ExitStrategyItems already exist: ${existingExit}`);
  }

  // ─── ContactoConfig ─────────────────────────────────────────
  const existingContacto = await prisma.contactoConfig.findFirst();
  if (!existingContacto) {
    await prisma.contactoConfig.create({
      data: {
        headline: 'Hablemos',
        subheadline: 'Tienes preguntas sobre PAYWL? Nuestro equipo esta listo para ayudarte.',
        email: 'contacto@nivelics.com',
        phone: '',
        calendlyUrl: 'https://calendly.com',
        location: 'Nivelics SAS\nColombia · USA',
      },
    });
    console.log('✅ ContactoConfig created');
  } else {
    console.log('⏭️  ContactoConfig already exists');
  }

  // ─── PilotoConfig ───────────────────────────────────────────
  const existingPiloto = await prisma.pilotoConfig.findFirst();
  if (!existingPiloto) {
    await prisma.pilotoConfig.create({
      data: {
        headline: '3 meses de PAYWL. Gratis. Sin letra pequena.',
        subheadline: 'Implementamos el motor de paywall completo en tu medio digital sin costo de setup ni mensualidad durante 90 dias. Si no ves resultados, cancelas sin penalidad.',
        description: '',
        trustBullets: JSON.stringify([
          { text: '$0 implementacion', sub: 'Nosotros hacemos todo el setup' },
          { text: '3 meses de uso activo', sub: 'Sin compromiso despues del piloto' },
          { text: 'Tu data es tuya', sub: 'Soberania total de datos desde el dia 1' },
        ]),
        afterSteps: JSON.stringify([
          { number: '1', title: 'Llamada de descubrimiento', description: 'Un especialista te contacta en 24h para entender tu medio, tu stack y tus objetivos.' },
          { number: '2', title: 'Configuracion del entorno', description: 'En 48h creamos tu instancia, configuramos integraciones y preparamos las reglas iniciales.' },
          { number: '3', title: 'Go-live en 2 semanas', description: 'Implementamos el paywall en tu sitio con soporte hands-on de nuestro equipo.' },
          { number: '4', title: '90 dias de piloto', description: 'Soporte dedicado, optimizacion de reglas y reportes de performance. Sin costo.' },
        ]),
      },
    });
    console.log('✅ PilotoConfig created');
  } else {
    console.log('⏭️  PilotoConfig already exists');
  }

  console.log('\n========================================');
  console.log('  New models seed completed!');
  console.log('========================================\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
