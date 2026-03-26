"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DISMISS_KEY = "urgency-banner-dismissed";

export default function UrgencyBanner() {
  const [count, setCount] = useState<number | null>(null);
  const [cap, setCap] = useState<number>(400);
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  useEffect(() => {
    // Check sessionStorage on mount
    const wasDismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    setDismissed(wasDismissed);

    if (!wasDismissed) {
      fetch("/api/registrations/count")
        .then((r) => r.json())
        .then((data) => {
          setCount(data.count);
          setCap(data.cap);
        })
        .catch(() => {});
    }
  }, []);

  function handleDismiss() {
    setDismissed(true);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  if (dismissed || count === null) return null;

  const spotsLeft = cap - count;

  let message: string;
  if (spotsLeft <= 0) {
    message = "March 29 — Registration is now closed. Already registered? Retrieve your QR code under My Pass";
  } else if (spotsLeft < 50) {
    message = `March 29, 2026 — Only ${spotsLeft} spots left! Register now`;
  } else {
    message = `March 29, 2026 — Only ${spotsLeft} spots left!`;
  }

  return (
    <div className="w-full gradient-aqua-coral">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        {/* Spacer to keep text centered */}
        <div className="hidden sm:block sm:w-24" />

        <p className="min-w-0 flex-1 text-center text-xs font-bold text-white sm:text-sm">
          {message}
        </p>

        <div className="flex shrink-0 items-center gap-2">
          {spotsLeft > 0 && (
            <Link
              href="/register"
              className="hidden rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:inline-block"
            >
              Register
            </Link>
          )}

          <button
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white -mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
