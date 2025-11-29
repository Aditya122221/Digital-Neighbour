import dotenv from "dotenv"
import { resolve } from "path"
import { createClient, type SanityClient } from "@sanity/client"
import * as fs from "fs"
import * as path from "path"
import seoData from "../data/seo.json"

// Load environment variables from .env.local or .env
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
 * Returns the asset reference or undefined if file doesn't exist
 */
async function uploadImageFromPath(
	client: SanityClient,
	imagePath: string,
	description?: string
): Promise<any> {
	if (!imagePath) {
		return undefined
	}

	// Normalize path - remove leading slash if present for joining
	const normalizedPath = imagePath.startsWith("/")
		? imagePath.slice(1)
		: imagePath

	// Resolve the full path from public directory
	const fullPath = path.join(process.cwd(), "public", normalizedPath)

	// Check if file exists
	if (!fs.existsSync(fullPath)) {
		console.log(`⚠️  Image not found: ${imagePath} (looked at: ${fullPath})`)
		return undefined
	}

	try {
		// Read the file
		const buffer = fs.readFileSync(fullPath)
		const filename = path.basename(fullPath)

		// Upload to Sanity
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
		})
	}
	return transformed
}

/**
 * Seed a single SEO page
 */
async function seedSeoPage(client: SanityClient, slug: string, pageData: any) {
	try {
		console.log(`\n🌱 Seeding SEO page: ${slug}`)

		// Upload content image if exists
		// Handle both relative paths (e.g., "seo.png") and absolute paths (e.g., "/seo/content/seo.png")
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

		// Transform service cards with image uploads
		const serviceCards = await transformServiceCards(
			client,
			pageData.serviceCards || []
		)

		// Prepare the document data
		const document = {
			_type: "seoPage",
			_id: `seoPage-${slug}`,
			slug: createSlug(slug),
			serviceName: pageData.services || "SEO Service",
			hero: {
				heading: pageData.hero?.heading || "",
				subheading: pageData.hero?.subheading || "",
			},
			form: pageData.form
				? {
						heading: pageData.form.heading || "",
						content: pageData.form.content || "",
						subContent: pageData.form.subContent || "",
						cta: pageData.form.cta || "",
						formHeading: pageData.form.formHeading || "",
						buttonText: pageData.form.buttonText || "",
					}
				: undefined,
			introParagraph: pageData.introParagraph
				? {
						heading: pageData.introParagraph.heading || "",
						problemStatement:
							pageData.introParagraph.problemStatement || "",
						valueProposition:
							pageData.introParagraph.valueProposition || "",
					}
				: undefined,
			painPoints: pageData.painPoints
				? {
						heading: pageData.painPoints.heading || "",
						subheading: pageData.painPoints.subheading || "",
						painPoints:
							pageData.painPoints.painPoints?.map((pp: any) => ({
								problem: pp.problem || "",
								solution: pp.solution || "",
							})) || [],
					}
				: undefined,
			services: {
				serviceName: pageData.services || "",
				serviceCards: serviceCards,
			},
			content: pageData.content
				? {
						heading: pageData.content.heading || "",
						text1: pageData.content.text1 || "",
						text2: pageData.content.text2 || "",
						text3: pageData.content.text3 || "",
						...(contentImageRef && { image: contentImageRef }),
						alt: pageData.content.alt || "",
					}
				: undefined,
			process: pageData.process
				? {
						steps: pageData.process.steps || [],
						content: pageData.process.content || [],
					}
				: undefined,
			keyBenefits: pageData.keyBenefits
				? {
						heading: pageData.keyBenefits.heading || "",
						subheading: pageData.keyBenefits.subheading || "",
						benefits:
							pageData.keyBenefits.benefits?.map((b: any) => ({
								title: b.title || "",
								description: b.description || "",
							})) || [],
					}
				: undefined,
			features: pageData.features
				? {
						heading: pageData.features.heading || "",
						subheading: pageData.features.subheading || "",
						features:
							pageData.features.features?.map((f: any) => ({
								title: f.title || "",
								description: f.description || "",
								icon: f.icon || "",
							})) || [],
					}
				: undefined,
			faq: pageData.faq
				? {
						serviceName: pageData.faq.serviceName || "",
						heading: pageData.faq.heading || "",
						subheading: pageData.faq.subheading || "",
						faqs:
							pageData.faq.faqs?.map((faq: any) => ({
								q: faq.q || "",
								a: faq.a || "",
							})) || [],
					}
				: undefined,
		}

		// Remove undefined fields
		Object.keys(document).forEach((key) => {
			if ((document as any)[key] === undefined) {
				delete (document as any)[key]
			}
		})

		// Create or update the document
		const result = await client.createOrReplace(document)
		console.log(`✅ Successfully seeded: ${slug} (ID: ${result._id})`)

		return result
	} catch (error: any) {
		console.error(`❌ Error seeding ${slug}:`, error.message)
		throw error
	}
}

/**
 * Main seed function
 */
async function seedSeoPages() {
	console.log("🚀 Starting SEO pages seed...\n")

	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const writeToken =
		process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN

	if (!projectId) {
		console.error(
			"❌ Error: NEXT_PUBLIC_SANITY_PROJECT_ID environment variable is required"
		)
		console.error(
			"   Please make sure you have a .env.local file with your Sanity project ID."
		)
		process.exit(1)
	}

	if (!writeToken) {
		console.error(
			"❌ Error: SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN environment variable is required"
		)
		console.error(
			"   Please add SANITY_API_WRITE_TOKEN to your .env.local file for seeding."
		)
		process.exit(1)
	}

	console.log(`✅ Using project ID: ${projectId}`)
	console.log(`✅ Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}\n`)

	// Initialize client after env vars are loaded
	const client = getClient()

	const seoDataObj = seoData as Record<string, any>

	// Filter out "otherServices" entry
	const slugs = Object.keys(seoDataObj).filter(
		(key) => key !== "otherServices"
	)

	console.log(`Found ${slugs.length} SEO pages to seed\n`)

	let successCount = 0
	let errorCount = 0

	for (const slug of slugs) {
		try {
			await seedSeoPage(client, slug, seoDataObj[slug])
			successCount++
		} catch (error) {
			errorCount++
			console.error(`Failed to seed ${slug}:`, error)
		}
	}

	console.log("\n" + "=".repeat(50))
	console.log(`✅ Successfully seeded: ${successCount} pages`)
	if (errorCount > 0) {
		console.log(`❌ Failed: ${errorCount} pages`)
	}
	console.log("=".repeat(50))
}

// Run the seed function
seedSeoPages()
	.then(() => {
		console.log("\n🎉 Seed completed!")
		process.exit(0)
	})
	.catch((error) => {
		console.error("\n💥 Seed failed:", error)
		process.exit(1)
	})

