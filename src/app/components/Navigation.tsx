"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BahamianFlag from "./BahamianFlag";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/platforms", label: "Platforms" },
  { href: "/earn", label: "Earn" },
  { href: "/event", label: "Event" },
  { href: "/connect", label: "Connect" },
  { href: "/retrieve", label: "My Pass" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    fetch("/api/registrations/count")
      .then((r) => r.json())
      .then((data) => {
        if (data.count >= data.cap || !data.open) setIsFull(true);
      })
      .catch(() => {});
    fetch("/api/live")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.liveEnabled) setIsLive(true);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-[60] w-full transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white backdrop-blur-xl shadow-sm border-b border-navy/5"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => setMobileOpen(false)}>
            <BahamianFlag width={32} className="shrink-0 rounded-sm shadow-sm" />
            <span className="text-base sm:text-xl lg:text-2xl font-extrabold tracking-tight text-navy">
              Bahamas{" "}
              <span className="gradient-aqua-coral-text">Creator Economy</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm lg:text-base xl:text-lg font-bold text-navy transition-colors hover:text-aqua py-2 px-1"
              >
                {link.label}
              </Link>
            ))}
            {isLive && (
              <Link
                href="/live"
                className="text-sm lg:text-base xl:text-lg font-bold text-red-500 transition-colors hover:text-red-400 py-2 px-1 flex items-center gap-1.5"
              >
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Live
              </Link>
            )}
            <Link
              href={isFull ? "/retrieve" : "/register"}
              className="cta-gradient rounded-full px-4 xl:px-6 py-2.5 text-sm xl:text-base font-bold text-white shadow-lg shadow-aqua/20 transition-all"
            >
              {isFull ? "My Pass" : "Register"}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-navy transition-all duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-navy transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-navy transition-all duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay — outside header, fixed fullscreen */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[55] bg-white pt-20">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-bold text-navy transition-colors hover:text-aqua py-2 px-4"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isLive && (
              <Link
                href="/live"
                className="text-2xl font-bold text-red-500 transition-colors hover:text-red-400 py-2 px-4 flex items-center gap-2"
                onClick={() => setMobileOpen(false)}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                Live
              </Link>
            )}
            <Link
              href={isFull ? "/retrieve" : "/register"}
              className="cta-gradient rounded-full px-10 py-4 text-lg font-bold text-white shadow-lg mt-4"
              onClick={() => setMobileOpen(false)}
            >
              {isFull ? "My Pass" : "Register"}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
