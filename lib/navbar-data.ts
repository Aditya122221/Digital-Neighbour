import { sanityFetch } from "@/sanity/lib/fetch"
import { navbarQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"

export interface NavbarNavigationLink {
	label: string
	href: string
	hasMegaMenu?: boolean
	megaMenuCategoryKey?: string
}

export interface NavbarService {
	label: string
	href: string
	icon?: {
		asset?: {
			_id: string
			url: string
		}
	}
	emoji?: string
}

export interface NavbarColumn {
	title: string
	href: string
	services: NavbarService[]
}

export interface NavbarMegaMenuCategory {
	key: string
	title: string
	isDefault: boolean
	columns: NavbarColumn[]
}

export interface NavbarData {
	logo?: {
		asset?: {
			_id: string
			url: string
		}
		alt?: string
		href?: string
	}
	ctaButton?: {
		label: string
		href: string
		variant: string
	}
	navigationLinks?: NavbarNavigationLink[]
	megaMenuCategories?: NavbarMegaMenuCategory[]
	mobileNavigationOverrides?: NavbarNavigationLink[]
}

/**
 * Get navbar data from Sanity
 */
export async function getNavbarData(): Promise<NavbarData | null> {
	try {
		const data = await sanityFetch<NavbarData>({
			query: navbarQuery,
			tag: "navbar",
		})

		// Transform logo image URL without forcing a square crop
		if (data?.logo) {
			data.logo = {
				...data.logo,
				asset: data.logo.asset
					? {
							...data.logo.asset,
							// Keep original aspect ratio and just constrain max width
							url: urlForImage(data.logo).width(300).url(),
						}
					: undefined,
			}
		}

		// Transform service icon URLs
		if (data?.megaMenuCategories) {
			data.megaMenuCategories = data.megaMenuCategories.map((category) => ({
				...category,
				columns: category.columns.map((column) => ({
					...column,
					services: column.services.map((service) => {
						if (service.icon) {
							return {
								...service,
								icon: {
									...service.icon,
									asset: service.icon.asset
										? {
												...service.icon.asset,
												url: urlForImage(service.icon)
													.width(40)
													.height(40)
													.url(),
											}
										: undefined,
								},
							}
						}
						return service
					}),
				})),
			}))
		}

		return data
	} catch (error) {
		console.error("Error fetching navbar data from Sanity:", error)
		return null
	}
}

