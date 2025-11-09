"use client"

import { useState, type ComponentType } from "react"
import {
	Heart,
	DollarSign,
	GraduationCap,
	Sparkles,
	Radio,
	Building,
	UtensilsCrossed,
	Truck,
	Smartphone,
	Gamepad2,
	Bus,
	Plane,
	Zap,
	Leaf,
	Fuel,
	Shield,
	CloudCog,
	Phone,
	Car,
	Factory,
	ShoppingCart,
	ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

type IconName =
	| "heart"
	| "dollarSign"
	| "graduationCap"
	| "sparkles"
	| "radio"
	| "building"
	| "utensilsCrossed"
	| "truck"
	| "smartphone"
	| "gamepad2"
	| "bus"
	| "plane"
	| "zap"
	| "leaf"
	| "fuel"
	| "shield"
	| "cloudCog"
	| "phone"
	| "car"
	| "factory"
	| "shoppingCart"

interface Industry {
	id: string
	name: string
	icon: IconName
	details?: string
}

const iconMap: Record<IconName, ComponentType<{ className?: string }>> = {
	heart: Heart,
	dollarSign: DollarSign,
	graduationCap: GraduationCap,
	sparkles: Sparkles,
	radio: Radio,
	building: Building,
	utensilsCrossed: UtensilsCrossed,
	truck: Truck,
	smartphone: Smartphone,
	gamepad2: Gamepad2,
	bus: Bus,
	plane: Plane,
	zap: Zap,
	leaf: Leaf,
	fuel: Fuel,
	shield: Shield,
	cloudCog: CloudCog,
	phone: Phone,
	car: Car,
	factory: Factory,
	shoppingCart: ShoppingCart,
}

const INDUSTRIES_DATA: {
	heading: string
	description: string
	industries: Industry[]
} = {
	heading: "Crafting Unique and Tailored Mobile Apps for a Spectrum of Industries",
	description:
		"Appinventiv is an enterprise-grade mobile app development firm that delivers industry-specific custom app solutions for 35+ industries, thus empowering businesses to innovate and achieve strategic objectives.",
	industries: [
		{
			id: "healthcare",
			name: "Healthcare",
			icon: "heart",
			details: "Transform healthcare delivery with secure, HIPAA-compliant mobile apps that connect patients with providers, enable telemedicine, manage medical records, and enhance patient care experiences.",
		},
		{
			id: "finance",
			name: "Finance",
			icon: "dollarSign",
			details: "Build secure fintech applications with advanced encryption, real-time transactions, digital wallets, investment tracking, and seamless banking integrations for next-generation financial services.",
		},
		{
			id: "education",
			name: "Education",
			icon: "graduationCap",
			details: "Create engaging educational apps with interactive learning modules, virtual classrooms, progress tracking, and personalized learning experiences that revolutionize how students learn and educators teach.",
		},
		{
			id: "on-demand",
			name: "On-Demand",
			icon: "sparkles",
			details: "Develop on-demand service platforms with real-time tracking, seamless payment integration, multi-service support, and efficient delivery management to connect service providers with customers instantly.",
		},
		{
			id: "entertainment",
			name: "Entertainment",
			icon: "radio",
			details: "Build immersive entertainment apps with streaming capabilities, social sharing features, personalized content recommendations, and interactive experiences that keep users engaged and entertained.",
		},
		{
			id: "government",
			name: "Government",
			icon: "building",
			details: "Create secure government applications with citizen services, document management, public information portals, and compliance features that enhance civic engagement and streamline government operations.",
		},
		{
			id: "restaurant",
			name: "Restaurant",
			icon: "utensilsCrossed",
			details: "Develop restaurant apps with online ordering, table reservations, menu management, loyalty programs, and seamless payment processing to enhance customer dining experiences and boost revenue.",
		},
		{
			id: "ecommerce",
			name: "eCommerce",
			icon: "shoppingCart",
			details: "Build e-commerce apps with seamless shopping experiences, payment gateways, order tracking, inventory management, and personalized recommendations to boost sales and customer engagement.",
		},
		{
			id: "logistics",
			name: "Logistics",
			icon: "truck",
			details: "Optimize supply chain and delivery operations with advanced logistics apps for tracking, fleet management, and route optimization.",
		},
		{
			id: "social-media",
			name: "Social Media",
			icon: "smartphone",
			details: "Build engaging social networking platforms, community apps, and communication tools that connect people and foster interaction.",
		},
		{
			id: "games-and-sports",
			name: "Games and Sports",
			icon: "gamepad2",
			details: "Develop immersive gaming experiences, sports analytics apps, and fan engagement platforms for enthusiasts and professionals.",
		},
		{
			id: "travel",
			name: "Travel",
			icon: "bus",
			details: "Create comprehensive travel apps for booking flights, hotels, car rentals, and providing personalized itinerary management and local guides.",
		},
		{
			id: "aviation",
			name: "Aviation",
			icon: "plane",
			details: "Design specialized aviation apps for flight tracking, pilot tools, airline operations, and passenger services, enhancing efficiency and safety.",
		},
		{
			id: "real-estate",
			name: "Real Estate",
			icon: "building",
			details: "Develop innovative real estate solutions for property listings, virtual tours, agent tools, and investment management, simplifying buying and selling.",
		},
		{
			id: "electric-vehicle",
			name: "Electric Vehicle",
			icon: "zap",
			details: "Build smart EV apps for charging station locators, battery management, route planning, and vehicle diagnostics, supporting the electric revolution.",
		},
		{
			id: "agriculture",
			name: "Agriculture",
			icon: "leaf",
			details: "Create modern agriculture apps for crop monitoring, farm management, weather forecasting, and livestock tracking, boosting productivity and sustainability.",
		},
		{
			id: "oil-and-gas",
			name: "Oil and Gas",
			icon: "fuel",
			details: "Develop robust apps for oil and gas exploration, production monitoring, field operations, and safety management, ensuring efficiency and compliance.",
		},
		{
			id: "insurance",
			name: "Insurance",
			icon: "shield",
			details: "Build secure insurance apps for policy management, claims processing, premium payments, and personalized coverage options, enhancing customer experience.",
		},
		{
			id: "saas",
			name: "SaaS",
			icon: "cloudCog",
			details: "Develop scalable Software as a Service applications with cloud infrastructure, subscription management, multi-tenancy support, and seamless integrations for modern businesses.",
		},
		{
			id: "telecom",
			name: "Telecom",
			icon: "phone",
			details: "Build robust telecom apps for network management, customer service, billing systems, and communication solutions that enhance connectivity and user experience.",
		},
		{
			id: "automotive",
			name: "Automotive",
			icon: "car",
			details: "Create innovative automotive apps for vehicle diagnostics, navigation systems, fleet management, connected car features, and driver assistance technologies.",
		},
		{
			id: "manufacturing",
			name: "Manufacturing",
			icon: "factory",
			details: "Develop manufacturing apps for production monitoring, quality control, inventory management, supply chain optimization, and industrial automation solutions.",
		},
	],
}

export default function Industries() {
	const [expandedId, setExpandedId] = useState<string | null>(null)

	const toggleExpanded = (id: string) => {
		setExpandedId(expandedId === id ? null : id)
	}

	const IconComponent = ({ iconName }: { iconName: IconName }) => {
		const Icon = iconMap[iconName] || Heart
		return <Icon className="w-6 h-6 text-white" />
	}

	const headingParts = INDUSTRIES_DATA.heading.split(
		"Tailored Mobile Apps"
	)
	const beforeHighlight = headingParts[0]
	const afterHighlight = headingParts[1] || ""

	return (
		<section className="bg-black py-16 md:py-24 lg:py-32 relative">
			<div className="container mx-auto px-6 lg:px-12">
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
					{/* Left Column */}
					<div className="lg:sticky lg:top-24 lg:col-span-2 sticky">
						<div className="space-y-6">
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight font-cal-sans">
								{
									beforeHighlight
								}
								<span className="font-medium">
									Tailored
									Apps
								</span>
								{afterHighlight}
							</h2>
							<p className="text-base md:text-lg text-white/90 leading-relaxed">
								{
									INDUSTRIES_DATA.description
								}
							</p>
						</div>
					</div>

					{/* Right Column */}
					<div className="lg:col-span-3">
						<div className="space-y-0">
							{INDUSTRIES_DATA.industries.map(
								(industry) => {
									const isExpanded =
										expandedId ===
										industry.id
									return (
										<div
											key={
												industry.id
											}
											className="border-b border-white/10"
										>
											<button
												onClick={() =>
													toggleExpanded(
														industry.id
													)
												}
												className="w-full flex items-center justify-between py-6"
											>
												<div className="flex items-center gap-4 flex-1">
													<div className="flex-shrink-0">
														<IconComponent
															iconName={
																industry.icon
															}
														/>
													</div>
													<span className="text-lg md:text-xl text-white underline underline-offset-4 decoration-white/50 hover:text-yellow transition-colors">
														{
															industry.name
														}
													</span>
												</div>
												<div className="flex-shrink-0 ml-4">
													<div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
														<ChevronDown
															className={cn(
																"w-5 h-5 text-white transition-transform duration-200",
																isExpanded &&
																	"rotate-180"
															)}
														/>
													</div>
												</div>
											</button>

											<div
												className={cn(
													"overflow-hidden transition-all duration-300 ease-in-out",
													isExpanded
														? "max-h-96 opacity-100"
														: "max-h-0 opacity-0"
												)}
											>
												<div className="px-0 pb-6 pt-2">
													{industry.details ? (
														<p className="text-white/80 leading-relaxed">
															{
																industry.details
															}
														</p>
													) : (
														<p className="text-white/60 italic">
															Details
															coming
															soon...
														</p>
													)}
												</div>
											</div>
										</div>
									)
								}
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
