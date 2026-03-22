import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navigation from "./components/Navigation";
import UrgencyBanner from "./components/UrgencyBanner";
import PageTracker from "./components/PageTracker";
import BahamianFlag from "./components/BahamianFlag";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bahamas Creator Economy",
    template: "%s | Bahamas Creator Economy",
  },
  description:
    "Empowering Bahamian creators to build, monetize, and thrive on global digital platforms. A program of the Office of the Prime Minister, Commonwealth of The Bahamas.",
  metadataBase: new URL("https://242creators.com"),
  openGraph: {
    title: "Bahamas Creator Economy Initiative",
    description: "Empowering Bahamian digital creators to earn globally. A program of the Office of the Prime Minister.",
    siteName: "242Creators.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bahamas Creator Economy Initiative",
    description: "Empowering Bahamian digital creators to earn globally. March 29, 2026.",
  },
  keywords: [
    "Bahamas",
    "creator economy",
    "digital creators",
    "monetization",
    "Caribbean",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-navy overflow-x-hidden">
        <PageTracker />
        <UrgencyBanner />
        <Navigation />

        <main className="flex-1">{children}</main>

        <footer className="border-t border-navy/10 bg-sand/30">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              {/* Brand */}
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-navy">
                  Bahamas{" "}
                  <span className="gradient-aqua-coral-text">
                    Creator Economy
                  </span>
                </p>
                <p className="mt-1 text-xs sm:text-sm text-navy flex items-center gap-1.5 justify-center md:justify-start flex-wrap">
                  <BahamianFlag width={24} className="rounded-sm shrink-0" />
                  <span>A program of the Office of the Prime Minister, Commonwealth of
                  The Bahamas</span>
                </p>
              </div>

              {/* Footer links */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-6 text-sm text-navy">
                <a href="/platforms" className="hover:text-aqua transition-colors py-2 px-2">
                  Platforms
                </a>
                <a href="/earn" className="hover:text-aqua transition-colors py-2 px-2">
                  Earn
                </a>
                <a href="/event" className="hover:text-aqua transition-colors py-2 px-2">
                  Event
                </a>
                <a href="/register" className="hover:text-aqua transition-colors py-2 px-2">
                  Register
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 border-t border-navy/10 pt-6">
              <p className="text-[11px] text-navy/80 text-center max-w-3xl mx-auto leading-relaxed">
                The information on this website is for educational and informational purposes only and does not constitute tax, legal, or financial advice. Earnings estimates are illustrative and not guarantees. Tax treatment varies by platform, payment type, and personal circumstances. Consult a qualified professional for advice specific to your situation.
              </p>
            </div>

            {/* Legal links & copyright */}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-[11px] text-navy/70">
              <a href="/disclaimer" className="hover:text-aqua transition-colors">Disclaimer</a>
              <a href="/privacy" className="hover:text-aqua transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-aqua transition-colors">Terms of Use</a>
            </div>

            <div className="mt-4 text-center space-y-2">
              <p className="text-xs text-navy">
                &copy; {new Date().getFullYear()} 242Creators.com. Bahamas Creator Economy
                Initiative. All rights reserved.
              </p>
              <p className="text-xs font-semibold text-aqua flex items-center justify-center gap-2">
                <BahamianFlag width={20} className="rounded-sm" />
                Proudly Bahamian Built
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
