import type { Metadata } from "next";
import { MeetOurFacultySection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Our Faculty | LSI - Leadership & Sustainability Institute",
  description:
    "Meet our expert academic council, academicians, industry experts, and mentors at LSI Mumbai.",
};

export default function FacultyPage() {
  return (
    <main className="w-full bg-white pt-20">
      <MeetOurFacultySection />
    </main>
  );
}
