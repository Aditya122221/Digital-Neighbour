import type { Metadata } from "next"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"

export const metadata: Metadata = {
	title: "Contact Us - Let's Collaborate And Grow | Digital Neighbour",
	description:
		"Get in touch with Digital Neighbour. Let's collaborate and grow your brand together. Reach out for inquiries, partnerships, or to discuss your digital marketing needs.",
}

export default function ContactPage() {
	return (
		<main className="flex min-h-screen w-full flex-col bg-gray-50">
			<div className="relative">
				<Navbar />
			</div>

			{/* Main Content Section */}
			<section className="relative mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
				{/* Decorative background elements */}
				<div className="pointer-events-none absolute top-0 right-0 -z-0 hidden md:block">
					<div className="relative h-64 w-64 opacity-30">
						<svg
							viewBox="0 0 200 200"
							className="h-full w-full"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M50 50 Q100 30 150 50 T250 50"
								stroke="currentColor"
								strokeWidth="2"
								className="text-gray-300"
								fill="none"
							/>
							<path
								d="M30 100 Q80 80 130 100 T230 100"
								stroke="currentColor"
								strokeWidth="2"
								className="text-gray-300"
								fill="none"
							/>
							<path
								d="M50 150 Q100 130 150 150 T250 150"
								stroke="currentColor"
								strokeWidth="2"
								className="text-gray-300"
								fill="none"
							/>
						</svg>
					</div>
				</div>

				<div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
					{/* Left Column - Information Section */}
					<div className="flex flex-col space-y-8">
						{/* Heading with highlighted word */}
						<h1 className="text-4xl font-serif font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
							Let's{" "}
							<span className="relative inline-block">
								<span className="relative z-10">Collaborate</span>
								<span className="absolute bottom-2 left-0 right-0 h-3/5 bg-yellow -skew-x-12" />
							</span>{" "}
							And Grow
						</h1>

						{/* Description */}
						<p className="text-base leading-relaxed text-muted-foreground md:text-lg">
							Explore insights on marketing, branding, and social media to help
							your brand grow and stand out.
						</p>

						{/* Contact Details */}
						<div className="mt-8 space-y-6">
							{/* Address */}
							<div>
								<h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
									Address
								</h3>
								<p className="mt-1 text-base text-muted-foreground">
									123 Market Street, Suite 400<br />
									Los Angeles, CA 90001
								</p>
							</div>

							{/* Phone */}
							<div>
								<h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
									Phone
								</h3>
								<p className="mt-1 text-base text-muted-foreground">
									+1 234 456 789
								</p>
							</div>

							{/* Office Hours */}
							<div>
								<h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
									Office Hours
								</h3>
								<p className="mt-1 text-base text-muted-foreground">
									Monday - Friday • 9:00 AM – 6:00 PM
								</p>
							</div>
						</div>
					</div>

					{/* Right Column - Contact Form */}
					<div className="lg:pl-8">
						<div className="rounded-xl bg-white p-8 shadow-lg">
							<form className="space-y-6">
								{/* Name and Company - Side by side */}
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-semibold text-foreground"
										>
											Your name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											placeholder="Enter full name"
											className="mt-2 w-full rounded-lg border border-input bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
										/>
									</div>
									<div>
										<label
											htmlFor="company"
											className="block text-sm font-semibold text-foreground"
										>
											Company name
										</label>
										<input
											type="text"
											id="company"
											name="company"
											placeholder="Enter company name"
											className="mt-2 w-full rounded-lg border border-input bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
										/>
									</div>
								</div>

								{/* Email */}
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-semibold text-foreground"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										placeholder="Enter email address"
										className="mt-2 w-full rounded-lg border border-input bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
									/>
								</div>

								{/* Message */}
								<div>
									<label
										htmlFor="message"
										className="block text-sm font-semibold text-foreground"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										rows={6}
										placeholder="Tell us about your vision"
										className="mt-2 w-full resize-none rounded-lg border border-input bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
									/>
								</div>

								{/* Terms and Privacy */}
								<p className="text-xs leading-relaxed text-muted-foreground">
									By submitting this form you agree to our{" "}
									<a
										href="/terms"
										className="font-semibold text-foreground underline hover:opacity-70 transition-opacity"
									>
										Terms of Use
									</a>{" "}
									and{" "}
									<a
										href="/privacy"
										className="font-semibold text-foreground underline hover:opacity-70 transition-opacity"
									>
										Privacy Policy
									</a>
									.
								</p>

								{/* Submit Button */}
								<div className="flex justify-end pt-2">
									<button
										type="submit"
										className="group relative flex items-center gap-3 rounded-lg border border-foreground bg-white px-6 py-3 font-semibold text-foreground transition-all hover:bg-foreground hover:text-white"
									>
										<span>Submit</span>
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-4 w-4 text-black"
											>
												<path d="M5 12h14M12 5l7 7-7 7" />
											</svg>
										</div>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	)
}

