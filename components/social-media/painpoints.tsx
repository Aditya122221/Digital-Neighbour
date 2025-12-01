"use client"

import Image from "next/image"

type PainPointItem = {
	image: string // image path in public/
	title: string
	description?: string
}

export default function PainPoints({
	data,
}: {
	data?: { heading?: string; items?: PainPointItem[] }
}) {
	const defaultHeading =
		"Tired of social media efforts that don't deliver?"
	const heading = data?.heading ?? defaultHeading
	const items: PainPointItem[] = data?.items ?? [
		{
			image: "/socialMedia/icon-1.svg",
			title: "Lack of leads or sales from social?",
		},
		{
			image: "/socialMedia/icon-2.svg",
			title: "Struggling to keep up with trends & platforms?",
		},
		{
			image: "/socialMedia/icon-3.svg",
			title: "Unsure how to measure social media ROI?",
		},
		{
			image: "/socialMedia/icon-4.svg",
			title: "Lacking creative production capabilities?",
		},
	]

	// Helper function to render heading with highlights
	const HighlightText = ({ children }: { children: React.ReactNode }) => (
		<span className="relative inline-block">
			<span className="absolute bottom-1 left-0 right-0 h-1/2 bg-yellow z-0 -skew-x-12"></span>
			<span className="relative z-10 font-semibold italic">
				{children}
			</span>
		</span>
	)

	const renderHeading = () => {
		if (heading === defaultHeading) {
			return (
				<>
					Tired of{" "}
					<HighlightText>
						social media efforts
					</HighlightText>{" "}
					that{" "}
					<HighlightText>
						don't deliver
					</HighlightText>
					?
				</>
			)
		}
		if (heading === "Hard to gain traction on X?") {
			return (
				<>
					Hard to gain traction on{" "}
					<HighlightText>X</HighlightText>?
				</>
			)
		}
		if (heading === "Struggling to grow on Facebook?") {
			return (
				<>
					Struggling to grow on{" "}
					<HighlightText>Facebook</HighlightText>?
				</>
			)
		}
		if (heading === "Is Instagram growth stalling?") {
			return (
				<>
					Is{" "}
					<HighlightText>Instagram</HighlightText>{" "}
					growth stalling?
				</>
			)
		}
		if (heading === "Not seeing traction on LinkedIn?") {
			return (
				<>
					Not seeing traction on{" "}
					<HighlightText>LinkedIn</HighlightText>?
				</>
			)
		}
		if (heading === "Publishing on TikTok without momentum?") {
			return (
				<>
					Publishing on{" "}
					<HighlightText>TikTok</HighlightText>{" "}
					without momentum?
				</>
			)
		}
		if (heading === "YouTube not compounding yet?") {
			return (
				<>
					<HighlightText>YouTube</HighlightText>{" "}
					not compounding yet?
				</>
			)
		}
		if (heading === "Pins not driving traffic?") {
			return (
				<>
					<HighlightText>Pins</HighlightText> not
					driving traffic?
				</>
			)
		}
		if (heading === "Stories not getting views?") {
			return (
				<>
					<HighlightText>Stories</HighlightText>{" "}
					not getting views?
				</>
			)
		}
		if (heading === "Worried about missteps on Reddit?") {
			return (
				<>
					Worried about missteps on{" "}
					<HighlightText>Reddit</HighlightText>?
				</>
			)
		}
		if (heading === "Creator programs not delivering?") {
			return (
				<>
					Creator{" "}
					<HighlightText>programs</HighlightText>{" "}
					not{" "}
					<HighlightText>
						delivering
					</HighlightText>
					?
				</>
			)
		}
		return heading
	}

	return (
		<section className="relative">
			{/* Content */}
			<div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 md:py-24">
				<h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold text-black font-cal-sans leading-tight">
					{renderHeading()}
				</h2>

				<div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
					{items.map((item, idx) => (
						<div
							key={idx}
							className="relative max-w-[300px] w-full mx-auto"
						>
							{/* bottom oval shadow (behind offset base) */}
							<div
								className="absolute left-1/2 -bottom-6 -translate-x-1/2 w-[86%] h-6 rounded-full bg-black/60 blur-md md:h-7 md:blur-lg"
								aria-hidden
							/>

							{/* offset backdrop (purple) aligned to left, extended right & bottom */}
							<div
								className="absolute left-0 right-[-8px] top-2 bottom-[-8px] rounded-2xl bg-[#5D50EB] border border-[#5D50EB]"
								aria-hidden
							/>

							{/* main card with purple border + soft dark blue shadow */}
							<div
								className="relative z-10 rounded-2xl bg-white border p-6 md:p-7 text-center"
								style={{
									borderColor:
										"#0e0e59",
								}}
							>
								<div className="mx-auto mb-4 md:mb-5 h-12 w-12 md:h-14 md:w-14 flex items-center justify-center rounded-full bg-slate-50">
									<Image
										src={
											item.image
										}
										alt=""
										width={
											48
										}
										height={
											48
										}
									/>
								</div>
								<p className="text-sm md:text-base font-bold tracking-wide uppercase text-black leading-snug">
									{
										item.title
									}
								</p>
								{item.description ? (
									<p className="mt-2 text-xs text-slate-600">
										{
											item.description
										}
									</p>
								) : null}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom wave pattern in black */}
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-44 lg:h-56"
				aria-hidden
			>
				<svg
					viewBox="0 0 1440 120"
					preserveAspectRatio="none"
					className="w-full h-full"
				>
					<path
						d="M0,40 C240,100 480,0 720,40 C960,80 1200,20 1440,60 L1440,120 L0,120 Z"
						fill="#000000"
					/>
				</svg>
			</div>
		</section>
	)
}
