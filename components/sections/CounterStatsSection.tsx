"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  GraduationCap,
  Users,
  Building2,
  Handshake,
  Award,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface StatItem {
  id: string;
  numberValue: number;
  decimals: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  bgColor: string;
}

const statsData: StatItem[] = [
  {
    id: "stat-1",
    numberValue: 98.6,
    decimals: 1,
    suffix: "%",
    label: "STUDENTS PLACED",
    icon: GraduationCap,
    bgColor: "rgb(29 29 29)",
  },
  {
    id: "stat-2",
    numberValue: 47,
    decimals: 0,
    suffix: "+",
    label: "INDUSTRY EXPERTS",
    icon: Users,
    bgColor: "rgb(29 29 29)",
  },
  {
    id: "stat-3",
    numberValue: 6,
    decimals: 0,
    suffix: "+",
    label: "CAMPUSES",
    icon: Building2,
    bgColor: "rgb(29 29 29)",
  },
  {
    id: "stat-4",
    numberValue: 120,
    decimals: 0,
    suffix: "+",
    label: "INDUSTRY PARTNERS",
    icon: Handshake,
    bgColor: "rgb(29 29 29)",
  },
  {
    id: "stat-5",
    numberValue: 30,
    decimals: 0,
    suffix: "+",
    label: "TOP FACULTY",
    icon: Award,
    bgColor: "rgb(29 29 29)",
  },
];

export function CounterStatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0, 0]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length) return;

      // In 5-column grid:
      // Card 0 (leftmost) shifts +200% xPercent to stack at center Card 2
      // Card 1 shifts +100% xPercent to stack at center Card 2
      // Card 2 (center) stays at 0%
      // Card 3 shifts -100% xPercent to stack at center Card 2
      // Card 4 (rightmost) shifts -200% xPercent to stack at center Card 2
      const initialXPercents = [200, 100, 0, -100, -200];

      // Set initial state: all 5 cards clustered at center with 0.75 scale & opacity 0
      cards.forEach((card, index) => {
        gsap.set(card, {
          xPercent: initialXPercents[index],
          scale: 0.75,
          opacity: 0,
        });
      });

      // Animate spread outward on scroll trigger with delay & slower ease
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
        delay: 0.4,
      });

      tl.to(cards, {
        xPercent: 0,
        scale: 1,
        opacity: 1,
        duration: 1.6,
        stagger: {
          from: "center",
          amount: 0.5,
        },
        ease: "power3.out",
      });

      // Concurrent count-up animation for stats numbers
      const obj = { val0: 0, val1: 0, val2: 0, val3: 0, val4: 0 };
      tl.to(
        obj,
        {
          val0: statsData[0].numberValue,
          val1: statsData[1].numberValue,
          val2: statsData[2].numberValue,
          val3: statsData[3].numberValue,
          val4: statsData[4].numberValue,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => {
            setCounts([obj.val0, obj.val1, obj.val2, obj.val3, obj.val4]);
          },
        },
        "-=1.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="mt-8 sm:mt-10 w-full overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
        {statsData.map((stat, idx) => {
          const IconComp = stat.icon;
          const formattedVal =
            stat.decimals > 0
              ? counts[idx].toFixed(stat.decimals)
              : Math.floor(counts[idx]).toString();

          return (
            <div
              key={stat.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              style={{ backgroundColor: stat.bgColor }}
              className="counter-card rounded-[10px] p-7 flex flex-col justify-between shadow-none border-0 text-white will-change-transform min-h-[140px] sm:min-h-[150px]"
            >
              {/* Number Value */}
              <div className="text-[50px] leading-none font-normal tracking-tight text-white mb-4 font-heading">
                {formattedVal}
                {stat.suffix}
              </div>

              {/* Icon & Label */}
              <div className="flex items-center gap-2 text-white">
                <IconComp className="w-4 h-4 text-white shrink-0" />
                <span className="text-[14px] font-light text-white tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
