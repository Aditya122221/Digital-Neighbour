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

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            className="bg-pink p-8 rounded-2xl shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-semibold text-center text-blackbrown mb-8 leading-tight">
              {data?.formHeading || "Boost Your Website's Performance with a Comprehensive Site Audit"}
            </h3>
            <form className="space-y-6">
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
                  required
                  className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-yellow outline-none transition-colors text-lg bg-transparent"
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
                  className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-yellow outline-none transition-colors text-lg bg-transparent"
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
                  required
                  className="w-full px-4 py-4 border-b-2 border-gray-300 focus:border-yellow outline-none transition-colors text-lg bg-transparent"
                />
              </div>
              <div className="flex justify-center">
                <CustomButton
                  text={data?.buttonText || "Get My Audit"}
                  onClick={handleSubmit}
                  textColor="#5D50EB"
                  borderColor="#5D50EB"
                  className="w-auto"
                />
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

