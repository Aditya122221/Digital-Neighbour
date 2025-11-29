import { sanityFetch } from "@/sanity/lib/fetch";
import { portfolioPageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import portfolioData from "@/data/portfolio.json";

export type PortfolioMetric = {
	value: string;
	label: string;
};

export type PortfolioProject = {
	id?: string;
	slug: string;
	logoText: string;
	logo?: string;
	headline: string;
	metrics: PortfolioMetric[];
	tags: string[];
	image: string;
	imageAlt?: string;
	content?: string;
};

export type PortfolioHeroContent = {
	label: string;
	title: string;
	description: string;
};

type PortfolioPageData = {
	metadata?: string;
	description?: string;
	hero?: PortfolioHeroContent;
	projects?: PortfolioProject[];
};

const getImageUrl = (image: any): string => {
	if (!image) return "";
	if (typeof image === "string") return image;
	if (image.asset?.url) {
		return image.asset.url;
	}
	if (image.asset?._ref) {
		try {
			return urlForImage(image).url();
		} catch {
			return "";
		}
	}
	return "";
};

function transformSanityData(sanityData: any): PortfolioPageData | null {
	if (!sanityData) return null;

	const settings = sanityData.settings ?? {};
	const heroDoc = sanityData.hero ?? {};
	const projectsData = sanityData.projects ?? {};
	const projects = projectsData.projects || [];

	return {
		metadata: settings.metadata || settings.title || "",
		description: settings.description || "",
		hero: {
			label: heroDoc.label || "Portfolio",
			title: heroDoc.title || "",
			description: heroDoc.description || "",
		},
		projects: projects.map((project: any, index: number) => ({
			id: `project-${index}`,
			slug: project.slug?.current || "",
			logoText: project.logoText || "",
			logo: getImageUrl(project.logo),
			headline: project.headline || "",
			image: getImageUrl(project.image),
			imageAlt: project.imageAlt || project.headline,
			metrics:
				project.metrics?.map((metric: any) => ({
					value: metric.value || "",
					label: metric.label || "",
				})) || [],
			tags: project.tags || [],
			content: project.content || "",
		})),
	};
}

const DEFAULT_HERO: PortfolioHeroContent = {
	label: "Portfolio",
	title: "Success stories from brands we've helped grow",
	description:
		"Discover how our strategic approach drives measurable results for businesses across industries.",
};

const parsedData = portfolioData as any;
const projectsArray = Array.isArray(parsedData.projects)
	? parsedData.projects
	: [];
const projectMap = new Map(
	projectsArray.map((project: any) => [project.slug, project])
);

export async function getPortfolioHero(): Promise<PortfolioHeroContent> {
	try {
		const sanityData = await sanityFetch({ query: portfolioPageQuery });
		const transformed = transformSanityData(sanityData);
		if (transformed?.hero?.title) {
			return transformed.hero;
		}
	} catch (error) {
		// Silently fallback to JSON
	}

	const hero = parsedData.hero ?? {};
	return {
		label: hero.label ?? DEFAULT_HERO.label,
		title: hero.title ?? DEFAULT_HERO.title,
		description: hero.description ?? DEFAULT_HERO.description,
	};
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
	try {
		const sanityData = await sanityFetch({ query: portfolioPageQuery });
		const transformed = transformSanityData(sanityData);
		if (transformed?.projects && transformed.projects.length > 0) {
			return transformed.projects;
		}
	} catch (error) {
		// Silently fallback to JSON
	}

	return projectsArray.map((project: any, index: number) => ({
		id: project.id || `project-${index}`,
		slug: project.slug || `portfolio-${project.id || index}`,
		logoText: project.logoText || "",
		headline: project.headline || "",
		image: project.image || "",
		imageAlt: project.imageAlt,
		metrics: project.metrics || [],
		tags: project.tags || [],
		content: project.content || "",
	}));
}

export async function getPortfolioProjectBySlug(
	slug: string
): Promise<PortfolioProject | undefined> {
	if (!slug) return undefined;

	try {
		const projects = await getPortfolioProjects();
		return projects.find((p) => p.slug === slug);
	} catch (error) {
		// Fallback to JSON
		return projectMap.get(slug);
	}
}

export async function getPortfolioPageData(): Promise<PortfolioPageData> {
	try {
		const sanityData = await sanityFetch({ query: portfolioPageQuery });
		const transformed = transformSanityData(sanityData);
		if (transformed && transformed.metadata) {
			return transformed;
		}
	} catch (error) {
		// Silently fallback to JSON
	}

	// Fallback to JSON
	return {
		metadata: "Portfolio | Digital Neighbour",
		description:
			"Explore our portfolio of successful projects and case studies. See how Digital Neighbour has helped brands achieve remarkable growth and measurable results.",
		hero: getPortfolioHero(),
		projects: projectsArray,
	};
}
