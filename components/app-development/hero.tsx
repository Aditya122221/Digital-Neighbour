"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import { CustomButton } from "@/components/core/button"

interface AppDevHeroProps {
	data: {
		heading: string
		subheading: string
	}
}

export default function AppDevHero({ data }: AppDevHeroProps) {
	const slides = useMemo(
		() => [
			{
				id: "slide-1",
				image: "/app-development/HeroImageOne.webp",
				alt: "Account information dashboard",
			},
			{
				id: "slide-2",
				image: "/app-development/HeroImageTwo.webp",
				alt: "Loan details dashboard",
			},
			{
				id: "slide-3",
				image: "/app-development/HeroImageThree.webp",
				alt: "Construction services dashboard",
			},
			{
				id: "slide-4",
				image: "/app-development/HeroImageFour.webp",
				alt: "Local key metrics dashboard",
			},
			{
				id: "slide-5",
				image: "/app-development/HeroImageFive.webp",
				alt: "Local link analysis dashboard",
			},
		],
		[]
	)

	const [activeIndex, setActiveIndex] = useState(0)
	const [direction, setDirection] = useState(1)

	const goToNext = useCallback(() => {
		setDirection(1)
		setActiveIndex((prev) => (prev + 1) % slides.length)
	}, [slides.length])

	const goToPrev = useCallback(() => {
		setDirection(-1)
		setActiveIndex(
			(prev) => (prev - 1 + slides.length) % slides.length
		)
	}, [slides.length])

	useEffect(() => {
		const timer = setInterval(goToNext, 6000)
		return () => clearInterval(timer)
	}, [goToNext])

	const slideVariants = {
		enter: (dir: number) => ({
			opacity: 0,
			x: dir > 0 ? 80 : -80,
		}),
		center: {
			opacity: 1,
			x: 0,
		},
		exit: (dir: number) => ({
			opacity: 0,
			x: dir > 0 ? -80 : 80,
		}),
	}

	return (
		<section className="bg-gradient-to-br from-black via-black to-yellow pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32 overflow-x-hidden">
			<div className="container mx-auto py-6 md:py-0 px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left side - Text content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							duration: 0.8,
							ease: "easeOut",
						}}
						className="space-y-6 max-w-xl mx-auto"
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight font-cal-sans">
							{data.heading}
						</h1>
						<p className="text-lg md:text-xl text-white/80 leading-relaxed">
							{data.subheading}
						</p>
						<CustomButton
							text="Talk to our App Development expert"
							href="/contact"
							textColor="black"
							borderColor="black"
							className="mt-6"
						/>
					</motion.div>

					{/* Right side - Phone carousel */}
					<div className="relative mx-auto hidden w-full max-w-xl items-center justify-center lg:flex">
						<div
							aria-hidden="true"
							className="absolute -inset-20 rounded-full bg-gradient-to-br from-white/20 via-yellow/40 to-transparent blur-3xl"
						/>

						<div
							className="relative z-10 flex h-[600px] w-[320px] items-center justify-center rounded-[56px] border border-black/80 bg-black p-3"
							style={{
								borderWidth:
									"0.75px",
							}}
						>
							<div
								aria-hidden="true"
								className="absolute inset-3"
							/>
							<div
								aria-hidden="true"
								className="absolute left-1/2 top-6 h-1.5 w-24 -translate-x-1/2 bg-white/40"
							/>

							<div
								className="relative h-full w-full overflow-hidden rounded-[40px] border border-black/50 bg-black"
								style={{
									borderWidth:
										"0.75px",
								}}
							>
								<AnimatePresence
									mode="wait"
									initial={
										false
									}
								>
									<motion.div
										key={
											slides[
												activeIndex
											]
												.id
										}
										custom={
											direction
										}
										variants={
											slideVariants
										}
										initial="enter"
										animate="center"
										exit="exit"
										transition={{
											duration: 0.6,
											ease: "easeOut",
										}}
										className="absolute inset-0"
									>
										<Image
											src={
												slides[
													activeIndex
												]
													.image
											}
											alt={
												slides[
													activeIndex
												]
													.alt
											}
											fill
											sizes="(min-width: 1024px) 320px, 90vw"
											className="object-cover"
											priority
										/>
									</motion.div>
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
