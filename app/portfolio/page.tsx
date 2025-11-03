import type { Metadata } from "next"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import PortfolioHero from "@/components/portfolio/hero"
import PortfolioGrid from "@/components/portfolio/portfolio-grid"

export const metadata: Metadata = {
	title: "Portfolio - Success Stories | Digital Neighbour",
	description:
		"Explore our portfolio of successful projects and case studies. See how Digital Neighbour has helped brands achieve remarkable growth and measurable results.",
}

export default function PortfolioPage() {
	return (
		<main className="flex min-h-screen w-full flex-col bg-gray-50">
			<div className="relative">
				<Navbar />
				<PortfolioHero />
			</div>
			<PortfolioGrid />
			<Footer />
		</main>
	)
}

