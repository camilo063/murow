import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Blog — PAYWL | Monetizacion de Medios Digitales",
  description:
    "Articulos, guias y casos de estudio sobre monetizacion de contenido digital, paywalls, suscripciones y estrategia de medios en America Latina.",
  openGraph: {
    title: "Blog — PAYWL | Monetizacion de Medios Digitales",
    description:
      "Guias y casos de estudio sobre monetizacion de contenido digital.",
    url: "https://paywl.io/blog",
  },
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://paywl.io" },
          { name: "Blog", url: "https://paywl.io/blog" },
        ]}
      />

      {/* Hero */}
      <section
        className="pt-28 pb-16"
        style={{
          background: "linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl"
            style={{ color: "#0A2540" }}
          >
            Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg" style={{ color: "#4A5568" }}>
            Ideas, estrategias y casos reales sobre monetizacion de contenido digital en
            America Latina.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg" style={{ color: "#4A5568" }}>
                Proximamente publicaremos contenido. Vuelve pronto.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Image placeholder */}
                  <div
                    className="flex h-48 items-center justify-center"
                    style={{ background: "#F0F7FF" }}
                  >
                    <svg
                      className="h-12 w-12"
                      style={{ color: "#00B4D8" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <time
                      className="mb-2 text-xs font-medium uppercase tracking-wider"
                      style={{ color: "#4A5568" }}
                      dateTime={post.createdAt.toISOString()}
                    >
                      {post.createdAt.toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h2
                      className="mb-2 text-lg font-bold leading-snug transition group-hover:text-[#00B4D8]"
                      style={{ color: "#0A2540" }}
                    >
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p
                      className="mb-4 flex-1 text-sm leading-relaxed"
                      style={{ color: "#4A5568" }}
                    >
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold transition"
                      style={{ color: "#00B4D8" }}
                    >
                      Leer mas
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
