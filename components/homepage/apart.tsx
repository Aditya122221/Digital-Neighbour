import ApartClient from "./apart-client"
import { getApartPageData } from "@/lib/apart-data"

type ApartProps = {
	data?: {
		heading?: string;
		tagline?: string;
		oursTitle?: string;
		othersTitle?: string;
		ours?: string[];
		others?: string[];
	};
}

export default async function Apart({ data }: ApartProps) {
	// Use provided data if available, otherwise fetch separately
	const apartData = data && (data.ours || data.others)
		? data
		: await getApartPageData();

	return (
		<ApartClient
			heading={apartData.heading}
			tagline={apartData.tagline}
			oursTitle={apartData.oursTitle}
			othersTitle={apartData.othersTitle}
			oursList={apartData.ours || []}
			othersList={apartData.others || []}
		/>
	)
}
