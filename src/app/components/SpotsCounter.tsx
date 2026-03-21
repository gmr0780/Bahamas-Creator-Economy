"use client";

import { useState, useEffect } from "react";

export default function SpotsCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [cap, setCap] = useState<number>(400);

  useEffect(() => {
    fetch("/api/registrations/count")
      .then((r) => r.json())
      .then((data) => {
        setCount(data.count);
        setCap(data.cap);
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  const spotsLeft = cap - count;
  const pct = Math.min((count / cap) * 100, 100);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex justify-between text-sm font-bold mb-2">
        <span className="text-aqua">{count} registered</span>
        <span className="text-sand">{spotsLeft > 0 ? `${spotsLeft} spots left` : "Event full"}</span>
      </div>
      <div className="h-3 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-aqua to-coral transition-all duration-1000"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-center text-xs text-sand mt-2 font-medium">
        {cap} total capacity
      </p>
    </div>
  );
}
