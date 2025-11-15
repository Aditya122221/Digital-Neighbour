import CaseStudyClient from "./casestudy-client"
import { getCaseStudiesSectionData } from "@/lib/home-sections"

export default async function CaseStudy() {
	const data = await getCaseStudiesSectionData()

	if (!data.items.length) {
		return null
	}

	return <CaseStudyClient data={data} />
}

