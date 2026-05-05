import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BreadcrumbSchema } from "@/components/seo/StructuredData";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) {
    return { title: "Articulo no encontrado — PAYWL" };
  }

  return {
    title: post.metaTitle || `${post.title} — PAYWL Blog`,
    description: post.metaDesc || post.excerpt,
    keywords: post.keywords || undefined,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDesc || post.excerpt,
      url: `https://paywl.io/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
    },
  };
}

function ArticleSchema({
  post,
}: {
  post: {
    title: string;
    excerpt: string;
    slug: string;
    keywords: string;
    createdAt: Date;
    updatedAt: Date;
  };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `https://paywl.io/blog/${post.slug}`,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "Nivelics SAS",
      url: "https://paywl.io",
    },
    publisher: {
      "@type": "Organization",
      name: "PAYWL by Nivelics",
      url: "https://paywl.io",
      logo: {
        "@type": "ImageObject",
        url: "https://paywl.io/logo.svg",
      },
    },
    keywords: post.keywords,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://paywl.io/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Related posts: latest 3 published posts excluding current
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      slug: { not: params.slug },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const keywords = post.keywords
    ? post.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://paywl.io" },
          { name: "Blog", url: "https://paywl.io/blog" },
          { name: post.title, url: `https://paywl.io/blog/${post.slug}` },
        ]}
      />
      <ArticleSchema post={post} />

      <article className="pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 text-sm font-medium transition hover:underline"
            style={{ color: "#00B4D8" }}
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver al blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <time
              className="mb-3 block text-sm font-medium uppercase tracking-wider"
              style={{ color: "#4A5568" }}
              dateTime={post.createdAt.toISOString()}
            >
              {post.createdAt.toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1
              className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl"
              style={{ color: "#0A2540" }}
            >
              {post.title}
            </h1>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{ background: "#F0F7FF", color: "#00B4D8" }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#0A2540] prose-p:text-[#4A5568] prose-a:text-[#00B4D8] prose-strong:text-[#0A2540]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section
          className="py-16 md:py-24"
          style={{ background: "#F0F7FF" }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2
              className="mb-10 text-center text-2xl font-extrabold md:text-3xl"
              style={{ color: "#0A2540" }}
            >
              Articulos relacionados
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <article
                  key={related.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div
                    className="flex h-40 items-center justify-center"
                    style={{ background: "#F0F7FF" }}
                  >
                    <svg
                      className="h-10 w-10"
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
                  <div className="flex flex-1 flex-col p-5">
                    <time
                      className="mb-2 text-xs"
                      style={{ color: "#4A5568" }}
                      dateTime={related.createdAt.toISOString()}
                    >
                      {related.createdAt.toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <h3
                      className="mb-2 font-bold leading-snug transition group-hover:text-[#00B4D8]"
                      style={{ color: "#0A2540" }}
                    >
                      <Link href={`/blog/${related.slug}`}>
                        {related.title}
                      </Link>
                    </h3>
                    <p
                      className="flex-1 text-sm"
                      style={{ color: "#4A5568" }}
                    >
                      {related.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
