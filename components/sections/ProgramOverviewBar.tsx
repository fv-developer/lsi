"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

export interface ProgramMetricItem {
  label: string;
  value: string;
  subtext: string;
}

const defaultProgramMetrics: ProgramMetricItem[] = [
  {
    label: "STUDY MODE",
    value: "On Campus",
    subtext: "Full-time interactive learning",
  },
  {
    label: "ELIGIBILITY",
    value: "10+2 Passouts",
    subtext: "Any stream from recognized board",
  },
  {
    label: "PROGRAM LEVEL",
    value: "Undergraduate",
    subtext: "NEP 2020 Aligned 4-Year Structure",
  },
  {
    label: "DURATION",
    value: "3 years (Bachelor’s)",
    subtext: "4 years (Honours, as per NEP 2020)",
  },
];

export const programNavTabs = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "experience-learning", label: "Experience Learning" },
  { id: "industry-placement", label: "Industry Placement" },
  { id: "admissions-fees", label: "Admissions & Fees" },
  { id: "faqs", label: "FAQ's" },
];

/**
 * 4-Column Program Key Information Card (Dark card inside white section)
 */
export const ProgramKeyMetricsCard: React.FC<{
  metrics?: ProgramMetricItem[];
}> = ({ metrics = defaultProgramMetrics }) => {
  return (
    <div
      className="w-full rounded-[20px] sm:rounded-[22px] border border-white/15 p-6 sm:p-7 lg:p-8 shadow-2xl text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgb(119, 28, 89) 0%, rgb(25, 32, 72) 100%)",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-0">
        {metrics.map((item, idx) => (
          <div
            key={item.label}
            className={`min-w-0 flex flex-col justify-start ${
              idx !== 0
                ? "lg:border-l lg:border-white/10 lg:pl-6 xl:lg:pl-8"
                : "lg:pr-4"
            } ${
              idx !== metrics.length - 1
                ? "lg:pr-6 xl:lg:pr-8"
                : "lg:pl-4"
            } border-b border-white/10 pb-5 sm:border-b-0 sm:pb-0 last:border-b-0 last:pb-0`}
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">
              {item.label}
            </span>
            <h3
              className="font-bold text-white mt-1.5 tracking-tight font-heading break-words !text-[20px] !leading-[26px]"
              style={{ fontSize: "20px", lineHeight: "26px" }}
            >
              {item.value}
            </h3>
            <p
              className="text-slate-300 mt-1.5 font-light leading-snug !text-[15px]"
              style={{ fontSize: "15px" }}
            >
              {item.subtext}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Separate Navigation Strip / Pati ("seprate pati")
 */
export const ProgramNavPati: React.FC<{
  tabs?: typeof programNavTabs;
  defaultTab?: string;
  inquiryHref?: string;
}> = ({
  tabs = programNavTabs,
  defaultTab = "overview",
  inquiryHref = "tel:+918001234567",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Synchronize active tab with scroll position (scroll spy)
  useEffect(() => {
    const handleScroll = () => {
      // Find all sections on the page matching tabs
      const sectionElements = tabs
        .map((tab) => ({ id: tab.id, el: document.getElementById(tab.id) }))
        .filter((item) => item.el !== null) as { id: string; el: HTMLElement }[];

      if (sectionElements.length === 0) return;

      // The top navigation bar is sticky at top-16 (64px) with height ~48px, so trigger at ~180px
      const triggerPoint = 180;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { id, el } = sectionElements[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerPoint) {
          setActiveTab(id);
          return;
        }
      }

      // If above the first section, set the first tab as active
      if (sectionElements.length > 0) {
        setActiveTab(sectionElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      const yOffset = -125;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#0c101d] border-y border-white/10 shadow-xl text-white sticky top-16 z-40 backdrop-blur-md">
      <div className="max-w-[87rem] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2 sm:py-2.5">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`relative py-2 text-sm transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "text-white font-medium"
                    : "text-slate-400 hover:text-slate-200 font-normal"
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute -bottom-2 sm:-bottom-2.5 left-0 right-0 h-[2px] bg-[#f9d868] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action: Call For Inquiry Button */}
        <div className="shrink-0 pl-4">
          <Link
            href={inquiryHref}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-full bg-white text-zinc-950 text-sm font-semibold hover:bg-slate-100 hover:shadow-lg transition-all shadow-md group whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-zinc-900 group-hover:rotate-12 transition-transform" />
            <span>Call For Inquiry</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

/**
 * Combined Section (White section containing the dark card + separate pati underneath)
 */
export const ProgramOverviewBar: React.FC<{
  metrics?: ProgramMetricItem[];
}> = ({ metrics }) => {
  return (
    <>
      {/* White Section with Dark 4-Column Card */}
      <section className="w-full bg-white py-4 sm:py-6 lg:py-8">
        <div className="max-w-[87rem] mx-auto px-4 sm:px-6 lg:px-12">
          <ProgramKeyMetricsCard metrics={metrics} />
        </div>
      </section>

      {/* Separate Navigation Strip ("seprate pati") */}
      <ProgramNavPati />
    </>
  );
};

export default ProgramOverviewBar;
