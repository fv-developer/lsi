import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | LSI - Leadership & Sustainability Institute",
  description: "Privacy policy and data protection practices of Lifeness Science Institute (LSI).",
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </li>
          </ol>
        </nav>

        <h1 className="breadcrumb-heading text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-8">Last Updated: October 2026</p>

        <div className="prose prose-zinc max-w-none space-y-6 text-zinc-700 text-sm sm:text-base leading-relaxed">
          <p>
            Lifeness Science Institute (LSI) is committed to protecting the privacy and personal data of prospective students, enrolled learners, faculty members, and visitors to our digital platforms.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-6">1. Information We Collect</h2>
          <p>
            When you inquire about academic courses, submit an online application, or subscribe to institute publications, we may collect your name, email address, telephone number, academic history, and geographic location.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-6">2. Use of Information</h2>
          <p>
            Your information is utilized solely to facilitate admission counselling, process applications, send educational newsletters, and coordinate academic seminars. We do not sell or monetize personal data to third-party commercial marketing entities.
          </p>
          <h2 className="text-xl font-bold text-zinc-900 mt-6">3. Data Security &amp; Retention</h2>
          <p>
            We implement industry-standard encryption protocols and secure database storage. Data is retained only for the duration required for regulatory compliance with academic affiliation standards.
          </p>
        </div>
      </div>
    </div>
  );
}
