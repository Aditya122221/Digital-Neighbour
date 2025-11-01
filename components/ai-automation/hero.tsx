"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { CustomButton } from "@/components/core/button"

interface AiAutomationHeroProps {
	data: {
		heading: string
		subheading: string
	}
}

export default function AiAutomationHero({ data }: AiAutomationHeroProps) {
	return (
		<section className="relative pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden bg-gradient-to-br from-black via-black to-yellow">
			{/* Background Grid Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute right-0 top-0 z-0 hidden h-full w-full overflow-hidden lg:block">
					<svg
						className="absolute right-[-2px] top-[-2px] h-[calc(100%+4px)] w-auto"
						width="722"
						height="812"
						viewBox="0 0 722 812"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{/* Grid pattern rectangles */}
						{[...Array(8)].map((_, row) =>
							[...Array(7)].map(
								(_, col) => (
									<rect
										key={`${row}-${col}`}
										x={
											91 +
											col *
												90
										}
										y={
											1 +
											row *
												90
										}
										width="90"
										height="90"
										className="stroke-gray-300 dark:stroke-gray-700"
									/>
								)
							)
						)}
					</svg>
				</div>
			</div>

			{/* Content */}
			<div className="relative z-20 container mx-auto py-6 md:py-0 px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
					{/* Left side - Text content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.8,
							ease: "easeOut",
						}}
						className="space-y-6 max-w-xl"
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight font-cal-sans">
							{data.heading}
						</h1>
						<p className="text-lg md:text-xl text-white/80 leading-relaxed">
							{data.subheading}
						</p>
						<CustomButton
							text="Talk to our AI & Automation expert"
							href="#contact"
							textColor="black"
							borderColor="black"
							className="mt-6"
						/>
					</motion.div>

					{/* Right side - Visual/Animation */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{
							opacity: 1,
							x: 0,
							y: [0, -20, 0],
						}}
						transition={{
							opacity: {
								duration: 0.8,
								ease: "easeOut",
								delay: 0.2,
							},
							x: {
								duration: 0.8,
								ease: "easeOut",
								delay: 0.2,
							},
							y: {
								duration: 3,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 1,
							},
						}}
						className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden mx-auto rounded-3xl bg-gradient-to-br from-black/40 to-yellow/20 backdrop-blur-sm border border-yellow/30 flex items-center justify-center"
					>
						{/* Decorative grid pattern inside */}
						<div className="absolute inset-0 opacity-20">
							<div className="grid grid-cols-4 gap-4 h-full w-full p-4">
								{[
									...Array(
										16
									),
								].map(
									(
										_,
										i
									) => (
										<div
											key={
												i
											}
											className="bg-white/10 rounded-lg border border-white/20"
										/>
									)
								)}
							</div>
						</div>
						{/* Center icon/visual */}
						<div className="relative z-10 text-6xl md:text-8xl">
							🤖
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}

