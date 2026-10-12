import {
  HeroSliderSection,
  AboutSection,
  VerticalBlindsSection,
  StackedCardsSection,
  OurCampusesSection,
  StudentLifeSection,
  RecentActivitySection,
  StudentPlacementsSection,
  TestimonialsSection,
  FaqSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSliderSection />
      <AboutSection />
      <VerticalBlindsSection />
      <StackedCardsSection />
      <OurCampusesSection />
      <StudentLifeSection />
      <RecentActivitySection />
      <StudentPlacementsSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}
