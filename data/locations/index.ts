export interface LocationNode {
	name: string
	slug?: string
	children?: LocationNode[]
}

export interface LocationMeta {
	slug: string
	name: string
	parentSlug?: string
	ancestors: string[]
	children: string[]
	path: string[]
	depth: number
}

interface InternalNode extends LocationNode {
	slug: string
	children?: InternalNode[]
}

const locationTree: LocationNode[] = [
	{
		name: "North Island",
		children: [
			{
				name: "Northland",
				children: [
					{ name: "Whangarei" },
					{ name: "Kerikeri" },
					{ name: "Waipapa" },
					{ name: "Paihia" },
					{ name: "Kaikohe" },
					{ name: "Kaitaia" },
				],
			},
			{
				name: "Auckland",
				children: [
					{
						name: "Central Auckland",
						children: [
							{ name: "Parnell" },
							{ name: "Newmarket" },
							{ name: "Grafton" },
							{ name: "Ponsonby" },
							{ name: "Grey Lynn" },
							{
								name: "Eden Terrace",
							},
							{ name: "Kingsland" },
							{ name: "Mount Eden" },
							{
								name: "Mount Wellington",
							},
						],
					},
					{
						name: "North Shore",
						children: [
							{ name: "Takapuna" },
							{ name: "Albany" },
							{ name: "Rosedale" },
							{
								name: "Wairau Valley",
							},
							{ name: "Glenfield" },
							{
								name: "North Harbour",
							},
							{ name: "Devonport" },
							{ name: "Milford" },
							{ name: "Browns Bay" },
						],
					},
					{
						name: "East Auckland",
						children: [
							{ name: "Botany" },
							{ name: "Howick" },
							{ name: "Pakuranga" },
							{ name: "East Tamaki" },
							{ name: "Flat Bush" },
							{ name: "Highbrook" },
							{ name: "Panmure" },
						],
					},
					{
						name: "South Auckland",
						children: [
							{ name: "Manukau" },
							{ name: "Wiri" },
							{ name: "Papatoetoe" },
							{ name: "Otahuhu" },
							{ name: "Mangere" },
							{ name: "Takanini" },
							{ name: "Papakura" },
							{ name: "Drury" },
						],
					},
					{
						name: "West Auckland",
						children: [
							{ name: "Henderson" },
							{ name: "New Lynn" },
							{ name: "Avondale" },
							{ name: "Kelston" },
							{ name: "Hobsonville" },
							{ name: "Te Atatu" },
						],
					},
				],
			},
			{
				name: "Waikato",
				children: [
					{
						name: "Hamilton",
						children: [
							{ name: "Te Rapa" },
							{ name: "Frankton" },
							{ name: "Ruakura" },
							{ name: "Rototuna" },
							{ name: "Chartwell" },
						],
					},
					{ name: "Cambridge" },
					{ name: "Te Awamutu" },
					{
						name: "Taupo",
						children: [
							{ name: "Broadlands" },
							{ name: "Rotokawa" },
						],
					},
					{ name: "Ngaruawahia" },
				],
			},
			{
				name: "Bay of Plenty",
				children: [
					{
						name: "Tauranga",
						children: [
							{ name: "Papamoa" },
							{ name: "Greerton" },
							{ name: "Bethlehem" },
						],
					},
					{
						name: "Rotorua",
						children: [
							{
								name: "Fairy Springs",
							},
							{
								name: "Ngapuna",
								slug: "ngapuna-rotorua",
							},
						],
					},
					{
						name: "Whakatane",
						children: [
							{
								name: "The Strand",
								slug: "the-strand-whakatane",
							},
							{
								name: "Mill Road",
								slug: "mill-road-whakatane",
							},
						],
					},
				],
			},
			{
				name: "Gisborne",
				children: [
					{
						name: "Awapuni",
						slug: "awapuni-gisborne",
					},
					{ name: "Makaraka" },
				],
			},
			{
				name: "Hawkes Bay",
				children: [
					{
						name: "Napier",
						children: [
							{ name: "Ahuriri" },
							{ name: "Onekawa" },
							{ name: "Pandora" },
						],
					},
					{
						name: "Hastings",
						children: [
							{ name: "Omahu" },
							{ name: "Tomoana" },
							{
								name: "Havelock North",
							},
						],
					},
				],
			},
			{
				name: "Taranaki",
				children: [
					{
						name: "New Plymouth",
						children: [
							{ name: "Bell Block" },
							{ name: "Waiwhakaiho" },
							{ name: "Strandon" },
						],
					},
					{
						name: "Hawera",
						children: [
							{
								name: "South Taranaki",
							},
						],
					},
				],
			},
			{
				name: "Manawatu Whanganui",
				children: [
					{
						name: "Palmerston North",
						children: [
							{
								name: "Kelvin Grove",
							},
							{ name: "Milson" },
							{
								name: "Awapuni",
								slug: "awapuni-palmerston-north",
							},
						],
					},
					{
						name: "Whanganui",
						children: [
							{ name: "Castlecliff" },
							{ name: "Gonville" },
						],
					},
					{
						name: "Levin",
						children: [{ name: "Taitoko" }],
					},
				],
			},
			{
				name: "Wellington",
				children: [
					{
						name: "Wellington City",
						children: [
							{ name: "Te Aro" },
							{ name: "Thorndon" },
							{ name: "Miramar" },
							{ name: "Kilbirnie" },
							{ name: "Ngauranga" },
							{
								name: "Johnsonville",
							},
							{ name: "Newtown" },
						],
					},
					{
						name: "Lower Hutt",
						children: [
							{ name: "Petone" },
							{ name: "Seaview" },
							{ name: "Gracefield" },
						],
					},
					{
						name: "Upper Hutt",
						children: [
							{ name: "Trentham" },
							{
								name: "Silverstream",
							},
						],
					},
					{
						name: "Porirua",
						children: [
							{ name: "Kenepuru" },
							{ name: "Mana" },
							{ name: "Titahi Bay" },
						],
					},
					{
						name: "Kapiti Coast",
						children: [
							{ name: "Paraparaumu" },
							{ name: "Waikanae" },
							{ name: "Otaki" },
						],
					},
					{
						name: "Masterton",
						children: [
							{ name: "Solway" },
							{ name: "Waingawa" },
						],
					},
				],
			},
		],
	},
	{
		name: "South Island",
		children: [
			{
				name: "Tasman",
				children: [{ name: "Richmond" }],
			},
			{
				name: "Nelson",
				children: [{ name: "Tahunanui" }],
			},
			{
				name: "Marlborough",
				children: [
					{ name: "Blenheim" },
					{ name: "Springlands" },
				],
			},
			{
				name: "West Coast",
				children: [
					{
						name: "Greymouth",
						children: [{ name: "Cobden" }],
					},
					{ name: "Hokitika" },
					{ name: "Westport" },
				],
			},
			{
				name: "Canterbury",
				children: [
					{
						name: "Christchurch",
						children: [
							{ name: "Riccarton" },
							{ name: "Addington" },
							{ name: "Sydenham" },
							{ name: "Hornby" },
							{ name: "Wigram" },
							{ name: "Papanui" },
							{ name: "Belfast" },
							{ name: "Ferrymead" },
						],
					},
					{
						name: "Selwyn",
						children: [
							{ name: "Lincoln" },
							{ name: "Prebbleton" },
						],
					},
					{
						name: "Waimakariri",
						children: [
							{ name: "Rangiora" },
							{ name: "Kaiapoi" },
							{ name: "Woodend" },
						],
					},
					{
						name: "Ashburton",
						children: [],
					},
					{
						name: "Timaru",
						children: [
							{ name: "Washdyke" },
							{ name: "Port Timaru" },
						],
					},
				],
			},
			{
				name: "Otago",
				children: [
					{
						name: "Dunedin",
						children: [
							{
								name: "South Dunedin",
							},
							{ name: "Mosgiel" },
							{
								name: "Kaikorai Valley",
							},
						],
					},
					{
						name: "Queenstown",
						children: [
							{ name: "Arrowtown" },
						],
					},
					{ name: "Wanaka" },
					{ name: "Oamaru" },
				],
			},
			{
				name: "Southland",
				children: [
					{ name: "Invercargill" },
					{ name: "Gore" },
				],
			},
		],
	},
]

function slugify(value: string): string {
	return value
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/&/g, "and")
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim()
}

function buildTree(
	nodes: LocationNode[],
	parent?: InternalNode,
	slugCounts = new Map<string, number>()
) {
	return nodes.map<InternalNode>((node) => {
		const parentSlug = parent?.slug
		const baseSlug = node.slug ?? slugify(node.name)
		const slugCount = slugCounts.get(baseSlug) ?? 0
		let slug = baseSlug

		if (slugCount > 0) {
			const suffixBase = parentSlug
				? `${baseSlug}-${parentSlug}`
				: `${baseSlug}-nz`
			let candidate = suffixBase
			let counter = 2
			while (slugCounts.has(candidate)) {
				candidate = `${suffixBase}-${counter}`
				counter += 1
			}
			slug = candidate
			slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1)
		}

		slugCounts.set(baseSlug, slugCount + 1)

		let children: InternalNode[] | undefined

		if (node.children) {
			const parentNode: InternalNode = {
				name: node.name,
				slug,
				children: [],
			}
			children = buildTree(
				node.children,
				parentNode,
				slugCounts
			)
		}

		const result: InternalNode = {
			...node,
			slug,
			children,
		}

		return result
	})
}

const internalTree = buildTree(locationTree)

function flattenTree(
	nodes: InternalNode[],
	ancestors: string[] = [],
	path: string[] = []
) {
	const entries: Record<string, LocationMeta> = {}

	nodes.forEach((node) => {
		const currentPath = [...path, node.name]
		const currentAncestors = [...ancestors]
		if (currentAncestors.length === 0) {
			// no-op
		}

		const childSlugs =
			node.children?.map((child) => child.slug) ?? []

		entries[node.slug] = {
			slug: node.slug,
			name: node.name,
			parentSlug:
				ancestors.length > 0
					? ancestors[ancestors.length - 1]
					: undefined,
			ancestors: [...ancestors],
			children: childSlugs,
			path: currentPath,
			depth: ancestors.length,
		}

		if (node.children) {
			Object.assign(
				entries,
				flattenTree(
					node.children,
					[...ancestors, node.slug],
					currentPath
				)
			)
		}
	})

	return entries
}

export const LOCATION_TREE = internalTree

export const LOCATION_METADATA: Record<string, LocationMeta> =
	flattenTree(internalTree)

export function getLocationMeta(slug: string): LocationMeta | undefined {
	return LOCATION_METADATA[slug]
}

export function getDescendantSlugs(slug: string, includeSelf = true): string[] {
	const meta = getLocationMeta(slug)
	if (!meta) {
		return []
	}

	const result: string[] = []
	if (includeSelf) {
		result.push(slug)
	}

	const stack = [...(meta.children ?? [])]

	while (stack.length > 0) {
		const current = stack.pop()!
		result.push(current)
		const children = LOCATION_METADATA[current]?.children ?? []
		stack.push(...children)
	}

	return result
}

export function listAllLocationSlugs(): string[] {
	return Object.keys(LOCATION_METADATA)
}

export const ALL_LOCATION_SLUGS = listAllLocationSlugs()

export function formatLocationPath(slug: string): string[] {
	const meta = getLocationMeta(slug)
	return meta ? meta.path : []
}

export { slugify }
