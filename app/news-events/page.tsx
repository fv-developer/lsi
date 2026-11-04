import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { RecentActivitySection } from "@/components/sections";

export const metadata: Metadata = {
  title: "News & Events | LSI - Leadership & Sustainability Institute",
  description:
    "Stay informed with the latest announcements, campus achievements, guest lectures, and student activities at LSI Mumbai.",
};

export default function NewsEventsPage() {
  return (
    <div className="w-full bg-white">
      {/* Hero Breadcrumb Banner Section */}
      <section className="w-full p-3 sm:p-4 lg:p-4 bg-white flex flex-col justify-between">
        <div
          className="relative w-full min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] text-white overflow-hidden rounded-[20px] flex flex-col justify-between pt-24 pb-10 sm:pb-14 border border-white/10 shadow-2xl"
          style={{
            background:
              "linear-gradient(93deg, rgba(5, 92, 2, 1) 0%, rgba(54, 73, 158, 1) 100%)",
          }}
        >
          {/* Background Image & Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about-us/yoga-banner.webp"
              alt="LSI News and Events"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-40 brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-[1]" />
          </div>

          <div className="flex-1" />

          {/* Header Content */}
          <div className="max-w-[87rem] mx-auto px-6 sm:px-10 lg:px-12 relative z-10 w-full mb-1 sm:mb-3">
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
                  News &amp; Events
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl space-y-3.5">
              <h1 className="breadcrumb-heading font-heading !text-[48px] !leading-[48px] tracking-tight font-normal text-white">
                Campus Updates &amp;{" "}
                <span className="block text-[#f9d868] mt-1 font-normal">
                  Happenings
                </span>
              </h1>
              <p className="font-body text-slate-200 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-light">
                Discover the latest stories, community milestones, guest masterclasses, and student achievements at Lifeness Science Institute.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Grid */}
      <RecentActivitySection />
    </div>
  );
}
