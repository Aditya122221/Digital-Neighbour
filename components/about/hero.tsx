"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

export default function AboutHero() {
	const sectionRef = useRef<HTMLDivElement>(null)
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	})

	const springConfig = { stiffness: 120, damping: 24, mass: 0.35 }

	// Background image positions - alternate left and right
	const bg1X = useSpring(
		useTransform(scrollYProgress, [0.1, 0.6], ["0%", "-40%"]),
		springConfig
	)
	const bg2X = useSpring(
		useTransform(scrollYProgress, [0.1, 0.6], ["0%", "40%"]),
		springConfig
	)
	const bg3X = useSpring(
		useTransform(scrollYProgress, [0.1, 0.6], ["0%", "-30%"]),
		springConfig
	)
	const bg4X = useSpring(
		useTransform(scrollYProgress, [0.1, 0.6], ["0%", "30%"]),
		springConfig
	)

	// Word reveal animations
	const words = [
		"We",
		"craft",
		"strategies",
		"that",
		"feel",
		"authentic,",
		"perform",
		"exceptionally,",
		"and",
		"help",
		"brands",
		"grow",
		"in",
		"ways",
		"that",
		"actually",
		"matter.",
	]

	return (
		<section
			ref={sectionRef}
			className="relative py-32 px-6 bg-gradient-to-b from-white to-pink/20 overflow-hidden"
		>
			{/* Background Images */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					className="absolute top-10 left-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden opacity-20"
					style={{ x: bg1X }}
				>
					<Image
						src="/homepage/hero/1.jpg"
						alt="Team member"
						fill
						className="object-cover"
					/>
				</motion.div>
				<motion.div
					className="absolute top-20 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden opacity-20"
					style={{ x: bg2X }}
				>
					<Image
						src="/homepage/hero/2.jpg"
						alt="Team member"
						fill
						className="object-cover"
					/>
				</motion.div>
				<motion.div
					className="absolute top-1/3 left-10 w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden opacity-20"
					style={{ x: bg3X }}
				>
					<Image
						src="/homepage/hero/3.jpg"
						alt="Team member"
						fill
						className="object-cover"
					/>
				</motion.div>
				<motion.div
					className="absolute top-1/2 right-10 w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden opacity-20"
					style={{ x: bg4X }}
				>
					<Image
						src="/homepage/hero/4.jpg"
						alt="Team member"
						fill
						className="object-cover"
					/>
				</motion.div>
			</div>

			<div className="container max-w-7xl mx-auto relative z-10">
				{/* Hero content */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
				>
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-regular text-blackbrown mb-8 text-balance font-cal-sans tracking-wide">
						Team Behind Your{" "}
						<motion.span
							className="relative inline-block"
							initial={{
								opacity: 0,
								y: 50,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.8,
								delay: 0.3,
								ease: "easeOut",
							}}
						>
							<span className="absolute bottom-2 left-0 right-0 h-3/5 bg-yellow" />
							<span className="relative z-10 font-medium italic">
								Growth
							</span>
						</motion.span>
					</h1>
					<p className="text-lg md:text-xl font-light text-blackbrown/80 max-w-3xl mx-auto text-pretty">
						We're more than just a marketing
						agency—we're a team of
						storytellers, strategists, and
						problem-solvers dedicated to
						helping brands grow and connect
						with their audiences.
					</p>
				</motion.div>

				{/* Animated text block with scroll reveal */}
				<div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-20 relative z-10">
					{words.map((word, index) => {
						const startProgress =
							index * 0.05
						const endProgress =
							startProgress + 0.1

						const opacity = useSpring(
							useTransform(
								scrollYProgress,
								[
									startProgress,
									endProgress,
								],
								[0, 1]
							),
							springConfig
						)
						const y = useSpring(
							useTransform(
								scrollYProgress,
								[
									startProgress,
									endProgress,
								],
								[30, 0]
							),
							springConfig
						)

						return (
							<motion.span
								key={index}
								className="text-2xl md:text-3xl lg:text-4xl font-medium text-blackbrown"
								style={{
									opacity,
									y,
								}}
							>
								{word}
							</motion.span>
						)
					})}
				</div>
			</div>
		</section>
	)
}
