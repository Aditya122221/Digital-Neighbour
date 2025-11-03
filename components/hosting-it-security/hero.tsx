"use client"

import { CustomButton } from "@/components/core/button"

interface HostingHeroProps {
	data: {
		heading: string
		subheading: string
	}
}

export default function HostingHero({ data }: HostingHeroProps) {
	return (
		<section className="relative overflow-x-hidden pt-25 bg-black">
			<div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px] lg:min-h-[700px] bg-[#fff]">
				<div className="flex flex-col items-start gap-6 p-6 pb-0 pt-12 lg:gap-8 lg:pb-6 lg:pt-6">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight font-cal-sans text-black w-[80%] max-w-[600px]">
						{data.heading}
					</h1>
					<p className="text-lg md:text-xl text-black/80 leading-relaxed w-full max-w-[600px] lg:w-[80%]">
						{data.subheading}
					</p>
					<div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-6 lg:pt-8">
						<CustomButton
							text="Get Started for Free"
							href="#contact"
							textColor="black"
							borderColor="black"
							className="mt-6"
						/>
						<CustomButton
							text="Contact Sales"
							href="/contact"
							textColor="black"
							borderColor="black"
							className="mt-6"
						/>
					</div>
				</div>
				<div className="relative w-full h-full min-h-[400px] lg:h-full lg:min-h-[700px] overflow-hidden">
					<video
						className="w-full h-full object-cover"
						autoPlay
						loop
						muted
						playsInline
					>
						<source
							src="/hostingVideo.mp4"
							type="video/mp4"
						/>
						Your browser does not support
						the video tag.
					</video>
				</div>
			</div>
		</section>
	)
}
