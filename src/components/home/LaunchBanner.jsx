import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from '../../utils/navigation';

export default function LaunchBanner() {
  return (
    <section className="launch-banner flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex items-start gap-4">
        <Sparkles className="mt-1 shrink-0 text-brand-gold" size={20} />
        <div><p className="text-[11px] font-bold uppercase tracking-[.24em] text-brand-gold">Limited time</p><h2 className="mt-1 font-display text-2xl text-white">Mid-season exclusive: flat 20% off.</h2><p className="mt-1 text-xs text-brand-gray">Applies across all collections with code <span className="font-semibold text-white">ANCHOR20</span></p></div>
      </div>
      <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.18em] text-white transition hover:text-brand-gold">Shop the sale <ArrowUpRight size={15} /></Link>
    </section>
  );
}
