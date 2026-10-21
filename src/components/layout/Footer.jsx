import { categories } from '../../data/products';
import { Banknote, MessageCircle, Truck, ArrowUpRight, MapPin } from 'lucide-react';
import Logo from './Logo';
import { Link } from '../../utils/navigation';

// TODO: replace these placeholder links with Anchor Fashion's official profile URLs
// (for WhatsApp use https://wa.me/<number with country code>). Remove an entry to hide its icon.
const SOCIAL = [
  { label: 'Facebook', href: 'https://www.facebook.com/', paths: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>' },
  { label: 'Instagram', href: 'https://www.instagram.com/', paths: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/>' },
  { label: 'YouTube', href: 'https://www.youtube.com/', paths: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>' },
  { label: 'WhatsApp', href: 'https://wa.me/', paths: '<path d="M3 21l1.7-5A9 9 0 1 1 8 19.3L3 21z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.2-2-1-.8.7c-.9-.4-1.6-1.1-2-2l.7-.8-1-2L9 9.5z"/>' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-black px-6 pb-8 pt-14 md:px-12 md:pt-20">
      <div className="mx-auto mb-14 grid max-w-[1280px] gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
        <div className="flex items-start gap-4 bg-brand-card p-6"><Banknote className="mt-0.5 shrink-0 text-brand-gold" size={22} strokeWidth={1.6} aria-hidden="true" /><div><p className="text-sm font-semibold text-white">Cash on delivery</p><p className="mt-1 text-xs leading-5 text-brand-gray">Pay in person when your order arrives.</p></div></div>
        <div className="flex items-start gap-4 bg-brand-card p-6"><Truck className="mt-0.5 shrink-0 text-brand-gold" size={22} strokeWidth={1.6} aria-hidden="true" /><div><p className="text-sm font-semibold text-white">Simple delivery</p><p className="mt-1 text-xs leading-5 text-brand-gray">One flat fee across Bangladesh.</p></div></div>
        <Link to="/contact" className="group flex items-start gap-4 bg-brand-card p-6 transition hover:bg-white/[.04]"><MessageCircle className="mt-0.5 shrink-0 text-brand-gold" size={22} strokeWidth={1.6} aria-hidden="true" /><div><p className="text-sm font-semibold text-white group-hover:text-brand-gold">Need a hand?</p><p className="mt-1 text-xs leading-5 text-brand-gray">Talk to our team.</p></div></Link>
      </div>
      <div className="mx-auto grid max-w-[1280px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Logo compact />
          <p className="mt-4 max-w-xs text-xs leading-6 text-brand-gray">Clothing with purpose. A modern wardrobe, thoughtfully made for life in Bangladesh.</p>
          <ul className="mt-5 flex flex-wrap gap-3" aria-label="Anchor Fashion on social media">
            {SOCIAL.map(({ label, href, paths }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-brand-gray transition hover:-translate-y-0.5 hover:border-brand-gold hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: paths }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div><h2 className="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-brand-gold">The collection</h2><ul className="space-y-3 text-xs text-brand-gray"><li><Link to="/shop?new=true" className="hover:text-white">New arrivals</Link></li>{categories.map((c) => <li key={c.slug}><Link to={`/category/${c.slug}`} className="hover:text-white">{c.name}</Link></li>)}</ul></div>
        <div><h2 className="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-brand-gold">Discover</h2><ul className="space-y-3 text-xs text-brand-gray"><li><Link to="/about" className="hover:text-white">Our story</Link></li><li><Link to="/contact" className="hover:text-white">Contact</Link></li><li><Link to="/cart" className="hover:text-white">Your bag</Link></li><li><Link to="/support/size-guide" className="hover:text-white">Size guide</Link></li><li><Link to="/support/shipping" className="hover:text-white">Shipping & returns</Link></li><li><Link to="/support/faq" className="hover:text-white">FAQ</Link></li></ul></div>
        <div><h2 className="mb-4 text-[11px] font-bold uppercase tracking-[.2em] text-brand-gold">Come say hello</h2><p className="flex items-start gap-2 text-xs leading-5 text-brand-gray"><MapPin size={15} className="mt-0.5 shrink-0 text-brand-gold" /> Rangpur, Bangladesh<br />Store opening soon</p><Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white hover:text-brand-gold">Get in touch <ArrowUpRight size={13} /></Link></div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1280px] flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[.15em] text-brand-gray/70 sm:flex-row"><p>© 2026 Anchor Fashion. All rights reserved.</p><p>Rangpur · Bangladesh</p></div>
    </footer>
  );
}