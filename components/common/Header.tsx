"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowUpRight, ChevronDown, Search } from "lucide-react";
import { Button } from "./Button";

export interface SubNavItem {
  label: string;
  href: string;
  subtitle?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isRichMenu?: boolean;
  allLinkText?: string;
  subItems?: SubNavItem[];
}

export const navItems: NavItem[] = [
  {
    label: "About Us",
    href: "/about-us",
    subItems: [
      { label: "Campus Tour", href: "/about-us#campus-tour" },
      { label: "Our Faculty", href: "/about-us#our-faculty" },
    ],
  },
  {
    label: "Programs",
    href: "/programs",
    isRichMenu: true,
    allLinkText: "ALL PROGRAMMES →",
    subItems: [
      {
        label: "B.Sc. (Hons) in Integrative Nutrition & Dietetics",
        subtitle: "3 years (4 years Hons) · July · AY 2026-27 · Undergraduate",
        href: "/programs#bsc-nutrition",
      },
      {
        label: "M.Sc. in Integrative Nutrition & Dietetics",
        subtitle: "2 years · July · AY 2026-27 · Postgraduate",
        href: "/programs#msc-nutrition",
      },
      {
        label: "PG Diploma in Holistic Lifestyle & Wellness Coaching",
        subtitle: "1 year · Rolling intake · Diploma",
        href: "/programs#pg-diploma",
      },
      {
        label: "DHIL — Diploma in Health & Integrative Lifestyle",
        subtitle:
          "6 months (intensive) · 12 months (extended) · Quarterly intakes — Jan · Apr · Jul · Oct · Diploma",
        href: "/programs#diploma-health",
      },
    ],
  },
  {
    label: "Student Life",
    href: "/student-life",
    subItems: [
      { label: "Experiential Learning", href: "/student-life#experiential-learning" },
      { label: "Industry Placement", href: "/student-life#industry-placement" },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  { label: "Conferences", href: "/conferences" },
  {
    label: "Newsletter",
    href: "/newsletter",
    subItems: [
      { label: "Newsletter", href: "/newsletter" },
      { label: "News & Events", href: "/news-events" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

const searchableItems = [
  {
    title: "B.Sc. (Hons) in Integrative Nutrition & Dietetics",
    category: "Undergraduate Program",
    href: "/programs#bsc-nutrition",
    description: "3 years (4 years Hons) · July intake · AY 2026-27",
  },
  {
    title: "M.Sc. in Integrative Nutrition & Dietetics",
    category: "Postgraduate Program",
    href: "/programs#msc-nutrition",
    description: "2 years · July intake · AY 2026-27",
  },
  {
    title: "PG Diploma in Holistic Lifestyle & Wellness Coaching",
    category: "Diploma Program",
    href: "/programs#pg-diploma",
    description: "1 year · Rolling intake · Diploma",
  },
  {
    title: "DHIL — Diploma in Health & Integrative Lifestyle",
    category: "Diploma Program",
    href: "/programs#diploma-health",
    description: "6 months (intensive) · 12 months (extended)",
  },
  {
    title: "Campus Tour & Facilities",
    category: "About Us",
    href: "/about#campus-tour",
    description: "Explore state-of-the-art nutrition & clinical labs",
  },
  {
    title: "Our Distinguished Faculty",
    category: "Faculty",
    href: "/about#our-faculty",
    description: "Meet world-class experts in holistic healthcare",
  },
  {
    title: "Experiential Learning & Fieldwork",
    category: "Student Life",
    href: "/student-life#experiential-learning",
    description: "Hands-on clinical internships and community health projects",
  },
  {
    title: "Industry Placement & Careers",
    category: "Career Support",
    href: "/student-life#industry-placement",
    description: "Top healthcare & wellness organization partnerships",
  },
  {
    title: "Admissions & Application Process",
    category: "Admissions",
    href: "/admissions",
    description: "Eligibility criteria, scholarships, and deadline information",
  },
  {
    title: "Global Integrative Health Conferences",
    category: "Events",
    href: "/conferences",
    description: "Upcoming symposiums, keynote speakers, and research papers",
  },
];

const DesktopNavItem: React.FC<{ item: NavItem; isScrolled: boolean }> = ({ item, isScrolled }) => {
  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);

  return (
    <div className="relative group h-full flex items-center">
      <Link
        href={item.href}
        className={`inline-flex items-center gap-1 overflow-hidden py-4 sm:py-5 lg:py-6 text-sm font-medium nav-3d-container select-none transition-colors ${
          isScrolled ? "text-[#334180]" : "text-white hover:text-white/80"
        }`}
      >
        <span className="relative block overflow-hidden">
          {/* Front facing text label */}
          <span className="nav-3d-text-front">{item.label}</span>

          {/* Back 3D flipped text label (reveals on hover) */}
          <span
            className={`absolute inset-0 nav-3d-text-back ${
              isScrolled ? "text-[#273368]" : "text-[#C59B27]"
            }`}
          >
            {item.label}
          </span>
        </span>

        {hasSubItems && (
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180 ml-0.5 ${
              isScrolled ? "text-[#334180]" : "text-white/90"
            }`}
          />
        )}
      </Link>

      {/* Dropdown Menu Panel - attached at top-full with pt-0 */}
      {hasSubItems && (
        <div
          className={`absolute top-full left-0 pt-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-left -translate-y-1 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto ${
            item.isRichMenu ? "w-[500px] sm:w-[550px]" : "w-64 lg:w-72"
          }`}
        >
          <div
            className="bg-white border border-zinc-100 shadow-2xl py-2 px-0 rounded-[10px] overflow-hidden"
            style={{ borderRadius: "10px" }}
          >
            {item.isRichMenu ? (
              <div>
                {item.allLinkText && (
                  <Link
                    href={item.href}
                    className="inline-block text-[11px] font-bold tracking-widest text-[#C59B27] uppercase hover:underline mb-1 px-[15px] pt-1"
                  >
                    {item.allLinkText}
                  </Link>
                )}
                <div className="space-y-0.5">
                  {item.subItems?.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block py-[10px] px-[15px] transition-all duration-200 hover:bg-[#f0f0f4] group/item"
                    >
                      <div className="text-[12px] font-normal text-[#112D27] group-hover/item:text-[#0D221F] leading-snug nav-submenu-link">
                        {subItem.label}
                      </div>
                      {subItem.subtitle && (
                        <div className="text-[11px] text-[#636C68] mt-0.5 font-normal leading-relaxed">
                          {subItem.subtitle}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-0.5">
                {item.subItems?.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    className="block py-[10px] px-[15px] text-[12px] font-normal text-[#334180] hover:text-[#273368] hover:bg-[#f0f0f4] transition-colors leading-snug nav-submenu-link"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedMobileItems, setExpandedMobileItems] = useState<Record<string, boolean>>({});

  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMobileSubmenu = (label: string) => {
    setExpandedMobileItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll & handle focus when search drawer opens
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const filteredResults =
    searchQuery.trim() === ""
      ? []
      : searchableItems.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const isSolid = isScrolled || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isSolid
          ? "w-full bg-white border-b border-zinc-100 shadow-md pt-0 px-0"
          : "w-full bg-transparent border-b border-transparent pt-3 sm:pt-5 lg:pt-6 px-3 sm:px-5 lg:px-6"
      }`}
    >
      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "h-16" : "h-16 sm:h-20"
          }`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-36 sm:w-44">
              <Image
                src={
                  isSolid
                    ? "/images/logo/LSI-dark-logo.webp"
                    : "/images/logo/LSI-white-logo.png"
                }
                alt="LSI Logo"
                fill
                priority
                className="object-contain object-left"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>
          </Link>

          {/* Right Aligned Navigation Links & Actions */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <nav className="flex items-center h-full gap-6">
              {navItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} isScrolled={isSolid} />
              ))}

              {/* Search icon button immediately after Contact Us */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className={`inline-flex items-center justify-center p-2 transition-colors focus:outline-none cursor-pointer ${
                  isSolid
                    ? "text-[#334180] hover:text-[#273368]"
                    : "text-white hover:text-[#C59B27]"
                }`}
                aria-label="Open search drawer"
                title="Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            </nav>

            {/* CTA Button */}
            <Button
              href="/apply"
              className={`header-btn ${
                isSolid ? "header-btn-sticky" : "header-btn-unsticky"
              }`}
              fillClassName={isSolid ? "bg-[#234335]" : "bg-white"}
            >
              Apply Now
              <span className="icon-3d-container ml-1">
                <span className="icon-3d-front">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <span className="icon-3d-back">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </span>
            </Button>
          </div>

          {/* Mobile Actions & Menu Toggle Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 focus:outline-none transition-colors ${
                isSolid
                  ? "text-[#334180] hover:text-[#858585]"
                  : "text-white hover:text-white/80"
              }`}
              aria-label="Open search drawer"
            >
              <Search className="w-5 h-5" />
            </button>
            <Button href="/apply" size="sm" className="sm:hidden px-3 py-1.5 text-xs">
              Apply
            </Button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 focus:outline-none transition-colors ${
                isSolid
                  ? "text-[#334180] hover:text-[#858585]"
                  : "text-white hover:text-white/80"
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-zinc-200 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen
            ? "opacity-100 scale-y-100 max-h-[85vh] overflow-y-auto"
            : "opacity-0 scale-y-0 max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
              const isExpanded = Boolean(expandedMobileItems[item.label]);

              return (
                <div key={item.label} className="border-b border-zinc-100 pb-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-body text-base font-semibold text-[#334180] hover:text-[#858585] py-2 transition-colors flex-1"
                    >
                      {item.label}
                    </Link>
                    {hasSubItems && (
                      <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="p-2 text-[#334180] focus:outline-none"
                        aria-label={`Toggle ${item.label} sub-menu`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {hasSubItems && isExpanded && (
                    <div className="pl-4 space-y-2 pt-1 pb-2 border-l-2 border-[#334180]/20 ml-2">
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-1.5 transition-colors"
                        >
                          <div className="text-[12px] font-normal text-[#334180] nav-submenu-link">
                            {subItem.label}
                          </div>
                          {subItem.subtitle && (
                            <div className="text-xs text-zinc-500 mt-0.5">
                              {subItem.subtitle}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="pt-4">
            <Button
              href="/apply"
              size="md"
              className="w-full justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right-Side Search Drawer Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      {/* Right-Side Search Drawer Slide-Over Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-[51] w-full sm:w-[480px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out search-drawer ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#334180]" />
            <h3 className="font-semibold text-[20px] text-[#334180]">
              Search LSI World
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-full transition-colors focus:outline-none cursor-pointer"
            aria-label="Close search panel"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="p-5 border-b border-zinc-100 bg-zinc-50/50">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-10 py-3 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#334180]/20 focus:border-[#334180] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 rounded-full"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Drawer Body Results & Popular Searches */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {searchQuery.trim() === "" ? (
            <div>
              <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "B.Sc. Nutrition",
                  "M.Sc. Dietetics",
                  "Admissions 2026",
                  "Campus Tour",
                  "Faculty",
                  "Conferences",
                  "Diploma Programs",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-zinc-100 hover:bg-[#334180] hover:text-white text-xs font-medium text-zinc-600 rounded-lg transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Search Results ({filteredResults.length})
                </p>
              </div>

              {filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((result) => (
                    <Link
                      key={result.title}
                      href={result.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="block p-3.5 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:bg-[#f0f0f4] transition-all group"
                    >
                      <span className="inline-block px-2 py-0.5 text-[10px] font-semibold text-[#334180] bg-[#334180]/10 rounded mb-1">
                        {result.category}
                      </span>
                      <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-[#334180] transition-colors">
                        {result.title}
                      </h4>
                      <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">
                        {result.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm font-medium text-zinc-600">
                    No results found for &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    Try checking for typos or using different keywords.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


