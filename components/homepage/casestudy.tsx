import CaseStudyClient from "./casestudy-client"
import { getCasePageData } from "@/lib/case-data"

export default async function CaseStudy() {
	const caseStudiesData = await getCasePageData()
	return <CaseStudyClient caseStudiesList={caseStudiesData} />
}
