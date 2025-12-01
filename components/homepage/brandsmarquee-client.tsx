"use client"

import Marquee from "react-fast-marquee"

type BrandsMarqueeClientProps = {
	heading: string
	logos: {
		name: string
		path: string
	}[]
}

export default function BrandsMarqueeClient({ heading, logos }: BrandsMarqueeClientProps) {
	return (
		<section className="py-16 bg-[#e9e5ff] overflow-hidden">
			<div className="px-6 lg:px-32">
				<h2 className="text-4xl md:text-5xl font-regular text-center text-blackbrown mb-20 text-balance font-cal-sans tracking-wide">
					{heading.split("top brands")[0]}
					{heading.includes("top brands") && (
						<span className="relative inline-block">
							<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow -skew-x-12"></span>
							<span className="relative z-10 font-medium italic">top brands</span>
						</span>
					)}
					{heading.split("top brands")[1]}
				</h2>

				<Marquee speed={50} gradient={false} pauseOnHover={false} className="py-4">
					{logos.map((logo, index) => (
						<div
							key={`${logo.name}-${index}`}
							className="inline-flex items-center justify-center bg-[#e9e5ff] rounded-full px-8 py-4 mx-3 shadow-sm border border-gray-200 flex-shrink-0"
						>
							<img src={logo.path} alt={logo.name} className="h-10 md:h-12 w-auto object-contain" />
						</div>
					))}
				</Marquee>
			</div>
		</section>
	)
}


