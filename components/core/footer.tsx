import React from "react"
import Image from "next/image"
import Link from "next/link"
import CustomButton from "./button"
import { getFooterData } from "@/lib/footer-data"
import type { FooterData } from "@/lib/footer-data"

export default async function Footer({ data }: { data?: FooterData | null }) {
	const footerData = data || (await getFooterData())

	// Fallback values
	const heading = footerData?.heading || "Let's Scale Your Brand."
	const highlightedWord = footerData?.highlightedWord || "Scale"
	const subheading =
		footerData?.subheading ||
		"Feel free to reach out if you want to collaborate with us, or simply have a chat"
	const ctaButton = footerData?.ctaButton || {
		label: "Start a Project",
		href: "/contact",
		variant: "primary",
	}
	const companyLinks = footerData?.companyLinks || [
		{ label: "Home", href: "/" },
		{ label: "Projects", href: "/portfolio" },
		{ label: "About Us", href: "/about" },
		{ label: "Blog", href: "/resources" },
		{ label: "Contact Us", href: "/contact" },
		{ label: "404", href: "#" },
	]
	const socialLinks = footerData?.socialLinks || [
		{ label: "Instagram", href: "#", platform: "instagram" },
		{ label: "Facebook", href: "#", platform: "facebook" },
		{ label: "LinkedIn", href: "#", platform: "linkedin" },
		{ label: "Behance", href: "#", platform: "behance" },
		{ label: "X/Twitter", href: "#", platform: "twitter" },
	]
	const contactInfo = footerData?.contactInfo || {
		phone: "+1 234 456 789",
		email: "hello@dn.com",
	}
	const legalLinks = footerData?.legalLinks || [
		{ label: "Privacy Policy", href: "#" },
		{ label: "Terms of Service", href: "#" },
	]
	const backgroundVideoUrl =
		footerData?.backgroundVideo?.asset?.url ||
		footerData?.backgroundVideo?.url ||
		"/footer-vid.mp4"
	const logoUrl = footerData?.logo?.asset?.url || "/main-logo.png"
	const logoHref = footerData?.logo?.href || "/"
	const logoAlt = footerData?.logo?.alt || "Digital Neighbour Logo"

	return (
		<div className="bg-[#5D50EB] text-white relative overflow-hidden min-h-[700px]">
			{/* Background Video */}
			<div className="absolute inset-0 z-0 flex items-center justify-center">
				<div className="relative">
					<video
						autoPlay
						loop
						muted
						playsInline
						className="max-w-xl max-h-100 object-contain"
					>
						<source
							src={backgroundVideoUrl}
							type="video/mp4"
						/>
						Your browser does not support
						the video tag.
					</video>
					{/* Gradient overlay from edges to center */}
					<div className="absolute inset-0 bg-gradient-to-r from-[#5D50EB] via-[#5D50EB]/70  to-[#5D50EB] opacity-100"></div>
					<div className="absolute inset-0 bg-gradient-to-b from-[#5D50EB] via-[#5D50EB]/20  to-[#5D50EB] opacity-100"></div>
					<div className="absolute inset-0 bg-gradient-to-r from-[#5D50EB]/80 via-transparent to-[#5D50EB]/80 opacity-60"></div>
					<div className="absolute inset-0 bg-gradient-to-b from-[#5D50EB]/80 via-transparent to-[#5D50EB]/80 opacity-60"></div>
				</div>
			</div>
			{/* Main Content Area */}
			<div className="px-8 py-26 relative z-10">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
						{/* Left Side - Logo and Main Content */}
						<div className="space-y-8">
							{/* Logo */}
							<Link href={logoHref} className="flex items-center">
								<Image
									src={logoUrl}
									alt={logoAlt}
									width={40}
									height={40}
									className="h-12 w-auto lg:h-14 brightness-0 invert transition-all duration-300"
									priority
								/>
							</Link>

							{/* Main Heading */}
							<div className="space-y-4">
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight">
									{heading.includes(highlightedWord) ? (
										<>
											<span className="italic">
												{heading.split(highlightedWord)[0]}
											</span>
											<span className="not-italic">{highlightedWord}</span>
											<span className="italic">
												{heading.split(highlightedWord)[1]}
											</span>
										</>
									) : (
										<span className="italic">{heading}</span>
									)}
								</h1>
								<p className="text-lg text-gray-300 font-sans max-w-md">
									{subheading}
								</p>
							</div>

							{/* CTA Button */}
							<CustomButton
								text={ctaButton.label}
								href={ctaButton.href}
								textColor="black"
								borderColor="black"
								iconBG="#5D50EB"
								iconColor="white"
							/>
						</div>

						{/* Right Side - Navigation and Social Links */}
						<div className="grid grid-cols-2 gap-16 ml-0 md:ml-auto">
							{/* Company Links */}
							<div className="space-y-4">
								<h3 className="text-white text-lg font-bold font-serif">
									Company
								</h3>
								<div className="space-y-3">
									{companyLinks.map((link) => (
										<Link
											key={link.label}
											href={link.href}
											className="block text-gray-300 font-sans hover:text-white transition-colors"
										>
											{link.label}
										</Link>
									))}
								</div>
							</div>

							{/* Social Links */}
							<div className="space-y-4">
								<h3 className="text-white text-lg font-bold font-serif">
									Follow
									Us
								</h3>
								<div className="space-y-3">
									{socialLinks.map((link) => (
										<Link
											key={link.label}
											href={link.href}
											className="block text-gray-300 font-sans hover:text-white transition-colors"
										>
											{link.label}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer Section */}
			<footer className="py-8 px-8 relative z-10">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					{/* Left side - Contact Information */}
					<div className="flex flex-col sm:flex-row space-x-4">
						{contactInfo.phone && (
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
								<span className="text-white font-sans">
									{contactInfo.phone}
								</span>
							</div>
						)}
						{contactInfo.email && (
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
								<span className="text-white font-sans">
									{contactInfo.email}
								</span>
							</div>
						)}
					</div>

					{/* Right side - Copyright and Legal Links */}
					<div className="flex flex-col sm:flex-row items-center space-x-4 text-gray-400 font-sans">
						{legalLinks.map((link, index) => (
							<React.Fragment key={link.label}>
								{index > 0 && (
									<div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
								)}
								<Link href={link.href} className="hover:text-white transition-colors">
									{link.label}
								</Link>
							</React.Fragment>
						))}
					</div>
				</div>
			</footer>
		</div>
	)
}

