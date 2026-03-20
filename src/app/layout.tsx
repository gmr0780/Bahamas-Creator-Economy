import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navigation from "./components/Navigation";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bahamas Creator Economy Initiative",
    template: "%s | Bahamas Creator Economy Initiative",
  },
  description:
    "Empowering Bahamian creators to build, monetize, and thrive on global digital platforms. A program of the Office of the Prime Minister, Commonwealth of The Bahamas.",
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
      <body className="min-h-screen flex flex-col bg-white text-navy">
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
                <p className="mt-1 text-sm text-navy/70">
                  A program of the Office of the Prime Minister, Commonwealth of
                  The Bahamas
                </p>
              </div>

              {/* Footer links */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-navy/60">
                <a href="/platforms" className="hover:text-aqua transition-colors">
                  Platforms
                </a>
                <a href="/earn" className="hover:text-aqua transition-colors">
                  Earn
                </a>
                <a href="/event" className="hover:text-aqua transition-colors">
                  Event
                </a>
                <a href="/register" className="hover:text-aqua transition-colors">
                  Register
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-navy/10 pt-6 text-center">
              <p className="text-xs text-navy/60">
                &copy; {new Date().getFullYear()} Bahamas Creator Economy
                Initiative. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
