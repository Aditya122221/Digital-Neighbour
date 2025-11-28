"use client"

import React from "react"
import {
	MdRealEstateAgent,
	MdTravelExplore,
	MdOutlineSchool,
	MdHotel,
	MdDesignServices,
	MdLocalHospital,
} from "react-icons/md"
import {
	FaCartShopping,
	FaIndustry,
	FaMicrochip,
	FaBitcoin,
} from "react-icons/fa6"

export default function Industries() {
	return (
		<section className="pt-24" style={{ overflowY: "hidden" }}>
			<div className="container mx-auto px-5">
				<div className="w-full lg:w-2/3 mx-auto text-center">
					<h2 className="font-bold mb-8 text-4xl md:text-5xl lg:text-6xl">
						Industry-Specific{" "}
						<span className="relative inline-block">
							<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
							<span className="relative z-10 italic">
								Web Development
							</span>
						</span>{" "}
						Diversity
					</h2>
					<p className="rfs:text-xl font-light mb-4">
						We have extensive experience in
						working with clients from a
						multitude of diverse industry
						backgrounds.
					</p>
				</div>
			</div>

			<div className="mt-10">
				<div className="container mx-auto px-5">
					<div className="flex flex-wrap justify-center gap-y-3 md:gap-y-6 -mx-2 md:-mx-5">
						{[
							{
								title: "Real Estate",
								Icon: MdRealEstateAgent,
								desc: "We specialize in real estate web design and development whether it is creating websites for your real estate company or managing your real estate investment website.",
							},
							{
								title: "Travel",
								Icon: MdTravelExplore,
								desc: "Travel websites are all about showcasing your taste and attention to detail — exactly what we do through our travel web development services.",
							},
							{
								title: "Education",
								Icon: MdOutlineSchool,
								desc: "Web development in education is about bringing the latest functionality to the most noble cause — and that is exactly what we do.",
							},
							{
								title: "E-commerce",
								Icon: FaCartShopping,
								desc: "Create the next leading e‑commerce website or enable AI chatbots. You never have to compromise with functionality with our services.",
							},
							{
								title: "Hospitality",
								Icon: MdHotel,
								desc: "Showcase your brand vision in the most elegant way possible. We have extensive experience in hospitality website development.",
							},
							{
								title: "Interior Designing",
								Icon: MdDesignServices,
								desc: "Your website is the virtual storefront of your business. We build stunning interior designing websites backed by experience.",
							},
							{
								title: "Manufacturing",
								Icon: FaIndustry,
								desc: "Showcase your manufacturing enterprise in depth with clear processes for partners and clients throughout operations.",
							},
							{
								title: "Technology",
								Icon: FaMicrochip,
								desc: "We have extensive experience in technology website development — from product showcases to modern tech ventures.",
							},
							{
								title: "Fintech",
								Icon: FaBitcoin,
								desc: "Harness AI and cloud for impactful fintech experiences without missing any critical functionality.",
							},
							{
								title: "Health Care",
								Icon: MdLocalHospital,
								desc: "From hospital websites to patient portals, we help with every healthcare web development need.",
							},
						].map(
							({
								title,
								Icon,
								desc,
							}) => (
								<div
									key={
										title
									}
									className="shrink-0 w-1/2 md:w-1/3 xl:w-1/5 px-2 md:px-5"
								>
									<div className="bg-[#5D50EB] text-center flex flex-col items-center justify-center px-3 h-full group relative rounded-md">
										<div className="flex flex-col items-center justify-center py-4 md:py-0 md:group-hover:opacity-0 md:absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center">
											<div className="mb-2 w-12 h-12 rounded-full bg-[#0e0e59] flex items-center justify-center">
												<Icon
													size={
														24
													}
													className="text-white items-center justify-center"
													aria-hidden="true"
												/>
											</div>
											<p className="rfs:text-base font-semibold text-white">
												{
													title
												}
											</p>
										</div>
										<div className="opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 py-5 transition-all ease-in duration-200 hidden md:block">
											<h3 className="font-semibold rfs:text-base text-white">
												{
													title
												}
											</h3>
											<p className="rfs:text-xs font-light mt-3 text-white/80">
												{
													desc
												}
											</p>
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
