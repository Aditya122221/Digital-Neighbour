import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./sanity/schemaTypes"

export default defineConfig({
	name: "default",
	title: "Digital Neighbour CMS",

	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

	basePath: "/studio",

	plugins: [
		structureTool({
			structure: (S) => {
				// Document IDs for singleton documents
				const HOME_PAGE_SEO_DOC_ID =
					"homePageSeoSettings"
				const HOME_HERO_DOC_ID = "homeHero"
				const HOME_BRAND_INFO_DOC_ID = "homeBrandInfo"
				const HOME_SERVICES_DOC_ID = "homeServices"
				const HOME_TECH_STACK_DOC_ID = "homeTechStack"
				const HOME_CONTENT_DOC_ID = "homeContent"
				const HOME_PROCESS_DOC_ID = "homeProcess"
				const HOME_TRUSTED_BRANDS_DOC_ID =
					"homeTrustedBrands"
				const HOME_TESTIMONIALS_DOC_ID =
					"homeTestimonials"
				const HOME_BOOK_A_CALL_DOC_ID = "homeBookACall"
				const HOME_CASE_STUDY_DOC_ID = "homeCaseStudy"
				const HOME_APART_DOC_ID = "homeApart"
				const PORTFOLIO_PAGE_SEO_DOC_ID =
					"portfolioPageSeoSettings"
				const PORTFOLIO_HERO_DOC_ID =
					"portfolioHeroSection"
				const PORTFOLIO_PROJECTS_DOC_ID =
					"portfolioProjectsList"
				const RESOURCES_PAGE_SEO_DOC_ID =
					"resourcesPageSeoSettings"
				const RESOURCES_HERO_DOC_ID =
					"resourcesHeroSection"
				const RESOURCES_ARTICLES_DOC_ID =
					"resourcesArticlesList"
				const ABOUT_PAGE_SEO_DOC_ID =
					"aboutPageSeoSettings"
				const ABOUT_HERO_DOC_ID = "aboutHeroSection"
				const ABOUT_ORIGINS_DOC_ID = "aboutOrigins"
				const ABOUT_VALUES_DOC_ID = "aboutValues"
				const ABOUT_ACHIEVEMENTS_DOC_ID =
					"aboutAchievements"
				const ABOUT_TEAM_DOC_ID = "aboutTeam"
				const SEO_SETTINGS_DOC_ID = "seoSettings"
				const SITE_NAVBAR_DOC_ID = "siteNavbar"
				const SITE_FOOTER_DOC_ID = "siteFooter"
				const MARKETING_SETTINGS_DOC_ID =
					"marketingAgencySettings"
				const MARKETING_HERO_DOC_ID =
					"marketingAgencyHero"
				const MARKETING_FORM_DOC_ID =
					"marketingAgencyForm"
				const MARKETING_INTRO_DOC_ID =
					"marketingAgencyIntro"
				const MARKETING_PAIN_POINTS_DOC_ID =
					"marketingAgencyPainPoints"
				const MARKETING_PROCESS_DOC_ID =
					"marketingAgencyProcess"
				const MARKETING_KEY_BENEFITS_DOC_ID =
					"marketingAgencyKeyBenefits"
				const MARKETING_FEATURES_DOC_ID =
					"marketingAgencyFeatures"
				const MARKETING_FAQ_DOC_ID =
					"marketingAgencyFaq"

				// Helper to create singleton editor list items
				const createSingletonEditor = (
					title: string,
					schemaType: string,
					documentId: string
				) =>
					S.listItem()
						.title(title)
						.child(
							S.document()
								.id(
									`${documentId}Editor`
								)
								.title(title)
								.schemaType(
									schemaType
								)
								.documentId(
									documentId
								)
						)

				const buildSectionsList = (
					title: string,
					sections: {
						title: string
						schemaType: string
						documentId: string
					}[]
				) =>
					S.listItem()
						.title(title)
						.child(
							S.list()
								.title(title)
								.items(
									sections.map(
										({
											title,
											schemaType,
											documentId,
										}) =>
											createSingletonEditor(
												title,
												schemaType,
												documentId
											)
									)
								)
						)

				const SITE_SETTINGS_SECTIONS = [
					{
						title: "Header",
						schemaType: "siteNavbar",
						documentId: SITE_NAVBAR_DOC_ID,
					},
					{
						title: "Footer",
						schemaType: "siteFooter",
						documentId: SITE_FOOTER_DOC_ID,
					},
				]

				const HOME_PAGE_SECTIONS = [
					{
						title: "SEO Settings",
						schemaType: "homePageSeo",
						documentId: HOME_PAGE_SEO_DOC_ID,
					},
					{
						title: "Hero Section",
						schemaType: "homeHero",
						documentId: HOME_HERO_DOC_ID,
					},
					{
						title: "Brand Info",
						schemaType: "homeBrandInfo",
						documentId: HOME_BRAND_INFO_DOC_ID,
					},
					{
						title: "Trusted Brands",
						schemaType: "homeTrustedBrands",
						documentId: HOME_TRUSTED_BRANDS_DOC_ID,
					},
					{
						title: "Services",
						schemaType: "homeServices",
						documentId: HOME_SERVICES_DOC_ID,
					},
					{
						title: "Tech Stack",
						schemaType: "homeTechStack",
						documentId: HOME_TECH_STACK_DOC_ID,
					},
					{
						title: "Case Study",
						schemaType: "homeCaseStudy",
						documentId: HOME_CASE_STUDY_DOC_ID,
					},
					{
						title: "Content Section",
						schemaType: "homeContent",
						documentId: HOME_CONTENT_DOC_ID,
					},
					{
						title: "Apart",
						schemaType: "homeApart",
						documentId: HOME_APART_DOC_ID,
					},
					{
						title: "Testimonials",
						schemaType: "homeTestimonials",
						documentId: HOME_TESTIMONIALS_DOC_ID,
					},
					{
						title: "Process",
						schemaType: "homeProcess",
						documentId: HOME_PROCESS_DOC_ID,
					},
					{
						title: "Book a Call",
						schemaType: "homeBookACall",
						documentId: HOME_BOOK_A_CALL_DOC_ID,
					},
				]

				const PORTFOLIO_PAGE_SECTIONS = [
					{
						title: "SEO Settings",
						schemaType: "portfolioPageSeo",
						documentId: PORTFOLIO_PAGE_SEO_DOC_ID,
					},
					{
						title: "Hero Section",
						schemaType: "portfolioHero",
						documentId: PORTFOLIO_HERO_DOC_ID,
					},
					{
						title: "Projects",
						schemaType: "portfolioProject",
						documentId: PORTFOLIO_PROJECTS_DOC_ID,
					},
				]

				const RESOURCES_PAGE_SECTIONS = [
					{
						title: "SEO Settings",
						schemaType: "resourcesPageSeo",
						documentId: RESOURCES_PAGE_SEO_DOC_ID,
					},
					{
						title: "Hero Section",
						schemaType: "resourcesHero",
						documentId: RESOURCES_HERO_DOC_ID,
					},
					{
						title: "Articles",
						schemaType: "resourcesArticles",
						documentId: RESOURCES_ARTICLES_DOC_ID,
					},
				]

				const ABOUT_PAGE_SECTIONS = [
					{
						title: "SEO Settings",
						schemaType: "aboutPageSeo",
						documentId: ABOUT_PAGE_SEO_DOC_ID,
					},
					{
						title: "Hero Section",
						schemaType: "aboutHero",
						documentId: ABOUT_HERO_DOC_ID,
					},
					{
						title: "Origins",
						schemaType: "aboutOrigins",
						documentId: ABOUT_ORIGINS_DOC_ID,
					},
					{
						title: "Values",
						schemaType: "aboutValues",
						documentId: ABOUT_VALUES_DOC_ID,
					},
					{
						title: "Achievements",
						schemaType: "aboutAchievements",
						documentId: ABOUT_ACHIEVEMENTS_DOC_ID,
					},
					{
						title: "Team",
						schemaType: "aboutTeam",
						documentId: ABOUT_TEAM_DOC_ID,
					},
				]

				const MARKETING_PAGE_SECTIONS = [
					{
						title: "SEO Setting",
						schemaType: "marketingAgencySettings",
						documentId: MARKETING_SETTINGS_DOC_ID,
					},
					{
						title: "Hero Section",
						schemaType: "marketingAgencyHero",
						documentId: MARKETING_HERO_DOC_ID,
					},
					{
						title: "Form Section",
						schemaType: "marketingAgencyForm",
						documentId: MARKETING_FORM_DOC_ID,
					},
					{
						title: "Intro Paragraph",
						schemaType: "marketingAgencyIntro",
						documentId: MARKETING_INTRO_DOC_ID,
					},
					{
						title: "Pain Points",
						schemaType: "marketingAgencyPainPoints",
						documentId: MARKETING_PAIN_POINTS_DOC_ID,
					},
					{
						title: "Process",
						schemaType: "marketingAgencyProcess",
						documentId: MARKETING_PROCESS_DOC_ID,
					},
					{
						title: "Key Benefits",
						schemaType: "marketingAgencyKeyBenefits",
						documentId: MARKETING_KEY_BENEFITS_DOC_ID,
					},
					{
						title: "Features",
						schemaType: "marketingAgencyFeatures",
						documentId: MARKETING_FEATURES_DOC_ID,
					},
					{
						title: "FAQ",
						schemaType: "marketingAgencyFaq",
						documentId: MARKETING_FAQ_DOC_ID,
					},
				]

				const hiddenTypeIds = new Set([
					...SITE_SETTINGS_SECTIONS.map(
						({ schemaType }) => schemaType
					),
					...HOME_PAGE_SECTIONS.map(
						({ schemaType }) => schemaType
					),
					...PORTFOLIO_PAGE_SECTIONS.map(
						({ schemaType }) => schemaType
					),
					...RESOURCES_PAGE_SECTIONS.map(
						({ schemaType }) => schemaType
					),
					...ABOUT_PAGE_SECTIONS.map(
						({ schemaType }) => schemaType
					),
					...MARKETING_PAGE_SECTIONS.map(
						({ schemaType }) => schemaType
					),
					"seoSettings",
					"seoPage",
					"paidAdsPage",
					"socialMediaPage",
					"contentMarketingPage",
					"webDevelopmentPage",
					"appDevelopmentPage",
					"hostingItSecurityPage",
					"aiAutomationPage",
					"dataAnalyticsPage",
					"industriesPage",
					"professionalsMarketingPage",
				])

				return S.list()
					.title("Content")
					.items([
						createSingletonEditor(
							"SEO Site Settings",
							"seoSettings",
							SEO_SETTINGS_DOC_ID
						),
						buildSectionsList(
							"Site Settings",
							SITE_SETTINGS_SECTIONS
						),
						buildSectionsList(
							"Home Page",
							HOME_PAGE_SECTIONS
						),
						buildSectionsList(
							"Portfolio Page",
							PORTFOLIO_PAGE_SECTIONS
						),
						buildSectionsList(
							"Resources Page",
							RESOURCES_PAGE_SECTIONS
						),
						buildSectionsList(
							"About Page",
							ABOUT_PAGE_SECTIONS
						),
						buildSectionsList(
							"Marketing Agency Page",
							MARKETING_PAGE_SECTIONS
						),
						S.listItem()
							.title("SEO Service Pages")
							.child(
								S.documentTypeList("seoPage")
									.title("SEO Service Pages")
									.filter('_type == "seoPage"')
							),
						S.listItem()
							.title("Paid Ads Service Pages")
							.child(
								S.documentTypeList("paidAdsPage")
									.title("Paid Ads Service Pages")
									.filter('_type == "paidAdsPage"')
							),
						S.listItem()
							.title("Social Media Service Pages")
							.child(
								S.documentTypeList("socialMediaPage")
									.title("Social Media Service Pages")
									.filter('_type == "socialMediaPage"')
							),
						S.listItem()
							.title("Content Marketing Service Pages")
							.child(
								S.documentTypeList("contentMarketingPage")
									.title("Content Marketing Service Pages")
									.filter('_type == "contentMarketingPage"')
							),
						S.listItem()
							.title("Web Development Service Pages")
							.child(
								S.documentTypeList("webDevelopmentPage")
									.title("Web Development Service Pages")
									.filter('_type == "webDevelopmentPage"')
							),
						S.listItem()
							.title("App Development Service Pages")
							.child(
								S.documentTypeList("appDevelopmentPage")
									.title("App Development Service Pages")
									.filter('_type == "appDevelopmentPage"')
							),
						S.listItem()
							.title("Hosting & IT Security Service Pages")
							.child(
								S.documentTypeList("hostingItSecurityPage")
									.title("Hosting & IT Security Service Pages")
									.filter('_type == "hostingItSecurityPage"')
							),
						S.listItem()
							.title("AI & Automation Service Pages")
							.child(
								S.documentTypeList("aiAutomationPage")
									.title("AI & Automation Service Pages")
									.filter('_type == "aiAutomationPage"')
							),
						S.listItem()
							.title("Data & Analytics Service Pages")
							.child(
								S.documentTypeList("dataAnalyticsPage")
									.title("Data & Analytics Service Pages")
									.filter('_type == "dataAnalyticsPage"')
							),
						S.listItem()
							.title("Industries Service Pages")
							.child(
								S.documentTypeList("industriesPage")
									.title("Industries Service Pages")
									.filter('_type == "industriesPage"')
							),
						S.listItem()
							.title("Professionals Marketing Service Pages")
							.child(
								S.documentTypeList("professionalsMarketingPage")
									.title("Professionals Marketing Service Pages")
									.filter('_type == "professionalsMarketingPage"')
							),
						...S.documentTypeListItems().filter(
							(listItem) =>
								!hiddenTypeIds.has(
									listItem.getId() ||
										""
								)
						),
					])
			},
		}),
	],

	schema: {
		types: schemaTypes,
	},
})
