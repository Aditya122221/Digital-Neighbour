import { createClient } from "@sanity/client"
import * as fs from "fs"
import * as path from "path"
import { config } from "dotenv"
import { serviceFieldConfig } from "../sanity/schemaTypes/serviceFieldConfig"

// Load environment variables from .env
config({ path: path.join(process.cwd(), ".env") })

// Initialize Sanity client with write token
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2023-10-01"
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId) {
	throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID")
}

if (!token) {
	throw new Error(
		"Missing SANITY_API_WRITE_TOKEN. Generate a write token from your Sanity project settings."
	)
}

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false,
	token,
})

// Map service slugs to Sanity document types
const serviceTypeMap: Record<string, string> = {
	seo: "seoService",
	"paid-ads": "paidAdvertService", // File is paid-ads.json
	"paid-advertisement": "paidAdvertService",
	"social-media": "socialMarketingService", // File is social-media.json
	"social-media-marketing": "socialMarketingService",
	"content-marketing": "contentMarketingService",
	"web-development": "webDevelopmentService",
	"app-development": "appDevelopmentService",
	"hosting-it-security": "hostingService",
	"ai-automation": "aiAutomationService",
	"data-analytics": "dataAnalyticsService",
	industries: "industriesService",
	"professionals-marketing": "professionalMarketingService",
	professionals: "professionalMarketingService", // JSON uses "professionals"
}

// Map JSON slugs to serviceFieldConfig slugs (for cases where they differ)
const slugMapping: Record<string, string> = {
	"online-reputation-management": "orm", // JSON uses "online-reputation-management", config uses "orm"
	"search-engine-optimisation": "seo", // JSON might use this, config uses "seo"
	professionals: "professionals", // JSON uses "professionals", config might use this
}

// Transform JSON data structure to match Sanity schema
function transformData(jsonData: any, serviceSlug: string): any {
	const transformed: any = {}

	// Map slug if needed (e.g., "online-reputation-management" -> "orm")
	const mappedSlug = slugMapping[serviceSlug] || serviceSlug

	// Get the title from serviceFieldConfig
	const config =
		serviceFieldConfig[
			mappedSlug as keyof typeof serviceFieldConfig
		]
	if (!config) {
		console.warn(
			`No config found for slug: ${serviceSlug} (mapped: ${mappedSlug})`
		)
		return null
	}

	transformed.title = config.title

	// Transform each section
	if (jsonData.hero) {
		transformed.hero = {
			heading: jsonData.hero.heading || "",
			subheading: jsonData.hero.subheading || "",
		}
		// Handle hero.industries array (for industries service)
		if (
			jsonData.hero.industries &&
			Array.isArray(jsonData.hero.industries)
		) {
			transformed.hero.industries =
				jsonData.hero.industries.map(
					(industry: any, index: number) => ({
						_key:
							industry._key ||
							`${serviceSlug}-hero-industry-${index}`,
						name: industry.name || "",
						slug: industry.slug || "",
						// Don't include image for now
					})
				)
		}
	}

	if (jsonData.form) {
		transformed.form = {
			heading: jsonData.form.heading || "",
			content: jsonData.form.content || "",
			subContent: jsonData.form.subContent || "",
			cta: jsonData.form.cta || "",
			formHeading: jsonData.form.formHeading || "",
			buttonText: jsonData.form.buttonText || "",
		}
	}

	if (jsonData.introParagraph) {
		transformed.introParagraph = {
			heading: jsonData.introParagraph.heading || "",
			problemStatement:
				jsonData.introParagraph.problemStatement || "",
			valueProposition:
				jsonData.introParagraph.valueProposition || "",
		}
		// Handle paragraphs array (for industries/professionals services)
		if (
			jsonData.introParagraph.paragraphs &&
			Array.isArray(jsonData.introParagraph.paragraphs)
		) {
			// Join paragraphs into problemStatement and valueProposition if not already set
			if (
				!transformed.introParagraph.problemStatement &&
				jsonData.introParagraph.paragraphs.length > 0
			) {
				transformed.introParagraph.problemStatement =
					jsonData.introParagraph.paragraphs[0] ||
					""
			}
			if (
				!transformed.introParagraph.valueProposition &&
				jsonData.introParagraph.paragraphs.length > 1
			) {
				transformed.introParagraph.valueProposition =
					jsonData.introParagraph.paragraphs[1] ||
					""
			}
		}
	}

	if (jsonData.painPoints || jsonData.painpoints) {
		const painPoints = jsonData.painPoints || jsonData.painpoints
		transformed.painPoints = {
			heading: painPoints.heading || "",
			subheading: painPoints.subheading || "",
			painPoints: (
				painPoints.painPoints ||
				painPoints.items ||
				[]
			).map((pp: any, index: number) => ({
				_key:
					pp._key ||
					`${serviceSlug}-painpoint-${index}`,
				problem: pp.problem || pp.title || "",
				solution: pp.solution || pp.description || "",
			})),
		}
	}

	if (jsonData.serviceCards) {
		transformed.serviceCards = jsonData.serviceCards.map(
			(card: any, index: number) => ({
				_key:
					card._key ||
					card.id ||
					`${serviceSlug}-servicecard-${index}`,
				id: card.id || "",
				name: card.name || "",
				title: card.title || "",
				description: card.description || "",
				// Don't include image for now - keep it empty
			})
		)
	}

	if (jsonData.content) {
		transformed.content = {
			heading: jsonData.content.heading || "",
			text1: jsonData.content.text1 || "",
			text2: jsonData.content.text2 || "",
			text3: jsonData.content.text3 || "",
			// Don't include image for now
			alt: jsonData.content.alt || "",
		}
	}

	if (jsonData.process) {
		transformed.process = {
			heading: jsonData.process.heading || "",
			steps: jsonData.process.steps || [],
			content: jsonData.process.content || [],
		}
	}

	if (jsonData.keyBenefits || jsonData.keybenefits) {
		const keyBenefits = jsonData.keyBenefits || jsonData.keybenefits
		transformed.keyBenefits = {
			heading: keyBenefits.heading || "",
			subheading: keyBenefits.subheading || "",
			benefits: (keyBenefits.benefits || []).map(
				(benefit: any, index: number) => ({
					_key:
						benefit._key ||
						`${serviceSlug}-benefit-${index}`,
					title: benefit.title || "",
					description: benefit.description || "",
					icon: benefit.icon || "",
					// Don't include image for now
				})
			),
			items: (keyBenefits.items || []).map(
				(item: any, index: number) => ({
					_key:
						item._key ||
						`${serviceSlug}-keybenefit-item-${index}`,
					title: item.title || "",
					description: item.description || "",
					icon: item.icon || "",
					// Don't include image for now
				})
			),
		}
	}

	if (jsonData.features) {
		transformed.features = {
			heading: jsonData.features.heading || "",
			subheading: jsonData.features.subheading || "",
			features: (jsonData.features.features || []).map(
				(feature: any, index: number) => ({
					_key:
						feature._key ||
						`${serviceSlug}-feature-${index}`,
					title: feature.title || "",
					description: feature.description || "",
					icon: feature.icon || "",
				})
			),
		}
	}

	if (jsonData.faq) {
		transformed.faq = {
			serviceName: jsonData.faq.serviceName || "",
			faqs: (jsonData.faq.faqs || []).map(
				(faq: any, index: number) => ({
					_key:
						faq._key ||
						`${serviceSlug}-faq-${index}`,
					q: faq.q || "",
					a: faq.a || "",
				})
			),
		}
	}

	// Handle service-specific fields
	if (jsonData.strategic) {
		transformed.strategic = {
			heading: jsonData.strategic.heading || "",
			blocks: (jsonData.strategic.blocks || []).map(
				(block: any, index: number) => ({
					_key:
						block._key ||
						`${serviceSlug}-strategic-block-${index}`,
					icon: block.icon || "",
					title: block.title || "",
					description: block.description || "",
				})
			),
		}
	}

	if (jsonData.industries) {
		transformed.industries = {
			heading: jsonData.industries.heading || "",
			description: jsonData.industries.description || "",
			industries: (jsonData.industries.industries || []).map(
				(ind: any, index: number) => ({
					_key:
						ind._key ||
						ind.id ||
						`${serviceSlug}-industry-${index}`,
					id: ind.id || "",
					name: ind.name || "",
					icon: ind.icon || "",
					details: ind.details || "",
				})
			),
		}
	}

	if (jsonData.premiumCloudServices) {
		transformed.premiumCloudServices = {
			title: jsonData.premiumCloudServices.title || "",
			cardone: {
				title:
					jsonData.premiumCloudServices.cardone
						?.title ||
					jsonData.premiumCloudServices
						.topCards?.[0]?.title ||
					"",
				description:
					jsonData.premiumCloudServices.cardone
						?.description ||
					jsonData.premiumCloudServices
						.topCards?.[0]?.description ||
					"",
			},
			cardtwo: {
				title:
					jsonData.premiumCloudServices.cardtwo
						?.title ||
					jsonData.premiumCloudServices
						.topCards?.[1]?.title ||
					"",
				description:
					jsonData.premiumCloudServices.cardtwo
						?.description ||
					jsonData.premiumCloudServices
						.topCards?.[1]?.description ||
					"",
			},
			customApi: {
				title:
					jsonData.premiumCloudServices.customApi
						?.title || "",
				badge:
					jsonData.premiumCloudServices.customApi
						?.badge || "",
				description:
					jsonData.premiumCloudServices.customApi
						?.description || "",
			},
			maximumCustomization: {
				title:
					jsonData.premiumCloudServices
						.maximumCustomization?.title ||
					"",
				description:
					jsonData.premiumCloudServices
						.maximumCustomization
						?.description || "",
				features: (
					jsonData.premiumCloudServices
						.maximumCustomization
						?.features || []
				).map((feature: any, index: number) => ({
					_key:
						feature._key ||
						`${serviceSlug}-premium-feature-${index}`,
					title: feature.title || "",
					description: feature.description || "",
					icon: feature.icon || "",
					// Don't include image for now
				})),
			},
		}
	}

	return transformed
}

// Helper function to retry operations with exponential backoff
async function retryWithBackoff<T>(
	fn: () => Promise<T>,
	maxRetries: number = 3,
	initialDelay: number = 1000
): Promise<T> {
	let lastError: any

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			return await fn()
		} catch (error: any) {
			lastError = error

			// If it's a connection reset or network error, retry
			const isRetryable =
				error.code === "ECONNRESET" ||
				error.code === "ETIMEDOUT" ||
				error.code === "ENOTFOUND" ||
				error.message?.includes("ECONNRESET") ||
				error.message?.includes("ETIMEDOUT")

			if (!isRetryable || attempt === maxRetries) {
				throw error
			}

			// Calculate delay with exponential backoff
			const delay = initialDelay * Math.pow(2, attempt)
			console.warn(
				`⚠ Retry ${
					attempt + 1
				}/${maxRetries} after ${delay}ms for connection error...`
			)
			await new Promise((resolve) =>
				setTimeout(resolve, delay)
			)
		}
	}

	throw lastError
}

// Delay helper
function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

// Seed a single service
async function seedService(
	serviceSlug: string,
	jsonData: any,
	documentType: string
): Promise<void> {
	const transformed = transformData(jsonData, serviceSlug)

	if (!transformed) {
		console.warn(
			`Skipping ${serviceSlug} - no transformation possible`
		)
		return
	}

	try {
		// Check if document already exists with retry
		const existing = await retryWithBackoff(async () => {
			return await client.fetch(
				`*[_type == $documentType && title == $title][0]`,
				{
					documentType,
					title: transformed.title,
				}
			)
		})

		if (existing) {
			// Update existing document with retry
			await retryWithBackoff(async () => {
				await client
					.patch(existing._id)
					.set(transformed)
					.commit()
			})
			console.log(
				`✓ Updated: ${transformed.title} (${serviceSlug})`
			)
		} else {
			// Create new document with retry
			await retryWithBackoff(async () => {
				await client.create({
					_type: documentType,
					...transformed,
				})
			})
			console.log(
				`✓ Created: ${transformed.title} (${serviceSlug})`
			)
		}

		// Add a small delay between requests to avoid rate limiting
		await delay(500)
	} catch (error: any) {
		if (
			error.code === "ECONNRESET" ||
			error.message?.includes("ECONNRESET")
		) {
			console.error(
				`✗ Connection reset error seeding ${serviceSlug}:`,
				error.message || error
			)
			throw error
		}
		console.error(`✗ Error seeding ${serviceSlug}:`, error)
		throw error
	}
}

async function seedHomePage(dataDir: string) {
	const filePath = path.join(dataDir, "home.json")

	if (!fs.existsSync(filePath)) {
		console.warn("⚠ File not found: home.json")
		return
	}

	const homeJson = JSON.parse(fs.readFileSync(filePath, "utf-8"))
	const transformed = transformHomeData(homeJson)

	try {
		const existing = await retryWithBackoff(async () => {
			return await client.fetch(`*[_type == "homePage"][0]`)
		})

		if (existing) {
			await retryWithBackoff(async () => {
				await client
					.patch(existing._id)
					.set(transformed)
					.commit()
			})
			console.log("✓ Updated: Homepage content")
		} else {
			await retryWithBackoff(async () => {
				await client.create({
					_type: "homePage",
					...transformed,
				})
			})
			console.log("✓ Created: Homepage content")
		}
	} catch (error) {
		console.error("✗ Error seeding homepage:", error)
		throw error
	}
}

async function seedApartSection(dataDir: string) {
	const filePath = path.join(dataDir, "home.json")

	if (!fs.existsSync(filePath)) {
		console.warn("⚠ File not found: home.json")
		return
	}

	const homeJson = JSON.parse(fs.readFileSync(filePath, "utf-8"))
	const apartSource = homeJson.apart ?? homeJson.homeData?.apart
	const transformed = transformApartData(apartSource)

	if (!transformed) {
		console.warn("⚠ No apart section data found in home.json")
		return
	}

	try {
		const existing = await retryWithBackoff(async () => {
			return await client.fetch(`*[_type == "apartSection"][0]`)
		})

		if (existing) {
			await retryWithBackoff(async () => {
				await client
					.patch(existing._id)
					.set(transformed)
					.commit()
			})
			console.log("✓ Updated: Apart section content")
		} else {
			await retryWithBackoff(async () => {
				await client.create({
					_type: "apartSection",
					...transformed,
				})
			})
			console.log("✓ Created: Apart section content")
		}
	} catch (error) {
		console.error("✗ Error seeding apart section:", error)
		throw error
	}
}

async function seedCaseStudiesSection(dataDir: string) {
	const filePath = path.join(dataDir, "home.json")

	if (!fs.existsSync(filePath)) {
		console.warn("⚠ File not found: home.json")
		return
	}

	const homeJson = JSON.parse(fs.readFileSync(filePath, "utf-8"))
	const caseStudiesSource =
		homeJson.caseStudies ?? homeJson.homeData?.caseStudies
	const transformed = transformCaseStudiesData(caseStudiesSource)

	if (!transformed) {
		console.warn("⚠ No case studies data found in home.json")
		return
	}

	try {
		const existing = await retryWithBackoff(async () => {
			return await client.fetch(
				`*[_type == "caseStudiesSection"][0]`
			)
		})

		if (existing) {
			await retryWithBackoff(async () => {
				await client
					.patch(existing._id)
					.set(transformed)
					.commit()
			})
			console.log("✓ Updated: Case studies section")
		} else {
			await retryWithBackoff(async () => {
				await client.create({
					_type: "caseStudiesSection",
					...transformed,
				})
			})
			console.log("✓ Created: Case studies section")
		}
	} catch (error) {
		console.error("✗ Error seeding case studies section:", error)
		throw error
	}
}

function transformHomeData(rawHomeJson: any) {
	const defaultMetadataTitle =
		"Growth Marketing & Digital Experience Agency"
	const defaultMetadataDescription =
		"Digital Neighbour blends strategy, creativity, and technology to deliver end-to-end marketing, product, and growth programs that scale ambitious brands."

	const addKeys = <T extends Record<string, any>>(
		items: T[] = [],
		keyPrefix: string
	) =>
		items.map((item, index) => ({
			_key: item._key || `${keyPrefix}-${index}`,
			...item,
		}))

	const homeData = rawHomeJson?.homeData ?? rawHomeJson ?? {}
	return {
		metadata: homeData.metadata || defaultMetadataTitle,
		description: homeData.description || defaultMetadataDescription,
		hero: {
			heading: homeData.hero?.heading || "",
			subheading: homeData.hero?.subheading || "",
			images: homeData.hero?.images || [],
		},
		brandInfo: {
			main: {
				heading:
					homeData.brandInfo?.main?.heading || "",
				subheading:
					homeData.brandInfo?.main?.subheading ||
					"",
			},
			differentiators: addKeys(
				homeData.brandInfo?.differentiators || [],
				"brand-diff"
			),
			rightCard: {
				heading:
					homeData.brandInfo?.rightCard
						?.heading || "",
				description:
					homeData.brandInfo?.rightCard
						?.description || "",
				stats: addKeys(
					homeData.brandInfo?.rightCard?.stats ||
						[],
					"brand-stat"
				),
			},
		},
		services: {
			heading: homeData.services?.heading || "",
			subheading: homeData.services?.subheading || "",
			cards: addKeys(
				(homeData.services?.rightCard || []).map(
					(card: any) => ({
						title: card.title || "",
						video: card.video || "",
						subheading:
							card.subheading || [],
					})
				),
				"service-card"
			),
		},
		keepYourStack: {
			heading: homeData.keepYourStack?.heading || "",
			highlight: homeData.keepYourStack?.highlight || "",
			description: homeData.keepYourStack?.description || "",
			logos: addKeys(
				homeData.keepYourStack?.logos || [],
				"stack-logo"
			),
		},
		contentSection: {
			heading: homeData.contentSection?.heading || "",
			subheading: homeData.contentSection?.subheading || "",
			benefits: addKeys(
				homeData.contentSection?.benefits || [],
				"impact-benefit"
			),
		},
		process: {
			label: homeData.process?.label || "",
			steps: homeData.process?.steps || [],
			content: homeData.process?.content || [],
		},
	}
}

function transformApartData(rawApartData: any) {
	if (!rawApartData) {
		return null
	}

	return {
		heading: rawApartData.heading || "",
		highlightTarget: rawApartData.highlightTarget || "",
		tagline: rawApartData.tagline || "",
		oursTitle: rawApartData.oursTitle || "",
		othersTitle: rawApartData.othersTitle || "",
		ours: Array.isArray(rawApartData.ours)
			? rawApartData.ours
			: [],
		others: Array.isArray(rawApartData.others)
			? rawApartData.others
			: [],
	}
}

function transformCaseStudiesData(rawCaseStudies: any) {
	if (!rawCaseStudies) {
		return null
	}

	const addKeys = <T extends Record<string, any>>(
		items: T[] = [],
		keyPrefix: string
	) =>
		items.map((item, index) => ({
			_key: item._key || `${keyPrefix}-${index}`,
			...item,
		}))

	return {
		heading: rawCaseStudies.heading || "",
		items: addKeys(
			(rawCaseStudies.items || []).map((item: any, index: number) => ({
				id:
					typeof item.id === "number"
						? item.id
						: index + 1,
				title: item.title || "",
				textColor: item.textColor || "text-white",
				isNew: !!item.isNew,
				services: item.services || [],
				bgImages: addKeys(
					(item.bgImages || []).map((image: any) => ({
						externalUrl:
							typeof image === "string" ? image : "",
					})),
					"case-image"
				),
				metrics: addKeys(item.metrics || [], "case-metric"),
			})),
			"case-item"
		),
	}
}

function transformMarketingAgencyData(data: any) {
	if (!data) {
		return null
	}

	const withKeys = <T extends Record<string, any>>(
		items: T[] = [],
		prefix: string
	) =>
		items.map((item, index) => ({
			_key: item?._key || `${prefix}-${index}`,
			...item,
		}))

	const mapTitleDescription = (items: any[] = [], prefix: string) =>
		items.map((item, index) => ({
			_key: item?._key || `${prefix}-${index}`,
			title: item?.title || "",
			description: item?.description || "",
			icon: item?.icon || "",
			image: item?.image || "",
		}))

	return {
		title: "Marketing Agency",
		metadata: data?.hero?.heading || "",
		description: data?.hero?.subheading || "",
		hero: {
			heading: data?.hero?.heading || "",
			subheading: data?.hero?.subheading || "",
		},
		form: {
			heading: data?.form?.heading || "",
			content: data?.form?.content || "",
			subContent: data?.form?.subContent || "",
			cta: data?.form?.cta || "",
			formHeading: data?.form?.formHeading || "",
			buttonText: data?.form?.buttonText || "",
		},
		introParagraph: {
			heading: data?.introParagraph?.heading || "",
			problemStatement:
				data?.introParagraph?.problemStatement || "",
			valueProposition:
				data?.introParagraph?.valueProposition || "",
		},
		painPoints: {
			heading: data?.painPoints?.heading || "",
			subheading: data?.painPoints?.subheading || "",
			painPoints: (data?.painPoints?.painPoints || []).map(
				(item: any, index: number) => ({
					_key:
						item?._key ||
						`painpoint-${index}`,
					problem:
						item?.problem ||
						item?.title ||
						"",
					solution:
						item?.solution ||
						item?.description ||
						"",
				})
			),
		},
		services: data?.services || "",
		process: {
			heading: data?.process?.heading || "",
			steps: data?.process?.steps || [],
			content: data?.process?.content || [],
		},
		keyBenefits: {
			heading: data?.keyBenefits?.heading || "",
			subheading: data?.keyBenefits?.subheading || "",
			benefits: mapTitleDescription(
				data?.keyBenefits?.benefits ||
					data?.keyBenefits?.items ||
					[],
				"marketing-benefit"
			),
			items: mapTitleDescription(
				data?.keyBenefits?.items || [],
				"marketing-benefit-item"
			),
		},
		features: {
			heading: data?.features?.heading || "",
			subheading: data?.features?.subheading || "",
			features: withKeys(
				(data?.features?.features || []).map(
					(feature: any) => ({
						title: feature?.title || "",
						description:
							feature?.description ||
							"",
						icon: feature?.icon || "",
					})
				),
				"marketing-feature"
			),
		},
		faq: {
			serviceName: data?.faq?.serviceName || "",
			faqs: (data?.faq?.faqs || []).map(
				(faq: any, index: number) => ({
					_key:
						faq?._key ||
						`marketing-faq-${index}`,
					q: faq?.q || "",
					a: faq?.a || "",
				})
			),
		},
	}
}

async function seedMarketingAgencyPage(dataDir: string) {
	const filePath = path.join(dataDir, "marketing-agency.json")

	if (!fs.existsSync(filePath)) {
		console.warn("⚠ File not found: marketing-agency.json")
		return
	}

	const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"))
	const marketingData = rawData["marketing-agency"]
	const transformed = transformMarketingAgencyData(marketingData)

	if (!transformed) {
		console.warn("⚠ Unable to transform marketing agency data")
		return
	}

	try {
		const existing = await retryWithBackoff(async () => {
			return client.fetch(
				`*[_type == "marketingAgencyPage"][0]`
			)
		})

		if (existing) {
			await retryWithBackoff(async () => {
				await client
					.patch(existing._id)
					.set(transformed)
					.commit()
			})
			console.log("✓ Updated: Marketing Agency page")
		} else {
			await retryWithBackoff(async () => {
				await client.create({
					_type: "marketingAgencyPage",
					...transformed,
				})
			})
			console.log("✓ Created: Marketing Agency page")
		}
	} catch (error) {
		console.error("✗ Error seeding marketing agency page:", error)
		throw error
	}
}

// Main seed function
async function seedAllServices() {
	const dataDir = path.join(process.cwd(), "data")
	await seedHomePage(dataDir)
	await seedApartSection(dataDir)
	await seedCaseStudiesSection(dataDir)
	await seedMarketingAgencyPage(dataDir)
	const jsonFiles = [
		"seo.json",
		"paid-ads.json",
		"social-media.json",
		"content-marketing.json",
		"web-development.json",
		"app-development.json",
		"hosting-it-security.json",
		"ai-automation.json",
		"data-analytics.json",
		"industries.json",
		"professionals-marketing.json",
	]

	console.log("Starting Sanity seed process...\n")

	for (const file of jsonFiles) {
		const filePath = path.join(dataDir, file)

		if (!fs.existsSync(filePath)) {
			console.warn(`⚠ File not found: ${file}`)
			continue
		}

		const fileContent = fs.readFileSync(filePath, "utf-8")
		const jsonData = JSON.parse(fileContent)

		// Determine document type from filename
		let baseName = file.replace(".json", "")

		// Handle file name mappings
		if (baseName === "paid-ads") {
			baseName = "paid-advertisement"
		} else if (baseName === "social-media") {
			baseName = "social-media-marketing"
		} else if (baseName === "professionals-marketing") {
			// Keep as is, but JSON key is "professionals"
			baseName = "professionals-marketing"
		}

		const documentType = serviceTypeMap[baseName]

		if (!documentType) {
			console.warn(
				`⚠ No document type mapping for: ${baseName} (from file: ${file})`
			)
			continue
		}

		console.log(`\n📦 Processing ${file} (${documentType})...`)

		// Process each service in the JSON file
		const services = Object.entries(jsonData)
		let successCount = 0
		let failCount = 0

		for (let i = 0; i < services.length; i++) {
			const [slug, data] = services[i]

			// Skip non-service keys
			if (
				slug === "otherServices" ||
				typeof data !== "object"
			) {
				continue
			}

			try {
				await seedService(slug, data, documentType)
				successCount++
			} catch (error: any) {
				failCount++
				console.error(
					`✗ Failed to seed ${slug} from ${file}:`,
					error.message || error
				)

				// If it's a connection error, add a longer delay before continuing
				if (
					error.code === "ECONNRESET" ||
					error.message?.includes("ECONNRESET")
				) {
					console.warn(
						`⏸ Waiting 2 seconds before continuing due to connection reset...`
					)
					await delay(2000)
				}

				// Continue with next service instead of stopping
			}

			// Add a small delay between services to avoid rate limiting
			if (i < services.length - 1) {
				await delay(300)
			}
		}

		console.log(
			`\n📊 ${file}: ${successCount} succeeded, ${failCount} failed`
		)
	}

	console.log("\n✅ Seed process completed!")
}

// Run the seed
seedAllServices().catch((error) => {
	console.error("Seed failed:", error)
	process.exit(1)
})
