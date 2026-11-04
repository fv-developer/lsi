"use client";

import React from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import { SplitText } from "@/components/common/SplitText";

export function ProgramOverviewSection() {
  const leadHeadline =
    "Our B.Sc./B.Sc. (Hons) in Integrative Nutrition and Dietetics is designed for students looking for career options after 12th and NEET alternatives beyond MBBS. The programme provides in-depth knowledge of nutrition, wellness, and healthy diet planning through industry-focused learning.";

  return (
    <section id="overview" className="w-full bg-white py-12 sm:py-16 lg:py-20 text-zinc-900 border-b border-zinc-100 overflow-hidden">
      <div className="max-w-[87rem] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Section Heading */}
        <div className="text-left w-full mb-8 sm:mb-12">
          <h2 className="font-heading font-normal uppercase text-[#314b83] tracking-tight mb-5 text-4xl sm:!text-[64px] sm:!leading-[68px] lg:!text-[64px] lg:!leading-[68px]">
            <SplitText
              text="PROGRAM OVERVIEW"
              tag="span"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={35}
              duration={0.8}
            />
          </h2>

          {/* Animated Scroll Fill Text Gradient (Identical to Homepage AboutSection) */}
          <div className="w-full text-left">
            <TextGradientScroll
              text={leadHeadline}
              type="letter"
              textOpacity="soft"
              className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.3] text-zinc-900 text-left justify-start w-full"
            />
          </div>
        </div>

        {/* Second Row Split: Left Side Video | Right Side Content + Download Brochure Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center pt-2 sm:pt-4">
          {/* Left Column: Reduced Height 16:9 Video Card (6 cols) */}
          <div className="lg:col-span-6 relative w-full aspect-video rounded-[20px] overflow-hidden shadow-2xl border border-zinc-200 bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/HFDeTVsLtvQ?autoplay=1&mute=1&loop=1&playlist=HFDeTVsLtvQ&controls=1&playsinline=1&modestbranding=1&rel=0"
              title="B.Sc. Integrative Nutrition and Dietetics - LSI"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Right Column: Second Paragraph + Download Brochure Button (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8">
            <p
              className="text-zinc-700 !text-[20px] !leading-[30px] !font-light"
              style={{
                fontSize: "20px",
                fontWeight: 300,
                lineHeight: "30px",
              }}
            >
              Developed with global dietitians and nutrition experts, the curriculum combines practical exposure, experiential learning, and internships. With strong placement support, students are prepared for rewarding careers in healthcare, nutrition, and wellness industries.
            </p>

            <div className="pt-2">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#334180] text-white text-sm sm:text-base font-medium hover:bg-[#273368] transition-all shadow-md hover:shadow-xl group"
              >
                <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                <span>Download Brochure</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgramOverviewSection;
