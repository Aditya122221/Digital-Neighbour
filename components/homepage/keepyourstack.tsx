"use client"

import Image from "next/image"
import { motion } from "framer-motion"

type TechLogo = {
	name: string
	svg: string
	bgColor?: string
	textColor?: string
}

type KeepYourStackData = {
	heading?: string
	highlight?: string
	description?: string
	logos: TechLogo[]
}

type KeepYourStackProps = {
	data?: KeepYourStackData
}

const highlightHeading = (
	heading: string,
	highlight?: string
) => {
	if (!heading) return null;
	if (!highlight) return heading;

	const lowerHeading = heading.toLowerCase();
	const lowerHighlight = highlight.toLowerCase();
	const highlightIndex = lowerHeading.indexOf(lowerHighlight);

	if (highlightIndex === -1) {
		return heading;
	}

	const before = heading.slice(0, highlightIndex);
	const highlighted = heading.slice(
		highlightIndex,
		highlightIndex + highlight.length
	);
	const after = heading.slice(highlightIndex + highlight.length);

	return (
		<>
			{before}
			<span className="relative inline-block">
				<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
				<span className="relative z-10 font-medium italic">
					{highlighted}
				</span>
			</span>
			{after}
		</>
	);
};

export default function KeepYourStack({ data }: KeepYourStackProps) {
	if (!data) {
		return null
	}

	const heading = data.heading || "Keep your existing tech stack";
	const highlight = data.highlightWord || data.highlight || "tech stack";
	const description = data.description || "We work with your platforms, meaning we seamlessly slot into your team";

	return (
		<section className="bg-pink/20 py-20 px-6 overflow-hidden">
			<div className="container max-w-7xl mx-auto">
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{
						once: true,
						margin: "-100px",
					}}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
				>
					<h2 className="text-4xl md:text-6xl font-regular text-blackbrown mb-6 text-balance font-cal-sans tracking-wide">
						{highlightHeading(heading, highlight)}
					</h2>
					<p className="text-lg md:text-xl font-light text-blackbrown/80 max-w-2xl mx-auto text-pretty">
						{description}
					</p>
				</motion.div>

				<div className="py-4">
					<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
						{data.logos.map(
							(tech, index) => {
								const bgColor =
									tech.bgColor ||
									"#fef3c7"
								const textColor =
									tech.textColor ||
									"#78350f"

								return (
									<motion.div
										key={
											tech.name
										}
										className="flex items-center gap-3 rounded-lg px-6 py-3 shadow-sm border-2 border-black justify-center"
										style={{
											backgroundColor:
												bgColor,
											color: textColor,
										}}
										initial={{
											opacity: 0,
											x: 100,
										}}
										whileInView={{
											opacity: 1,
											x: 0,
										}}
										viewport={{
											once: true,
											margin: "-50px",
										}}
										transition={{
											duration: 0.6,
											delay:
												index *
												0.1,
											ease: "easeOut",
										}}
									>
										<Image
											src={
												tech.svg
											}
											alt={`${tech.name} logo`}
											width={
												24
											}
											height={
												24
											}
											className="w-10 h-10"
										/>
										<span
											className="font-medium"
											style={{
												color: textColor,
											}}
										>
											{
												tech.name
											}
										</span>
									</motion.div>
								)
							}
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
