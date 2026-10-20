import { Anchor } from 'lucide-react';
import { Link } from '../../utils/navigation';

// Brand lockup: gold anchor + heavy white wordmark + gold "FASHION" pill.
export default function Logo({ compact = false, onClick }) {
  return (
    <Link to="/" onClick={onClick} aria-label="Anchor Fashion home" className="group flex shrink-0 items-center gap-2.5 text-white">
      <Anchor className="text-brand-gold transition-transform duration-500 group-hover:-rotate-12" size={compact ? 24 : 32} strokeWidth={2.4} aria-hidden="true" />
      <span className={`font-display font-extrabold leading-none tracking-[-.04em] ${compact ? 'text-[22px]' : 'text-[28px] md:text-[32px]'}`}>ANCHOR</span>
      <span className="hidden min-[400px]:inline-flex rounded-full bg-brand-gold px-3 py-1 text-[11px] font-extrabold uppercase leading-none tracking-[.16em] text-brand-black md:px-3.5 md:py-1.5 md:text-[11px]">Fashion</span>
    </Link>
  );
}
