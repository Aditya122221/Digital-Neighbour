'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CustomButton } from './button';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeCategory, setActiveCategory] = useState('Marketing');
  const [expandedMobileServices, setExpandedMobileServices] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [expandedMobileColumn, setExpandedMobileColumn] = useState<string | null>(null);

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services', hasMegaMenu: true },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About Us', href: '/about' },
    { name: 'Resources', href: '/resources' },
  ];

  const megaMenuData = {
    Marketing: {
      categories: [
        { name: 'Marketing', isActive: true },
        { name: 'Web & App Development' },
        { name: 'AI & Automation' },
        { name: 'Industries' },
      ],
      columns: [
        {
          title: 'Search Engine Optimisation',
          services: [
            { name: 'Search Engine Optimisation', icon: '📍' },
            { name: 'Local SEO', icon: '📍' },
            { name: 'WordPress SEO', icon: '🔧' },
            { name: 'E-commerce SEO', icon: '🛒' },
            { name: 'Shopify SEO', icon: '🏪' },
            { name: 'AI SEO', icon: '🤖' },
            // { name: 'ORM', icon: '⭐' },
            // { name: 'SEO Migration', icon: '🔄' },
            // { name: 'Lead Generation', icon: '🎯' },
            // { name: 'Link Building Services', icon: '🔗' },
            // { name: 'International SEO', icon: '🌍' },
            // { name: 'Mobile SEO', icon: '📱' },
            // { name: 'Voice Search Optimisation', icon: '🎤' },
            // { name: 'Video SEO', icon: '🎥' },
            // { name: 'YouTube SEO', icon: '📺' },
          ],
        },
        {
          title: 'Paid Advertising',
          services: [
            { name: 'Google Ads', icon: '📊' },
            { name: 'Google Display Ads', icon: '🖼️' },
            { name: 'Google Remarketing', icon: '🔄' },
            { name: 'Google Shopping', icon: '🛍️' },
            { name: 'Paid Social', icon: '👥' },
            { name: 'YouTube Ads', icon: '📺' },
            // { name: 'Bing Ads Campaigns', icon: '🔍' },
          ],
        },
        {
          title: 'Social Media Management',
          services: [
            { name: 'Facebook Marketing', icon: '📘' },
            { name: 'X Marketing', icon: '🐦' },
            { name: 'Instagram Marketing', icon: '📷' },
            { name: 'LinkedIn Marketing', icon: '💼' },
            { name: 'TikTok Marketing', icon: '🎵' },
            // { name: 'Snapchat Marketing', icon: '👻' },
            // { name: 'Reddit Marketing', icon: '🔴' },
          ],
        },
        {
          title: 'Content Marketing',
          services: [
            { name: 'Content Marketing', icon: '📝' },
            { name: 'Copywriting', icon: '✍️' },
            { name: 'Graphic Designing', icon: '🎨' },
            { name: 'Video Editing', icon: '🎬' },
            { name: 'Photo Shoot', icon: '📸' },
            { name: 'Video Shoot', icon: '🎥' },
            // { name: 'Content Strategy', icon: '📋' },
            // { name: 'Infographics', icon: '📊' },
          ],
        },
        {
          title: 'Data & Analytics',
          services: [
            { name: 'Conversion Rate Optimisation', icon: '📈' },
            { name: 'Call Tracking', icon: '📞' },
            { name: 'Reporting and Dashboards', icon: '📊' },
            { name: 'Google Analytics', icon: '📈' },
            { name: 'Google Tag Manager', icon: '🏷️' },
          ],
        },
      ],
    },
    'Web & App Development': {
      categories: [
        { name: 'Marketing' },
        { name: 'Web & App Development', isActive: true },
        { name: 'AI & Automation' },
        { name: 'Industries' },
      ],
      columns: [
        {
          title: 'Web Development',
          services: [
            { name: 'E-commerce Web Development', icon: '🛒' },
            { name: 'Front-End Development', icon: '🎨' },
            { name: 'Back-End Development', icon: '⚙️' },
            { name: 'CMS Integration', icon: '🔧' },
            { name: 'Custom Web Development', icon: '💻' },
            // { name: 'UI/UX Design', icon: '🎯' },
            // { name: 'Landing Page Design', icon: '📄' },
            // { name: 'Wix Website Design', icon: '🏗️' },
            // { name: 'React JS Website Design', icon: '⚛️' },
          ],
        },
        {
          title: 'App Development',
          services: [
            { name: 'App Development', icon: '📱' },
            { name: 'Android App Development', icon: '🤖' },
            { name: 'iOS App Development', icon: '🍎' },
            { name: 'Software Development', icon: '💻' },
            { name: 'Flutter App Development', icon: '🦋' },
            { name: 'React Native Development', icon: '⚛️' },
          ],
        },
        {
          title: 'Hosting, IT & Security',
          services: [
            { name: 'Web Hosting', icon: '🌐' },
            { name: 'WordPress Hosting', icon: '📝' },
            { name: 'Reseller Hosting', icon: '🔄' },
            { name: 'Email Hosting', icon: '📧' },
            // { name: 'E-commerce Hosting', icon: '🛒' },
            // { name: 'Dedicated Servers', icon: '🖥️' },
            // { name: 'Windows Virtual Servers', icon: '🪟' },
            // { name: 'Linux Servers', icon: '🐧' },
          ],
        },
      ],
    },
    'AI & Automation': {
      categories: [
        { name: 'Marketing' },
        { name: 'Web & App Development' },
        { name: 'AI & Automation', isActive: true },
        { name: 'Industries' },
      ],
      columns: [
        {
          title: 'AI & Automation',
          services: [
            { name: 'Website Chat Assistant', icon: '💬' },
            { name: 'AI-powered Voice Agents / Receptionists', icon: '🎤' },
            { name: 'Factory Automation', icon: '🏭' },
            { name: 'Marketing & Social Media Automation', icon: '📱' },
            { name: 'Workflow Automation (Zapier, Make, Custom)', icon: '⚙️' },
            { name: 'ERP Systems', icon: '📊' },
            // { name: 'Lead Follow-Up Agent', icon: '🎯' },
            // { name: 'Customer Feedback Collector', icon: '📝' },
            // { name: 'Full Automation Blogging', icon: '📝' },
            // { name: 'Product Assistant Chatbot', icon: '🤖' },
          ],
        },
      ],
    },
    Industries: {
      categories: [
        { name: 'Marketing' },
        { name: 'Web & App Development' },
        { name: 'AI & Automation' },
        { name: 'Industries', isActive: true },
      ],
      columns: [
        {
          title: 'Industries',
          services: [
            // { name: 'Healthcare Marketing Agency', icon: '🏥' },
            { name: 'Car Removal & Wreckers Marketing Agency', icon: '🚗' },
            { name: 'Automotive Repair & Servicing Marketing Agency', icon: '🔧' },
            // { name: 'Construction Marketing Agency', icon: '🏗️' },
            // { name: 'Florist Marketing Agency', icon: '🌸' },
            // { name: 'Carpenters Marketing Agency', icon: '🔨' },
            // { name: 'Handymen Marketing Agency', icon: '🛠️' },
            // { name: 'Daycare Marketing Agency', icon: '👶' },
            // { name: 'Caravan & Motorhome Repairs Marketing Agency', icon: '🚐' },
            // { name: 'Mobile Repair Marketing Agency', icon: '📱' },
            // { name: 'Supermarket Marketing Agency', icon: '🛒' },
            // { name: 'Window Tinting Services Marketing Agency', icon: '🪟' },
            // { name: 'Fencing Solutions Marketing Agency', icon: '🚧' },
            { name: 'Movers & Relocation Services Marketing Agency', icon: '📦' },
            { name: 'Plumbing Marketing Agency', icon: '🚿' },
            // { name: 'Roofing Marketing Agency', icon: '🏠' },
            // { name: 'HVAC Marketing Agency', icon: '❄️' },
            // { name: 'Electrical Services Marketing Agency', icon: '⚡' },
            // { name: 'Landscaping & Gardening Marketing Agency', icon: '🌱' },
            // { name: 'Pest Control Marketing Agency', icon: '🐛' },
            { name: 'Small Business Marketing Agency', icon: '🏪' },
            { name: 'Medium Business Marketing Agency', icon: '🏢' },
            { name: 'Enterprise Business Marketing Agency', icon: '🏭' },
            // { name: 'Local Business Marketing Agency', icon: '📍' },
          ],
        },
        {
          title: 'Professionals Marketing',
          services: [
            { name: 'Real Estate Marketing Agency', icon: '🏠' },
            { name: 'Mortgage Broker Marketing Agency', icon: '💰' },
            { name: 'Physiotherapists Marketing Agency', icon: '🏥' },
            { name: 'Coaches Marketing Agency', icon: '🎯' },
            { name: 'Law Firm Marketing Agency', icon: '⚖️' },
            // { name: 'Accountant / CPA Marketing Agency', icon: '📊' },
            // { name: 'Financial Advisor Marketing Agency', icon: '💼' },
            // { name: 'Insurance Broker Marketing Agency', icon: '🛡️' },
            // { name: 'Dentist Marketing Agency', icon: '🦷' },
          ],
        },
      ],
    },
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    const timeout = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150); // Small delay to prevent flickering
    setMegaMenuTimeout(timeout);
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handleMobileServicesToggle = () => {
    setExpandedMobileServices(!expandedMobileServices);
    setExpandedMobileCategory(null); // Reset category expansion
    setExpandedMobileColumn(null); // Reset column expansion
  };

  const handleMobileCategoryToggle = (categoryName: string) => {
    setExpandedMobileCategory(expandedMobileCategory === categoryName ? null : categoryName);
    setExpandedMobileColumn(null); // Reset column expansion when category changes
  };

  const handleMobileColumnToggle = (columnTitle: string) => {
    setExpandedMobileColumn(expandedMobileColumn === columnTitle ? null : columnTitle);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (megaMenuTimeout) {
        clearTimeout(megaMenuTimeout);
      }
    };
  }, [megaMenuTimeout]);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/main-logo.png"
                alt="Digital Neighbour Logo"
                width={40}
                height={40}
                className="h-12 w-auto lg:h-14"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links - Middle (Desktop) */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigationLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasMegaMenu && handleMegaMenuEnter()}
                onMouseLeave={() => link.hasMegaMenu && handleMegaMenuLeave()}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "text-black hover:text-black transition-all duration-200 font-medium text-sm lg:text-base flex items-center gap-1 relative group",
                    link.hasMegaMenu && isMegaMenuOpen && "text-yellow"
                  )}
                >
                  <span className="relative">
                  {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-200 group-hover:w-full"></span>
                  </span>
                  {link.hasMegaMenu && (
                    <svg
                      className="w-4 h-4 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* Right Side - Desktop Button & Mobile Menu */}
          <div className="flex items-center">
            {/* Start a Project Button - Desktop */}
          <div className="hidden lg:flex lg:items-center">
            <CustomButton
              text="Start a Project"
              href="/contact"
              textColor="black"
              borderColor="black"
              />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-black hover:text-yellow transition-colors duration-200 p-2"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {isMegaMenuOpen && (
          <div
            className="absolute left-0 right-0 top-full bg-white/95 backdrop-blur-sm border-t border-white/20 shadow-2xl"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-12 gap-8">
                {/* Left Column - Categories */}
                <div className="col-span-3">
                  <div className="space-y-1 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
                    {megaMenuData[activeCategory as keyof typeof megaMenuData].categories.map((category, index) => (
                      <div
                        key={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200",
                          category.isActive
                            ? "bg-bone text-black"
                            : "hover:bg-gray-100 text-gray-700"
                        )}
                      >
                        <span className="font-medium">{category.name}</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Columns - Services */}
                <div className="col-span-9">
                  <div className={cn(
                    "grid gap-6",
                    megaMenuData[activeCategory as keyof typeof megaMenuData].columns.length === 5 ? "grid-cols-5" :
                    megaMenuData[activeCategory as keyof typeof megaMenuData].columns.length === 4 ? "grid-cols-4" :
                    megaMenuData[activeCategory as keyof typeof megaMenuData].columns.length === 3 ? "grid-cols-3" :
                    megaMenuData[activeCategory as keyof typeof megaMenuData].columns.length === 2 ? "grid-cols-2" :
                    "grid-cols-1"
                  )}>
                    {megaMenuData[activeCategory as keyof typeof megaMenuData].columns.map((column, columnIndex) => (
                      <div key={column.title} className="space-y-4 relative">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {column.title}
                        </h3>
                        <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
                          {column.services.map((service, serviceIndex) => (
                            <Link
                              key={service.name}
                              href={`/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                            >
                              <span className="text-xl hidden">{service.icon}</span>
                              <span className="text-gray-700 group-hover:text-junglegreen transition-colors duration-200 relative">
                                {service.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-junglegreen transition-all duration-200 group-hover:w-full"></span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        {columnIndex < (megaMenuData[activeCategory as keyof typeof megaMenuData]?.columns?.length || 0) - 1 && (
                          <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm rounded-lg mt-2 border border-white/10">
              {navigationLinks.map((link) => (
                <div key={link.name}>
                  {link.hasMegaMenu ? (
                    <div>
                      <button
                        onClick={() => handleMobileServicesToggle()}
                        className="w-full flex items-center justify-between px-3 py-2 text-white hover:text-yellow transition-colors duration-200 rounded-md font-medium"
                      >
                        <span>{link.name}</span>
                        <svg
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            expandedMobileServices && "rotate-180"
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {expandedMobileServices && (
                    <div className="ml-4 mt-2 space-y-2">
                          {Object.keys(megaMenuData).map((categoryKey) => (
                            <div key={categoryKey}>
                              <button
                                onClick={() => handleMobileCategoryToggle(categoryKey)}
                                className="w-full flex items-center justify-between px-2 py-2 text-yellow hover:text-white transition-colors duration-200 rounded-md font-semibold text-sm uppercase"
                              >
                                <span>{categoryKey}</span>
                                <svg
                                  className={cn(
                                    "w-3 h-3 transition-transform duration-200",
                                    expandedMobileCategory === categoryKey && "rotate-180"
                                  )}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                              {expandedMobileCategory === categoryKey && (
                                <div className="ml-4 space-y-2">
                                  {megaMenuData[categoryKey as keyof typeof megaMenuData].columns.map((column) => (
                        <div key={column.title}>
                                      <button
                                        onClick={() => handleMobileColumnToggle(column.title)}
                                        className="w-full flex items-center justify-between px-2 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-md font-medium text-xs"
                                      >
                                        <span>{column.title}</span>
                                        <svg
                                          className={cn(
                                            "w-3 h-3 transition-transform duration-200",
                                            expandedMobileColumn === column.title && "rotate-180"
                                          )}
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                          />
                                        </svg>
                                      </button>
                                      {expandedMobileColumn === column.title && (
                                        <div className="ml-4 space-y-1">
                                          {column.services.map((service) => (
                              <Link
                                key={service.name}
                                href={`/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                                              className="block px-2 py-1 text-gray-400 hover:text-white text-xs"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {service.icon} {service.name}
                              </Link>
                            ))}
                          </div>
                                      )}
                        </div>
                      ))}
                    </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block px-3 py-2 text-white hover:text-yellow transition-colors duration-200 rounded-md font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-3 py-2">
                <CustomButton
                  text="Start a Project"
                  href="/contact"
                  textColor="white"
                  borderColor="white"
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
