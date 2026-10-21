import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '../common/Button';
import { Link } from '../../utils/navigation';

const words = ['Eid.', 'Weddings.', 'Festivals.', 'Every day.'];
const marquee = ['Free delivery over ৳999', '7-day free returns', 'bKash · Nagad · Rocket', 'Code ANCHOR20 · 20% off', 'Festive 2026'];
const serif = { fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif" };
const lattice = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56'%3E%3Cpath d='M28 0l28 28-28 28L0 28z' fill='none' stroke='%23F2C94C' stroke-opacity='.9'/%3E%3C/svg%3E\")";
const css = `
@keyframes hf{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(40px,-30px,0) scale(1.15)}}
@keyframes wi{from{opacity:0;transform:translateY(45%) skewY(4deg)}to{opacity:1;transform:none}}
@keyframes mq{to{transform:translateX(-50%)}}
@media (prefers-reduced-motion:reduce){.hx{animation:none!important}}`;

export default function Hero() {
  const ref = useRef(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, []);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <section ref={ref} onMouseMove={move} style={{ '--x': '70%', '--y': '35%' }} className="relative isolate overflow-hidden bg-brand-black">
      <style>{css}</style>
      <div className="hx absolute -left-32 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-brand-gold/20 blur-[130px] [animation:hf_14s_ease-in-out_infinite]" aria-hidden="true" />
      <div className="hx absolute -right-24 bottom-0 -z-10 h-[460px] w-[460px] rounded-full bg-amber-700/25 blur-[130px] [animation:hf_18s_ease-in-out_infinite_reverse]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 opacity-[.07]" style={{ backgroundImage: lattice }} aria-hidden="true" />
      <div className="absolute inset-0 -z-10 opacity-60" style={{ backgroundImage: lattice, WebkitMaskImage: 'radial-gradient(circle 280px at var(--x) var(--y), #000, transparent)', maskImage: 'radial-gradient(circle 280px at var(--x) var(--y), #000, transparent)' }} aria-hidden="true" />
      <p className="pointer-events-none absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2 select-none text-[clamp(7rem,27vw,24rem)] font-black leading-none tracking-[-.06em] text-transparent [-webkit-text-stroke:1px_rgba(242,201,76,.22)]" aria-hidden="true">ANCHOR</p>

      <div className="relative mx-auto flex min-h-[640px] max-w-[1440px] flex-col justify-center px-6 pb-24 pt-16 md:min-h-[740px] md:px-12">
        <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[.38em] text-brand-gold"><span className="h-px w-10 bg-brand-gold" aria-hidden="true" />Anchor Fashion · Est. for the modern gentleman</p>
        <h1 className="text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[.98] tracking-[-.03em] text-white" style={serif}>
          Dressed for
          <span className="block overflow-hidden pb-2"><em key={i} className="hx block bg-gradient-to-r from-[#fff3c4] via-brand-gold to-[#c9962b] bg-clip-text text-transparent [animation:wi_.7s_cubic-bezier(.22,1,.36,1)_both]">{words[i]}</em></span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-white/65">Silk Panjabi, sharp shirts and everyday essentials, made to be remembered.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button to="/category/panjabi">Shop Panjabi <ArrowRight size={15} /></Button>
          <Button to="/shop" variant="outline">Shop all</Button>
        </div>
        <Link to="/shop" aria-label="Get 20% off with code ANCHOR20" className="group absolute right-6 top-10 grid h-32 w-32 place-items-center md:right-16 md:top-1/2 md:h-40 md:w-40 md:-translate-y-1/2">
          <svg viewBox="0 0 120 120" className="hx h-full w-full [animation:spin_16s_linear_infinite]" aria-hidden="true"><defs><path id="ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs><text fill="#F2C94C" fontSize="9.5" fontWeight="700"><textPath href="#ring" textLength="285" lengthAdjust="spacing">ANCHOR20 · 20% OFF · ANCHOR20 · 20% OFF · </textPath></text></svg>
          <span className="absolute grid h-16 w-16 place-items-center rounded-full bg-brand-gold text-brand-black transition group-hover:scale-110 md:h-20 md:w-20"><ArrowUpRight size={26} /></span>
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 overflow-hidden border-y border-brand-gold/25 bg-brand-black/70 py-3 backdrop-blur" aria-hidden="true">
        <div className="hx flex w-max gap-12 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[.25em] text-brand-gold [animation:mq_32s_linear_infinite]">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((t, n) => <span key={n} className="flex items-center gap-12">{t}<span className="text-white/30">◆</span></span>)}
        </div>
      </div>
    </section>
  );
}