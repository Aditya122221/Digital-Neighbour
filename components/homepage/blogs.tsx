"use client"

import CustomButton from "../core/button"
import { motion } from "framer-motion"

export default function Blogs() {
	return (
		<section className="min-h-screen bg-gradient-to-b from-pink/20 to-white px-6 py-16 flex flex-col">
			<div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
				{/* Header */}
				<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						viewport={{
							once: true,
							margin: "-100px",
						}}
						transition={{
							duration: 0.8,
							ease: "easeOut",
						}}
					>
						{/* <p className="text-blackbrown text-sm font-light tracking-wider mb-4">BLOG</p> */}
						<h2 className="text-4xl lg:text-6xl font-regular text-blackbrown font-cal-sans tracking-wide">
							Blogs
						</h2>
						{/* Mobile-only More Insights button below the heading */}
						<motion.div
							className="mt-4 md:hidden"
							initial={{
								opacity: 0,
								y: 20,
							}}
							whileInView={{
								opacity: 1,
								y: 0,
							}}
							viewport={{
								once: true,
								margin: "-100px",
							}}
							transition={{
								duration: 0.8,
								delay: 0.2,
								ease: "easeOut",
							}}
						>
							<CustomButton
								text="More Insights"
								href="/resources"
								textColor="black"
								borderColor="black"
							/>
						</motion.div>
					</motion.div>
					<motion.div
						className="hidden md:block"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{
							opacity: 1,
							x: 0,
						}}
						viewport={{
							once: true,
							margin: "-100px",
						}}
						transition={{
							duration: 0.8,
							delay: 0.2,
							ease: "easeOut",
						}}
					>
						<CustomButton
							text="More Insights"
							href="/resources"
							textColor="black"
							borderColor="black"
						/>
					</motion.div>
				</div>

				{/* Blog Grid */}
				<div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Featured Post */}
					<div className="lg:col-span-2 relative group cursor-pointer">
						<div className="relative h-full max-h-[400px] bg-blackbrown rounded-3xl overflow-hidden">
							<img
								src="/two-women-laughing-with-headphones-podcast-setup.jpg"
								alt="Featured blog post"
								className="w-full h-full object-cover object-center"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
							<div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-tr from-[#5D50EB]" />
							<div className="absolute top-6 left-6">
								<span className="bg-bone text-blackbrown px-4 py-2 rounded-full text-sm font-medium">
									MARKETING
								</span>
							</div>
							<div className="absolute bottom-6 left-6 right-6">
								<h3 className="text-bone text-3xl lg:text-4xl  mb-4 leading-tight">
									Marketing
									on a
									Budget:
									How to
									Get Big
									Results
									with
									Small
									Spends
								</h3>
								<div className="flex items-center gap-4 text-bone/80">
									<span>
										Mar
										2,
										2025
									</span>
									<span>
										•
									</span>
									<span>
										By
										Richard
										Lee
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Sidebar Posts */}
					<div className="space-y-6">
						{/* Post 1 */}
						<article className="group cursor-pointer">
							<div className="flex gap-4">
								<div className="w-24 h-24 bg-junglegreen rounded-2xl overflow-hidden flex-shrink-0">
									<img
										src="/man-in-video-call-meeting.jpg"
										alt="Social media post"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex-1">
									<span className="text-blackbrown/60 text-xs font-medium tracking-wider">
										SOCIAL
										MEDIA
									</span>
									<h4 className="text-blackbrown text-lg  mt-1 mb-2 group-hover:text-junglegreen transition-colors">
										Social
										Media
										Strategies
										That
										Actually
										Work
									</h4>
									<div className="flex items-center gap-3 text-blackbrown/60 text-sm">
										<span>
											Mar
											2,
											2025
										</span>
										<span>
											By
											Richard
											Lee
										</span>
									</div>
								</div>
							</div>
						</article>

						{/* Post 2 */}
						<article className="group cursor-pointer">
							<div className="flex gap-4">
								<div className="w-24 h-24 bg-darkbeige rounded-2xl overflow-hidden flex-shrink-0">
									<img
										src="/lightbulb-and-brain-wooden-blocks-creative-concept.jpg"
										alt="Social media trends post"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex-1">
									<span className="text-blackbrown/60 text-xs font-medium tracking-wider">
										SOCIAL
										MEDIA
									</span>
									<h4 className="text-blackbrown text-lg  mt-1 mb-2 group-hover:text-junglegreen transition-colors">
										Social
										Media
										Trends
										You
										Can't
										Ignore
									</h4>
									<div className="flex items-center gap-3 text-blackbrown/60 text-sm">
										<span>
											Mar
											2,
											2025
										</span>
										<span>
											By
											Richard
											Lee
										</span>
									</div>
								</div>
							</div>
						</article>

						{/* Post 3 */}
						<article className="group cursor-pointer">
							<div className="flex gap-4">
								<div className="w-24 h-24 bg-yellow rounded-2xl overflow-hidden flex-shrink-0">
									<img
										src="/elegant-product-packaging-boxes-branding.jpg"
										alt="Branding post"
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex-1">
									<span className="text-blackbrown/60 text-xs font-medium tracking-wider">
										BRANDING
									</span>
									<h4 className="text-blackbrown text-lg  mt-1 mb-2 group-hover:text-junglegreen transition-colors">
										The
										Secret
										to
										Building
										a
										Standout
										Brand
									</h4>
									<div className="flex items-center gap-3 text-blackbrown/60 text-sm">
										<span>
											Mar
											2,
											2025
										</span>
										<span>
											By
											Richard
											Lee
										</span>
									</div>
								</div>
							</div>
						</article>
					</div>
				</div>
			</div>
		</section>
	)
}
