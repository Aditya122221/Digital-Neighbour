import ApartClient from "./apart-client"
import { getApartPageData } from "@/lib/apart-data"

export default async function Apart() {
	const apartData = await getApartPageData()
	return (
		<ApartClient
			oursList={apartData.ours || []}
			othersList={apartData.others || []}
		/>
	)
}
