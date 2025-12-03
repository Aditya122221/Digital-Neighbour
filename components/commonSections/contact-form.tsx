"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

interface FormField {
	id: string
	name: string
	type: string
	label: string
	placeholder: string
	required: boolean
	validation?: {
		minLength?: number
		maxLength?: number
		pattern?: string
		required?: boolean
		errorMessage?: string
	}
	gridCols?: string
	options?: Array<{ value: string; label: string }>
	rows?: number
}

interface FormData {
	fields: FormField[]
	submitButton?: {
		text?: string
		type?: string
	}
	disclaimer?: {
		text?: string
		termsLink?: string
		privacyLink?: string
	}
	thankYouMessage?: {
		title?: string
		message?: string
		subMessage?: string
	}
}

interface ContactFormProps {
	formData: FormData
}

export default function ContactForm({ formData }: ContactFormProps) {
	const router = useRouter()
	const [formValues, setFormValues] = useState<Record<string, string>>({})
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [submitSuccess, setSubmitSuccess] = useState(false)

	const validateField = (field: FormField, value: string | undefined): string | null => {
		// Handle required validation
		if (field.required) {
			if (!value || (typeof value === "string" && !value.trim())) {
				return `${field.label} is required`
			}
		}

		// If no value and not required, skip further validation
		if (!value || (typeof value === "string" && !value.trim())) {
			return null
		}

		// Special handling for email fields - use a more permissive validation
		if (field.type === "email" && value) {
			const trimmedValue = value.trim()
			// Use a simple, permissive email pattern that accepts all valid emails
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			if (!emailPattern.test(trimmedValue)) {
				return field.validation?.errorMessage || "Please enter a valid email address"
			}
			// Email validation passed, return null (no errors)
			return null
		}

		// If no validation rules, return null
		if (!field.validation) {
			return null
		}

		const { minLength, maxLength, pattern, errorMessage } = field.validation

		// For select fields, we only check required (already done above)
		if (field.type === "select") {
			return null
		}

		// For text fields, apply validation rules
		if (minLength && value.length < minLength) {
			return errorMessage || `Minimum ${minLength} characters required`
		}

		if (maxLength && value.length > maxLength) {
			return errorMessage || `Maximum ${maxLength} characters allowed`
		}

		// For non-email fields, apply pattern validation
		if (pattern && field.type !== "email") {
			try {
				// Handle escaped patterns in JSON
				const cleanPattern = pattern.replace(/\\\\(.)/g, "$1")
				const regex = new RegExp(cleanPattern)
				if (!regex.test(value)) {
					return errorMessage || "Invalid format"
				}
			} catch (e) {
				console.error("Invalid regex pattern:", pattern, e)
				// If pattern is invalid, skip pattern validation
			}
		}

		return null
	}

		const handleChange = (
		fieldId: string,
		value: string,
		field: FormField,
	) => {
		setFormValues((prev) => ({ ...prev, [fieldId]: value }))

		// Clear error when user starts typing
		if (errors[fieldId]) {
			setErrors((prev) => {
				const newErrors = { ...prev }
				delete newErrors[fieldId]
				return newErrors
			})
		}

		// Clear success message when user starts typing
		if (submitSuccess) {
			setSubmitSuccess(false)
		}
	}

	const handleBlur = (field: FormField) => {
		const value = formValues[field.id]
		const error = validateField(field, value)
		if (error) {
			setErrors((prev) => ({ ...prev, [field.id]: error }))
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Clear previous errors
		setSubmitError(null)

		const newErrors: Record<string, string> = {}
		let isValid = true

		formData.fields.forEach((field) => {
			const value = formValues[field.id]
			const error = validateField(field, value)
			if (error) {
				newErrors[field.id] = error
				isValid = false
			}
		})

		setErrors(newErrors)

		if (!isValid) {
			return
		}

		setIsSubmitting(true)

		try {
			// Get current page path for source tracking
			const sourcePage = typeof window !== "undefined" ? window.location.pathname : "Contact Page"

			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formValues,
					sourcePage: sourcePage,
				}),
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || "Failed to submit form")
			}

			// Show success message immediately
			setSubmitSuccess(true)
			setSubmitError(null)
			setIsSubmitting(false)

			// Clear form values after showing success
			setTimeout(() => {
				setFormValues({})
			}, 300)
		} catch (error: any) {
			console.error("Error submitting form:", error)
			setSubmitError(
				error.message || "An error occurred. Please try again later."
			)
			setIsSubmitting(false)
		}
	}

	const renderField = (field: FormField) => {
		const hasError = !!errors[field.id]
		const baseInputClasses =
			"mt-2 w-full rounded-lg border bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-400 focus:outline-none"

		if (field.type === "select") {
			// Filter out empty string values as Radix UI Select doesn't allow them
			const validOptions = field.options?.filter((option) => option.value !== "") || []
			
			return (
				<div key={field.id} className={field.gridCols ? "" : "w-full"}>
					<Select
						value={formValues[field.id] || undefined}
						onValueChange={(value) => {
							handleChange(field.id, value, field)
						}}
					>
						<SelectTrigger
							className={`${baseInputClasses} ${hasError ? "border-red-500" : "border-gray-300"}`}
						>
							<SelectValue placeholder={field.placeholder} />
						</SelectTrigger>
						<SelectContent>
							{validOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{hasError && (
						<p className="mt-1 text-xs text-red-400">{errors[field.id]}</p>
					)}
				</div>
			)
		}

		if (field.type === "textarea") {
			return (
				<div key={field.id} className="w-full">
					<textarea
						id={field.id}
						name={field.name}
						rows={field.rows || 6}
						placeholder={field.placeholder}
						value={formValues[field.id] || ""}
						onChange={(e) => handleChange(field.id, e.target.value, field)}
						onBlur={() => handleBlur(field)}
						required={field.required}
						className={`${baseInputClasses} resize-none ${hasError ? "border-red-500" : "border-gray-300"}`}
					/>
					{hasError && (
						<p className="mt-1 text-xs text-red-400">{errors[field.id]}</p>
					)}
				</div>
			)
		}

		return (
			<div key={field.id} className={field.gridCols ? "" : "w-full"}>
				<input
					type={field.type}
					id={field.id}
					name={field.name}
					placeholder={field.placeholder}
					value={formValues[field.id] || ""}
					onChange={(e) => handleChange(field.id, e.target.value, field)}
					onBlur={() => handleBlur(field)}
					required={field.required}
					className={`${baseInputClasses} ${hasError ? "border-red-500" : "border-gray-300"}`}
				/>
				{hasError && (
					<p className="mt-1 text-xs text-red-400">{errors[field.id]}</p>
				)}
			</div>
		)
	}

	// Group fields that should be in a grid
	const groupedFields: FormField[][] = []
	let currentGroup: FormField[] = []
	let currentGridCols: string | undefined

	formData.fields.forEach((field) => {
		if (field.gridCols) {
			if (currentGridCols && currentGridCols !== field.gridCols) {
				groupedFields.push([...currentGroup])
				currentGroup = []
			}
			currentGroup.push(field)
			currentGridCols = field.gridCols
		} else {
			if (currentGroup.length > 0) {
				groupedFields.push([...currentGroup])
				currentGroup = []
				currentGridCols = undefined
			}
			groupedFields.push([field])
		}
	})

	if (currentGroup.length > 0) {
		groupedFields.push(currentGroup)
	}

	// Thank you message content from Sanity or default
	const thankYouTitle = formData.thankYouMessage?.title || "Thank You! 🎉"
	const thankYouMessageText = formData.thankYouMessage?.message || "Your message has been sent successfully. We'll get back to you soon!"
	const thankYouSubMessage = formData.thankYouMessage?.subMessage || ""

	return (
		<div className="rounded-xl bg-white p-8 shadow-lg relative overflow-hidden">
			{/* Success Message Overlay - Replaces the form */}
			{submitSuccess && (
				<div
					data-success-message
					className="absolute inset-0 z-50 flex items-center justify-center bg-white rounded-xl p-8 animate-fade-in"
					style={{
						animation: "fadeIn 0.5s ease-in-out",
					}}
				>
					<div className="text-center max-w-md w-full">
						{/* Success Icon */}
						<div className="mb-6 flex justify-center">
							<div className="relative">
								<div className="w-20 h-20 bg-gradient-to-br from-[#5D50EB] to-[#0e0e59] rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
									<svg
										className="h-10 w-10 text-white"
										fill="none"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="3"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path d="M5 13l4 4L19 7" />
									</svg>
								</div>
								{/* Animated rings */}
								<div className="absolute inset-0 rounded-full border-4 border-[#5D50EB] opacity-20 animate-ping"></div>
								<div className="absolute inset-0 rounded-full border-4 border-[#5D50EB] opacity-10 animate-pulse"></div>
							</div>
						</div>

						{/* Title */}
						<h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#5D50EB] to-[#0e0e59] bg-clip-text text-transparent mb-4">
							{thankYouTitle}
						</h3>

						{/* Message */}
						<p className="text-lg text-gray-700 leading-relaxed mb-4">
							{thankYouMessageText}
						</p>

						{/* Sub Message */}
						{thankYouSubMessage && (
							<p className="text-base text-gray-600 leading-relaxed">
								{thankYouSubMessage}
							</p>
						)}
					</div>
				</div>
			)}

			{/* Form - Hidden when success is shown */}
			<form
				onSubmit={handleSubmit}
				className={`space-y-6 transition-opacity duration-500 ${
					submitSuccess ? "opacity-0 pointer-events-none" : "opacity-100"
				}`}
			>
				{groupedFields.map((group, groupIndex) => {
					const firstField = group[0]
					if (group.length > 1 && firstField.gridCols) {
						return (
							<div
								key={`group-${groupIndex}`}
								className={`grid grid-cols-1 gap-4 ${firstField.gridCols}`}
							>
								{group.map((field) => renderField(field))}
							</div>
						)
					}
					return (
						<div key={`group-${groupIndex}`}>
							{group.map((field) => renderField(field))}
						</div>
					)
				})}

				{/* Disclaimer */}
				{formData.disclaimer?.text && (
					<p className="text-xs leading-relaxed text-gray-500">
						{formData.disclaimer.text}
					</p>
				)}

				{/* Submit Error Message */}
				{submitError && (
					<div className="rounded-lg bg-red-50 border border-red-200 p-4">
						<p className="text-sm text-red-600">{submitError}</p>
					</div>
				)}

				{/* Submit Button */}
				<div className="flex justify-end pt-2">
					<button
						type="submit"
						disabled={isSubmitting}
						className="rounded-lg bg-[#5D50EB] px-8 py-3 font-semibold text-white transition-all hover:bg-[#564fa5] disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isSubmitting
							? "Submitting..."
							: formData.submitButton?.text || "Submit"}
					</button>
				</div>
			</form>

			{/* Add CSS animation for fade-in */}
			<style jsx>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	)
}

