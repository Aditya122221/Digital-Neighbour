"use client"

import { motion } from "framer-motion"

export default function Chaos() {
	return (
		<div
			className="pt-16 text-white bg-[#000] overflow-hidden"
			id="how-it-works"
		>
			<div className="text-white z-10 undefined">
				<div className="text-4xl md:text-6xl font-regular font-cal-sans text-center">
					<p>
						Transforming{" "}
						<span className="font-semibold italic">
							Chaos
						</span>{" "}
						Into{" "}
						<span className="font-semibold italic">
							Savings
						</span>
						—$5M+ <br /> and Countless{" "}
						<span className="font-semibold italic">
							Hours
						</span>{" "}
						Back
					</p>
				</div>
				<div className="text-sm sm:text-lg xl:text-xl text-center mt-1">
					<p className=" !text-Gray600">
						AI-Automated Services Built for
						the Fast-paced Future
					</p>
				</div>
			</div>
			<div className="w-full mx-auto flex flex-col items-center">
				<div className="relative mt-7 overflow-hidden">
					<div className="options-ring-bg"></div>
					<motion.img
						alt="Ring Options"
						loading="lazy"
						width="800"
						height="800"
						decoding="async"
						data-nimg="1"
						className="object-cover -mb-[50%] z-30"
						style={{ color: "transparent" }}
						src="/ring-options.webp"
						animate={{
							rotate: 360,
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							ease: "linear",
						}}
					/>
					<div className="w-full h-full max-w-[200px] max-h-[200px] sm:max-w-[400px] sm:max-h-[400px] rounded-full overflow-hidden absolute -bottom-[50%] left-1/2 transform -translate-x-1/2">
						<video
							autoPlay
							loop
							muted
							className="w-full h-full object-cover aspect-video shadow-2xl z-20 options-video-animate"
						>
							<source
								src="https://hashlogics.com/wp-content/uploads/2025/05/70e33f9e3827118a16dde332c09c55244f173fd3.mp4"
								type="video/mp4"
							/>
							Your browser does not
							support the video tag.
						</video>
					</div>
				</div>
			</div>
		</div>
	)
}
