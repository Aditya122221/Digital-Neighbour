import ResourcesGrid from "@/components/resources/grid"
import ResourcesHero from "@/components/resources/hero"
import Navbar from "@/components/core/navbar"
import Footer from "@/components/core/footer"

export const metadata = {
	title: "Resources | Digital Neighbour",
	description:
		"Explore insights on marketing, branding, social media, and growth. Curated by Digital Neighbour.",
}

export default function ResourcesPage() {
	return (
		<main className="flex min-h-screen w-full flex-col">
			<div className="relative">
				<Navbar />
				<ResourcesHero />
			</div>
			<div className="flex gap-4 justify-center items-center mt-5 px-4 max-w-7xl mx-auto">
				{/* First Card - Marketing */}
				<div className="relative w-1/2 rounded-lg overflow-hidden group cursor-pointer">
					<div className="relative h-[500px]">
						<img
							src="/firstimage.avif"
							alt="Marketing on a Budget"
							className="w-full h-full object-cover"
						/>
						{/* Dark overlay on lower portion */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />

						{/* Category tag */}
						<div className="absolute top-4 left-4 z-10">
							<span className="bg-white text-black uppercase text-xs font-semibold px-3 py-1.5 rounded-full">
								Marketing
							</span>
						</div>
						{/* Title and metadata */}
						<div className="absolute bottom-0 left-0 right-0 p-6 z-10">
							<h3 className="text-white text-2xl font-serif mb-2 leading-tight">
								Marketing on a
								Budget: How to
								Get Big Results
								with Small
								Spends
							</h3>
							<p className="text-white text-sm font-sans opacity-90">
								Mar 2, 2025 • By
							</p>
						</div>
					</div>
				</div>

				{/* Second Card - Social Media */}
				<div className="relative w-1/2 rounded-lg overflow-hidden group cursor-pointer">
					<div className="relative h-[500px]">
						<img
							src="/secondimage.avif"
							alt="Social Media Strategies"
							className="w-full h-full object-cover"
						/>
						{/* Dark overlay on lower portion */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />

						{/* Category tag */}
						<div className="absolute top-4 left-4 z-10">
							<span className="bg-white text-black uppercase text-xs font-semibold px-3 py-1.5 rounded-full">
								Social Media
							</span>
						</div>

						{/* Title and metadata */}
						<div className="absolute bottom-0 left-0 right-0 p-6 z-10">
							<h3 className="text-white text-2xl font-serif mb-2 leading-tight">
								Social Media
								Strategies That
								Actually Work
							</h3>
							<p className="text-white text-sm font-sans opacity-90">
								Mar 2, 2025 • By
							</p>
						</div>
					</div>
				</div>
			</div>
			<ResourcesGrid />
			<Footer />
		</main>
	)
}
