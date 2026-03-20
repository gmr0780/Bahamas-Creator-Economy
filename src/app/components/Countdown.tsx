"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-03-29T09:00:00-05:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="countdown-digit rounded-xl sm:rounded-2xl px-1.5 py-2 sm:px-6 sm:py-4 min-w-[2.8rem] sm:min-w-[5.5rem]">
        <span className="block text-center text-xl sm:text-5xl font-bold tracking-tight gradient-text tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[0.6rem] sm:text-sm uppercase tracking-[0.1em] sm:tracking-[0.2em] text-navy/80 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(calcTimeLeft());
    const id = setInterval(() => setTime(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) {
    return (
      <div className="flex items-center gap-1.5 sm:gap-5 justify-center">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <Digit key={label} value={0} label={label} />
        ))}
      </div>
    );
  }

  const allZero =
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;

  if (allZero) {
    return (
      <p className="text-2xl sm:text-3xl font-bold gradient-text">
        The Summit Has Launched!
      </p>
    );
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-5 justify-center">
      <Digit value={time.days} label="Days" />
      <span className="text-lg sm:text-4xl font-light text-navy/50 -mt-6">
        :
      </span>
      <Digit value={time.hours} label="Hours" />
      <span className="text-lg sm:text-4xl font-light text-navy/50 -mt-6">
        :
      </span>
      <Digit value={time.minutes} label="Minutes" />
      <span className="text-lg sm:text-4xl font-light text-navy/50 -mt-6">
        :
      </span>
      <Digit value={time.seconds} label="Seconds" />
    </div>
  );
}
