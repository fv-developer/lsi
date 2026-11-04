import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | LSI - Leadership & Sustainability Institute",
  description: "Terms and conditions for use of the Lifeness Science Institute website and services.",
};

export default function TermsPage() {
  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-500">
            <li>
              <Link href="/" className="hover:text-zinc-900 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            </li>
            <li className="text-zinc-900 font-semibold" aria-current="page">
              Terms of Service
            </li>
          </ol>
        </nav>

        <h1 className="breadcrumb-heading text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-8">Last Updated: October 2026</p>

        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-700 text-sm sm:text-base leading-relaxed">
          <p>
            By accessing and using this website, you agree to comply with and be bound by the following terms and conditions regarding academic admissions, coursework, and intellectual property.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-6">1. Academic Curriculum &amp; Affiliation</h2>
          <p>
            Curriculum syllabi, faculty allocations, examination protocols, and academic calendars are subject to statutory guidelines and university regulatory councils.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-6">2. Intellectual Property</h2>
          <p>
            All course materials, lectures, multimedia videos, logos, and publications belong to Lifeness Science Institute (LSI) and co-founding partners. Unauthorized redistribution is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
