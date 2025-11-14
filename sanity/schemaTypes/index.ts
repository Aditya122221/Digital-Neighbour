import { type SchemaTypeDefinition } from "sanity"

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

export const schemaTypes: SchemaTypeDefinition[] = [
	homePageType,
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
