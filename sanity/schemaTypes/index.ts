import { type SchemaTypeDefinition } from "sanity"

import { apartSectionType } from "./apart"
import { caseStudiesSectionType } from "./casestudy"
import { homePageType } from "./home"
import { sectionTypes } from "./objects/sections"
import { seoServiceType } from "./seo"
import { paidAdvertisingServiceType } from "./paidAdvertising"
import { socialMarketingServiceType } from "./socialMarketing"
import { contentMarketingServiceType } from "./contentMarketing"
import { webDevelopmentServiceType } from "./webDevelopment"
import { appDevelopmentServiceType } from "./appDevelopment"
import { hostingServiceType } from "./hosting"
import { aiAutomationServiceType } from "./aiAutomation"
import { dataAnalyticsServiceType } from "./dataAnalytics"
import { industriesServiceType } from "./industries"
import { professionalMarketingServiceType } from "./professionalMarketing"
import { marketingAgencyPageType } from "./marketingAgency"

export const schemaTypes: SchemaTypeDefinition[] = [
	homePageType,
	apartSectionType,
	caseStudiesSectionType,
	marketingAgencyPageType,
	seoServiceType,
	paidAdvertisingServiceType,
	socialMarketingServiceType,
	contentMarketingServiceType,
	webDevelopmentServiceType,
	appDevelopmentServiceType,
	hostingServiceType,
	aiAutomationServiceType,
	dataAnalyticsServiceType,
	industriesServiceType,
	professionalMarketingServiceType,
	...sectionTypes,
]
