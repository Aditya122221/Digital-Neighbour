"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface WhyWorkCard {
	title: string
	paragraph1: string
	paragraph2: string
	image?: string
}

interface WhyWorkProps {
	data?: {
		heading?: string
		cards?: WhyWorkCard[]
	}
}

export default function WhyWork({ data }: WhyWorkProps) {
	const defaultHeading = "Most Trusted SMM Agency"
	const heading = data?.heading ?? defaultHeading

	const defaultCards: WhyWorkCard[] = [
		{
			title: "We Don't Post Without Purpose",
			paragraph1: "We don't hop on social media just to say, \"We were there.\" We're not about throwing up random posts or chasing likes that don't mean anything. Every piece of content we create is meant to grab attention, make someone stop scrolling, and care about your brand. It's not just about showing up in someone's feed; it's about owning the feed.",
			paragraph2: "We build strategies that drive real clicks, bring in real leads, and fuel real growth. Because in our world, performance isn't optional; it's the only game we play.",
			image: "/socialMedia/we-play-to-win.png",
		},
		{
			title: "We Think Like Your Audience",
			paragraph1: "We're not marketers sitting in a boardroom guessing what people want. We live in the same feeds your audience does. We're watching the same trends, hearing the same sounds, and swiping through the same chaos. That's how we know what cuts through.",
			paragraph2: "We write like real people, not brand robots. We know what hooks, what flops, and what makes someone tag a friend or click follow. Whether it's a tweet, a reel, a carousel, or a comment, it all hits different when it's made to feel human.",
			image: "/socialMedia/we-think-like-the-audience.png",
		},
		{
			title: "We Believe in Adapt or Get Buried",
			paragraph1: "Social media doesn't sleep, and neither do we. What popped last week might flop today, and we're not here to play the \"wait and see\" game. We test, we tweak, and we pivot without hesitation. When something's working, we scale it fast. When it's not, we cut it and move on.",
			paragraph2: "No dragging dead campaigns just to hit a deadline. Social media is live, real-time, and always changing, and that's exactly how we treat it. We stay ahead so you never fall behind.",
			image: "/socialMedia/we-keep-it-moving.png",
		},
		{
			title: "Great Numbers That Matters",
			paragraph1: "You're not here for pretty dashboards or bloated reports. You're here for results, and that's all we care about. We focus on reach, engagement, conversions, and traffic that lands somewhere meaningful. We're not gonna throw jargon at you or talk in loops. If it's working, we'll show you how.",
			paragraph2: "If it's not, we'll fix it. No drama. No filler. Just honest results that drive growth and a strategy that makes sure you're not just active on social media, you're dominating it.",
			image: "/socialMedia/we-cut-the-fluff.png",
		},
	]

	const cards = data?.cards ?? defaultCards

	return (
		<section className="relative bg-[#F8F8F8] py-16 md:py-24 lg:py-32">
			<div className="container mx-auto px-6 lg:px-12">
				{/* Heading with yellow highlight */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.6,
						ease: "easeOut",
					}}
					className="text-center mb-12 md:mb-16"
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-regular text-blackbrown font-cal-sans leading-tight">
						<span className="relative inline-block">
							<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow -skew-x-12"></span>
							<span className="relative z-10">
								{heading}
							</span>
						</span>
					</h2>
				</motion.div>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
					{cards.map((card, index) => (
						<motion.div
							key={index}
							initial={{
								opacity: 0,
								y: 30,
							}}
							whileInView={{
								opacity: 1,
								y: 0,
							}}
							viewport={{
								once: true,
							}}
							transition={{
								duration: 0.6,
								ease: "easeOut",
								delay:
									index *
									0.1,
							}}
							className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100"
						>
							{/* Card Image */}
							{card.image && (
								<div className="relative w-full h-40 md:h-48 mb-4 md:mb-5 rounded-xl overflow-hidden">
									<Image
										src={
											card.image
										}
										alt={
											card.title
										}
                                            width={100}
                                            height={100}
									/>
								</div>
							)}

							{/* Card Title */}
							<h3 className="text-2xl md:text-3xl text-black mb-3 md:mb-4 font-cal-sans leading-tight">
								{card.title}
							</h3>

							{/* Card Content */}
							<div className="space-y-3">
								<p className="text-base md:text-lg text-gray-800 leading-relaxed">
									{
										card.paragraph1
									}
								</p>
								<p className="text-base md:text-lg text-gray-800 leading-relaxed">
									{
										card.paragraph2
									}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
