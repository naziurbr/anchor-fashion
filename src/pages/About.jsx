import { Anchor, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import SectionTitle from '../components/common/SectionTitle';

export default function About() {
  return (
    <main>
      <section className="about-hero relative overflow-hidden border-b border-white/10 px-6 py-20 md:px-12 md:py-28">
        <img src="/images/hero-editorial.png" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute inset-0 bg-brand-black/70" />
        <div className="relative mx-auto max-w-[1180px]"><p className="text-[11px] uppercase tracking-[.28em] text-brand-gold">An independent point of view</p><h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] tracking-[-.05em] text-white md:text-7xl">The pieces you live in. <span className="text-brand-gold">The feeling that stays.</span></h1><p className="mt-6 max-w-xl text-sm leading-7 text-white/70">Anchor is a modern fashion label grounded in considered design, everyday comfort, and the belief that what you wear should feel like you.</p></div>
      </section>
      <section className="page-shell grid gap-10 py-16 md:grid-cols-[.7fr_1.3fr] md:py-24"><div><Anchor size={28} className="text-brand-gold" /><p className="mt-5 text-[11px] uppercase tracking-[.25em] text-brand-gray">What we believe</p></div><div><SectionTitle title="Less noise. More meaning." /><p className="max-w-2xl text-sm leading-7 text-brand-gray">We design for the everyday—not the disposable. Each piece brings together enduring silhouettes, comfortable fabrics, and thoughtful details, so getting dressed can feel a little simpler and a lot more personal.</p><p className="mt-5 max-w-2xl text-sm leading-7 text-brand-gray">As Anchor opens its doors in Rangpur, we’re excited to become part of the city’s own story. A place to discover something new, find a familiar favorite, and make it your own.</p><Button to="/contact" className="mt-7">Say hello <ArrowRight size={14} /></Button></div></section>
      <section className="bg-brand-card px-6 py-16 md:px-12 md:py-20"><div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-3">{[['01', 'Considered by design', 'Clear lines, comfortable fits, and details that earn their place.'], ['02', 'Made for real life', 'A wardrobe that can keep pace—from first light to the last plan.'], ['03', 'Closer to home', 'A new Anchor store is coming soon to Rangpur, Bangladesh.']].map(([n, title, desc]) => <article key={n} className="border-t border-brand-gold/50 pt-5"><p className="text-xs text-brand-gold">{n}</p><h2 className="mt-5 font-display text-2xl text-white">{title}</h2><p className="mt-3 text-xs leading-6 text-brand-gray">{desc}</p></article>)}</div></section>
    </main>
  );
}
