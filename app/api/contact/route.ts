import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

// Helper function to format field names nicely
const formatFieldName = (fieldName: string): string => {
	// Convert camelCase or snake_case to Title Case
	return fieldName
		.replace(/([A-Z])/g, " $1")
		.replace(/_/g, " ")
		.replace(/sourcePage/g, "")
		.split(" ")
		.map(
			(word) =>
				word.charAt(0).toUpperCase() +
				word.slice(1).toLowerCase()
		)
		.join(" ")
		.trim()
}

// Helper function to format email content dynamically based on form data
const formatEmailContent = (
	formData: any,
	formType: string = "contact",
	sourcePage?: string
) => {
	const {
		firstName,
		lastName,
		email,
		phone,
		website,
		sourcePage: _sourcePage,
		...otherFields
	} = formData

	// Get company name from environment or use default
	const companyName = process.env.COMPANY_NAME || "Digital Neighbour"

	// Get user's name for subject line only
	const userName =
		firstName && lastName
			? `${firstName} ${lastName}`
			: firstName ||
				lastName ||
				email?.split("@")[0] ||
				"User"
	const greeting = "Hi Team,"

	// Determine form type and format subject accordingly
	let emailSubject: string
	let formSource = sourcePage || "Contact Form"

	if (formType === "simple" || website) {
		emailSubject = `🎯 New Lead: ${website || "Website Inquiry"} - ${userName}`
	} else {
		emailSubject = `📧 New Contact Form Submission from ${userName}`
	}

	// Build fields array from all form data
	const fields: Array<{ label: string; value: string }> = []
	const processedKeys = new Set<string>()

	// Add common fields first if they exist with better labels
	if (firstName || lastName) {
		const fullName = `${firstName || ""} ${lastName || ""}`.trim()
		if (fullName) {
			fields.push({ label: "Full Name", value: fullName })
			processedKeys.add("firstName")
			processedKeys.add("lastName")
		}
	}

	if (email) {
		fields.push({ label: "Email Address", value: email })
		processedKeys.add("email")
	}

	if (website) {
		fields.push({ label: "Website", value: website })
		processedKeys.add("website")
	}

	if (phone) {
		fields.push({ label: "Phone Number", value: phone })
		processedKeys.add("phone")
	}

	// Add all other fields dynamically (exclude already processed and system fields)
	Object.keys(formData).forEach((key) => {
		if (
			key !== "sourcePage" &&
			!processedKeys.has(key) &&
			formData[key] !== null &&
			formData[key] !== undefined &&
			formData[key] !== ""
		) {
			const formattedLabel = formatFieldName(key)
			if (formattedLabel) {
				fields.push({
					label: formattedLabel,
					value: String(formData[key]),
				})
			}
		}
	})

	// Get current date and time
	const now = new Date()
	const timestamp = now.toLocaleString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	})

	const emailHtml = `
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<title>New Form Submission</title>
				<!--[if mso]>
				<style type="text/css">
					table {border-collapse:collapse;border-spacing:0;margin:0;}
					div, td {padding:0;}
					div {margin:0 !important;}
				</style>
				<![endif]-->
				<style>
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}
					body {
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
						line-height: 1.6;
						color: #1a1a1a;
						background: #f5f7fa;
						padding: 0;
						margin: 0;
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
					}
					.email-wrapper {
						width: 100%;
						max-width: 680px;
						margin: 0 auto;
						background: #f5f7fa;
						padding: 40px 20px;
					}
					.email-container {
						width: 100%;
						background-color: #ffffff;
						border-radius: 16px;
						overflow: hidden;
						box-shadow: 0 8px 24px rgba(14, 14, 89, 0.12);
					}
					.email-header {
						background: linear-gradient(135deg, #5D50EB 0%, #0e0e59 100%);
						color: white;
						padding: 48px 40px 40px;
						text-align: center;
						position: relative;
					}
					.email-header h1 {
						font-size: 28px;
						font-weight: 700;
						margin: 0 0 10px 0;
						letter-spacing: -0.5px;
						color: #ffffff;
					}
					.email-header p {
						font-size: 15px;
						opacity: 0.95;
						margin: 0;
						color: rgba(255, 255, 255, 0.95);
					}
					.email-body {
						padding: 40px;
						background-color: #ffffff;
					}
					.greeting-section {
						margin-bottom: 32px;
						padding-bottom: 24px;
						border-bottom: 2px solid #f0f2f5;
					}
					.greeting {
						font-size: 22px;
						font-weight: 700;
						color: #0e0e59;
						margin-bottom: 10px;
					}
					.intro-text {
						font-size: 15px;
						color: #4a5568;
						line-height: 1.7;
						margin: 0;
					}
					.fields-list {
						margin-bottom: 32px;
					}
					.field-item {
						margin-bottom: 16px;
						padding-bottom: 16px;
						border-bottom: 1px solid #e8ecf1;
					}
					.field-item:last-child {
						border-bottom: none;
						margin-bottom: 0;
						padding-bottom: 0;
					}
					.field-label {
						font-size: 14px;
						font-weight: 600;
						color: #0e0e59;
						margin-bottom: 4px;
					}
					.field-value {
						font-size: 16px;
						color: #1a1a1a;
						word-break: break-word;
						line-height: 1.6;
						white-space: pre-wrap;
					}
					.field-value a {
						color: #5D50EB;
						text-decoration: none;
					}
					.source-badge {
						display: inline-block;
						background: #0e0e59;
						color: white;
						padding: 8px 16px;
						border-radius: 20px;
						font-size: 12px;
						font-weight: 600;
						letter-spacing: 0.5px;
						margin-bottom: 32px;
					}
					.actions-section {
						background: linear-gradient(135deg, #f8f9fc 0%, #ffffff 100%);
						border-radius: 12px;
						padding: 28px;
						border: 1px solid #e8ecf1;
						margin-top: 32px;
					}
					.actions-title {
						font-size: 16px;
						font-weight: 700;
						color: #0e0e59;
						margin-bottom: 20px;
						display: flex;
						align-items: center;
						gap: 8px;
					}
					.actions-buttons {
						display: table;
						width: 100%;
						border-collapse: separate;
						border-spacing: 12px 0;
					}
					.cta-button {
						display: table-cell;
						background: linear-gradient(135deg, #5D50EB 0%, #4a3fd8 100%);
						color: #ffffff !important;
						padding: 14px 24px;
						border-radius: 10px;
						text-decoration: none;
						font-weight: 600;
						font-size: 14px;
						text-align: center;
						vertical-align: middle;
						white-space: nowrap;
					}
					.cta-button-secondary {
						background: linear-gradient(135deg, #0e0e59 0%, #1a1a3a 100%);
					}
					.button-content {
						display: inline-flex;
						align-items: center;
						gap: 8px;
						vertical-align: middle;
					}
					.footer-info {
						background: linear-gradient(135deg, #0e0e59 0%, #1a1a3a 100%);
						color: white;
						padding: 32px 40px;
						text-align: center;
					}
					.footer-info h3 {
						font-size: 18px;
						font-weight: 700;
						margin: 0 0 8px 0;
						color: #ffffff;
					}
					.footer-info p {
						margin: 6px 0;
						font-size: 13px;
						color: rgba(255, 255, 255, 0.85);
						line-height: 1.6;
					}
					.footer-info .timestamp {
						color: rgba(255, 255, 255, 0.7);
						font-size: 12px;
						margin-top: 12px;
					}
					.footer-info .automated-notice {
						font-size: 11px;
						color: rgba(255, 255, 255, 0.6);
						margin-top: 16px;
						padding-top: 16px;
						border-top: 1px solid rgba(255, 255, 255, 0.1);
					}
					@media only screen and (max-width: 600px) {
						.email-wrapper {
							padding: 20px 10px;
						}
						.email-header {
							padding: 36px 24px 32px;
						}
						.email-header h1 {
							font-size: 24px;
						}
						.email-body {
							padding: 28px 24px;
						}
						.actions-buttons {
							display: block;
							border-spacing: 0;
						}
						.cta-button {
							display: block;
							width: 100%;
							margin-bottom: 12px;
							text-align: center;
						}
					}
				</style>
			</head>
			<body>
				<div class="email-wrapper">
					<div class="email-container">
						<!-- Header -->
						<div class="email-header">
							<h1>New Form Submission</h1>
							<p>You have received a new inquiry from your website</p>
						</div>
						
						<!-- Body -->
						<div class="email-body">
							<div class="greeting-section">
								<div class="greeting">${greeting}</div>
								<p class="intro-text">
									You have received a new ${formType === "simple" ? "lead inquiry" : "contact form submission"} from your website. All the details are provided below for your review.
								</p>
							</div>
							
							<div class="fields-list">
								${fields
									.map(
										(
											field
										) => {
											// Make email, phone, and website clickable
											let valueHtml =
												field.value.replace(
													/\n/g,
													"<br>"
												)
											if (
												field.label ===
													"Email Address" &&
												field.value
											) {
												valueHtml = `<a href="mailto:${field.value}" style="color: #5D50EB; text-decoration: none;">${field.value}</a>`
											} else if (
												field.label ===
													"Phone Number" &&
												field.value
											) {
												valueHtml = `<a href="tel:${field.value}" style="color: #5D50EB; text-decoration: none;">${field.value}</a>`
											} else if (
												field.label ===
													"Website" &&
												field.value
											) {
												const url =
													field.value.startsWith(
														"http"
													)
														? field.value
														: `https://${field.value}`
												valueHtml = `<a href="${url}" target="_blank" style="color: #5D50EB; text-decoration: none;">${field.value}</a>`
											}

											return `
								<div class="field-item">
									<div class="field-label">${field.label}:</div>
									<div class="field-value">${valueHtml}</div>
								</div>
							`
										}
									)
									.join(
										""
									)}
							</div>
							
							${sourcePage ? `<div class="source-badge">📍 Source: ${sourcePage}</div>` : ""}
							
							<div class="actions-section">
								<div class="actions-title">Quick Actions</div>
								<table class="actions-buttons" cellpadding="0" cellspacing="0" border="0">
									<tr>
										<td style="width: 50%;">
											<a href="mailto:${email}?subject=Re: Your Inquiry from ${companyName}" class="cta-button">
												<span class="button-content">
													<span>Reply</span>
												</span>
											</a>
										</td>
										${
											phone
												? `
										<td style="width: 50%;">
											<a href="tel:${phone}" class="cta-button cta-button-secondary">
												<span class="button-content">
													<span>Call Now</span>
												</span>
											</a>
										</td>
									`
												: `
										<td style="width: 50%;"></td>
									`
										}
									</tr>
								</table>
							</div>
						</div>
						
						<!-- Footer -->
						<div class="footer-info">
							<h3>${companyName}</h3>
							<p>Form submitted on ${timestamp}</p>
							<p class="automated-notice">
								This is an automated notification from your website contact form.
							</p>
						</div>
					</div>
				</div>
			</body>
		</html>
	`

	const emailText = `
${greeting}

You have received a new ${formType === "simple" ? "lead inquiry" : "contact form submission"} from your website.

${fields.map((field) => `${field.label}: ${field.value}`).join("\n")}

${sourcePage ? `\nSource: ${sourcePage}` : ""}

Quick Actions:
- Reply to: ${email}
${phone ? `- Call: ${phone}` : ""}

---
Submitted on: ${timestamp}
${companyName}
	`

	return { emailSubject, emailHtml, emailText }
}

export async function POST(request: NextRequest) {
	try {
		// Check if Resend is configured
		if (!resend || !resendApiKey) {
			console.error(
				"RESEND_API_KEY environment variable is not set"
			)
			return NextResponse.json(
				{
					error: "Email service is not configured. Please set RESEND_API_KEY",
				},
				{ status: 500 }
			)
		}

		const body = await request.json()
		const {
			email,
			firstName,
			lastName,
			website,
			phone,
			sourcePage,
		} = body

		// Validate required fields - email is always required
		if (!email) {
			return NextResponse.json(
				{ error: "Email is required" },
				{ status: 400 }
			)
		}

		// For contact form, require firstName and lastName
		// For simple form, require at least website or phone
		if (firstName === undefined && lastName === undefined) {
			// It's a simple form - need website or phone
			if (!website && !phone) {
				return NextResponse.json(
					{
						error: "Please provide website or phone number",
					},
					{ status: 400 }
				)
			}
		} else {
			// It's a contact form - require firstName and lastName
			if (!firstName || !lastName) {
				return NextResponse.json(
					{
						error: "First name and last name are required",
					},
					{ status: 400 }
				)
			}
		}

		// Get the recipient email from environment variable
		const recipientEmail =
			process.env.CONTACT_EMAIL || process.env.EMAIL_RECIPIENT

		if (!recipientEmail) {
			console.error(
				"CONTACT_EMAIL environment variable is not set"
			)
			return NextResponse.json(
				{
					error: "Email configuration error: CONTACT_EMAIL is required",
				},
				{ status: 500 }
			)
		}

		// Get the from email from environment variable or use a default
		const fromEmail =
			process.env.RESEND_FROM_EMAIL ||
			"Contact Form <onboarding@resend.dev>"

		// Get source page from referer or request
		let pageSource = sourcePage || "Contact Form"

		try {
			const referer = request.headers.get("referer")
			if (referer) {
				const url = new URL(referer)
				const pathname = url.pathname
				// Format pathname nicely
				if (pathname === "/") {
					pageSource = "Home Page"
				} else if (pathname === "/contact") {
					pageSource = "Contact Page"
				} else {
					// Convert /seo/example to "SEO Service Page"
					const pathParts = pathname
						.split("/")
						.filter(Boolean)
					const serviceName = pathParts[0]
						.split("-")
						.map(
							(word) =>
								word
									.charAt(
										0
									)
									.toUpperCase() +
								word.slice(1)
						)
						.join(" ")
					pageSource = `${serviceName} Page`
				}
			}
		} catch {
			// Use default if referer parsing fails
		}

		// Determine form type
		const formType = website ? "simple" : "contact"

		// Format email content
		const { emailSubject, emailHtml, emailText } =
			formatEmailContent(body, formType, pageSource)

		// Send email using Resend
		const data = await resend.emails.send({
			from: fromEmail,
			to: [recipientEmail],
			replyTo: email,
			subject: emailSubject,
			html: emailHtml,
			text: emailText,
		})

		if (data.error) {
			console.error("Error sending email:", data.error)
			return NextResponse.json(
				{
					error: "Failed to send email",
					details: data.error,
				},
				{ status: 500 }
			)
		}

		return NextResponse.json(
			{
				success: true,
				message: "Form submitted successfully",
				emailId: data.data?.id,
			},
			{ status: 200 }
		)
	} catch (error: any) {
		console.error("Error processing form:", error)
		return NextResponse.json(
			{
				error: "Internal server error",
				message: error.message,
			},
			{ status: 500 }
		)
	}
}
