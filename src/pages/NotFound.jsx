import { Anchor, ArrowLeft } from 'lucide-react';
import { Link } from '../utils/navigation';

export default function NotFound() {
  return <main className="page-shell flex min-h-[65vh] flex-col items-center justify-center py-20 text-center"><Anchor size={34} className="text-brand-gold" strokeWidth={1.3} /><p className="mt-6 text-[11px] uppercase tracking-[.25em] text-brand-gold">Lost your way?</p><h1 className="mt-2 font-display text-6xl text-white">404</h1><p className="mt-3 max-w-sm text-sm text-brand-gray">This page isn’t part of our collection. Let’s get you back to something good.</p><Link to="/" className="mt-7 inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-white hover:border-brand-gold hover:text-brand-gold"><ArrowLeft size={14} /> Back to home</Link></main>;
}
