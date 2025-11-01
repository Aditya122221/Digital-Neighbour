"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, ArrowRight } from "lucide-react"

interface ComplianceItem {
	name: string
	link?: string
}

interface ComplianceCategory {
	number: string
	title: string
	icon?: React.ReactNode
	items: ComplianceItem[]
}

interface CertificatesProps {
	data?: {
		heading?: string
		description?: string
		categories?: ComplianceCategory[]
	}
}

export default function Certificates({ data }: CertificatesProps) {
	const defaultCategories: ComplianceCategory[] = [
		{
			number: "01",
			title: "Data Protection & Privacy Regulations",
			icon: <Lock className="w-6 h-6" />,
			items: [
				{ name: "GDPR", link: "" },
				{ name: "CCPA", link: "" },
				{ name: "FTC", link: "" },
				{ name: "HIPAA", link: "" },
				{ name: "PIPEDA", link: "" },
				{ name: "ISO/IEC 27001", link: "" },
				{
					name: "DPDP Act, 2023 (Data Protection Bill India)",
					link: "",
				},
			],
		},
		{
			number: "02",
			title: "Payment & Transaction Security",
			icon: <Lock className="w-6 h-6" />,
			items: [
				{ name: "PCI DSS", link: "#" },
				{ name: "PCI DSS Level 1", link: "#" },
				{ name: "PCI DSS Level 2", link: "#" },
				{
					name: "Payment Card Industry Data Security Standard",
					link: "#",
				},
				{ name: "EMVCo", link: "#" },
				{ name: "3D Secure", link: "#" },
				{ name: "Tokenization Standards", link: "#" },
			],
		},
		{
			number: "03",
			title: "App Development & Security Standards",
			icon: <Lock className="w-6 h-6" />,
			items: [
				{ name: "OWASP Mobile Top 10", link: "#" },
				{ name: "OWASP ASVS", link: "#" },
				{ name: "ISO/IEC 27001", link: "#" },
				{ name: "ISO/IEC 27017", link: "#" },
				{ name: "ISO/IEC 27018", link: "#" },
				{ name: "SOC 2 Type II", link: "#" },
				{
					name: "NIST Cybersecurity Framework",
					link: "#",
				},
			],
		},
		{
			number: "04",
			title: "Mobile App Store Guidelines",
			icon: <Lock className="w-6 h-6" />,
			items: [
				{
					name: "Apple App Store Guidelines",
					link: "#",
				},
				{
					name: "Google Play Store Policies",
					link: "#",
				},
				{
					name: "Apple Human Interface Guidelines",
					link: "#",
				},
				{
					name: "Material Design Guidelines",
					link: "#",
				},
				{ name: "Firebase App Check", link: "#" },
				{ name: "App Transport Security", link: "#" },
				{
					name: "Google Play Security Policies",
					link: "#",
				},
			],
		},
		{
			number: "05",
			title: "Industry Standards & Protocols",
			icon: <Lock className="w-6 h-6" />,
			items: [
				{ name: "ISO 27001", link: "#" },
				{ name: "ISO 9001", link: "#" },
				{ name: "CMMI Level 5", link: "#" },
				{
					name: "Agile/Scrum Certification",
					link: "#",
				},
				{
					name: "AWS Well-Architected Framework",
					link: "#",
				},
				{
					name: "Google Cloud Security Framework",
					link: "#",
				},
				{ name: "Azure Compliance", link: "#" },
			],
		},
	]

	const heading =
		data?.heading ||
		"Compliances & Certifications We Adhere to for Secure App Development"
	const description =
		data?.description ||
		"For enterprises, complying with essential industry regulations is a dire necessity to protect brand reputation and avert legal repercussions. Therefore, we at Appinventiv embed a compliance-first approach into every stage of development."
	const categories = data?.categories || defaultCategories

	const [activeCategory, setActiveCategory] = useState(0)

	const activeData = categories[activeCategory]

	return (
		<section className="relative py-16 md:py-24 lg:py-32 bg-black">
			<div className="container mx-auto px-6 lg:px-12">
				{/* Header Section */}
				<motion.div
					className="text-center mb-12 md:mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.8,
						ease: "easeOut",
					}}
				>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6 font-cal-sans">
						{heading ? (
							<>
								{heading.includes(
									"Compliances"
								) &&
								heading.includes(
									"Certifications"
								) ? (
									<>
										Compliances
										&
										Certifications
										We
										Adhere
										to
										for
										Secure{" "}
										<span className="relative inline-block">
											<span className="absolute bottom-1 left-0 right-0 h-2/4 bg-yellow"></span>
											<span className="relative z-10 font-medium italic">
												App
												Development
											</span>
										</span>
									</>
								) : (
									heading
								)}
							</>
						) : (
							"Compliances & Certifications We Adhere to for Secure App Development"
						)}
					</h2>
					<p className="text-base md:text-lg text-white leading-relaxed max-w-4xl mx-auto">
						{description}
					</p>
				</motion.div>

				{/* Main Content Panels */}
				<motion.div
					className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.8,
						delay: 0.2,
						ease: "easeOut",
					}}
				>
					{/* Left Panel - Navigation/Category List */}
					<div
						className="p-6 md:p-8 space-y-0"
						style={{
							backgroundColor:
								"#ffe031",
							borderTopLeftRadius:
								"20px",
							borderBottomLeftRadius:
								"20px",
						}}
					>
						{categories.map(
							(category, index) => (
								<button
									key={
										index
									}
									onClick={() =>
										setActiveCategory(
											index
										)
									}
									className={`w-full text-left py-4 px-4 transition-all duration-300 cursor-pointer ${
										activeCategory ===
										index
											? "text-black"
											: "text-black/70 hover:text-black"
									}`}
								>
									<div className="flex items-center gap-4">
										<span className="text-xl md:text-2xl font-semibold">
											{
												category.number
											}
											.
										</span>
										<span className="text-base md:text-lg font-medium">
											{
												category.title
											}
										</span>
									</div>
									{index <
										categories.length -
											1 && (
										<div className="border-b border-black/30 mt-4"></div>
									)}
								</button>
							)
						)}
					</div>

					{/* Right Panel - Details */}
					{activeData && (
						<motion.div
							key={activeCategory}
							className="bg-gray-800 p-6 md:p-8"
							style={{
								borderTopRightRadius:
									"20px",
								borderBottomRightRadius:
									"20px",
							}}
							initial={{
								opacity: 0,
								x: 20,
							}}
							animate={{
								opacity: 1,
								x: 0,
							}}
							transition={{
								duration: 0.3,
								ease: "easeOut",
							}}
						>
							{/* Icon and Title */}
							<div className="flex items-center gap-4 mb-6">
								{activeData.icon && (
									<div
										className="w-12 h-12 rounded-lg flex items-center justify-center text-black"
										style={{
											backgroundColor:
												"#ffe031",
										}}
									>
										{
											activeData.icon
										}
									</div>
								)}
								<h3 className="text-xl md:text-2xl font-semibold text-white">
									{
										activeData.title
									}
								</h3>
							</div>

							{/* List of Regulations */}
							<div className="space-y-3">
								{activeData.items.map(
									(
										item,
										index
									) => (
										<a
											key={
												index
											}
											href={
												item.link ||
												"#"
											}
											className="flex items-center gap-3 text-white group hover:text-yellow transition-colors duration-200"
										>
											<div
												className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-black"
												style={{
													backgroundColor:
														"#ffe031",
												}}
											>
												<ArrowRight className="w-3 h-3" />
											</div>
											<span className="text-base md:text-lg border-b border-white/30 group-hover:border-yellow transition-colors duration-200">
												{
													item.name
												}
											</span>
										</a>
									)
								)}
							</div>
						</motion.div>
					)}
				</motion.div>
			</div>
		</section>
	)
}
