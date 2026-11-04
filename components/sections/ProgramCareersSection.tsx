"use client";

import React from "react";

const defaultOpportunitiesRow1 = [
  "Clinical Dietitian",
  "Sports & Performance Nutritionist",
  "Corporate Wellness Consultant",
  "Pediatric & Clinical Specialist",
  "Metabolic Health Coach",
];

const defaultOpportunitiesRow2 = [
  "Functional & Integrative Care Lead",
  "Clinical Research Associate",
  "Food Quality & Safety Analyst",
  "Diagnostic Biochemistry Specialist",
];

export interface ProgramCareersSectionProps {
  opportunitiesRow1?: string[];
  opportunitiesRow2?: string[];
}

export function ProgramCareersSection({
  opportunitiesRow1 = defaultOpportunitiesRow1,
  opportunitiesRow2 = defaultOpportunitiesRow2,
}: ProgramCareersSectionProps) {
  const allOpportunities = [...opportunitiesRow1, ...opportunitiesRow2];

  return (
    <section
      id="careers"
      className="w-full py-12 sm:py-16 bg-[#070e22] text-white relative overflow-hidden border-y border-white/10"
    >
      {/* Background geometric grid pattern matching LSI dark theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-80" />

      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[200px] bg-[#f9d868]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[87rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
        {/* Career Opportunities Sub-Section (20px font heading as requested) */}
        <h3 className="text-[20px] font-bold text-white font-heading tracking-tight mb-6">
          Career Opportunities
        </h3>

        {/* Career Capsules (Small font, non-600 weight) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto">
          {allOpportunities.map((role) => (
            <div
              key={role}
              className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#0369a1] via-[#0284c7] to-[#0ea5e9] hover:from-[#0284c7] hover:via-[#38bdf8] hover:to-[#0284c7] text-white text-xs sm:text-[13px] font-medium tracking-normal shadow-md hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200 border border-white/20 select-none cursor-pointer text-center"
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramCareersSection;
