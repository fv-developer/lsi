"use client";

import React from "react";
import { SplitText } from "@/components/common/SplitText";
import { BgradientAnim } from "@/components/ui/soft-gradient-background-animation";
import InfinitePerspectiveSlider, {
  InfinitePerspectiveSliderItem,
} from "@/components/ui/infinite-perspective-slider";

const experienceItems: InfinitePerspectiveSliderItem[] = [
  {
    src: "/images/campus-activity/masterclass/Millet-Masterclass-with-Priyanka-Vithlani.webp",
    tag: "Masterclass",
    campus: "Malad Campus",
    title: "Luke Coutinho & Industry Masterclasses",
    desc: "Interactive clinical protocols, cellular nutrition & practical case briefings.",
  },
  {
    src: "/images/campus-activity/workshop/Breastfeeding-week-Workshop-Dr.-Pooja-Singhania.jpg",
    tag: "Workshops",
    campus: "Ghatkopar Campus",
    title: "Practical Clinical & Lifestyle Workshops",
    desc: "Hands-on first-aid emergencies, expressive art therapy & mindful breathing.",
  },
  {
    src: "/images/campus-activity/industry-visit/Amul-Factory-Visit.webp",
    tag: "Industry Visits",
    campus: "Mumbai Campus",
    title: "Food Processing & Laboratory Visits",
    desc: "Field visits to Amul and National Food Labs for food chemistry & QC standards.",
  },
  {
    src: "/images/campus-activity/in-house-event/Samagra.webp",
    tag: "Conferences",
    campus: "Kalyan Campus",
    title: "Samagra & Inter-Collegiate Conferences",
    desc: "Annual holistic wellness conclaves, research presentations & health drives.",
  },
  {
    src: "/images/campus-activity/masterclass/Mindful-Eating-Masterclass.webp",
    tag: "Masterclass",
    campus: "Malad Campus",
    title: "Mindful Eating & Cellular Therapeutics",
    desc: "Evidence-based metabolic nutrition and therapeutic recipe standardisation.",
  },
  {
    src: "/images/campus-activity/workshop/First-Aid.webp",
    tag: "Practical Labs",
    campus: "Ghatkopar Campus",
    title: "Emergency Life Support Training",
    desc: "Practical first-aid certification, triage and life-saving clinical handling.",
  },
  {
    src: "/images/campus-activity/industry-visit/National-Food-Laboratory-Visit.webp",
    tag: "Food Testing",
    campus: "Mumbai Campus",
    title: "National Food Laboratory Exposure",
    desc: "Direct study of commercial food testing standards and analytical chemistry.",
  },
  {
    src: "/images/campus-activity/in-house-event/Sports-Day.jpg",
    tag: "Student Life",
    campus: "Kalyan Campus",
    title: "Sports & Community Outreach",
    desc: "Inter-collegiate sports tournaments, yoga days and student leadership initiatives.",
  },
];

export function ProgramExperienceLearningSection() {
  return (
    <section
      id="experience-learning"
      className="py-16 sm:py-24 bg-[#f8f9fc] text-zinc-900 relative overflow-hidden"
    >
      {/* Soft animated gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <BgradientAnim animationDuration={7} />
      </div>

      <div className="relative z-10 w-full">
        {/* Section Header with SplitText Reveal Animation */}
        <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 text-left w-full mb-6 sm:mb-10">
          <h2 className="lsi-section-badge">
            <SplitText
              text="EXPERIENCE LEARNING"
              tag="span"
              splitType="chars"
              textAlign="left"
              useScrollTrigger={true}
              delay={35}
              duration={0.8}
            />
          </h2>
          <p className="text-[#314b83]/80 text-lg sm:text-xl font-normal max-w-2xl leading-relaxed">
            Immerse yourself in real-world clinical rotations, masterclasses by Luke Coutinho and industry leaders, practical labs, and active campus experiences.
          </p>
        </div>

        {/* 3D Infinite Perspective Slider */}
        <div className="w-full">
          <InfinitePerspectiveSlider
            images={experienceItems}
            cardWidth={320}
            cardGap={24}
            perspective={2200}
            scrollSpeed={1}
            scrollLerp={0.1}
            maxRotation={80}
            showContent={true}
            showDescription={false}
          />
        </div>
      </div>
    </section>
  );
}

export default ProgramExperienceLearningSection;
