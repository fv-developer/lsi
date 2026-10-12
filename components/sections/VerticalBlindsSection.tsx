"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export interface BlindSlide {
  id: string;
  title: string;
  description: string;
  image: string;
}

const slides: BlindSlide[] = [
  {
    id: "slide-1",
    title: "Lorem ipsum",
    description:
      "Lorem ipsum is a standard placeholder or dummy text commonly",
    image: "/images/verctical-slider/yoga-banner.webp",
  },
  {
    id: "slide-2",
    title: "Lorem ipsum",
    description:
      "Lorem ipsum is a standard placeholder or dummy text commonly",
    image: "/images/verctical-slider/amul-industry-visit-banner.webp",
  },
  {
    id: "slide-3",
    title: "Lorem ipsum",
    description:
      "Lorem ipsum is a standard placeholder or dummy text commonly",
    image: "/images/verctical-slider/green-banner.webp",
  },
];

const BLIND_COUNT = 14;
const svgNS = "http://www.w3.org/2000/svg";

export function VerticalBlindsSection() {
  const stageRef = useRef<HTMLDivElement>(null);
  const layersContainerRef = useRef<HTMLDivElement>(null);
  const [vbWidth, setVbWidth] = useState(177.77); // Default 16:9 ratio (100 * 16/9)
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Helper to construct blinds inside SVG group
  const createBlinds = (g: SVGGElement, isFirstLayer: boolean, currentVbWidth: number) => {
    g.innerHTML = "";
    const w = currentVbWidth / BLIND_COUNT;
    const blinds: { left: SVGRectElement; right: SVGRectElement; x: number; w: number }[] = [];
    let currentX = 0;

    for (let i = 0; i < BLIND_COUNT; i++) {
      const centerX = currentX + w / 2;
      const rectLeft = document.createElementNS(svgNS, "rect");
      const rectRight = document.createElementNS(svgNS, "rect");

      [rectLeft, rectRight].forEach((r) => {
        r.setAttribute("y", "0");
        r.setAttribute("height", "100");
        r.setAttribute("width", isFirstLayer ? (w / 2 + 0.1).toString() : "0");
        r.setAttribute("fill", "white");
        r.setAttribute("shape-rendering", "crispEdges");
      });

      if (isFirstLayer) {
        rectLeft.setAttribute("x", (centerX - w / 2).toString());
        rectRight.setAttribute("x", centerX.toString());
      } else {
        rectLeft.setAttribute("x", centerX.toString());
        rectRight.setAttribute("x", centerX.toString());
      }

      g.appendChild(rectLeft);
      g.appendChild(rectRight);

      blinds.push({ left: rectLeft, right: rectRight, x: centerX, w: w / 2 });
      currentX += w;
    }
    return blinds;
  };

  useGSAP(
    () => {
      if (!stageRef.current || !layersContainerRef.current) return;

      const updateLayoutAndAnimate = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const currentVbWidth = (width / height) * 100;
        setVbWidth(currentVbWidth);

        const svgElements = layersContainerRef.current?.querySelectorAll<SVGSVGElement>(".blind-layer");
        if (!svgElements) return;

        const blindsSets: { left: SVGRectElement; right: SVGRectElement; x: number; w: number }[][] = [];

        svgElements.forEach((svg, i) => {
          svg.setAttribute("viewBox", `0 0 ${currentVbWidth} 100`);
          const maskRect = svg.querySelector<SVGRectElement>("mask rect");
          if (maskRect) {
            maskRect.setAttribute("width", currentVbWidth.toString());
          }
          const img = svg.querySelector<SVGImageElement>("image");
          if (img) {
            img.setAttribute("width", currentVbWidth.toString());
          }

          const blindGroup = svg.querySelector<SVGGElement>('g[id^="blinds"]');
          if (blindGroup) {
            const blinds = createBlinds(blindGroup, i === 0, currentVbWidth);
            if (blinds) blindsSets.push(blinds);
          }
        });

        // Kill existing timeline if any
        if (masterTimelineRef.current) {
          masterTimelineRef.current.kill();
        }

        const texts = gsap.utils.toArray<HTMLElement>(".blind-text-item");
        const progressFills = gsap.utils.toArray<HTMLElement>(".blind-progress-fill");

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        masterTimelineRef.current = master;

        // Set initial text states
        gsap.set(texts, { clipPath: "inset(0% 0% 100% 0%)", y: 40, opacity: 0 });
        if (texts[0]) {
          gsap.set(texts[0], { clipPath: "inset(0% 0% 0% 0%)", y: 0, opacity: 1 });
        }

        // Segment Progress Bar ScrollTrigger
        ScrollTrigger.create({
          trigger: stageRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 0.3,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalSteps = progressFills.length;
            progressFills.forEach((fill, i) => {
              let p = (progress - i / totalSteps) * totalSteps;
              p = Math.max(0, Math.min(1, p));
              fill.style.width = `${p * 100}%`;
            });
          },
        });

        // Animate blinds opening layer by layer
        blindsSets.forEach((blinds, i) => {
          if (i === 0) return;

          // Outgoing text animation
          if (texts[i - 1]) {
            master.to(
              texts[i - 1],
              {
                clipPath: "inset(0% 0% 100% 0%)",
                y: -40,
                opacity: 0,
                duration: 0.8,
              },
              ">"
            );
          }

          // Blinds opening tween
          const openTween = gsap.to(
            blinds.flatMap((b) => [b.left, b.right]),
            {
              attr: {
                x: (index) => {
                  const b = blinds[Math.floor(index / 2)];
                  return index % 2 === 0 ? b.x - b.w : b.x;
                },
                width: (index) => {
                  const b = blinds[Math.floor(index / 2)];
                  return b.w + 0.05;
                },
              },
              ease: "none",
              stagger: { each: 0.02, from: "start" },
            }
          );

          master.add(openTween, "-=0.3");

          // Incoming text animation
          if (texts[i]) {
            master.to(
              texts[i],
              {
                clipPath: "inset(0% 0% 0% 0%)",
                y: 0,
                opacity: 1,
                duration: 0.8,
              },
              "-=0.5"
            );
          }

          master.to({}, { duration: 1 });
        });
      };

      updateLayoutAndAnimate();

      const handleResize = () => {
        updateLayoutAndAnimate();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    },
    { scope: stageRef }
  );

  return (
    <section ref={stageRef} className="w-full h-screen relative bg-[#0b1428] text-white overflow-hidden">
      {/* SVG Image Layers Container */}
      <div ref={layersContainerRef} className="absolute inset-0 w-full h-full pointer-events-none">
        {slides.map((slide, idx) => (
          <svg
            key={slide.id}
            className="blind-layer absolute inset-0 w-full h-full object-cover"
            viewBox={`0 0 ${vbWidth} 100`}
            preserveAspectRatio="none"
          >
            <defs>
              <mask id={`mask-layer-${idx}`} maskUnits="userSpaceOnUse">
                <rect x="0" y="0" width={vbWidth} height="100" fill="black" />
                <g id={`blinds-layer-${idx}`}></g>
              </mask>
            </defs>
            <image
              href={slide.image}
              x="0"
              y="0"
              width={vbWidth}
              height="100"
              preserveAspectRatio="xMidYMid slice"
              mask={`url(#mask-layer-${idx})`}
            />
          </svg>
        ))}

        {/* Dark Overlay Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />
      </div>

      {/* Text Overlay Container */}
      <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 h-full flex flex-col justify-end pb-24 sm:pb-28 lg:pb-32 relative z-20 pointer-events-none">
        <div className="relative w-full max-w-3xl">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`blind-text-item pointer-events-auto ${
                idx === 0 ? "relative" : "absolute bottom-0 left-0 right-0"
              }`}
            >
              {/* Title */}
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-none font-heading mb-4">
                {slide.title}
              </h2>

              {/* Description */}
              <p className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed">
                {slide.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Minimal Segmented Progress Line (Full-Width Sleek Bar matching screenshot) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-[87rem] px-6 sm:px-10 lg:px-12 flex items-center gap-3 pointer-events-none">
        {slides.map((slide) => (
          <div key={slide.id} className="flex-1 h-[2px] bg-white/25 overflow-hidden">
            <div className="blind-progress-fill h-full bg-white w-0 transition-all duration-75" />
          </div>
        ))}
      </div>
    </section>
  );
}
