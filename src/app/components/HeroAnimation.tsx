'use client';

/**
 * HeroAnimation — full-screen animated background for the hero section.
 * Pure CSS/SVG animations. No canvas, no JS animation loops.
 */

export default function HeroAnimation({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* ── Inline keyframes ──────────────────────── */}
      <style>{`
        /* Floating upward + fade */
        @keyframes hero-float-up {
          0%   { opacity: 0; transform: translateY(0) scale(0.8); }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100vh) scale(1); }
        }

        /* Gentle drift for gradient orbs */
        @keyframes hero-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%      { transform: translate(40px, -30px) scale(1.05); }
          50%      { transform: translate(-20px, -60px) scale(0.95); }
          75%      { transform: translate(-40px, 20px) scale(1.02); }
        }
        @keyframes hero-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%      { transform: translate(-30px, 40px) scale(0.97); }
          50%      { transform: translate(50px, 20px) scale(1.04); }
          75%      { transform: translate(20px, -40px) scale(0.98); }
        }

        /* Pulse for engagement icons */
        @keyframes hero-pulse-float {
          0%   { opacity: 0; transform: translateY(0) scale(0.6); }
          15%  { opacity: 0.8; transform: translateY(-10px) scale(1); }
          50%  { opacity: 0.6; transform: translateY(-30px) scale(1.1); }
          85%  { opacity: 0.8; transform: translateY(-50px) scale(1); }
          100% { opacity: 0; transform: translateY(-70px) scale(0.6); }
        }

        /* Number float */
        @keyframes hero-number-rise {
          0%   { opacity: 0; transform: translateY(20px) scale(0.9); }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(-80vh) scale(1.1); }
        }
      `}</style>

      {/* ── Gradient orbs ─────────────────────────── */}
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          top: '15%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)',
          animation: 'hero-drift-1 18s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 250,
          height: 250,
          top: '50%',
          right: '8%',
          background: 'radial-gradient(circle, rgba(255,107,107,0.10) 0%, transparent 70%)',
          animation: 'hero-drift-2 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          bottom: '10%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(8,145,178,0.08) 0%, transparent 70%)',
          animation: 'hero-drift-1 25s ease-in-out infinite 3s',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 180,
          height: 180,
          top: '25%',
          right: '25%',
          background: 'radial-gradient(circle, rgba(255,107,107,0.08) 0%, transparent 70%)',
          animation: 'hero-drift-2 20s ease-in-out infinite 5s',
        }}
      />

      {/* ── Floating play buttons ─────────────────── */}
      {[
        { left: '8%',  size: 18, delay: '0s',   dur: '12s' },
        { left: '22%', size: 14, delay: '2s',   dur: '14s' },
        { left: '38%', size: 20, delay: '4s',   dur: '11s' },
        { left: '55%', size: 12, delay: '1s',   dur: '15s' },
        { left: '70%', size: 16, delay: '3s',   dur: '13s' },
        { left: '85%', size: 22, delay: '5s',   dur: '12s' },
        { left: '48%', size: 10, delay: '7s',   dur: '16s' },
      ].map((p, i) => (
        <svg
          key={`play-${i}`}
          className="absolute"
          width={p.size}
          height={p.size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            bottom: '-5%',
            left: p.left,
            opacity: 0,
            animation: `hero-float-up ${p.dur} ease-in-out infinite ${p.delay}`,
          }}
        >
          <polygon
            points="6,3 20,12 6,21"
            fill="rgba(8,145,178,0.15)"
            stroke="rgba(8,145,178,0.20)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}

      {/* ── Rising subscriber numbers ─────────────── */}
      {[
        { text: '+1K',   left: '15%', delay: '0s',  dur: '14s' },
        { text: '+10K',  left: '42%', delay: '3s',  dur: '16s' },
        { text: '+100K', left: '68%', delay: '6s',  dur: '13s' },
        { text: '+5K',   left: '80%', delay: '9s',  dur: '15s' },
        { text: '+50K',  left: '28%', delay: '5s',  dur: '17s' },
      ].map((n, i) => (
        <span
          key={`num-${i}`}
          className="absolute font-bold select-none"
          style={{
            bottom: '0%',
            left: n.left,
            fontSize: 14,
            color: 'rgba(255,107,107,0.18)',
            opacity: 0,
            animation: `hero-number-rise ${n.dur} ease-in-out infinite ${n.delay}`,
            letterSpacing: '0.05em',
          }}
        >
          {n.text}
        </span>
      ))}

      {/* ── Pulsing engagement icons ──────────────── */}
      {/* Hearts */}
      {[
        { left: '12%', top: '70%', size: 16, delay: '0s',  dur: '6s' },
        { left: '60%', top: '55%', size: 12, delay: '2s',  dur: '7s' },
        { left: '88%', top: '65%', size: 14, delay: '4s',  dur: '5.5s' },
      ].map((h, i) => (
        <svg
          key={`heart-${i}`}
          className="absolute"
          width={h.size}
          height={h.size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            left: h.left,
            top: h.top,
            opacity: 0,
            animation: `hero-pulse-float ${h.dur} ease-in-out infinite ${h.delay}`,
          }}
        >
          <path
            d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 13.5 12 21 12 21Z"
            fill="rgba(255,107,107,0.15)"
          />
        </svg>
      ))}

      {/* Thumbs up */}
      {[
        { left: '25%', top: '60%', size: 14, delay: '1s',  dur: '7s' },
        { left: '75%', top: '75%', size: 16, delay: '3.5s', dur: '6s' },
      ].map((t, i) => (
        <svg
          key={`thumb-${i}`}
          className="absolute"
          width={t.size}
          height={t.size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            left: t.left,
            top: t.top,
            opacity: 0,
            animation: `hero-pulse-float ${t.dur} ease-in-out infinite ${t.delay}`,
          }}
        >
          <path
            d="M7 22V11L10 2C10.55 2 11 2.45 11 3V10H18.77C19.35 10 19.79 10.54 19.67 11.11L18.12 18.11C17.95 18.89 17.25 19.45 16.45 19.45H7"
            fill="rgba(8,145,178,0.15)"
          />
        </svg>
      ))}

      {/* Comment bubbles */}
      {[
        { left: '45%', top: '72%', size: 14, delay: '2.5s', dur: '6.5s' },
        { left: '18%', top: '80%', size: 12, delay: '5s',   dur: '7.5s' },
      ].map((c, i) => (
        <svg
          key={`comment-${i}`}
          className="absolute"
          width={c.size}
          height={c.size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            left: c.left,
            top: c.top,
            opacity: 0,
            animation: `hero-pulse-float ${c.dur} ease-in-out infinite ${c.delay}`,
          }}
        >
          <path
            d="M21 11.5C21 16.19 16.97 20 12 20C10.82 20 9.69 19.82 8.65 19.47L3 21L4.53 15.35C3.56 13.82 3 12.04 3 11.5C3 6.81 7.03 3 12 3C16.97 3 21 6.81 21 11.5Z"
            fill="rgba(255,107,107,0.12)"
          />
        </svg>
      ))}
    </div>
  );
}
