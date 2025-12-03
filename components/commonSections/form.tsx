"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CustomButton } from "@/components/core/button";

interface FormProps {
  data?: {
    heading: string;
    content: string;
    subContent: string;
    cta: string;
    formHeading: string;
    buttonText: string;
  };
}

export default function Form({ data }: FormProps) {
  const [formData, setFormData] = useState({
    website: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    // Validate required fields
    if (!formData.email) {
      setSubmitError("Email is required");
      return;
    }

    if (!formData.website && !formData.phone) {
      setSubmitError("Please provide either website or phone number");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current page path for source tracking
      const sourcePage = typeof window !== "undefined" ? window.location.pathname : "Unknown";

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          sourcePage: sourcePage,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      // Show success message
      setSubmitSuccess(true);
      
      // Clear form
      setFormData({
        website: "",
        email: "",
        phone: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message || "An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
    
    // Clear success message when user starts typing
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-regular text-blackbrown leading-tight font-cal-sans">
              {data?.heading || "Does Google love you?"}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {data?.content || "How well are you ranking in Google? We can tell you now, it's probably not as well as you think. We use state-of-the-art technology and NZ SEO insights to discover the keywords that you're already ranking for, and can do the same with your competitors. This is valuable information that some of your competitors already have, thanks to their focus on SEO, and this is what's giving them the edge over everyone in Google."}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {data?.subContent ? (
                data.subContent.includes("HUNDREDS") || data.subContent.includes("THOUSANDS") ? (
                  data.subContent
                ) : (
                  <><strong>{data.subContent.split(' ').slice(0, 2).join(' ')}</strong> {data.subContent.split(' ').slice(2).join(' ')}</>
                )
              ) : (
                <>There are likely <strong>HUNDREDS</strong>, if not{" "}<strong>THOUSANDS</strong> of SEO-targeted keywords that your business could be targeting in Google, and it's likely that you don't know what these are.</>
              )}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {data?.cta || "We would love to help your business realise its full potential on Google by giving you a free Google ranking report and website audit."}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Either fill out the form or give us a call now on{" "}
              <a
                href="tel:0800032248"
                className="text-yellow hover:text-yellow/80 font-semibold"
              >
                0800 032 248
              </a>{" "}
              to request your FREE Google ranking report & site health audit.
              We'd love to help.
            </p>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-[#5D50EB] p-8 rounded-2xl shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-center text-white mb-8 leading-tight">
              {data?.formHeading || "Boost Your Website's Performance with a Comprehensive Site Audit"}
            </h3>
            
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Thank You! 🎉
                    </h3>
                    <p className="text-base text-green-700 leading-relaxed">
                      Your form has been submitted successfully. We'll get back to you soon!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
                <p className="text-sm text-red-600 text-center">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="website" className="sr-only">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Website"
                  className="w-full px-4 py-4 border-b-2 border-white/30 focus:border-white outline-none transition-colors text-lg bg-transparent text-white placeholder:text-white/60"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-4 border-b-2 border-white/30 focus:border-white outline-none transition-colors text-lg bg-transparent text-white placeholder:text-white/60"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="w-full px-4 py-4 border-b-2 border-white/30 focus:border-white outline-none transition-colors text-lg bg-transparent text-white placeholder:text-white/60"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden rounded-lg border-2 px-6 py-3 transition-all duration-300 ease-out hover:border-[3px] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "#0e0e59",
                    borderColor: "#0e0e59",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3 text-white">
                    <span className="text-md transition-all duration-300 font-medium">
                      {isSubmitting ? "Submitting..." : data?.buttonText || "Get My Audit"}
                    </span>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:shadow-lg"
                      style={{
                        backgroundColor: "#5D50EB",
                      }}
                    >
                      <svg
                        className="transition-transform duration-300 -rotate-45 group-hover:rotate-0 ease-out"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        style={{ color: "white" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
