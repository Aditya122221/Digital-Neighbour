"use client"

import Image from "next/image"

const testimonials = [
	{
		id: 1,
		quote: "Smart design, smooth delivery, Franklin is great to work with.",
		author: "Lucas Bennett",
		position: "Product Manager, Hexa Studio",
		number: "01/05",
		image: "/testimonalImage.avif",
	},
	{
		id: 2,
		quote: "Exceptional creativity and attention to detail. The team exceeded our expectations.",
		author: "Sarah Chen",
		position: "Marketing Director, TechFlow",
		number: "02/05",
		image: "https://images.pexels.com/photos/34013983/pexels-photo-34013983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
	{
		id: 3,
		quote: "Professional, reliable, and innovative. Our brand transformation was remarkable.",
		author: "Michael Rodriguez",
		position: "CEO, GrowthLab",
		number: "03/05",
		image: "https://images.pexels.com/photos/7432338/pexels-photo-7432338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
	{
		id: 4,
		quote: "Outstanding results delivered on time. Highly recommend their services.",
		author: "Emma Thompson",
		position: "Brand Manager, Innovate Co",
		number: "04/05",
		image: "https://images.pexels.com/photos/34006459/pexels-photo-34006459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
	{
		id: 5,
		quote: "Creative solutions that perfectly captured our vision. Amazing collaboration.",
		author: "David Park",
		position: "Founder, StartupHub",
		number: "05/05",
		image: "https://images.pexels.com/photos/34006447/pexels-photo-34006447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
	},
]

function getCompany(position: string) {
	const parts = position.split(",")
	return parts.length > 1 ? parts[parts.length - 1].trim() : position
}

function getInitials(name: string) {
	return name
		.split(" ")
		.map((segment) => segment[0])
		.join("")
		.slice(0, 2)
		.toUpperCase()
}

export default function TestimonalTwo() {
	const [featured, ...supporting] = testimonials
	const secondary = supporting.slice(0, 3)

	return (
		<section className="relative overflow-hidden p-15">
			<div className="relative mx-auto flex flex-col gap-12">
				<header className="mx-auto text-center">
					<span className="inline-flex items-center justify-center rounded-full border border-yellow/50 bg-white px-4 py-1 text-sm font-medium uppercase tracking-[0.3em]">
						Testimonials
					</span>
					<h2 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl font-cal-sans">
						Hear From Our Happy Clients
					</h2>
				</header>

				<div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
					<div className="group relative overflow-hidden rounded-[32px]">
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500" />
						<div className="relative aspect-[4/5] w-full">
							<Image
								src={
									featured.image
								}
								alt={
									featured.author
								}
								className="object-cover"
								fill
								priority
							/>
						</div>
					</div>

					<div
						className="flex h-full flex-col justify-between rounded-[32px] p-8 bg-[#e9e5ff] md:p-12"
						style={{
							boxShadow: "8px 8px 0 0 #5D50EB",
						}}
					>
						<div className="flex items-center gap-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-sm font-semibold uppercase tracking-[0.3em] text-white">
								{getInitials(
									featured.author
								)}
							</div>
							<div className="flex flex-col">
								<span className="text-sm font-semibold uppercase tracking-[0.3em] text-black">
									{getCompany(
										featured.position
									)}
								</span>
								<span className="text-xs text-black">
									Client
									spotlight
								</span>
							</div>
						</div>

						<blockquote className="mt-10 text-2xl leading-relaxed md:text-[1.75rem] md:leading-[2.5rem] font-cal-sans text-black">
							"{featured.quote}"
						</blockquote>

						<div className="mt-10 flex flex-col gap-1">
							<span className="text-base font-semibold text-black">
								{
									featured.author
								}
							</span>
							<span className="text-sm text-black">
								{
									featured.position
								}
							</span>
						</div>
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{secondary.map((testimonial) => (
						<article
							key={testimonial.id}
							className="flex h-full flex-col justify-between rounded-[24px] p-6 bg-[#5D50EB]"
							style={{
								boxShadow: "-8px 0 0 0 black",
							}}
						>
							<div className="flex items-center justify-between">
								<span className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
									{getCompany(
										testimonial.position
									)}
								</span>
							</div>
							<blockquote className="mt-6 flex-1 text-base leading-relaxed font-cal-sans text-white">
								"
								{
									testimonial.quote
								}
								"
							</blockquote>
							<div className="mt-6">
								<p className="text-sm font-semibold text-white">
									{
										testimonial.author
									}
								</p>
								<p className="text-xs text-white">
									{
										testimonial.position
									}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	)
}
