import dotenv from "dotenv"
import { resolve } from "path"
import { createClient, type SanityClient } from "@sanity/client"
import * as fs from "fs"
import * as path from "path"

// Import all data files
import homeData from "../data/home.json"
import seoData from "../data/seo.json"
import paidAdsData from "../data/paid-ads.json"
import socialMediaData from "../data/social-media.json"
import contentMarketingData from "../data/content-marketing.json"
import webDevelopmentData from "../data/web-development.json"
import appDevelopmentData from "../data/app-development.json"
import hostingItSecurityData from "../data/hosting-it-security.json"
import aiAutomationData from "../data/ai-automation.json"
import dataAnalyticsData from "../data/data-analytics.json"
import industriesData from "../data/industries.json"
import professionalsMarketingData from "../data/professionals-marketing.json"
import portfolioData from "../data/portfolio.json"
import resourcesData from "../data/resources.json"
import aboutData from "../data/about.json"
import apartData from "../data/apart.json"
import caseData from "../data/case.json"
import marketingAgencyData from "../data/marketing-agency.json"

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") })
dotenv.config({ path: resolve(process.cwd(), ".env") })

/**
 * Get or create Sanity client instance
 */
function getClient(): SanityClient {
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
	const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-10-01"
	const writeToken =
		process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

	if (!projectId) {
		throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required")
	}

	return createClient({
		projectId,
		dataset,
		apiVersion,
		useCdn: false,
		token: writeToken,
	})
}

/**
 * Upload an image from local file path to Sanity
 */
async function uploadImageFromPath(
	client: SanityClient,
	imagePath: string,
	description?: string
): Promise<any> {
	if (!imagePath) {
		return undefined
	}

	const normalizedPath = imagePath.startsWith("/")
		? imagePath.slice(1)
		: imagePath

	const fullPath = path.join(process.cwd(), "public", normalizedPath)

	if (!fs.existsSync(fullPath)) {
		console.log(`⚠️  Image not found: ${imagePath} (looked at: ${fullPath})`)
		return undefined
	}

	try {
		const buffer = fs.readFileSync(fullPath)
		const filename = path.basename(fullPath)

		const asset = await client.assets.upload("image", buffer, {
			filename: filename,
			contentType: getContentType(fullPath),
		})

		console.log(`✅ Uploaded image: ${filename}`)

		return {
			_type: "image",
			asset: {
				_type: "reference",
				_ref: asset._id,
			},
			...(description && { alt: description }),
		}
	} catch (error) {
		console.error(`❌ Error uploading image ${fullPath}:`, error)
		return undefined
	}
}

/**
 * Get content type based on file extension
 */
function getContentType(filePath: string): string {
	const ext = path.extname(filePath).toLowerCase()
	const contentTypes: Record<string, string> = {
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".png": "image/png",
		".webp": "image/webp",
		".gif": "image/gif",
		".svg": "image/svg+xml",
		".avif": "image/avif",
	}
	return contentTypes[ext] || "image/jpeg"
}

/**
 * Convert slug string to slug object format for Sanity
 */
function createSlug(slugValue: string) {
	return {
		_type: "slug",
		current: slugValue,
	}
}

/**
 * Transform service card data and upload images
 */
async function transformServiceCards(client: SanityClient, serviceCards: any[]) {
	if (!Array.isArray(serviceCards)) {
		return []
	}

	const transformed = []
	for (const card of serviceCards) {
		const imageRef =
			card.image && typeof card.image === "string"
				? await uploadImageFromPath(client, card.image)
				: undefined

		transformed.push({
			id: card.id || "",
			name: card.name || "",
			title: card.title || "",
			description: card.description || "",
			...(imageRef && { image: imageRef }),
			...(card.link && { link: card.link }),
		})
	}
	return transformed
}

/**
 * Seed SEO Pages
 */
async function seedSeoPages(client: SanityClient) {
	console.log("\n🌱 Seeding SEO Pages...")
	const seoDataObj = seoData as Record<string, any>
	const slugs = Object.keys(seoDataObj).filter(
		(key) => key !== "otherServices"
	)

	let successCount = 0
	let errorCount = 0

	for (const slug of slugs) {
		try {
			const pageData = seoDataObj[slug]

			let contentImagePath = undefined
			if (pageData.content?.image && typeof pageData.content.image === "string") {
				contentImagePath = pageData.content.image.startsWith("/")
					? pageData.content.image
					: `/seo/content/${pageData.content.image}`
			}
			const contentImageRef = contentImagePath
				? await uploadImageFromPath(
						client,
						contentImagePath,
						pageData.content.alt || "SEO Content"
					)
				: undefined

			const serviceCards = await transformServiceCards(
				client,
				pageData.serviceCards || []
			)

			const document = {
				_type: "seoPage",
				_id: `seoPage-${slug}`,
				slug: createSlug(slug),
				serviceName: pageData.services || "SEO Service",
				hero: {
					heading: pageData.hero?.heading || "",
					subheading: pageData.hero?.subheading || "",
				},
				...(pageData.form && {
					form: {
						heading: pageData.form.heading || "",
						content: pageData.form.content || "",
						subContent: pageData.form.subContent || "",
						cta: pageData.form.cta || "",
						formHeading: pageData.form.formHeading || "",
						buttonText: pageData.form.buttonText || "",
					},
				}),
				...(pageData.introParagraph && {
					introParagraph: {
						heading: pageData.introParagraph.heading || "",
						problemStatement: pageData.introParagraph.problemStatement || "",
						valueProposition: pageData.introParagraph.valueProposition || "",
					},
				}),
				...(pageData.painPoints && {
					painPoints: {
						heading: pageData.painPoints.heading || "",
						subheading: pageData.painPoints.subheading || "",
						painPoints:
							pageData.painPoints.painPoints?.map((pp: any) => ({
								problem: pp.problem || "",
								solution: pp.solution || "",
							})) || [],
					},
				}),
				services: {
					serviceName: pageData.services || "",
					serviceCards: serviceCards,
				},
				...(pageData.content && {
					content: {
						heading: pageData.content.heading || "",
						text1: pageData.content.text1 || "",
						text2: pageData.content.text2 || "",
						text3: pageData.content.text3 || "",
						...(contentImageRef && { image: contentImageRef }),
						alt: pageData.content.alt || "",
					},
				}),
				...(pageData.process && {
					process: {
						steps: pageData.process.steps || [],
						content: pageData.process.content || [],
					},
				}),
				...(pageData.keyBenefits && {
					keyBenefits: {
						heading: pageData.keyBenefits.heading || "",
						subheading: pageData.keyBenefits.subheading || "",
						benefits:
							pageData.keyBenefits.benefits?.map((b: any) => ({
								title: b.title || "",
								description: b.description || "",
							})) || [],
					},
				}),
				...(pageData.features && {
					features: {
						heading: pageData.features.heading || "",
						subheading: pageData.features.subheading || "",
						features:
							pageData.features.features?.map((f: any) => ({
								title: f.title || "",
								description: f.description || "",
								icon: f.icon || "",
							})) || [],
					},
				}),
				...(pageData.faq && {
					faq: {
						serviceName: pageData.faq.serviceName || "",
						heading: pageData.faq.heading || "",
						subheading: pageData.faq.subheading || "",
						faqs:
							pageData.faq.faqs?.map((faq: any) => ({
								q: faq.q || "",
								a: faq.a || "",
							})) || [],
					},
				}),
			}

			await client.createOrReplace(document)
			console.log(`✅ Seeded SEO page: ${slug}`)
			successCount++
		} catch (error: any) {
			console.error(`❌ Error seeding SEO page ${slug}:`, error.message)
			errorCount++
		}
	}

	console.log(
		`✅ SEO Pages: ${successCount} succeeded, ${errorCount} failed\n`
	)
}

/**
 * Seed Paid Ads Pages
 */
async function seedPaidAdsPages(client: SanityClient) {
	console.log("🌱 Seeding Paid Ads Pages...")
	const paidAdsDataObj = paidAdsData as Record<string, any>
	const slugs = Object.keys(paidAdsDataObj).filter(
		(key) => key !== "otherServices"
	)

	let successCount = 0
	let errorCount = 0

	for (const slug of slugs) {
		try {
			const pageData = paidAdsDataObj[slug]

			const serviceCards = await transformServiceCards(
				client,
				pageData.serviceCards || []
			)

			const document = {
				_type: "paidAdsPage",
				_id: `paidAdsPage-${slug}`,
				slug: createSlug(slug),
				serviceName: pageData.services || "Paid Advertising",
				hero: {
					heading: pageData.hero?.heading || "",
					subheading: pageData.hero?.subheading || "",
				},
				...(pageData.form && {
					form: {
						heading: pageData.form.heading || "",
						content: pageData.form.content || "",
						subContent: pageData.form.subContent || "",
						cta: pageData.form.cta || "",
						formHeading: pageData.form.formHeading || "",
						buttonText: pageData.form.buttonText || "",
					},
				}),
				services: pageData.services || "",
				serviceCards: serviceCards,
				...(pageData.process && {
					process: {
						steps: pageData.process.steps || [],
						content: pageData.process.content || [],
					},
				}),
				...(pageData.strategic && {
					strategic: {
						heading: pageData.strategic.heading || "",
						blocks:
							pageData.strategic.blocks?.map((b: any) => ({
								icon: b.icon || "",
								title: b.title || "",
								description: b.description || "",
							})) || [],
					},
				}),
				...(pageData.introParagraph && {
					introParagraph: {
						heading: pageData.introParagraph.heading || "",
						problemStatement: pageData.introParagraph.problemStatement || "",
						valueProposition: pageData.introParagraph.valueProposition || "",
					},
				}),
				...(pageData.painPoints && {
					painPoints: {
						heading: pageData.painPoints.heading || "",
						subheading: pageData.painPoints.subheading || "",
						painPoints:
							pageData.painPoints.painPoints?.map((pp: any) => ({
								problem: pp.problem || "",
								solution: pp.solution || "",
							})) || [],
					},
				}),
				...(pageData.keyBenefits && {
					keyBenefits: {
						heading: pageData.keyBenefits.heading || "",
						subheading: pageData.keyBenefits.subheading || "",
						benefits:
							pageData.keyBenefits.benefits?.map((b: any) => ({
								title: b.title || "",
								description: b.description || "",
							})) || [],
					},
				}),
				...(pageData.features && {
					features: {
						heading: pageData.features.heading || "",
						subheading: pageData.features.subheading || "",
						features:
							pageData.features.features?.map((f: any) => ({
								title: f.title || "",
								description: f.description || "",
							})) || [],
					},
				}),
				...(pageData.content && {
					content: {
						heading: pageData.content.heading || "",
						text1: pageData.content.text1 || "",
						text2: pageData.content.text2 || "",
						text3: pageData.content.text3 || "",
					},
				}),
				...(pageData.faq && {
					faq: {
						serviceName: pageData.faq.serviceName || "",
						faqs:
							pageData.faq.faqs?.map((faq: any) => ({
								q: faq.q || "",
								a: faq.a || "",
							})) || [],
					},
				}),
			}

			await client.createOrReplace(document)
			console.log(`✅ Seeded Paid Ads page: ${slug}`)
			successCount++
		} catch (error: any) {
			console.error(`❌ Error seeding Paid Ads page ${slug}:`, error.message)
			errorCount++
		}
	}

	console.log(
		`✅ Paid Ads Pages: ${successCount} succeeded, ${errorCount} failed\n`
	)
}

/**
 * Seed Home Page Sections
 */
async function seedHomePageSections(client: SanityClient) {
	console.log("🌱 Seeding Home Page Sections...")

	try {
		// Home Page SEO
		if (homeData.metadata || homeData.description) {
			await client.createOrReplace({
				_type: "homePageSeo",
				_id: "homePageSeoSettings",
				metadata: homeData.metadata || "",
				description: homeData.description || "",
			})
			console.log("✅ Seeded homePageSeo")
		}

		// Home Hero
		if (homeData.hero) {
			const heroImages = []
			if (homeData.hero.images) {
				for (const [key, imagePath] of Object.entries(
					homeData.hero.images
				)) {
					const imageRef = await uploadImageFromPath(
						client,
						imagePath as string
					)
					if (imageRef) {
						heroImages.push(imageRef)
					}
				}
			}

			await client.createOrReplace({
				_type: "homeHero",
				_id: "homeHero",
				heading: homeData.hero.heading || "",
				subheading: homeData.hero.subheading || "",
				images: heroImages,
			})
			console.log("✅ Seeded homeHero")
		}

		// Home Brand Info
		if (homeData.brandInfo) {
			await client.createOrReplace({
				_type: "homeBrandInfo",
				_id: "homeBrandInfo",
				main: {
					heading: homeData.brandInfo.main?.heading || "",
					subheading: homeData.brandInfo.main?.subheading || "",
				},
				differentiators:
					homeData.brandInfo.differentiators?.map((d: any) => ({
						id: d.id?.toString() || "",
						title: d.title || "",
						description: d.description || "",
						icon: d.icon || "",
					})) || [],
				rightCard: {
					heading: homeData.brandInfo.rightCard?.heading || "",
					description: homeData.brandInfo.rightCard?.description || "",
					stats:
						homeData.brandInfo.rightCard?.stats?.map((s: any) => ({
							id: s.id || "",
							value: s.value || "",
							label: s.label || "",
						})) || [],
				},
			})
			console.log("✅ Seeded homeBrandInfo")
		}

		// Home Services
		if (homeData.services) {
			await client.createOrReplace({
				_type: "homeServices",
				_id: "homeServices",
				heading: homeData.services.heading || "",
				subheading: homeData.services.subheading || "",
				cards:
					homeData.services.rightCard?.map((card: any) => ({
						title: card.title || "",
						subheading: card.subheading || [],
					})) || [],
			})
			console.log("✅ Seeded homeServices")
		}

		// Home Apart
		if (apartData) {
			await client.createOrReplace({
				_type: "homeApart",
				_id: "homeApart",
				heading: "What sets us apart from others",
				tagline: "We don't settle for average, and neither should you.",
				oursTitle: "Digital Neighbour",
				othersTitle: "Other Agencies",
				ours: apartData.ours || [],
				others: apartData.others || [],
			})
			console.log("✅ Seeded homeApart")
		}

		// Home Case Study
		if (caseData && Array.isArray(caseData)) {
			const caseStudies = []
			for (const caseStudy of caseData) {
				// Note: bgImages are URLs, not local files, so we'll skip uploading them
				// If you need to upload them, you'd need to download them first
				caseStudies.push({
					title: caseStudy.title || "",
					textColor: caseStudy.textColor || "text-blackbrown",
					// bgImages would need special handling for URLs
					metrics:
						caseStudy.metrics?.map((m: any) => ({
							number: m.number || "",
							text: m.text || "",
						})) || [],
					services: caseStudy.services || [],
					isNew: caseStudy.isNew || false,
				})
			}

			await client.createOrReplace({
				_type: "homeCaseStudy",
				_id: "homeCaseStudy",
				heading: "Latest work",
				caseStudies: caseStudies,
			})
			console.log("✅ Seeded homeCaseStudy")
		}

		// Add other home sections as needed...
		console.log("✅ Home Page Sections seeded\n")
	} catch (error: any) {
		console.error(`❌ Error seeding home page sections:`, error.message)
	}
}

/**
 * Seed Portfolio Sections
 */
async function seedPortfolioSections(client: SanityClient) {
	console.log("🌱 Seeding Portfolio Sections...")

	try {
		// Portfolio Hero
		if (portfolioData.hero) {
			await client.createOrReplace({
				_type: "portfolioHero",
				_id: "portfolioHero",
				label: portfolioData.hero.label || "",
				title: portfolioData.hero.title || "",
				description: portfolioData.hero.description || "",
			})
			console.log("✅ Seeded portfolioHero")
		}

		// Portfolio Projects
		if (portfolioData.projects) {
			const projects = []
			for (const project of portfolioData.projects) {
				const imageRef = await uploadImageFromPath(
					client,
					project.image,
					project.imageAlt
				)

				projects.push({
					slug: createSlug(project.slug),
					logoText: project.logoText || "",
					headline: project.headline || "",
					...(imageRef && { image: imageRef }),
					imageAlt: project.imageAlt || "",
					metrics:
						project.metrics?.map((m: any) => ({
							value: m.value || "",
							label: m.label || "",
						})) || [],
					tags: project.tags || [],
					content: project.content || "",
				})
			}

			await client.createOrReplace({
				_type: "portfolioProject",
				_id: "portfolioProject",
				projects: projects,
			})
			console.log("✅ Seeded portfolioProject")
		}

		console.log("✅ Portfolio Sections seeded\n")
	} catch (error: any) {
		console.error(`❌ Error seeding portfolio sections:`, error.message)
	}
}

/**
 * Seed About Sections
 */
async function seedAboutSections(client: SanityClient) {
	console.log("🌱 Seeding About Sections...")

	try {
		// About Hero
		if (aboutData.hero) {
			const heroImage = await uploadImageFromPath(
				client,
				aboutData.hero.image
			)

			await client.createOrReplace({
				_type: "aboutHero",
				_id: "aboutHero",
				title: aboutData.hero.title || "",
				description: aboutData.hero.description || "",
				...(heroImage && { image: heroImage }),
				wordsText: aboutData.hero.wordsText || "",
			})
			console.log("✅ Seeded aboutHero")
		}

		// About Origins
		if (aboutData.origins) {
			const originImages = []
			if (aboutData.origins.images) {
				for (const img of aboutData.origins.images) {
					const imageRef = await uploadImageFromPath(
						client,
						img.image,
						img.alt
					)
					if (imageRef) {
						originImages.push(imageRef)
					}
				}
			}

			await client.createOrReplace({
				_type: "aboutOrigins",
				_id: "aboutOrigins",
				title: aboutData.origins.title || "",
				description: aboutData.origins.description || "",
				images: originImages,
			})
			console.log("✅ Seeded aboutOrigins")
		}

		// About Values
		if (aboutData.values) {
			await client.createOrReplace({
				_type: "aboutValues",
				_id: "aboutValues",
				title: aboutData.values.title || "",
				items:
					aboutData.values.items?.map((item: any) => ({
						title: item.title || "",
						description: item.description || "",
					})) || [],
			})
			console.log("✅ Seeded aboutValues")
		}

		// About Achievements
		if (aboutData.achievements) {
			await client.createOrReplace({
				_type: "aboutAchievements",
				_id: "aboutAchievements",
				title: aboutData.achievements.title || "",
				description: aboutData.achievements.description || "",
				stats:
					aboutData.achievements.stats?.map((stat: any) => ({
						number: stat.number || "",
						label: stat.label || "",
					})) || [],
			})
			console.log("✅ Seeded aboutAchievements")
		}

		// About Team
		if (aboutData.achievements?.team) {
			await client.createOrReplace({
				_type: "aboutTeam",
				_id: "aboutTeam",
				title: aboutData.achievements.team.title || "",
				description: aboutData.achievements.team.description || "",
			})
			console.log("✅ Seeded aboutTeam")
		}

		console.log("✅ About Sections seeded\n")
	} catch (error: any) {
		console.error(`❌ Error seeding about sections:`, error.message)
	}
}

/**
 * Seed Resources Sections
 */
async function seedResourcesSections(client: SanityClient) {
	console.log("🌱 Seeding Resources Sections...")

	try {
		// Resources Hero
		if (resourcesData.hero) {
			await client.createOrReplace({
				_type: "resourcesHero",
				_id: "resourcesHero",
				title: resourcesData.hero.title || "",
				description: resourcesData.hero.description || "",
			})
			console.log("✅ Seeded resourcesHero")
		}

		// Resources Articles
		if (resourcesData.articles) {
			const articles = []
			for (const article of resourcesData.articles) {
				const imageRef = await uploadImageFromPath(
					client,
					article.image
				)

				articles.push({
					slug: createSlug(article.slug),
					title: article.title || "",
					category: article.category || "",
					date: article.date || "",
					excerpt: article.excerpt || "",
					...(imageRef && { image: imageRef }),
					content: article.content || "",
				})
			}

			await client.createOrReplace({
				_type: "resourcesArticles",
				_id: "resourcesArticles",
				articles: articles,
			})
			console.log("✅ Seeded resourcesArticles")
		}

		console.log("✅ Resources Sections seeded\n")
	} catch (error: any) {
		console.error(`❌ Error seeding resources sections:`, error.message)
	}
}

/**
 * Seed other service pages (similar structure to SEO pages)
 */
async function seedServicePages(
	client: SanityClient,
	type: string,
	data: any,
	pageType: string
) {
	console.log(`🌱 Seeding ${type} Pages...`)
	const dataObj = data as Record<string, any>
	const slugs = Object.keys(dataObj).filter(
		(key) => key !== "otherServices"
	)

	let successCount = 0
	let errorCount = 0

	for (const slug of slugs) {
		try {
			const pageData = dataObj[slug]

			const serviceCards = await transformServiceCards(
				client,
				pageData.serviceCards || []
			)

			const document: any = {
				_type: pageType,
				_id: `${pageType}-${slug}`,
				slug: createSlug(slug),
				serviceName: pageData.services || type,
				hero: {
					heading: pageData.hero?.heading || "",
					subheading: pageData.hero?.subheading || "",
				},
				...(pageData.form && {
					form: {
						heading: pageData.form.heading || "",
						content: pageData.form.content || "",
						subContent: pageData.form.subContent || "",
						cta: pageData.form.cta || "",
						formHeading: pageData.form.formHeading || "",
						buttonText: pageData.form.buttonText || "",
					},
				}),
				services: pageData.services || "",
				serviceCards: serviceCards,
			}

			// Add optional sections
			if (pageData.process) {
				document.process = {
					steps: pageData.process.steps || [],
					content: pageData.process.content || [],
				}
			}

			if (pageData.introParagraph) {
				document.introParagraph = {
					heading: pageData.introParagraph.heading || "",
					problemStatement: pageData.introParagraph.problemStatement || "",
					valueProposition: pageData.introParagraph.valueProposition || "",
				}
			}

			if (pageData.painPoints) {
				document.painPoints = {
					heading: pageData.painPoints.heading || "",
					subheading: pageData.painPoints.subheading || "",
					painPoints:
						pageData.painPoints.painPoints?.map((pp: any) => ({
							problem: pp.problem || "",
							solution: pp.solution || "",
						})) || [],
				}
			}

			if (pageData.keyBenefits) {
				document.keyBenefits = {
					heading: pageData.keyBenefits.heading || "",
					subheading: pageData.keyBenefits.subheading || "",
					benefits:
						pageData.keyBenefits.benefits?.map((b: any) => ({
							title: b.title || "",
							description: b.description || "",
						})) || [],
				}
			}

			if (pageData.features) {
				document.features = {
					heading: pageData.features.heading || "",
					subheading: pageData.features.subheading || "",
					features:
						pageData.features.features?.map((f: any) => ({
							title: f.title || "",
							description: f.description || "",
							icon: f.icon || "",
						})) || [],
				}
			}

			if (pageData.content) {
				document.content = {
					heading: pageData.content.heading || "",
					text1: pageData.content.text1 || "",
					text2: pageData.content.text2 || "",
					text3: pageData.content.text3 || "",
				}
			}

			if (pageData.faq) {
				document.faq = {
					serviceName: pageData.faq.serviceName || "",
					heading: pageData.faq.heading || "",
					subheading: pageData.faq.subheading || "",
					faqs:
						pageData.faq.faqs?.map((faq: any) => ({
							q: faq.q || "",
							a: faq.a || "",
						})) || [],
				}
			}

			await client.createOrReplace(document)
			console.log(`✅ Seeded ${type} page: ${slug}`)
			successCount++
		} catch (error: any) {
			console.error(`❌ Error seeding ${type} page ${slug}:`, error.message)
			errorCount++
		}
	}

	console.log(
		`✅ ${type} Pages: ${successCount} succeeded, ${errorCount} failed\n`
	)
}

/**
 * Seed Marketing Agency Page
 */
async function seedMarketingAgencyPage(client: SanityClient) {
	console.log("🌱 Seeding Marketing Agency Page...")

	const marketingData = (
		marketingAgencyData as Record<string, any>
	)["marketing-agency"]

	if (!marketingData) {
		console.log(
			"⚠️ No marketing-agency key found in data/marketing-agency.json\n"
		)
		return
	}

	try {
		await client.createOrReplace({
			_type: "marketingAgencySettings",
			_id: "marketingAgencySettings",
			title:
				marketingData.title ||
				marketingData.hero?.heading ||
				"Marketing Agency",
			metadata: marketingData.metadata || "",
			description: marketingData.description || "",
			serviceLabel: marketingData.services || "Marketing Agency",
		})

		await client.createOrReplace({
			_type: "marketingAgencyHero",
			_id: "marketingAgencyHero",
			heading: marketingData.hero?.heading || "",
			subheading: marketingData.hero?.subheading || "",
			ctaText: marketingData.hero?.ctaText || "",
			ctaHref: marketingData.hero?.ctaHref || "",
		})

		await client.createOrReplace({
			_type: "marketingAgencyForm",
			_id: "marketingAgencyForm",
			heading: marketingData.form?.heading || "",
			content: marketingData.form?.content || "",
			subContent: marketingData.form?.subContent || "",
			cta: marketingData.form?.cta || "",
			formHeading: marketingData.form?.formHeading || "",
			buttonText: marketingData.form?.buttonText || "",
		})

		await client.createOrReplace({
			_type: "marketingAgencyIntro",
			_id: "marketingAgencyIntro",
			heading: marketingData.introParagraph?.heading || "",
			problemStatement: marketingData.introParagraph?.problemStatement || "",
			valueProposition: marketingData.introParagraph?.valueProposition || "",
		})

		await client.createOrReplace({
			_type: "marketingAgencyPainPoints",
			_id: "marketingAgencyPainPoints",
			heading: marketingData.painPoints?.heading || "",
			subheading: marketingData.painPoints?.subheading || "",
			items:
				marketingData.painPoints?.painPoints?.map((item: any) => ({
					problem: item.problem || "",
					solution: item.solution || "",
				})) || [],
		})

		await client.createOrReplace({
			_type: "marketingAgencyProcess",
			_id: "marketingAgencyProcess",
			heading: marketingData.process?.heading || "",
			steps: marketingData.process?.steps || [],
			content: marketingData.process?.content || [],
		})

		const mapBenefits = (items: any[]) =>
			items?.map((item) => ({
				title: item.title || "",
				description: item.description || "",
				icon: item.icon || "",
			})) || []

		await client.createOrReplace({
			_type: "marketingAgencyKeyBenefits",
			_id: "marketingAgencyKeyBenefits",
			heading: marketingData.keyBenefits?.heading || "",
			subheading: marketingData.keyBenefits?.subheading || "",
			benefits: mapBenefits(marketingData.keyBenefits?.benefits || []),
			items: mapBenefits(marketingData.keyBenefits?.items || []),
		})

		await client.createOrReplace({
			_type: "marketingAgencyFeatures",
			_id: "marketingAgencyFeatures",
			heading: marketingData.features?.heading || "",
			subheading: marketingData.features?.subheading || "",
			features:
				marketingData.features?.features?.map((feature: any) => ({
					title: feature.title || "",
					description: feature.description || "",
					icon: feature.icon || "",
				})) || [],
		})

		await client.createOrReplace({
			_type: "marketingAgencyFaq",
			_id: "marketingAgencyFaq",
			serviceName: marketingData.faq?.serviceName || "",
			heading: marketingData.faq?.heading || "",
			subheading: marketingData.faq?.subheading || "",
			faqs:
				marketingData.faq?.faqs?.map((faq: any) => ({
					q: faq.q || "",
					a: faq.a || "",
				})) || [],
		})

		console.log("✅ Seeded Marketing Agency Page\n")
	} catch (error: any) {
		console.error(
			"❌ Error seeding Marketing Agency Page:",
			error.message || error
		)
	}
}

/**
 * Main seed function
 */
async function seedAll() {
	console.log("🚀 Starting comprehensive seed...\n")

	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const writeToken =
		process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

	if (!projectId) {
		console.error(
			"❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required"
		)
		process.exit(1)
	}

	if (!writeToken) {
		console.error(
			"❌ Error: SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN environment variable is required"
		)
		process.exit(1)
	}

	console.log(`✅ Using project ID: ${projectId}`)
	console.log(
		`✅ Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}\n`
	)

	const client = getClient()

	try {
		// Seed service pages
		await seedSeoPages(client)
		await seedPaidAdsPages(client)
		await seedServicePages(
			client,
			"Social Media",
			socialMediaData,
			"socialMediaPage"
		)
		await seedServicePages(
			client,
			"Content Marketing",
			contentMarketingData,
			"contentMarketingPage"
		)
		await seedServicePages(
			client,
			"Web Development",
			webDevelopmentData,
			"webDevelopmentPage"
		)
		await seedServicePages(
			client,
			"App Development",
			appDevelopmentData,
			"appDevelopmentPage"
		)
		await seedServicePages(
			client,
			"Hosting & IT Security",
			hostingItSecurityData,
			"hostingItSecurityPage"
		)
		await seedServicePages(
			client,
			"AI Automation",
			aiAutomationData,
			"aiAutomationPage"
		)
		await seedServicePages(
			client,
			"Data Analytics",
			dataAnalyticsData,
			"dataAnalyticsPage"
		)
		await seedServicePages(
			client,
			"Industries",
			industriesData,
			"industriesPage"
		)
		await seedServicePages(
			client,
			"Professionals Marketing",
			professionalsMarketingData,
			"professionalsMarketingPage"
		)
		await seedMarketingAgencyPage(client)

		// Seed page sections
		await seedHomePageSections(client)
		await seedPortfolioSections(client)
		await seedAboutSections(client)
		await seedResourcesSections(client)

		console.log("=".repeat(50))
		console.log("🎉 All seeding completed successfully!")
		console.log("=".repeat(50))
	} catch (error) {
		console.error("\n💥 Seed failed:", error)
		process.exit(1)
	}
}

// Run the seed function
seedAll()
	.then(() => {
		console.log("\n✅ Seed process completed!")
		process.exit(0)
	})
	.catch((error) => {
		console.error("\n💥 Seed process failed:", error)
		process.exit(1)
	})

