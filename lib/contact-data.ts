import { sanityFetch } from "@/sanity/lib/fetch";
import { contactPageQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import contactDataJson from "@/data/contact.json";

type ContactPageData = {
	metadata?: {
		title?: string;
		description?: string;
	};
	hero?: {
		heading?: string;
		highlightWord?: string;
		headingSuffix?: string;
		presenter?: {
			name?: string;
			title?: string;
			image?: string;
		};
		benefits?: {
			title?: string;
			items?: Array<{
				id?: number;
				text?: string;
				icon?: string;
			}>;
		};
	};
	form?: {
		fields?: Array<{
			id?: string;
			name?: string;
			type?: string;
			label?: string;
			placeholder?: string;
			required?: boolean;
			validation?: {
				minLength?: number;
				maxLength?: number;
				pattern?: string;
				errorMessage?: string;
			};
			gridCols?: string;
			options?: Array<{
				value?: string;
				label?: string;
			}>;
			rows?: number;
		}>;
		submitButton?: {
			text?: string;
			type?: string;
		};
		disclaimer?: {
			text?: string;
			termsLink?: string;
			privacyLink?: string;
		};
		thankYouMessage?: {
			title?: string;
			message?: string;
			subMessage?: string;
		};
	};
};

const getImageUrl = (image: any): string => {
	if (!image) return "";
	if (typeof image === "string") return image;
	if (image.asset?.url) {
		return image.asset.url;
	}
	if (image.asset?._ref) {
		try {
			return urlForImage(image).url();
		} catch {
			return "";
		}
	}
	return "";
};

function transformSanityData(sanityData: any): ContactPageData | null {
	if (!sanityData) return null;

	const settings = sanityData.settings ?? {};
	const heroDoc = sanityData.hero ?? {};
	const formDoc = sanityData.form ?? {};

	return {
		metadata: {
			title: settings.title || settings.metadata || "",
			description: settings.description || "",
		},
		hero: {
			heading: heroDoc.heading || "",
			highlightWord: heroDoc.highlightWord || "",
			headingSuffix: heroDoc.headingSuffix || "",
			presenter: heroDoc.presenter
				? {
						name: heroDoc.presenter.name || "",
						title: heroDoc.presenter.title || "",
						image: getImageUrl(heroDoc.presenter.image),
					}
				: undefined,
			benefits: heroDoc.benefits
				? {
						title: heroDoc.benefits.title || "",
						items:
							heroDoc.benefits.items?.map((item: any) => ({
								id: item.id || 0,
								text: item.text || "",
								icon: getImageUrl(item.icon),
							})) || [],
					}
				: undefined,
		},
		form: {
			fields:
				formDoc.fields?.map((field: any) => ({
					id: field.id || "",
					name: field.name || "",
					type: field.type || "text",
					label: field.label || "",
					placeholder: field.placeholder || "",
					required: field.required || false,
					gridCols: field.gridCols || undefined,
					rows: field.rows || undefined,
					options: field.options?.map((opt: any) => ({
						value: opt.value || "",
						label: opt.label || "",
					})),
					validation: field.validation
						? {
								minLength: field.validation.minLength,
								maxLength: field.validation.maxLength,
								pattern: field.validation.pattern,
								errorMessage: field.validation.errorMessage,
							}
						: undefined,
				})) || [],
			submitButton: formDoc.submitButton
				? {
						text: formDoc.submitButton.text || "Submit",
						type: formDoc.submitButton.type || "submit",
					}
				: undefined,
			disclaimer: formDoc.disclaimer
				? {
						text: formDoc.disclaimer.text || "",
						termsLink: formDoc.disclaimer.termsLink || "/terms",
						privacyLink: formDoc.disclaimer.privacyLink || "/privacy",
					}
				: undefined,
			thankYouMessage: formDoc.thankYouMessage
				? {
						title: formDoc.thankYouMessage.title || "Thank You! 🎉",
						message: formDoc.thankYouMessage.message || "",
						subMessage: formDoc.thankYouMessage.subMessage || "",
					}
				: undefined,
		},
	};
}

export async function getContactPageData(): Promise<ContactPageData> {
	try {
		const sanityData = await sanityFetch<{
			settings?: any;
			hero?: any;
			form?: any;
		}>({
			query: contactPageQuery,
			perspective: "published",
			staleTime: 60 * 1000, // 60 seconds
		});

		const transformed = transformSanityData(sanityData);

		if (transformed) {
			// Merge with JSON fallback, prioritizing Sanity data
			return {
				metadata: {
					title:
						transformed.metadata?.title ||
						contactDataJson.metadata.title ||
						"",
					description:
						transformed.metadata?.description ||
						contactDataJson.metadata.description ||
						"",
				},
				hero: {
					...contactDataJson.hero,
					...transformed.hero,
					presenter: transformed.hero?.presenter || contactDataJson.hero.presenter,
					benefits: transformed.hero?.benefits || contactDataJson.hero.benefits,
				},
				form: {
					...contactDataJson.form,
					...transformed.form,
					thankYouMessage: transformed.form?.thankYouMessage || contactDataJson.form?.thankYouMessage,
				},
			};
		}
	} catch (error) {
		console.error("Error fetching contact page data from Sanity:", error);
	}

	// Fallback to JSON
	return contactDataJson as ContactPageData;
}

export type { ContactPageData };

