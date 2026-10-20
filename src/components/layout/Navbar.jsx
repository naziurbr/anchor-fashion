import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { formatPrice } from '../../utils/format';
import { Link, useNavigation } from '../../utils/navigation';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import CartDrawer from '../cart/CartDrawer';

const navLinks = [['New', '/shop?new=true'], ['Men', '/category/men'], ['Women', '/category/women'], ['Accessories', '/category/accessories']];

function parse(url) {
  const [path, query = ''] = url.split('?');
  return { path: path.replace(/\/+$/, '') || '/', params: new URLSearchParams(query) };
}

function isActive(location, href) {
  const current = parse(location);
  const target = parse(href);
  return current.path === target.path && [...target.params].every(([key, value]) => current.params.get(key) === value);
}

export default function Navbar() {
  const { itemCount, openDrawer } = useCart();
  const { location, go } = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const noticeTimer = useRef(null);
  const searchButton = useRef(null);

  // Glass-blur + compact header after scrolling, with a thin gold reading-progress line.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 12);
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => () => window.clearTimeout(noticeTimer.current), []);

  const query = search.trim().toLowerCase();
  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    return products
      .filter((p) => `${p.name} ${p.category} ${p.colors.join(' ')}`.toLowerCase().includes(query))
      .slice(0, 5);
  }, [query]);

  function closeSearch() {
    setSearchOpen(false);
    setSearch('');
    searchButton.current?.focus();
  }

  function submitSearch(event) {
    event.preventDefault();
    if (!query) return;
    go(`/shop?search=${encodeURIComponent(search.trim())}`);
    closeSearch();
  }

  function accountComingSoon() {
    window.clearTimeout(noticeTimer.current);
    setNotice('Your Anchor account is coming soon.');
    noticeTimer.current = window.setTimeout(() => setNotice(''), 2800);
  }

  return (
    <>
      <div className="announcement-bar px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[.16em] sm:text-[11px]">Rangpur, we’re almost home. <Link to="/about" className="ml-1 underline underline-offset-2">Discover our story</Link></div>
      <header className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${scrolled ? 'border-white/10 bg-brand-black/80 shadow-[0_10px_40px_-12px_rgba(0,0,0,.9)] backdrop-blur-xl' : 'border-white/[.06] bg-brand-black'}`}>
        <div className={`mx-auto flex max-w-[1440px] items-center justify-between gap-5 px-5 transition-[height] duration-300 md:px-12 ${scrolled ? 'h-[60px] md:h-[64px]' : 'h-[68px] md:h-[82px]'}`}>
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Open navigation menu" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(true)} className="-ml-2 p-2 text-white md:hidden"><Menu size={22} /></button>
            <Logo compact={scrolled} />
          </div>
          <nav aria-label="Main navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
            {navLinks.map(([label, href]) => {
              const active = isActive(location, href);
              return <Link key={label} to={href} aria-current={active ? 'page' : undefined} className={`nav-link text-[12px] font-semibold uppercase tracking-[.14em] ${active ? 'nav-link-active' : ''}`}>{label}</Link>;
            })}
          </nav>
          <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex lg:hidden">
            {navLinks.map(([label, href]) => <Link key={label} to={href} aria-current={isActive(location, href) ? 'page' : undefined} className={`nav-link ${isActive(location, href) ? 'nav-link-active' : ''}`}>{label}</Link>)}
          </nav>
          <div className="flex items-center gap-0.5 text-white md:gap-1.5">
            <button ref={searchButton} type="button" aria-label="Search products" aria-expanded={searchOpen} onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))} className="rounded-full p-2.5 transition hover:bg-white/10 hover:text-brand-gold"><Search size={20} strokeWidth={1.8} /></button>
            <button type="button" aria-label="Account, coming soon" onClick={accountComingSoon} className="rounded-full p-2.5 transition hover:bg-white/10 hover:text-brand-gold"><UserRound size={20} strokeWidth={1.8} /></button>
            <button type="button" onClick={openDrawer} aria-haspopup="dialog" aria-label={`Shopping bag, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`} className="relative rounded-full p-2.5 transition hover:bg-white/10 hover:text-brand-gold">
              <ShoppingBag size={20} strokeWidth={1.8} />
              {itemCount > 0 && <span key={itemCount} aria-hidden="true" className="badge-pop absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-brand-gold px-1 text-[11px] font-extrabold text-brand-black">{itemCount}</span>}
            </button>
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px bg-brand-gold/90 transition-opacity duration-300" style={{ width: `${progress}%`, opacity: scrolled ? 1 : 0 }} />
        {searchOpen && (
          <div className="border-t border-white/10">
            <form role="search" onSubmit={submitSearch} onKeyDown={(event) => event.key === 'Escape' && closeSearch()} className="mx-auto flex max-w-[1440px] items-center gap-3 px-5 py-4 md:px-12">
              <Search size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
              <input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search the collection" placeholder="Search shirts, trousers, accessories…" className="min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-brand-gray focus:outline-none" />
              <button type="submit" className="rounded-full bg-brand-gold px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-black">Search</button>
              <button type="button" aria-label="Close search" onClick={closeSearch} className="p-1.5 text-brand-gray hover:text-white"><X size={18} /></button>
            </form>
            {query.length >= 2 && (
              <div className="mx-auto max-w-[1440px] px-5 pb-5 md:px-12" role="region" aria-label="Search suggestions" aria-live="polite">
                {suggestions.length > 0 ? (
                  <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <Link to={`/product/${p.slug}`} onClick={closeSearch} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.03] p-2 transition hover:border-brand-gold/60 hover:bg-white/[.06]">
                          <img src={p.images[0]} alt="" loading="lazy" className="h-14 w-11 shrink-0 rounded-md object-cover" />
                          <span className="min-w-0"><span className="block truncate text-sm font-medium text-white">{p.name}</span><span className="block text-xs text-brand-gold">{formatPrice(p.price)}</span></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : <p className="text-sm text-brand-gray">No pieces match “{search.trim()}”. Try “shirt”, “trouser” or a colour.</p>}
              </div>
            )}
          </div>
        )}
      </header>
      <CartDrawer />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {notice && <div role="status" className="fixed right-5 top-24 z-[80] rounded-full bg-brand-gold px-5 py-3 text-xs font-semibold text-brand-black shadow-xl">{notice}</div>}
    </>
  );
}
