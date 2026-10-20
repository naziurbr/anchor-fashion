import { useEffect, useState } from 'react';

// Opening time (Bangladesh time, UTC+6). Change this when the real date is confirmed.
const OPENING = new Date('2026-11-15T10:00:00+06:00').getTime();
const parts = [
  ['days', 86400000],
  ['hours', 3600000],
  ['minutes', 60000],
  ['seconds', 1000],
];

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(0, OPENING - now);
  const passed = now >= OPENING;
  const time = parts.map(([label, size]) => [label, Math.floor(remaining / size) % (label === 'days' ? Infinity : label === 'hours' ? 24 : 60)]);

  if (passed) {
    return <p role="status" className="inline-flex rounded-full bg-brand-gold px-4 py-2 text-xs font-extrabold uppercase tracking-[.18em] text-brand-black">Now open in Rangpur</p>;
  }

  return (
    <div role="timer" aria-label="Countdown to the Rangpur opening" className="grid grid-cols-4 gap-2 sm:gap-3">
      {time.map(([label, amount]) => (
        <div key={label} className={`rounded-2xl border px-2 py-3 text-center backdrop-blur-md ${label === 'seconds' ? 'border-brand-gold/50 bg-brand-gold/10' : 'border-white/15 bg-white/[.06]'}`}>
          <p className={`font-display text-2xl font-bold tabular-nums md:text-3xl ${label === 'seconds' ? 'text-brand-gold' : 'text-white'}`}>{String(amount).padStart(2, '0')}</p>
          <p className="mt-1 text-[11px] uppercase tracking-[.2em] text-brand-gray">{label}</p>
        </div>
      ))}
    </div>
  );
}
