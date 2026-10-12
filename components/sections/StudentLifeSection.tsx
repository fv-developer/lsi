"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { SplitText } from "@/components/common/SplitText";

export interface ExperientialCardData {
  id: string;
  number: string;
  title: string;
  mainImage: string;
  subImages: [string, string, string];
}

const experientialData: ExperientialCardData[] = [
  {
    id: "exp-1",
    number: "01",
    title: "Masterclass",
    mainImage: "/images/campus-activity/masterclass/Millet-Masterclass-with-Priyanka-Vithlani.webp",
    subImages: [
      "/images/campus-activity/masterclass/Mindful-Eating-Masterclass.webp",
      "/images/campus-activity/masterclass/Paushticon-E-Conference-briefing-with-Dr.-Anuradha-Shekhar.webp",
      "/images/campus-activity/masterclass/Millet-Masterclass-with-Priyanka-Vithlani.webp",
    ],
  },
  {
    id: "exp-2",
    number: "02",
    title: "Workshops",
    mainImage: "/images/campus-activity/workshop/Breastfeeding-week-Workshop-Dr.-Pooja-Singhania.jpg",
    subImages: [
      "/images/campus-activity/workshop/Expressive-Art-Therapy (1).jpeg",
      "/images/campus-activity/workshop/First-Aid.webp",
      "/images/campus-activity/workshop/Meditation-and-Breathing-Techniques.jpg",
    ],
  },
  {
    id: "exp-3",
    number: "03",
    title: "Club Activities",
    mainImage: "/images/campus-activity/club-activity/Club-Activities-4.webp",
    subImages: [
      "/images/campus-activity/club-activity/WhatsApp-Image-2026-05-16-at-2.16.47-PM-1.jpeg",
      "/images/campus-activity/club-activity/WhatsApp-Image-2026-05-19-at-12.15.11-PM.jpeg",
      "/images/campus-activity/club-activity/WhatsApp-Image-2026-05-19-at-4.31.20-PM.jpeg",
    ],
  },
  {
    id: "exp-4",
    number: "04",
    title: "Industry Visit",
    mainImage: "/images/campus-activity/industry-visit/Amul-Factory-Visit.webp",
    subImages: [
      "/images/campus-activity/industry-visit/Go-Cheese.jpeg",
      "/images/campus-activity/industry-visit/NASHIK-WINE-PARK.jpg",
      "/images/campus-activity/industry-visit/National-Food-Laboratory-Visit.webp",
    ],
  },
  {
    id: "exp-5",
    number: "05",
    title: "In-house Event",
    mainImage: "/images/campus-activity/in-house-event/Samagra.webp",
    subImages: [
      "/images/campus-activity/in-house-event/Sports-Day.jpg",
      "/images/campus-activity/in-house-event/new-event.jpg",
      "/images/campus-activity/in-house-event/Samagra.webp",
    ],
  },
  {
    id: "exp-6",
    number: "06",
    title: "Extra-curricular Events",
    mainImage: "/images/campus-activity/extra-curricular-events/Nutrition-Month.jpg",
    subImages: [
      "/images/campus-activity/extra-curricular-events/Independence-day-10.jpg",
      "/images/campus-activity/extra-curricular-events/Meet-Greet.jpg",
      "/images/campus-activity/extra-curricular-events/Yoga-Day.jpg",
    ],
  },
  {
    id: "exp-7",
    number: "07",
    title: "Community Service",
    mainImage: "/images/campus-activity/community-service/Cleaning-Drive.jpg",
    subImages: [
      "/images/campus-activity/community-service/The-Platelet-Donation-Drive.jpg",
      "/images/campus-activity/community-service/food-donation.webp",
      "/images/campus-activity/community-service/Cleaning-Drive.jpg",
    ],
  },
];

export function StudentLifeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (idx: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveIndex(idx);
    }, 50);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  const handleClick = (idx: number) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setActiveIndex(idx);
  };

  return (
    <section
      className="w-full relative text-white"
      style={{
        background: "linear-gradient(145deg, rgb(17, 133, 13) 0%, rgb(49, 75, 131) 100%)",
      }}
    >
      <GlyphPortal
        word={"STUDENT\nLIFE"}
        fontWeight={900}
        scrollLength={2.6}
        interactive={true}
        annotations={false}
        enterLabel=""
        style={{
          "--gp-paper": "#ffffff",
          "--gp-ink": "#11850d",
          "--gp-field": "transparent",
          "--gp-foreground": "#ffffff",
        } as React.CSSProperties}
        background={
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(145deg, rgb(17, 133, 13) 0%, rgb(49, 75, 131) 100%)",
            }}
          />
        }
      >
        <div className="w-full py-10 sm:py-14 flex flex-col gap-8 sm:gap-10">
          {/* Header Row: Left-Aligned Heading with Reveal Animation & Right-side View All button */}
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="max-w-4xl flex flex-col items-start text-left">
              <SplitText
                text="EXPERIENTIAL LEARNING"
                tag="h2"
                splitType="chars"
                textAlign="left"
                useScrollTrigger={true}
                delay={25}
                duration={0.7}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase font-heading leading-tight whitespace-nowrap mb-3"
              />
              <p className="text-white/90 text-sm sm:text-base lg:text-lg font-light leading-relaxed">
                Students exploring NEET alternatives or careers beyond MBBS gain practical skills at LSI through workshops, live projects, internships, industry visits, and expert sessions.
              </p>
            </div>

            {/* Right Side Action Button Group (Enforcing border-radius: 10px, 3D arrow roll, and Capitalize text) */}
            <div className="group flex items-center gap-2.5 shrink-0 pb-1 cursor-pointer">
              <Link
                href="/programs"
                className="bg-[#f9d868] hover:bg-[#e6c452] text-[#0b1428] font-medium text-sm sm:text-base px-6 py-2.5 sm:px-7 sm:py-3 rounded-[10px] transition-colors shadow-lg capitalize inline-flex items-center justify-center"
              >
                View All
              </Link>

              <Link
                href="/programs"
                aria-label="View all"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-[#0b1428] rounded-[10px] flex items-center justify-center shadow-lg hover:bg-zinc-100 transition-colors shrink-0"
              >
                <span className="icon-3d-container">
                  <span className="icon-3d-front">
                    <ArrowUpRight className="w-5 h-5 text-[#0b1428]" />
                  </span>
                  <span className="icon-3d-back">
                    <ArrowUpRight className="w-5 h-5 text-[#0b1428]" />
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Expanding Vertical Accordion Card Grid (7 Items) */}
          <div className="w-full flex gap-2.5 sm:gap-3.5 h-[480px] sm:h-[540px] p-1 select-none overflow-hidden">
            {experientialData.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => handleClick(idx)}
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative rounded-[7px] shadow-2xl transition-all duration-500 ease-out overflow-hidden cursor-pointer flex border border-white/40 ${
                    isActive
                      ? "flex-1 bg-white text-zinc-900 p-3 sm:p-4 gap-3 sm:gap-4 min-w-0"
                      : "flex-none w-[68px] sm:w-[80px] bg-white/95 hover:bg-white text-zinc-900 justify-center"
                  }`}
                >
                  {/* Left Side: Rotated Title label */}
                  <div
                    className={`flex flex-col justify-end items-center flex-none transition-all duration-300 ${
                      isActive
                        ? "w-8 sm:w-10 border-r border-zinc-200/80 pr-1"
                        : "w-full"
                    }`}
                  >
                    <span
                      className="text-[20px] sm:text-[22px] font-medium font-heading text-zinc-900 tracking-normal whitespace-nowrap mb-4"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", letterSpacing: "0px" }}
                    >
                      {item.number}. {item.title}
                    </span>
                  </div>

                  {/* Expanded Content: Rendered strictly when active to prevent layout overflow */}
                  {isActive && (
                    <div className="flex-1 flex gap-3 sm:gap-4 h-full min-w-0 animate-in fade-in duration-300">
                      {/* Main Featured Hero Photo */}
                      <div className="w-[58%] relative rounded-[7px] overflow-hidden shadow-md h-full">
                        <Image
                          src={item.mainImage}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 40vw"
                          priority
                        />
                      </div>

                      {/* 3 Sub-Photos Collage Grid */}
                      <div className="w-[42%] flex flex-col gap-2.5 sm:gap-3 h-full">
                        {item.subImages.map((subUrl, subIdx) => (
                          <div key={subIdx} className="relative flex-1 rounded-[7px] overflow-hidden shadow-sm">
                            <Image
                              src={subUrl}
                              alt={`${item.title} ${subIdx + 1}`}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              sizes="(max-width: 768px) 30vw, 20vw"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </GlyphPortal>
    </section>
  );
}

export default StudentLifeSection;






