import type { Metadata } from "next"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"
import AboutHero from "@/components/about/hero"
import Origins from "@/components/about/origins"
import Values from "@/components/about/values"
import Achievements from "@/components/about/achievements"
import Team from "@/components/about/team"
import BookACall from "@/components/homepage/bookacall"

export const metadata: Metadata = {
	title: "About Us - Team Behind Your Brand's Growth | Digital Neighbour",
	description:
		"Meet the team of storytellers, strategists, and problem-solvers dedicated to helping brands grow and connect with their audiences. Learn about our values, achievements, and the people behind Digital Neighbour.",
}

export default function AboutPage() {
	return (
		<main>
			<div className="relative">
				<Navbar />
				<AboutHero />
			</div>
			<Origins />
			<Values />
			<Achievements />
			<Team />
			<Footer />
		</main>
	)
}
