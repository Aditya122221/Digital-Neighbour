'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CustomButton } from './button';
import { cn } from '@/lib/utils';
import seoData from '@/data/seo.json';
import type { NavbarData } from '@/lib/navbar-data';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const seoServiceLabelMap = (seoData.otherServices?.slugMapping || {}) as Record<
  string,
  string
>;

const seoServiceSlugMap: Record<string, string> = Object.entries(
  seoServiceLabelMap,
).reduce(
  (acc, [label, slug]) => {
    acc[slugify(label)] = slug;
    return acc;
  },
  {} as Record<string, string>,
);

// Simple ASCII-only fallback mega menu, used only if Sanity data is missing
const fallbackMegaMenuData = {
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
          { name: 'Search Engine Optimisation', icon: '*' },
          { name: 'Local SEO', icon: '*' },
          { name: 'WordPress SEO', icon: '*' },
          { name: 'E-commerce SEO', icon: '*' },
          { name: 'AI SEO', icon: '*' },
        ],
      },
      {
        title: 'Paid Advertising',
        services: [
          { name: 'Google Ads', icon: '*' },
          { name: 'Google Remarketing', icon: '*' },
          { name: 'Google Shopping', icon: '*' },
          { name: 'Paid Social', icon: '*' },
          { name: 'YouTube Ads', icon: '*' },
        ],
      },
      {
        title: 'Social Media Management',
        services: [
          { name: 'Facebook Marketing', icon: '*' },
          { name: 'X Marketing', icon: '*' },
          { name: 'Instagram Marketing', icon: '*' },
          { name: 'LinkedIn Marketing', icon: '*' },
          { name: 'TikTok Marketing', icon: '*' },
        ],
      },
      {
        title: 'Content Marketing',
        services: [
          { name: 'Content Marketing', icon: '*' },
          { name: 'Copywriting', icon: '*' },
          { name: 'Graphic Designing', icon: '*' },
          { name: 'Video Editing', icon: '*' },
          { name: 'Photo Shoot', icon: '*' },
          { name: 'Video Shoot', icon: '*' },
        ],
      },
    ],
  },
} as const;

export const NavbarClient: React.FC<{ data?: NavbarData | null }> = ({
  data,
}) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [megaMenuTimeout, setMegaMenuTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Marketing');
  const [expandedMobileServices, setExpandedMobileServices] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);
  const [expandedMobileColumn, setExpandedMobileColumn] = useState<
    string | null
  >(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolledPast80vh, setHasScrolledPast80vh] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  const isPortfolioSlug =
    pathname?.startsWith('/portfolio/') && pathname !== '/portfolio';
  const isResourcesSlug =
    pathname?.startsWith('/resources/') && pathname !== '/resources';

  // Use Sanity data if available, otherwise fallback to hardcoded
  const navigationLinks =
    data?.navigationLinks?.map((link) => ({
    name: link.label,
    href: link.href,
    hasMegaMenu: link.hasMegaMenu,
  })) || [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '', hasMegaMenu: true },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'About Us', href: '/about' },
      { name: 'Resources', href: '/resources' },
  ];
  
  const logoUrl = data?.logo?.asset?.url || '/main-logo.png';
  const logoHref = data?.logo?.href || '/';
  
  const ctaButton =
    data?.ctaButton ||
    ({
      label: 'Start a Project',
      href: '/contact',
      variant: 'primary',
    } as const);

  const megaMenuCategories = data?.megaMenuCategories || [];
  
  const transformedMegaMenuData =
    megaMenuCategories.length > 0
    ? megaMenuCategories.reduce((acc, category) => {
        const categoryKey = category.key;
        acc[categoryKey] = {
          categories: megaMenuCategories.map((cat) => ({
            name: cat.title,
            isActive: cat.key === category.key,
          })),
          columns: category.columns.map((col) => ({
            title: col.title,
            href: col.href,
            services: col.services.map((service) => ({
              name: service.label,
                icon: service.icon?.asset?.url || service.emoji || '*',
              href: service.href,
            })),
          })),
        };
        return acc;
      }, {} as Record<string, any>)
    : null;
  
  const megaMenuDataToUse = transformedMegaMenuData || fallbackMegaMenuData;

  const columnTitleToRoute: { [key: string]: string } = {
    'Search Engine Optimisation': '/seo',
    'Paid Advertising': '/paid-advertisement',
    'Social Media Management': '/social-media-marketing',
    'Content Marketing': '/content-marketing',
    'Web Development': '/web-development',
    'App Development': '/app-development',
    'Hosting, IT & Security': '/hosting-it-security',
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
    }, 150);
    setMegaMenuTimeout(timeout);
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  const handleMobileServicesToggle = () => {
    setExpandedMobileServices((prev) => !prev);
    setExpandedMobileCategory(null);
    setExpandedMobileColumn(null);
  };

  const handleMobileCategoryToggle = (categoryName: string) => {
    setExpandedMobileCategory(
      expandedMobileCategory === categoryName ? null : categoryName,
    );
    setExpandedMobileColumn(null);
  };

  const handleMobileColumnToggle = (columnTitle: string) => {
    setExpandedMobileColumn(
      expandedMobileColumn === columnTitle ? null : columnTitle,
    );
  };

  useEffect(() => {
    return () => {
      if (megaMenuTimeout) {
        clearTimeout(megaMenuTimeout);
      }
    };
  }, [megaMenuTimeout]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight80 = window.innerHeight * 0.8;

      setHasScrolledPast80vh(currentScrollY > viewportHeight80);

      if (currentScrollY < 10) {
        setIsVisible(true);
        setIsScrollingUp(false);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsScrollingUp(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
        setIsScrollingUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : '-translate-y-full',
        isPortfolioSlug || isResourcesSlug
          ? 'bg-black'
          : isScrollingUp && lastScrollY > 10
            ? 'bg-black'
            : hasScrolledPast80vh
              ? 'bg-black/70'
              : 'bg-white',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={logoHref} className="flex items-center">
              <Image
                src={logoUrl}
                alt={data?.logo?.alt || 'Digital Neighbour Logo'}
                width={40}
                height={40}
                className={cn(
                  'h-12 w-auto lg:h-14 transition-all duration-300',
                  (isScrollingUp && lastScrollY > 10) ||
                    isPortfolioSlug ||
                    isResourcesSlug ||
                    hasScrolledPast80vh
                    ? 'brightness-0 invert'
                    : '',
                )}
                priority
              />
            </Link>
          </div>

          {/* Desktop navigation */}
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
                    'uppercase transition-all duration-200 font-medium text-sm lg:text-base flex items-center gap-1 relative group',
                    hasScrolledPast80vh || isPortfolioSlug || isResourcesSlug
                      ? 'text-white/80 hover:text-white'
                      : 'text-[#5D50EB] hover:text-[#5D50EB]/80',
                    link.hasMegaMenu && isMegaMenuOpen && 'text-yellow',
                  )}
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow transition-all duration-200 group-hover:w-full" />
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

          {/* Right side: CTA + mobile toggle */}
          <div className="flex items-center">
            <div className="hidden lg:flex lg:items-center">
              <CustomButton
                text={ctaButton.label}
                href={ctaButton.href}
                textColor="black"
                borderColor="black"
              />
            </div>

            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className={cn(
                  'transition-colors duration-200 p-2',
                  hasScrolledPast80vh || isPortfolioSlug || isResourcesSlug
                    ? 'text-white hover:text-yellow'
                    : 'text-[#5D50EB] hover:text-[#5D50EB]/80',
                )}
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

        {/* Desktop mega menu */}
        {isMegaMenuOpen && (
          <div
            className="absolute left-0 right-0 top-full bg-white/95 backdrop-blur-sm border-t border-white/20 shadow-2xl"
            onMouseEnter={handleMegaMenuEnter}
            onMouseLeave={handleMegaMenuLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-3">
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                    {(megaMenuDataToUse[
                      activeCategory as keyof typeof megaMenuDataToUse
                    ]?.categories || []).map((category: any) => (
                      <div
                        key={category.name}
                        onClick={() => handleCategoryClick(category.name)}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200',
                          category.isActive
                            ? 'bg-[#5D50EB] text-white'
                            : 'hover:bg-[#5D50EB]/10 text-gray-700',
                        )}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span>{'>'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-9">
                  <div className="flex justify-between gap-6 lg:gap-8">
                    {megaMenuDataToUse[
                      activeCategory as keyof typeof megaMenuDataToUse
                    ]?.columns?.map((column: any) => {
                      const columnHref = column.href || columnTitleToRoute[column.title];
                      return (
                      <div key={column.title} className="space-y-2 flex-1">
                        {columnHref ? (
                          <Link
                            href={columnHref}
                            className="text-base font-semibold text-gray-900 mb-2 block hover:text-[#5D50EB] transition-colors duration-200"
                          >
                            {column.title}
                          </Link>
                        ) : (
                          <h3 className="text-base font-semibold text-gray-900 mb-2">
                            {column.title}
                          </h3>
                        )}
                        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                          {column.services.map((service: any) => (
                            <Link
                              key={service.name}
                              href={service.href || '#'}
                              className="flex items-center gap-2 p-1.5 rounded-lg transition-colors duration-200 group hover:bg-[#5D50EB]/10"
                            >
                              {typeof service.icon === 'string' &&
                              service.icon.startsWith('http') ? (
                                <Image
                                  src={service.icon}
                                  alt={service.name}
                                  width={16}
                                  height={16}
                                  className="w-4 h-4 object-contain flex-shrink-0"
                                />
                              ) : (
                                <span className="text-xs text-gray-500">
                                  {service.icon || '*'}
                                </span>
                              )}
                              <span className="text-sm text-gray-700 group-hover:text-[#5D50EB] transition-colors duration-200">
                                {service.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 mb-3 space-y-1 bg-black/90 backdrop-blur-sm rounded-lg mt-2 border border-white/10">
              {navigationLinks.map((link) => (
                <div key={link.name}>
                  {link.hasMegaMenu ? (
                    <div>
                      <button
                        onClick={handleMobileServicesToggle}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 transition-colors duration-200 rounded-md font-medium',
                          hasScrolledPast80vh ||
                            isPortfolioSlug ||
                            isResourcesSlug
                            ? 'text-white hover:text-yellow'
                            : 'text-[#5D50EB] hover:text-[#5D50EB]/80',
                        )}
                      >
                        <span>{link.name}</span>
                        <span
                          className={cn(
                            'text-xs transition-transform duration-200',
                            expandedMobileServices && 'rotate-180',
                          )}
                        >
                          v
                        </span>
                      </button>
                      {expandedMobileServices && (
                        <div className="ml-4 mt-2 space-y-2">
                          {Object.keys(megaMenuDataToUse).map((categoryKey) => (
                            <div key={categoryKey}>
                              <button
                                onClick={() =>
                                  handleMobileCategoryToggle(categoryKey)
                                }
                                className="w-full flex items-center justify-between px-2 py-2 text-yellow hover:text-white transition-colors duration-200 rounded-md font-semibold text-sm uppercase"
                              >
                                <span>{categoryKey}</span>
                                <span
                                  className={cn(
                                    'text-xs transition-transform duration-200',
                                    expandedMobileCategory === categoryKey &&
                                      'rotate-180',
                                  )}
                                >
                                  v
                                </span>
                              </button>
                              {expandedMobileCategory === categoryKey && (
                                <div className="ml-4 space-y-2">
                                  {megaMenuDataToUse[
                                    categoryKey as keyof typeof megaMenuDataToUse
                                  ]?.columns?.map((column: any) => {
                                    const columnHref = column.href || columnTitleToRoute[column.title];
                                    return (
                                    <div key={column.title}>
                                      <div className="w-full flex items-center justify-between px-2 py-2 text-gray-300 hover:text-white transition-colors duration-200 rounded-md font-medium text-xs">
                                          {columnHref ? (
                                            <Link
                                              href={columnHref}
                                              className="flex-1 hover:text-white transition-colors duration-200"
                                              onClick={() => setIsMenuOpen(false)}
                                            >
                                              {column.title}
                                            </Link>
                                          ) : (
                                            <span>{column.title}</span>
                                          )}
                                        <button
                                          onClick={() =>
                                            handleMobileColumnToggle(
                                              column.title,
                                            )
                                          }
                                          className="ml-2 p-1 text-xs"
                                        >
                                          {expandedMobileColumn ===
                                          column.title
                                            ? '^'
                                            : 'v'}
                                        </button>
                                      </div>
                                      {expandedMobileColumn ===
                                        column.title && (
                                        <div className="ml-4 space-y-1">
                                          {column.services.map(
                                            (service: any) => (
                                            <Link
                                              key={service.name}
                                                href={service.href || '#'}
                                              className="flex items-center gap-2 px-2 py-1 text-gray-400 hover:text-white text-xs"
                                              onClick={() =>
                                                setIsMenuOpen(false)
                                              }
                                            >
                                                {typeof service.icon ===
                                                  'string' &&
                                                service.icon.startsWith(
                                                  'http',
                                                ) ? (
                                                <Image
                                                    src={service.icon}
                                                  alt={service.name}
                                                  width={16}
                                                  height={16}
                                                  className="w-4 h-4 object-contain"
                                                />
                                              ) : (
                                                  <span className="text-xs">
                                                    {service.icon || '*'}
                                                </span>
                                              )}
                                              {service.name}
                                            </Link>
                                            ),
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    );
                                  })}
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
                      className={cn(
                        'block px-3 py-2 transition-colors duration-200 rounded-md font-medium',
                        hasScrolledPast80vh ||
                          isPortfolioSlug ||
                          isResourcesSlug
                          ? 'text-white hover:text-yellow'
                          : 'text-[#5D50EB] hover:text-[#5D50EB]/80',
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-3 py-2">
                <CustomButton
                  text={ctaButton.label}
                  href={ctaButton.href}
                  textColor="black"
                  borderColor="white"
                  className="justify-center"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};


