import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { StackedCardsSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Academic Programs | LSI - Integrative Nutrition & Dietetics",
  description:
    "Explore undergraduate, postgraduate, and diploma programs in Integrative Nutrition, Dietetics, and Lifestyle Coaching at LSI.",
};

export default function ProgramsPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Breadcrumb Banner Section with Card Frame */}
      <section className="w-full p-3 sm:p-4 lg:p-4 bg-white flex flex-col justify-between">
        <div
          className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] text-white overflow-hidden rounded-[20px] flex flex-col justify-between pt-24 pb-10 sm:pb-14 border border-white/10 shadow-2xl"
          style={{
            background:
              "linear-gradient(93deg, rgba(5, 92, 2, 1) 0%, rgba(54, 73, 158, 1) 100%)",
          }}
        >
          {/* Background Image & Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero/banner-bg-2.webp"
              alt="LSI Academic Programs"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-45 brightness-95 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-[1]" />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Main Content Box matching Homepage Hero Margins & Padding */}
          <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full mb-1 sm:mb-3">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
              <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#f9d868] transition-colors flex items-center gap-1"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </li>
                <li className="text-[#f9d868] font-semibold" aria-current="page">
                  Programs
                </li>
              </ol>
            </nav>

            {/* Page Heading & Subtitle */}
            <div className="max-w-4xl space-y-3.5">
              <h1 className="breadcrumb-heading font-heading !text-[48px] !leading-[48px] tracking-tight font-normal text-white">
                World-Class Programs in{" "}
                <span className="block text-[#f9d868] mt-1 font-normal">
                  Integrative Nutrition & Dietetics
                </span>
              </h1>

              <p className="font-body text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-light">
                Industry-focused curricula combining modern clinical science with holistic wellness principles, co-founded with Luke Coutinho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Program Showcase Cards */}
      <StackedCardsSection />
    </div>
  );
}
