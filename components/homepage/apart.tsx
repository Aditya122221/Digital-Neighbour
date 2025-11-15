import ApartClient from "./apart-client"
import { getApartSectionData } from "@/lib/home-sections"

export default async function Apart() {
	const data = await getApartSectionData()

	if (!data.ours.length && !data.others.length) {
		return null
	}

	return <ApartClient data={data} />
}

