"use client"

import Image from "next/image"
import React from "react"

type CreativeShowcaseProps = {
	title?: string
	images?: string[]
	speedMsPerLoop?: number
}

function SeamlessRow({
	images,
	reverse,
	speedMsPerLoop,
}: {
	images: string[]
	reverse?: boolean
	speedMsPerLoop: number
}) {
	const renderCard = (src: string, idx: number) => {
		const isWide = idx % 2 === 0
		const baseWidth = isWide
			? "w-[260px] md:w-[320px]"
			: "w-[180px] md:w-[220px]"
		return (
			<div
				key={`${src}-${idx}`}
				className={`${baseWidth} h-[320px] md:h-[380px] flex-shrink-0 rounded-2xl overflow-hidden bg-neutral-900/40 ring-1 ring-white/10`}
			>
				<Image
					src={src}
					alt="creative"
					width={640}
					height={960}
					className="h-full w-full object-cover"
				/>
			</div>
		)
	}

	return (
		<div className="relative overflow-hidden">
			<div
				className={`marquee ${
					reverse ? "marquee-reverse" : ""
				}`}
				style={{
					animationDuration: `${speedMsPerLoop}ms`,
				}}
			>
				<div className="marquee-track">
					{images.map((src, i) =>
						renderCard(src, i)
					)}
					{images.map((src, i) =>
						renderCard(
							src,
							i + images.length
						)
					)}
				</div>
			</div>
			<style jsx>{`
				.marquee {
					position: relative;
					width: 100%;
					animation-name: marqueeSlide;
					animation-timing-function: linear;
					animation-iteration-count: infinite;
					animation-direction: alternate;
				}
				.marquee-reverse {
					animation-direction: alternate-reverse;
				}
				.marquee-track {
					display: flex;
					gap: 20px;
					padding: 10px 0;
					will-change: transform;
				}
				@keyframes marqueeSlide {
					from {
						transform: translateX(-50%);
					}
					to {
						transform: translateX(0%);
					}
				}
			`}</style>
		</div>
	)
}

export default function CreativeShowcase({
	title = "Creative Showcase",
	images,
	speedMsPerLoop = 18000,
}: CreativeShowcaseProps) {
	const fallback: string[] = [
		"/hero.webp",
		"/lightbulb-and-brain-wooden-blocks-creative-concept.jpg",
		"/man-in-video-call-meeting.jpg",
		"/two-women-laughing-with-headphones-podcast-setup.jpg",
		"/elegant-product-packaging-boxes-branding.jpg",
		"/seo/services/localcit.webp",
		"/seo/services/seo-audit.png",
		"/seo/services/secu.webp",
		"/seo/services/seo.webp",
		"/seo/services/on-page.webp",
		"/seo/services/technical.webp",
		"/seo/services/companaly.webp"
	]
	const list = Array.isArray(images) && images.length ? images : fallback

	const midpoint = Math.ceil(list.length / 2)
	const topRow = list.slice(0, midpoint)
	const bottomRow = list
		.slice(midpoint)
		.concat(
			list.slice(0, Math.max(0, 6 - (list.length - midpoint)))
		)

	return (
		<section className="relative py-16 md:py-24">
			<div className="container mx-auto px-6 lg:px-12">
				<div className="mb-8 md:mb-12 text-center">
					<h2 className="font-cal-sans text-3xl md:text-4xl lg:text-5xl font-semibold">
						{title}
					</h2>
				</div>
				<div className="space-y-8 md:space-y-10">
					<SeamlessRow
						images={topRow}
						speedMsPerLoop={speedMsPerLoop}
					/>
					<SeamlessRow
						images={bottomRow}
						reverse
						speedMsPerLoop={speedMsPerLoop}
					/>
				</div>
			</div>
		</section>
	)
}
