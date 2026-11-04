import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Award, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Accreditation & Affiliations | LSI - Integrative Nutrition & Dietetics",
  description:
    "Official university affiliations, academic partnerships, and degree recognition for Lifeness Science Institute (LSI).",
};

export default function AccreditationPage() {
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
              Accreditation
            </li>
          </ol>
        </nav>

        <h1 className="breadcrumb-heading text-3xl sm:text-4xl font-bold text-zinc-900 mb-6">
          Accreditation &amp; Affiliations
        </h1>

        <div className="space-y-8 mt-8">
          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-zinc-900">University of Mumbai Affiliation</h2>
                <p className="text-zinc-500 text-sm">Recognized Undergraduate Degree Programs</p>
              </div>
            </div>
            <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
              Our B.Sc. (Hons) in Integrative Nutrition &amp; Dietetics is conducted in institutional partnership with premier colleges affiliated with the prestigious University of Mumbai, ensuring rigorous academic governance, degree recognition, and clinical standards.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
            <h3 className="text-lg font-bold text-zinc-900">Key Collaboration Partners</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-zinc-200 text-center font-semibold text-xs text-zinc-800">
                University of Mumbai
              </div>
              <div className="bg-white p-4 rounded-xl border border-zinc-200 text-center font-semibold text-xs text-zinc-800">
                BKBC
              </div>
              <div className="bg-white p-4 rounded-xl border border-zinc-200 text-center font-semibold text-xs text-zinc-800">
                MKES
              </div>
              <div className="bg-white p-4 rounded-xl border border-zinc-200 text-center font-semibold text-xs text-zinc-800">
                RAV
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
