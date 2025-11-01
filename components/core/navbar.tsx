"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { CustomButton } from "./button"
import { cn } from "@/lib/utils"

const Navbar: React.FC = () => {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
	const [megaMenuTimeout, setMegaMenuTimeout] =
		useState<NodeJS.Timeout | null>(null)
	const [activeCategory, setActiveCategory] = useState("Marketing")
	const [expandedMobileServices, setExpandedMobileServices] =
		useState(false)
	const [expandedMobileCategory, setExpandedMobileCategory] = useState<
		string | null
	>(null)
	const [expandedMobileColumn, setExpandedMobileColumn] = useState<
		string | null
	>(null)
	const [isVisible, setIsVisible] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [hasScrolledPast80vh, setHasScrolledPast80vh] = useState(false)

	// Check if we're on a SEO route
	const isSeoRoute = pathname?.startsWith("/seo/")

	const navigationLinks = [
		{ name: "Home", href: "/" },
		{ name: "Services", href: "/services", hasMegaMenu: true },
		{ name: "Portfolio", href: "/portfolio" },
		{ name: "About Us", href: "/about" },
		{ name: "Resources", href: "/resources" },
	]

	// Icon mapping for services
	const iconMapping: { [key: string]: string } = {
		"Search Engine Optimisation": "/navbar/black/seo.png",
		"Local SEO": "/navbar/black/local-seo.png",
		"WordPress SEO": "/navbar/black/wordpress-seo.png",
		"E-commerce SEO": "/navbar/black/ecom-seo.png",
		"AI SEO": "/navbar/black/ai-seo.png",
		"Google Ads": "/navbar/black/google-ads.png",
		"Google Remarketing": "/navbar/black/google-remarketing.png",
		"Google Shopping": "/navbar/black/google-shopping.png",
		"Paid Social": "/navbar/black/paid-social.png",
		"YouTube Ads": "/navbar/black/youtube-ads.png",
		"Facebook Marketing": "/navbar/black/fb.png",
		"X Marketing": "/navbar/black/x.png",
		"Instagram Marketing": "/navbar/black/instagram.png",
		"LinkedIn Marketing": "/navbar/black/linkedin.png",
		"TikTok Marketing": "/navbar/black/tik-tok.png",
		"Content Marketing": "/navbar/black/content-marketing.png",
		Copywriting: "/navbar/black/copywriting.png",
		"Graphic Designing": "/navbar/black/graphic-designing.png",
		"Video Editing": "/navbar/black/video-editing.png",
		"Photo Shoot": "/navbar/black/photoshoot.png",
		"Video Shoot": "/navbar/black/videoshoot.png",
		"Conversion Rate Optimisation":
			"/navbar/black/conversion-rate-optimization.png",
		"Call Tracking": "/navbar/black/call-tracking.png",
		"Reporting and Dashboards":
			"/navbar/black/reporting-and-dashboard.png",
		"Google Analytics": "/navbar/black/google-analytics.png",
		"Google Tag Manager": "/navbar/black/google-tag-manager.png",
		"E-commerce Web Development":
			"/navbar/black/app-development.png",
		"Front-End Development": "/navbar/black/frontend.png",
		"Back-End Development": "/navbar/black/backend.png",
		"CMS Integration": "/navbar/black/cms.png",
		"Custom Web Development":
			"/navbar/black/custom-web-development.png",
		"App Development": "/navbar/black/app-development.png",
		"Android App Development": "/navbar/black/android.png",
		"iOS App Development": "/navbar/black/ios.png",
		"Software Development": "/navbar/black/software.png",
		"Flutter App Development": "/navbar/black/flutter.png",
		"React Native Development": "/navbar/black/react-native.png",
		"Web Hosting": "/navbar/black/custom-web-development.png",
		"WordPress Hosting": "/navbar/black/cms.png",
		"Reseller Hosting": "/navbar/black/reseller-hosting.png",
		"Email Hosting": "/navbar/black/email-hosting.png",
		"Website Chat Assistant": "/navbar/black/chat.png",
		"AI-powered Voice Agents / Receptionists":
			"/navbar/black/ai-seo.png",
		"Factory Automation": "/navbar/black/factory.png",
		"Marketing & Social Media Automation":
			"/navbar/black/instagram.png",
		"Workflow Automation (Zapier, Make, Custom)":
			"/navbar/black/workflow.png",
		"ERP Systems": "/navbar/black/erp.png",
		"Car Removal & Wreckers Marketing Agency":
			"/navbar/black/car.png",
		"Automotive Repair & Servicing Marketing Agency":
			"/navbar/black/automotive.png",
		"Movers & Relocation Services Marketing Agency":
			"/navbar/black/relocate.png",
		"Plumbing Marketing Agency": "/navbar/black/plumbing.png",
		"Small Business Marketing Agency":
			"/navbar/black/small-bus.png",
		"Medium Business Marketing Agency":
			"/navbar/black/medium-bus.png",
		"Enterprise Business Marketing Agency":
			"/navbar/black/enterprise-bus.png",
		"Real Estate Marketing Agency": "/navbar/black/real-estate.png",
		"Mortgage Broker Marketing Agency":
			"/navbar/black/mortage-broker.png",
		"Physiotherapists Marketing Agency": "/navbar/black/physio.png",
		"Coaches Marketing Agency": "/navbar/black/coach.png",
		"Law Firm Marketing Agency": "/navbar/black/law.png",
	}

	const megaMenuData = {
		Marketing: {
			categories: [
				{ name: "Marketing", isActive: true },
				{ name: "Web & App Development" },
				{ name: "AI & Automation" },
				{ name: "Industries" },
			],
			columns: [
				{
					title: "Search Engine Optimisation",
					services: [
						{
							name: "Search Engine Optimisation",
							icon: "📍",
						},
						{
							name: "Local SEO",
							icon: "📍",
						},
						{
							name: "WordPress SEO",
							icon: "🔧",
						},
						{
							name: "E-commerce SEO",
							icon: "🛒",
						},
						// { name: 'Shopify SEO', icon: '🏪' },
						{ name: "AI SEO", icon: "🤖" },
						// { name: 'ORM', icon: '⭐' },
						// { name: 'SEO Migration', icon: '🔄' },
						// { name: 'Lead Generation', icon: '🎯' },
						// { name: 'Link Building Services', icon: '🔗' },
						// { name: 'International SEO', icon: '🌍' },
						// { name: 'Mobile SEO', icon: '📱' },
						// { name: 'Voice Search Optimisation', icon: '🎤' },
						// { name: 'Video SEO', icon: '🎥' },
						// { name: 'YouTube SEO', icon: '📺' },
					],
				},
				{
					title: "Paid Advertising",
					services: [
						{
							name: "Google Ads",
							icon: "📊",
						},
						// { name: 'Google Display Ads', icon: '🖼️' },
						{
							name: "Google Remarketing",
							icon: "🔄",
						},
						{
							name: "Google Shopping",
							icon: "🛍️",
						},
						{
							name: "Paid Social",
							icon: "👥",
						},
						{
							name: "YouTube Ads",
							icon: "📺",
						},
						// { name: 'Bing Ads Campaigns', icon: '🔍' },
					],
				},
				{
					title: "Social Media Management",
					services: [
						{
							name: "Facebook Marketing",
							icon: "📘",
						},
						{
							name: "X Marketing",
							icon: "🐦",
						},
						{
							name: "Instagram Marketing",
							icon: "📷",
						},
						{
							name: "LinkedIn Marketing",
							icon: "💼",
						},
						{
							name: "TikTok Marketing",
							icon: "🎵",
						},
						// { name: 'Snapchat Marketing', icon: '👻' },
						// { name: 'Reddit Marketing', icon: '🔴' },
					],
				},
				{
					title: "Content Marketing",
					services: [
						{
							name: "Content Marketing",
							icon: "📝",
						},
						{
							name: "Copywriting",
							icon: "✍️",
						},
						{
							name: "Graphic Designing",
							icon: "🎨",
						},
						{
							name: "Video Editing",
							icon: "🎬",
						},
						{
							name: "Photo Shoot",
							icon: "📸",
						},
						{
							name: "Video Shoot",
							icon: "🎥",
						},
						// { name: 'Content Strategy', icon: '📋' },
						// { name: 'Infographics', icon: '📊' },
					],
				},
			],
		},
		"Web & App Development": {
			categories: [
				{ name: "Marketing" },
				{
					name: "Web & App Development",
					isActive: true,
				},
				{ name: "AI & Automation" },
				{ name: "Industries" },
			],
			columns: [
				{
					title: "Web Development",
					services: [
						{
							name: "eCommerce Development",
							icon: "🛒",
						},
						{
							name: "Front-End Development",
							icon: "🎨",
						},
						{
							name: "Back-End Development",
							icon: "⚙️",
						},
						{
							name: "CMS Integration",
							icon: "🔧",
						},
						{
							name: "Custom Web Development",
							icon: "💻",
						},
						// { name: 'UI/UX Design', icon: '🎯' },
						// { name: 'Landing Page Design', icon: '📄' },
						// { name: 'Wix Website Design', icon: '🏗️' },
						// { name: 'React JS Website Design', icon: '⚛️' },
					],
				},
				{
					title: "App Development",
					services: [
						{
							name: "App Development",
							icon: "📱",
						},
						{
							name: "Android App Development",
							icon: "🤖",
						},
						{
							name: "iOS App Development",
							icon: "🍎",
						},
						{
							name: "Software Development",
							icon: "💻",
						},
						{
							name: "Flutter App Development",
							icon: "🦋",
						},
						{
							name: "React Native Development",
							icon: "⚛️",
						},
					],
				},
				{
					title: "Hosting, IT & Security",
					services: [
						{
							name: "Web Hosting",
							icon: "🌐",
						},
						{
							name: "WordPress Hosting",
							icon: "📝",
						},
						{
							name: "Reseller Hosting",
							icon: "🔄",
						},
						{
							name: "Email Hosting",
							icon: "📧",
						},
						// { name: 'E-commerce Hosting', icon: '🛒' },
						// { name: 'Dedicated Servers', icon: '🖥️' },
						// { name: 'Windows Virtual Servers', icon: '🪟' },
						// { name: 'Linux Servers', icon: '🐧' },
					],
				},
			],
		},
		"AI & Automation": {
			categories: [
				{ name: "Marketing" },
				{ name: "Web & App Development" },
				{ name: "AI & Automation", isActive: true },
				{ name: "Industries" },
			],
			columns: [
				{
					title: "AI & Automation",
					services: [
						{
							name: "Website Chat Assistant",
							icon: "💬",
						},
						{
							name: "AI-powered Voice Agents / Receptionists",
							icon: "🎤",
						},
						{
							name: "Factory Automation",
							icon: "🏭",
						},
						{
							name: "Marketing & Social Media Automation",
							icon: "📱",
						},
						{
							name: "Workflow Automation (Zapier, Make, Custom)",
							icon: "⚙️",
						},
						{
							name: "ERP Systems",
							icon: "📊",
						},
						// { name: 'Lead Follow-Up Agent', icon: '🎯' },
						// { name: 'Customer Feedback Collector', icon: '📝' },
						// { name: 'Full Automation Blogging', icon: '📝' },
						// { name: 'Product Assistant Chatbot', icon: '🤖' },
					],
				},
				{
					title: "Data & Analytics",
					services: [
						{
							name: "Conversion Rate Optimisation",
							icon: "📈",
						},
						{
							name: "Call Tracking",
							icon: "📞",
						},
						{
							name: "Reporting and Dashboards",
							icon: "📊",
						},
						{
							name: "Google Analytics",
							icon: "📈",
						},
						{
							name: "Google Tag Manager",
							icon: "🏷️",
						},
					],
				},
			],
		},
		Industries: {
			categories: [
				{ name: "Marketing" },
				{ name: "Web & App Development" },
				{ name: "AI & Automation" },
				{ name: "Industries", isActive: true },
			],
			columns: [
				{
					title: "Industries",
					services: [
						// { name: 'Healthcare Marketing Agency', icon: '🏥' },
						{
							name: "Car Removal & Wreckers Marketing Agency",
							icon: "🚗",
						},
						{
							name: "Automotive Repair & Servicing Marketing Agency",
							icon: "🔧",
						},
						// { name: 'Construction Marketing Agency', icon: '🏗️' },
						// { name: 'Florist Marketing Agency', icon: '🌸' },
						// { name: 'Carpenters Marketing Agency', icon: '🔨' },
						// { name: 'Handymen Marketing Agency', icon: '🛠️' },
						// { name: 'Daycare Marketing Agency', icon: '👶' },
						// { name: 'Caravan & Motorhome Repairs Marketing Agency', icon: '🚐' },
						// { name: 'Mobile Repair Marketing Agency', icon: '📱' },
						// { name: 'Supermarket Marketing Agency', icon: '🛒' },
						// { name: 'Window Tinting Services Marketing Agency', icon: '🪟' },
						// { name: 'Fencing Solutions Marketing Agency', icon: '🚧' },
						{
							name: "Movers & Relocation Services Marketing Agency",
							icon: "📦",
						},
						{
							name: "Plumbing Marketing Agency",
							icon: "🚿",
						},
						// { name: 'Roofing Marketing Agency', icon: '🏠' },
						// { name: 'HVAC Marketing Agency', icon: '❄️' },
						// { name: 'Electrical Services Marketing Agency', icon: '⚡' },
						// { name: 'Landscaping & Gardening Marketing Agency', icon: '🌱' },
						// { name: 'Pest Control Marketing Agency', icon: '🐛' },
						{
							name: "Small Business Marketing Agency",
							icon: "🏪",
						},
						{
							name: "Medium Business Marketing Agency",
							icon: "🏢",
						},
						{
							name: "Enterprise Business Marketing Agency",
							icon: "🏭",
						},
						// { name: 'Local Business Marketing Agency', icon: '📍' },
					],
				},
				{
					title: "Professionals Marketing",
					services: [
						{
							name: "Real Estate Marketing Agency",
							icon: "🏠",
						},
						{
							name: "Mortgage Broker Marketing Agency",
							icon: "💰",
						},
						{
							name: "Physiotherapists Marketing Agency",
							icon: "🏥",
						},
						{
							name: "Coaches Marketing Agency",
							icon: "🎯",
						},
						{
							name: "Law Firm Marketing Agency",
							icon: "⚖️",
						},
						// { name: 'Accountant / CPA Marketing Agency', icon: '📊' },
						// { name: 'Financial Advisor Marketing Agency', icon: '💼' },
						// { name: 'Insurance Broker Marketing Agency', icon: '🛡️' },
						// { name: 'Dentist Marketing Agency', icon: '🦷' },
					],
				},
			],
		},
	}

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleMegaMenuEnter = () => {
		if (megaMenuTimeout) {
			clearTimeout(megaMenuTimeout)
			setMegaMenuTimeout(null)
		}
		setIsMegaMenuOpen(true)
	}

	const handleMegaMenuLeave = () => {
		const timeout = setTimeout(() => {
			setIsMegaMenuOpen(false)
		}, 150) // Small delay to prevent flickering
		setMegaMenuTimeout(timeout)
	}

	const handleCategoryClick = (categoryName: string) => {
		setActiveCategory(categoryName)
	}

	const handleMobileServicesToggle = () => {
		setExpandedMobileServices(!expandedMobileServices)
		setExpandedMobileCategory(null) // Reset category expansion
		setExpandedMobileColumn(null) // Reset column expansion
	}

	const handleMobileCategoryToggle = (categoryName: string) => {
		setExpandedMobileCategory(
			expandedMobileCategory === categoryName
				? null
				: categoryName
		)
		setExpandedMobileColumn(null) // Reset column expansion when category changes
	}

	const handleMobileColumnToggle = (columnTitle: string) => {
		setExpandedMobileColumn(
			expandedMobileColumn === columnTitle
				? null
				: columnTitle
		)
	}

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (megaMenuTimeout) {
				clearTimeout(megaMenuTimeout)
			}
		}
	}, [megaMenuTimeout])

	// Handle scroll for navbar visibility
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY
			const viewportHeight80 = window.innerHeight * 0.8

			// Check if scrolled past 80vh
			setHasScrolledPast80vh(
				currentScrollY > viewportHeight80
			)

			if (currentScrollY < 10) {
				// Always show navbar at the top
				setIsVisible(true)
			} else if (currentScrollY > lastScrollY) {
				// Scrolling down
				setIsVisible(false)
			} else if (currentScrollY < lastScrollY) {
				// Scrolling up
				setIsVisible(true)
			}

			setLastScrollY(currentScrollY)
		}

		window.addEventListener("scroll", handleScroll, {
			passive: true,
		})

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [lastScrollY])

	return (
		<nav
			className={cn(
				"fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out",
				isVisible
					? "translate-y-0"
					: "-translate-y-full",
				hasScrolledPast80vh
					? "bg-black/70"
					: "bg-black/10"
			)}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 lg:h-20">
					{/* Logo - Left Side */}
					<div className="flex-shrink-0">
						<Link
							href="/"
							className="flex items-center"
						>
							<Image
								src="/main-logo.png"
								alt="Digital Neighbour Logo"
								width={40}
								height={40}
								className={cn(
									"h-12 w-auto lg:h-14 transition-all duration-300",
									"brightness-0 invert"
								)}
								priority
							/>
						</Link>
					</div>

					{/* Navigation Links - Middle (Desktop) */}
					<div className="hidden lg:flex lg:items-center lg:space-x-8">
						{navigationLinks.map((link) => (
							<div
								key={link.name}
								className="relative"
								onMouseEnter={() =>
									link.hasMegaMenu &&
									handleMegaMenuEnter()
								}
								onMouseLeave={() =>
									link.hasMegaMenu &&
									handleMegaMenuLeave()
								}
							>
								<Link
									href={
										link.href
									}
									className={cn(
										"uppercase transition-all duration-200 font-medium text-sm lg:text-base flex items-center gap-1 relative group",
										"text-white/80 hover:text-white",
										link.hasMegaMenu &&
											isMegaMenuOpen &&
											"text-yellow"
									)}
								>
									<span className="relative">
										{
											link.name
										}
										<span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-200 group-hover:w-full"></span>
									</span>
									{link.hasMegaMenu && (
										<svg
											className="w-4 h-4 transition-transform duration-200"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									)}
								</Link>
							</div>
						))}
					</div>

					{/* Right Side - Desktop Button & Mobile Menu */}
					<div className="flex items-center">
						{/* Start a Project Button - Desktop */}
						<div className="hidden lg:flex lg:items-center">
							<CustomButton
								text="Start a Project"
								href="/contact"
								textColor="black"
								borderColor="black"
							/>
						</div>

						{/* Mobile menu button */}
						<div className="lg:hidden">
							<button
								onClick={
									toggleMenu
								}
								className={cn(
									"transition-colors duration-200 p-2",
									"text-white hover:text-yellow"
								)}
								aria-label="Toggle menu"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									{isMenuOpen ? (
										<path d="M6 18L18 6M6 6l12 12" />
									) : (
										<path d="M4 6h16M4 12h16M4 18h16" />
									)}
								</svg>
							</button>
						</div>
					</div>
				</div>

				{/* Mega Menu */}
				{isMegaMenuOpen && (
					<div
						className="absolute left-0 right-0 top-full bg-white/95 backdrop-blur-sm border-t border-white/20 shadow-2xl"
						onMouseEnter={
							handleMegaMenuEnter
						}
						onMouseLeave={
							handleMegaMenuLeave
						}
					>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
							<div className="grid grid-cols-12 gap-6">
								{/* Left Column - Categories */}
								<div className="col-span-3">
									<div className="space-y-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
										{megaMenuData[
											activeCategory as keyof typeof megaMenuData
										].categories.map(
											(
												category,
												index
											) => (
												<div
													key={
														category.name
													}
													onClick={() =>
														handleCategoryClick(
															category.name
														)
													}
													className={cn(
														"flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200",
														category.isActive
															? "bg-yellow/80 text-black"
															: "hover:bg-gray-100 text-gray-700"
													)}
												>
													<span className="font-medium">
														{
															category.name
														}
													</span>
													<svg
														className="w-4 h-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M9 5l7 7-7 7"
														/>
													</svg>
												</div>
											)
										)}
									</div>
								</div>

								{/* Right Columns - Services */}
								<div className="col-span-9">
									<div
										className={cn(
											"grid gap-4",
											megaMenuData[
												activeCategory as keyof typeof megaMenuData
											]
												.columns
												.length ===
												5
												? "grid-cols-5"
												: megaMenuData[
														activeCategory as keyof typeof megaMenuData
												  ]
														.columns
														.length ===
												  4
												? "grid-cols-4"
												: megaMenuData[
														activeCategory as keyof typeof megaMenuData
												  ]
														.columns
														.length ===
												  3
												? "grid-cols-3"
												: megaMenuData[
														activeCategory as keyof typeof megaMenuData
												  ]
														.columns
														.length ===
												  2
												? "grid-cols-2"
												: "grid-cols-1"
										)}
									>
										{megaMenuData[
											activeCategory as keyof typeof megaMenuData
										].columns.map(
											(
												column,
												columnIndex
											) => (
												<div
													key={
														column.title
													}
													className="space-y-2 relative"
												>
													<h3 className="text-base font-semibold text-gray-900 mb-2">
														{
															column.title
														}
													</h3>
													<div className="space-y-1 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
														{column.services.map(
															(
																service,
																serviceIndex
															) => (
																<Link
																	key={
																		service.name
																	}
																	href={(() => {
																		const name =
																			service.name
																				.toLowerCase()
																				.replace(
																					/[^a-z0-9]+/g,
																					"-"
																				)
																				.replace(
																					/(^-|-$)+/g,
																					""
																				)
																		// Map Web & App Development -> /web-development slugs
																		// For items under the Web Development column, link directly to /web-development/<kebab>
																		if (
																			activeCategory ===
																				"Web & App Development" &&
																			column.title ===
																				"Web Development"
																		) {
																			return `/web-development/${name}`
																		}
																		// Map App Development items to app-development routes
																		if (
																			activeCategory ===
																				"Web & App Development" &&
																			column.title ===
																				"App Development"
																		) {
																			const appSlugMap: Record<
																				string,
																				string
																			> =
																				{
																					"app-development":
																						"app-development",
																					"android-app-development":
																						"android-app-development",
																					"ios-app-development":
																						"ios-app-development",
																					"software-development":
																						"app-development",
																					"flutter-app-development":
																						"flutter-development",
																					"react-native-development":
																						"react-native-development",
																				}
																			if (
																				appSlugMap[
																					name
																				]
																			) {
																				return `/app-development/${appSlugMap[name]}`
																			}
																		}
																		const seoSlugs =
																			new Set(
																				[
																					"search-engine-optimisation",
																					"local-seo",
																					"wordpress-seo",
																					"e-commerce-seo",
																					"ai-seo",
																				]
																			)
																		const paidAdsSlugs =
																			new Set(
																				[
																					"google-ads",
																					"google-remarketing",
																					"google-shopping",
																					"paid-social",
																					"youtube-ads",
																					"paid-advertisement",
																				]
																			)
																		const socialMediaSlugs =
																			new Set(
																				[
																					"facebook-marketing",
																					"instagram-marketing",
																					"linkedin-marketing",
																					"tiktok-marketing",
																					"x-marketing",
																				]
																			)
																		const contentMarketingSlugs =
																			new Set(
																				[
																					"content-marketing",
																					"blog-writing",
																					"content-strategy",
																					"social-media-content",
																					"email-newsletters",
																					"copywriting",
																					"graphic-designing",
																					"video-editing",
																					"photo-shoot",
																					"video-shoot",
																					"infographic-design",
																					"website-copywriting",
																					"sales-copywriting",
																					"press-release-writing",
																					"ad-copywriting",
																					"logo-design",
																					"email-marketing",
																					"pr-outreach",
																					"branding",
																					"data-and-analytics",
																					"conversion-rate-optimization",
																					"call-tracking",
																					"reporting-and-dashboards",
																					"google-analytics",
																					"google-tag-manager",
																				]
																			)
																		if (
																			seoSlugs.has(
																				name
																			)
																		) {
																			// Map naming differences
																			const slugMap: Record<
																				string,
																				string
																			> =
																				{
																					"search-engine-optimisation":
																						"search-engine-optimisation",
																					"e-commerce-seo":
																						"ecom-seo",
																				}
																			const slug =
																				slugMap[
																					name
																				] ||
																				name
																			return `/seo/${slug}`
																		}
																		if (
																			paidAdsSlugs.has(
																				name
																			)
																		) {
																			// Map naming differences for paid ads
																			const slugMap: Record<
																				string,
																				string
																			> =
																				{
																					"google-shopping":
																						"google-shopping-ads",
																				}
																			const slug =
																				slugMap[
																					name
																				] ||
																				name
																			return `/paid-advertisement/${slug}`
																		}
																		if (
																			socialMediaSlugs.has(
																				name
																			)
																		) {
																			const slugMap: Record<
																				string,
																				string
																			> =
																				{
																					"facebook-marketing":
																						"facebook-marketing",
																					"instagram-marketing":
																						"instagram-marketing",
																					"linkedin-marketing":
																						"linkedin-marketing",
																					"tiktok-marketing":
																						"tiktok-marketing",
																					"x-marketing":
																						"x-marketing",
																				}
																			const slug =
																				slugMap[
																					name
																				] ||
																				name
																			return `/social-media-marketing/${slug}`
																		}
																		if (
																			contentMarketingSlugs.has(
																				name
																			)
																		) {
																			const slug =
																				name
																			return `/content-marketing/${slug}`
																		}
																		// Map AI & Automation items to ai-automation routes
																		if (
																			activeCategory ===
																				"AI & Automation"
																		) {
																			const aiAutomationSlugMap: Record<
																				string,
																				string
																			> = {
																				"website-chat-assistant": "chatbots-and-virtual-assistants",
																				"ai-powered-voice-agents-receptionists": "ai-receptionists",
																				"factory-automation": "factory-automation",
																				"marketing-social-media-automation": "social-media-automation",
																				"workflow-automation-zapier-make-custom": "workflow-automation",
																				"erp-systems": "erp-systems",
																			}
																			if (
																				aiAutomationSlugMap[
																					name
																				]
																			) {
																				return `/ai-automation/${aiAutomationSlugMap[name]}`
																			}
																			// If no specific mapping, use the kebab-case name
																			return `/ai-automation/${name}`
																		}
																		// Map Hosting, IT & Security items to hosting-it-security routes
																		if (
																			activeCategory ===
																				"Web & App Development" &&
																			column.title ===
																				"Hosting, IT & Security"
																		) {
																			const hostingSlugMap: Record<
																				string,
																				string
																			> = {
																				"web-hosting": "web-hosting",
																				"wordpress-hosting":
																					"wordpress-hosting",
																				"reseller-hosting":
																					"reseller-hosting",
																				"email-hosting": "email-hosting",
																			}
																			if (
																				hostingSlugMap[
																					name
																				]
																			) {
																				return `/hosting-it-security/${hostingSlugMap[name]}`
																			}
																		}
																		return `/services/${name}`
																	})()}
																	className="flex items-center gap-2 p-1.5 rounded-lg transition-colors duration-200 group"
																>
																	{iconMapping[
																		service
																			.name
																	] ? (
																		<Image
																			src={
																				iconMapping[
																					service
																						.name
																				]
																			}
																			alt={
																				service.name
																			}
																			width={
																				16
																			}
																			height={
																				16
																			}
																			className="w-5 h-5 object-contain flex-shrink-0"
																		/>
																	) : (
																		<span className="text-sm">
																			{
																				service.icon
																			}
																		</span>
																	)}
																	<span className="text-md text-gray-700 group-hover:text-yellow-700 transition-colors duration-200 relative">
																		{
																			service.name
																		}
																		<span className="absolute bottom-0 left-0 w-0 h-[1px] bg-yellow transition-all duration-200 group-hover:w-full"></span>
																	</span>
																</Link>
															)
														)}
													</div>
													{columnIndex <
														(megaMenuData[
															activeCategory as keyof typeof megaMenuData
														]
															?.columns
															?.length ||
															0) -
															1 && (
														<div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200" />
													)}
												</div>
											)
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Mobile Navigation Menu */}
				{isMenuOpen && (
					<div className="lg:hidden">
						<div className="px-2 pt-2 pb-3 mb-3 space-y-1 bg-black/90 backdrop-blur-sm rounded-lg mt-2 border border-white/10">
							{navigationLinks.map(
								(link) => (
									<div
										key={
											link.name
										}
									>
										{link.hasMegaMenu ? (
											<div>
												<button
													onClick={() =>
														handleMobileServicesToggle()
													}
													className={cn(
														"w-full flex items-center justify-between px-3 py-2 transition-colors duration-200 rounded-md font-medium",
														isSeoRoute &&
															!hasScrolledPast80vh
															? "text-black hover:text-yellow"
															: "text-white hover:text-yellow"
													)}
												>
													<span>
														{
															link.name
														}
													</span>
													<svg
														className={cn(
															"w-4 h-4 transition-transform duration-200",
															expandedMobileServices &&
																"rotate-180"
														)}
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M19 9l-7 7-7-7"
														/>
													</svg>
												</button>
												{expandedMobileServices && (
													<div className="ml-4 mt-2 space-y-2">
														{Object.keys(
															megaMenuData
														).map(
															(
																categoryKey
															) => (
																<div
																	key={
																		categoryKey
																	}
																>
																	<button
																		onClick={() =>
																			handleMobileCategoryToggle(
																				categoryKey
																			)
																		}
																		className="w-full flex items-center justify-between px-2 py-2 text-yellow hover:text-white transition-colors duration-200 rounded-md font-semibold text-sm uppercase"
																	>
																		<span>
																			{
																				categoryKey
																			}
																		</span>
																		<svg
																			className={cn(
																				"w-3 h-3 transition-transform duration-200",
																				expandedMobileCategory ===
																					categoryKey &&
																					"rotate-180"
																			)}
																			fill="none"
																			stroke="currentColor"
																			viewBox="0 0 24 24"
																		>
																			<path
																				strokeLinecap="round"
																				strokeLinejoin="round"
																				strokeWidth="2"
																				d="M19 9l-7 7-7-7"
																			/>
																		</svg>
																	</button>
																	{expandedMobileCategory ===
																		categoryKey && (
																		<div className="ml-4 space-y-2">
																			{megaMenuData[
																				categoryKey as keyof typeof megaMenuData
																			].columns.map(
																				(
																					column
																				) => (
																					<div
																						key={
																							column.title
																						}
																					>
																						<button
																							onClick={() =>
																								handleMobileColumnToggle(
																									column.title
																								)
																							}
																							className="w-full flex items-center justify-between px-2 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-md font-medium text-xs"
																						>
																							<span>
																								{
																									column.title
																								}
																							</span>
																							<svg
																								className={cn(
																									"w-3 h-3 transition-transform duration-200",
																									expandedMobileColumn ===
																										column.title &&
																										"rotate-180"
																								)}
																								fill="none"
																								stroke="currentColor"
																								viewBox="0 0 24 24"
																							>
																								<path
																									strokeLinecap="round"
																									strokeLinejoin="round"
																									strokeWidth="2"
																									d="M19 9l-7 7-7-7"
																								/>
																							</svg>
																						</button>
																						{expandedMobileColumn ===
																							column.title && (
																							<div className="ml-4 space-y-1">
																								{column.services.map(
																									(
																										service
																									) => (
																										<Link
																											key={
																												service.name
																											}
																											href={(() => {
																												const name =
																													service.name
																														.toLowerCase()
																														.replace(
																															/[^a-z0-9]+/g,
																															"-"
																														)
																														.replace(
																															/(^-|-$)+/g,
																															""
																														)
																												const seoSlugs =
																													new Set(
																														[
																															"search-engine-optimisation",
																															"local-seo",
																															"wordpress-seo",
																															"e-commerce-seo",
																															"ai-seo",
																														]
																													)
																												const paidAdsSlugs =
																													new Set(
																														[
																															"google-ads",
																															"google-remarketing",
																															"google-shopping",
																															"paid-social",
																															"youtube-ads",
																															"paid-advertisement",
																														]
																													)
																												const socialMediaSlugs =
																													new Set(
																														[
																															"facebook-marketing",
																															"instagram-marketing",
																															"linkedin-marketing",
																															"tiktok-marketing",
																															"x-marketing",
																														]
																													)
																												const contentMarketingSlugs =
																													new Set(
																														[
																															"content-marketing",
																															"blog-writing",
																															"content-strategy",
																															"social-media-content",
																															"email-newsletters",
																														]
																													)
																												if (
																													seoSlugs.has(
																														name
																													)
																												) {
																													// Map naming differences
																													const slugMap: Record<
																														string,
																														string
																													> =
																														{
																															"search-engine-optimisation":
																																"search-engine-optimisation",
																															"e-commerce-seo":
																																"ecom-seo",
																														}
																													const slug =
																														slugMap[
																															name
																														] ||
																														name
																													return `/seo/${slug}`
																												}
																												// For items under the Web Development column in mobile, link to /web-development/<kebab>
																												if (
																													categoryKey ===
																														"Web & App Development" &&
																													column.title ===
																														"Web Development"
																												) {
																													return `/web-development/${name}`
																												}
																												// Map App Development items to App Development routes
																												if (
																													categoryKey ===
																														"Web & App Development" &&
																													column.title ===
																														"App Development"
																												) {
																													const appSlugMap: Record<
																														string,
																														string
																													> =
																														{
																															"app-development":
																																"app-development",
																															"android-app-development":
																																"android-app-development",
																															"ios-app-development":
																																"ios-app-development",
																															"software-development":
																																"software-development",
																															"flutter-app-development":
																																"flutter-development",
																															"react-native-development":
																																"react-native-development",
																														}
																													if (
																														appSlugMap[
																															name
																														]
																													) {
																														return `/app-development/${appSlugMap[name]}`
																													}
																												}
																												// Map Hosting, IT & Security items to hosting-it-security routes
																												if (
																													categoryKey ===
																														"Web & App Development" &&
																													column.title ===
																														"Hosting, IT & Security"
																												) {
																													const hostingSlugMap: Record<
																														string,
																														string
																													> = {
																														"web-hosting": "web-hosting",
																														"wordpress-hosting":
																															"wordpress-hosting",
																														"reseller-hosting":
																															"reseller-hosting",
																														"email-hosting": "email-hosting",
																													}
																													if (
																														hostingSlugMap[
																															name
																														]
																													) {
																														return `/hosting-it-security/${hostingSlugMap[name]}`
																													}
																												}
																												if (
																													paidAdsSlugs.has(
																														name
																													)
																												) {
																													// Map naming differences for paid ads
																													const slugMap: Record<
																														string,
																														string
																													> =
																														{
																															"google-shopping":
																																"google-shopping-ads",
																														}
																													const slug =
																														slugMap[
																															name
																														] ||
																														name
																													return `/paid-advertisement/${slug}`
																												}
																												if (
																													socialMediaSlugs.has(
																														name
																													)
																												) {
																													const slugMap: Record<
																														string,
																														string
																													> =
																														{
																															"facebook-marketing":
																																"facebook-marketing",
																															"instagram-marketing":
																																"instagram-marketing",
																															"linkedin-marketing":
																																"linkedin-marketing",
																															"tiktok-marketing":
																																"tiktok-marketing",
																															"x-marketing":
																																"x-marketing",
																														}
																													const slug =
																														slugMap[
																															name
																														] ||
																														name
																													return `/social-media-marketing/${slug}`
																												}
																												if (
																													webDevSlugMap[
																														name
																													]
																												) {
																													return `/web-development/${webDevSlugMap[name]}`
																												}
																												if (
																													contentMarketingSlugs.has(
																														name
																													)
																												) {
																													const slug =
																														name
																													return `/content-marketing/${slug}`
																												}
																												// Map AI & Automation items to ai-automation routes
																												if (
																													categoryKey ===
																														"AI & Automation"
																												) {
																													const aiAutomationSlugMap: Record<
																														string,
																														string
																													> = {
																														"website-chat-assistant": "chatbots-and-virtual-assistants",
																														"ai-powered-voice-agents-receptionists": "ai-receptionists",
																														"factory-automation": "factory-automation",
																														"marketing-social-media-automation": "social-media-automation",
																														"workflow-automation-zapier-make-custom": "workflow-automation",
																														"erp-systems": "erp-systems",
																													}
																													if (
																														aiAutomationSlugMap[
																															name
																														]
																													) {
																														return `/ai-automation/${aiAutomationSlugMap[name]}`
																													}
																													// If no specific mapping, use the kebab-case name
																													return `/ai-automation/${name}`
																												}
																												return `/services/${name}`
																											})()}
																											className="flex items-center gap-2 px-2 py-1 text-gray-400 hover:text-white text-xs"
																											onClick={() =>
																												setIsMenuOpen(
																													false
																												)
																											}
																										>
																											{iconMapping[
																												service
																													.name
																											] ? (
																												<Image
																													src={
																														iconMapping[
																															service
																																.name
																														]
																													}
																													alt={
																														service.name
																													}
																													width={
																														16
																													}
																													height={
																														16
																													}
																													className="w-4 h-4 object-contain"
																												/>
																											) : (
																												<span className="text-sm">
																													{
																														service.icon
																													}
																												</span>
																											)}
																											{
																												service.name
																											}
																										</Link>
																									)
																								)}
																							</div>
																						)}
																					</div>
																				)
																			)}
																		</div>
																	)}
																</div>
															)
														)}
													</div>
												)}
											</div>
										) : (
											<Link
												href={
													link.href
												}
												className={cn(
													"block px-3 py-2 transition-colors duration-200 rounded-md font-medium",
													"text-white hover:text-yellow"
												)}
												onClick={() =>
													setIsMenuOpen(
														false
													)
												}
											>
												{
													link.name
												}
											</Link>
										)}
									</div>
								)
							)}
							<div className="px-3 py-2">
								<CustomButton
									text="Start a Project"
									href="/contact"
									textColor="black"
									borderColor="white"
									className="justify-center"
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
