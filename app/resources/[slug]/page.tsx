import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/navbar";
import Footer from "@/components/core/footer";
import resourcesData from "@/data/resources.json";
import { buildMetadata } from "@/lib/site-metadata";

type Resource = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image?: string;
  content?: string;
};

const resources: Resource[] = resourcesData as Resource[];

function summarizeContent(input?: string, limit = 150) {
  if (!input) return "";
  const normalized = input.replace(/\s+/g, " ").trim();
  return normalized.length > limit
    ? `${normalized.slice(0, Math.max(0, limit - 3))}...`
    : normalized;
}

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const currentResource = resources.find((resource) => resource.slug === slug);

  if (!currentResource) {
    return buildMetadata({
      title: "Resource",
      description:
        "Explore insights, playbooks, and guides from the Digital Neighbour team.",
      path: `/resources/${slug}`,
      type: "article",
    });
  }

  const description =
    currentResource.excerpt ||
    summarizeContent(currentResource.content) ||
    `Learn from Digital Neighbour's perspective on ${currentResource.title}.`;

  return buildMetadata({
    title: currentResource.title,
    description,
    path: `/resources/${slug}`,
    type: "article",
  });
}

export default async function ResourceSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const currentResource = resources.find((r) => r.slug === params.slug);

  if (!currentResource) {
    notFound();
  }

  // Get 3 other resources (excluding current one)
  const otherResources = resources
    .filter((r) => r.slug !== params.slug)
    .slice(0, 3);

  const imageSrc = currentResource.image?.startsWith("/")
    ? currentResource.image
    : `/${currentResource.image}`;

  return (
    <main>
      <div className="relative bg-black">
        <Navbar />
      </div>

      {/* Hero Image with Heading Overlay */}
      <section className="relative w-full h-[60vh] md:h-[70vh] mt-16 md:mt-20">
        {currentResource.image && (
          <Image
            src={imageSrc}
            alt={currentResource.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Gradient overlay and heading at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container max-w-7xl mx-auto">
            <div className="flex items-center gap-3 text-sm text-white/80 mb-4">
              <span className="rounded-full bg-primary/20 backdrop-blur-sm px-3 py-1 font-medium text-white border border-white/20">
                {currentResource.category}
              </span>
              <span>
                {new Date(currentResource.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
              {currentResource.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20 px-6 bg-white">
        <div className="container max-w-4xl mx-auto">
          {currentResource.content && (
            <div className="prose prose-lg max-w-none">
              <p className="text-lg md:text-xl leading-relaxed text-blackbrown/90 whitespace-pre-line">
                {currentResource.content}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* More Insights Section */}
      <section className="py-12 md:py-20 px-6 bg-pink/20">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blackbrown mb-8 md:mb-12 text-center">
            More Insights
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {otherResources.map((resource) => {
              const otherImageSrc = resource.image?.startsWith("/")
                ? resource.image
                : `/${resource.image}`;

              return (
                <Link
                  key={resource.slug}
                  href={`/resources/${resource.slug}`}
                  className="group relative rounded-xl border bg-card text-card-foreground shadow-sm transition hover:shadow-md overflow-hidden"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-t-xl bg-muted">
                    {resource.image && (
                      <Image
                        src={otherImageSrc}
                        alt={resource.title}
                        width={640}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                        {resource.category}
                      </span>
                      <span>
                        {new Date(resource.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {resource.excerpt}
                    </p>
                    <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      >
                        <path
                          d="M13.5 4.5l6 6-6 6m5.25-6H4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center">
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              View More Resources
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  d="M13.5 4.5l6 6-6 6m5.25-6H4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
