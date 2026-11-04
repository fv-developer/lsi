"use client";

import React from "react";
import { SplitText } from "@/components/common/SplitText";
import { recruiterPartners, RecruiterPartner } from "@/data/recruiterPartners";

const TOTAL_CELLS = 15; // 5 columns x 3 rows = 15 cells on desktop
const LOGOS_PER_CELL = 6; // 6 logos per cell = 90 partner logos in the cycle

export function ProgramRecruitersSection() {
  // Pre-calculate the 6 logos assigned to each of the 15 cells
  const cellsData: RecruiterPartner[][] = Array.from(
    { length: TOTAL_CELLS },
    (_, cellIdx) => {
      return Array.from({ length: LOGOS_PER_CELL }, (_, batchIdx) => {
        const partnerIdx =
          (batchIdx * TOTAL_CELLS + cellIdx) % recruiterPartners.length;
        return recruiterPartners[partnerIdx] || recruiterPartners[0];
      });
    }
  );

  return (
    <section
      id="recruiters-partners"
      className="w-full bg-white py-16 sm:py-24 text-zinc-900 relative overflow-hidden"
    >
      {/* Background Tech Grid Pattern with user specified colors */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #314b8308 1px, #00000000 1px), linear-gradient(#314b830a 1px, #0000 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background ambient soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#314b83]/5 via-[#055c02]/5 to-[#f9d868]/5 blur-3xl pointer-events-none rounded-full z-0" />

      {/* Decorative Pixel / Soft Mosaic Accents matching reference */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <div className="absolute top-12 left-4 sm:left-12 w-32 h-32 flex flex-wrap gap-2 opacity-35">
          <div className="w-6 h-6 bg-emerald-100/60 rounded-sm" />
          <div className="w-4 h-4 bg-emerald-200/50 rounded-sm mt-3" />
          <div className="w-8 h-8 bg-emerald-50 rounded-sm" />
          <div className="w-5 h-5 bg-emerald-100/40 rounded-sm ml-4" />
        </div>
        <div className="absolute top-16 right-4 sm:right-12 w-36 h-36 flex flex-wrap gap-2.5 opacity-35">
          <div className="w-5 h-5 bg-emerald-100/50 rounded-sm ml-6" />
          <div className="w-7 h-7 bg-emerald-200/40 rounded-sm" />
          <div className="w-4 h-4 bg-emerald-50 rounded-sm" />
          <div className="w-6 h-6 bg-emerald-100/60 rounded-sm mt-2" />
        </div>
      </div>

      <div className="max-w-[87rem] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header matching website theme: h4 + h3 48px font-normal uppercase #314b83 */}
        <div className="text-center mx-auto max-w-5xl mb-12 sm:mb-16">
          <h4 className="font-heading italic font-medium text-black text-lg sm:text-2xl lg:text-[28px] tracking-tight mb-2 sm:mb-3">
            Access 100+ Eminent
          </h4>
          <h3 className="font-heading font-normal uppercase text-[#314b83] tracking-tight text-2xl sm:!text-[48px] sm:!leading-[52px] lg:!text-[48px] lg:!leading-[52px]">
            <SplitText
              text="RECRUITERS AND HIRING PARTNERS"
              tag="span"
              splitType="chars"
              textAlign="center"
              useScrollTrigger={true}
              delay={30}
              duration={0.7}
            />
          </h3>
        </div>

        {/* Clean Grid Layout with delicate 1px interior divider lines & Pure CSS fadeScale Animation - Full Container Width */}
        <div className="w-full relative altera-grid">
          {/* 15 Cells Grid with delicate interior border dividers matching reference */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 relative z-10 w-full">
            {cellsData.map((cellLogos, cellIdx) => {
              const col = cellIdx % 5;
              const row = Math.floor(cellIdx / 5);

              return (
                <div
                  key={cellIdx}
                  className={`recruiter-cell relative flex items-center justify-center p-4 sm:p-5 lg:p-6 h-[90px] sm:h-[105px] lg:h-[120px] overflow-hidden ${
                    col < 4
                      ? "lg:border-r lg:border-[#e2e8f0]"
                      : "lg:border-r-0"
                  } ${
                    row < 2
                      ? "lg:border-b lg:border-[#e2e8f0]"
                      : "lg:border-b-0"
                  }`}
                >
                  {cellLogos.map((partner, logoIdx) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`${partner.id}-${logoIdx}`}
                      src={partner.logo}
                      alt={partner.name}
                      title={partner.name}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (
                          partner.remoteLogo &&
                          target.src !== partner.remoteLogo
                        ) {
                          target.src = partner.remoteLogo;
                        }
                      }}
                      className="altera-logo object-contain absolute max-h-[40px] sm:max-h-[48px] max-w-[80%] sm:max-w-[145px] w-auto h-auto transition-transform duration-300 hover:scale-105 pointer-events-auto"
                      style={{
                        animation: `fadeScale6 18s ease-in-out infinite`,
                        animationDelay: `${logoIdx * 3}s`,
                        opacity: 0,
                        transform: "scale(0.85)",
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Altera-exact Pure CSS @keyframes and Responsive Delicate Border Dividers */}
      <style jsx global>{`
        @keyframes fadeScale6 {
          0% {
            opacity: 0;
            transform: scale(0.85);
            pointer-events: none;
          }
          2.5% {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
          }
          13.5% {
            opacity: 1;
            transform: scale(1);
            pointer-events: auto;
          }
          16.66% {
            opacity: 0;
            transform: scale(0.85);
            pointer-events: none;
          }
          100% {
            opacity: 0;
            transform: scale(0.85);
            pointer-events: none;
          }
        }

        /* Hover on grid pauses animation smoothly */
        .altera-grid:hover .altera-logo {
          animation-play-state: paused;
        }

        /* Delicate 1px interior divider borders for tablet (3 cols) and mobile (2 cols) */
        @media (max-width: 1023px) and (min-width: 640px) {
          .recruiter-cell:not(:nth-child(3n)) {
            border-right: 1px solid #e2e8f0;
          }
          .recruiter-cell:nth-child(-n + 12) {
            border-bottom: 1px solid #e2e8f0;
          }
        }
        @media (max-width: 639px) {
          .recruiter-cell:not(:nth-child(2n)) {
            border-right: 1px solid #e2e8f0;
          }
          .recruiter-cell:nth-child(-n + 14) {
            border-bottom: 1px solid #e2e8f0;
          }
        }
      `}</style>
    </section>
  );
}

export default ProgramRecruitersSection;
