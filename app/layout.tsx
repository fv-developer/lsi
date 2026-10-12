import type { Metadata } from "next";
import { Header, Footer, BackToTop, AdmissionModal, CookieConsent } from "@/components/common";
import { SmoothScroll, CustomCursor } from "@/components/animations";
import "./globals.css";

export const metadata: Metadata = {
  title: "LSI - Leadership & Sustainability Institute",
  description: "India's premier specialist institute for Integrative Nutrition & Dietetics",
  icons: {
    icon: "/images/logo/lsi-favicon.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white text-zinc-900" suppressHydrationWarning>
        <CustomCursor />
        <SmoothScroll>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <BackToTop />
          <AdmissionModal />
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}
