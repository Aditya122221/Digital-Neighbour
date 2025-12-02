import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	try {
		// Verify the request is from Sanity (security check)
		const secret = request.nextUrl.searchParams.get("secret")
		if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
			return NextResponse.json(
				{ message: "Invalid secret" },
				{ status: 401 }
			)
		}

		const body = await request.json()

		// Handle different webhook payload formats
		// Sanity sends different formats depending on webhook configuration
		let documentType: string | undefined
		let slug: string | undefined

		// Format 1: Direct document data (when using "Include documents" in webhook)
		if (body._type) {
			documentType = body._type
			slug = body.slug?.current || body.slug
		}
		// Format 2: Mutation payload
		else if (body.mutations?.[0]) {
			const mutation = body.mutations[0]
			if (mutation.create) {
				documentType = mutation.create._type
				slug = mutation.create.slug?.current
			} else if (mutation.update) {
				documentType = mutation.update._type
				slug = mutation.update.slug?.current
			} else if (mutation.delete) {
				documentType = mutation.delete._type
			}
		}

		if (!documentType) {
			return NextResponse.json(
				{
					message: "No document type found in webhook payload",
				},
				{ status: 400 }
			)
		}

		console.log(
			`🔄 Revalidating for document type: ${documentType}`
		)

		// Revalidate based on document type
		switch (documentType) {
			// Home Page Documents
			case "homeHero":
			case "homeBrandInfo":
			case "homeServices":
			case "homeTechStack":
			case "homeContent":
			case "homeProcess":
			case "homeTrustedBrands":
			case "homeTestimonials":
			case "homeBookACall":
			case "homeCaseStudy":
			case "homeApart":
			case "homePageSeo":
				revalidatePath("/")
				console.log("✅ Revalidated home page")
				break

			// Portfolio Page Documents
			case "portfolioPageSeo":
			case "portfolioHero":
			case "portfolioProject":
				revalidatePath("/portfolio")
				if (slug) {
					revalidatePath(`/portfolio/${slug}`)
				}
				console.log("✅ Revalidated portfolio page")
				break

			// Resources Page Documents
			case "resourcesPageSeo":
			case "resourcesHero":
			case "resourcesArticles":
				revalidatePath("/resources")
				if (slug) {
					revalidatePath(`/resources/${slug}`)
				}
				console.log("✅ Revalidated resources page")
				break

			// About Page Documents
			case "aboutPageSeo":
			case "aboutHero":
			case "aboutOrigins":
			case "aboutValues":
			case "aboutAchievements":
			case "aboutTeam":
				revalidatePath("/about")
				console.log("✅ Revalidated about page")
				break

			// Marketing Agency Page Documents
			case "marketingAgencySettings":
			case "marketingAgencyHero":
			case "marketingAgencyForm":
			case "marketingAgencyIntro":
			case "marketingAgencyPainPoints":
			case "marketingAgencyProcess":
			case "marketingAgencyKeyBenefits":
			case "marketingAgencyFeatures":
			case "marketingAgencyFaq":
			case "marketingAgencyHowFast":
				revalidatePath("/marketing-agency")
				console.log(
					"✅ Revalidated marketing agency page"
				)
				break

			// Global Site Components (revalidate all pages)
			case "siteNavbar":
			case "siteFooter":
			case "seoSettings":
				revalidatePath("/", "layout")
				console.log(
					"✅ Revalidated all pages (global components)"
				)
				break

			// SEO Service Pages
			case "seoPage":
				revalidatePath("/seo")
				if (slug) {
					revalidatePath(`/seo/${slug}`)
				}
				console.log(
					`✅ Revalidated SEO page: ${slug || "all"}`
				)
				break

			// Paid Ads Service Pages
			case "paidAdsPage":
				revalidatePath("/paid-advertisement")
				if (slug) {
					revalidatePath(
						`/paid-advertisement/${slug}`
					)
				}
				console.log(
					`✅ Revalidated paid ads page: ${slug || "all"}`
				)
				break

			// Social Media Service Pages
			case "socialMediaPage":
				revalidatePath("/social-media-marketing")
				if (slug) {
					revalidatePath(
						`/social-media-marketing/${slug}`
					)
				}
				console.log(
					`✅ Revalidated social media page: ${slug || "all"}`
				)
				break

			// Content Marketing Service Pages
			case "contentMarketingPage":
				revalidatePath("/content-marketing")
				if (slug) {
					revalidatePath(
						`/content-marketing/${slug}`
					)
				}
				console.log(
					`✅ Revalidated content marketing page: ${slug || "all"}`
				)
				break

			// Web Development Service Pages
			case "webDevelopmentPage":
				revalidatePath("/web-development")
				if (slug) {
					revalidatePath(
						`/web-development/${slug}`
					)
				}
				console.log(
					`✅ Revalidated web development page: ${slug || "all"}`
				)
				break

			// App Development Service Pages
			case "appDevelopmentPage":
				revalidatePath("/app-development")
				if (slug) {
					revalidatePath(
						`/app-development/${slug}`
					)
				}
				console.log(
					`✅ Revalidated app development page: ${slug || "all"}`
				)
				break

			// Hosting & IT Security Service Pages
			case "hostingItSecurityPage":
				revalidatePath("/hosting-it-security")
				if (slug) {
					revalidatePath(
						`/hosting-it-security/${slug}`
					)
				}
				console.log(
					`✅ Revalidated hosting & IT security page: ${slug || "all"}`
				)
				break

			// AI & Automation Service Pages
			case "aiAutomationPage":
				revalidatePath("/ai-automation")
				if (slug) {
					revalidatePath(`/ai-automation/${slug}`)
				}
				console.log(
					`✅ Revalidated AI automation page: ${slug || "all"}`
				)
				break

			// Data & Analytics Service Pages
			case "dataAnalyticsPage":
				revalidatePath("/data-analytics")
				if (slug) {
					revalidatePath(
						`/data-analytics/${slug}`
					)
				}
				console.log(
					`✅ Revalidated data analytics page: ${slug || "all"}`
				)
				break

			// Industries Service Pages
			case "industriesPage":
				revalidatePath("/industry")
				if (slug) {
					revalidatePath(`/industry/${slug}`)
				}
				console.log(
					`✅ Revalidated industry page: ${slug || "all"}`
				)
				break

			// Professionals Marketing Service Pages
			case "professionalsMarketingPage":
				revalidatePath(
					"/professionals-marketing-agency"
				)
				if (slug) {
					revalidatePath(
						`/professionals-marketing-agency/${slug}`
					)
				}
				console.log(
					`✅ Revalidated professionals marketing page: ${slug || "all"}`
				)
				break

			default:
				// Fallback: revalidate everything
				console.warn(
					`⚠️ Unknown document type: ${documentType}, revalidating all pages`
				)
				revalidatePath("/", "layout")
		}

		return NextResponse.json({
			revalidated: true,
			now: Date.now(),
			documentType,
			slug: slug || null,
		})
	} catch (error: any) {
		console.error("❌ Error revalidating:", error)
		return NextResponse.json(
			{ message: `Error revalidating: ${error?.message}` },
			{ status: 500 }
		)
	}
}

// Also allow GET requests for testing
export async function GET(request: NextRequest) {
	return NextResponse.json({
		message: "Revalidate API endpoint",
		instructions: "Use POST with Sanity webhook",
	})
}
