import { useEffect, useRef } from 'react';
import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigation } from '../../utils/navigation';
import { formatPrice } from '../../utils/format';

export default function CartDrawer() {
  const { items, itemCount, subtotal, drawerOpen, closeDrawer, updateQuantity, removeItem } = useCart();
  const { location } = useNavigation();
  const closeButton = useRef(null);

  // Close whenever the page changes.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { closeDrawer(); }, [location]);

  // Escape to close, lock page scroll, move focus in, and give focus back on close.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event) => event.key === 'Escape' && closeDrawer();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <div className="fade-in absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeDrawer} aria-hidden="true" />
      <aside role="dialog" aria-modal="true" aria-label="Shopping bag" className="drawer-in absolute right-0 top-0 flex h-[100dvh] w-full max-w-[420px] flex-col border-l border-white/10 bg-brand-black shadow-[-30px_0_80px_-20px_rgba(0,0,0,.9)]">
        <div className="h-0.5 bg-brand-gold" />
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-display text-xl font-bold tracking-tight">Your bag <span className="ml-1 text-sm font-normal text-brand-gray">({itemCount})</span></h2>
          <button ref={closeButton} type="button" aria-label="Close bag" onClick={closeDrawer} className="rounded-full p-2 text-white transition hover:bg-white/10 hover:text-brand-gold"><X size={20} /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="text-brand-gold" size={34} strokeWidth={1.3} aria-hidden="true" />
            <p className="mt-5 font-display text-xl">Your bag is taking a quiet moment.</p>
            <p className="mt-2 text-sm text-brand-gray">Find something you’ll reach for again and again.</p>
            <Link to="/shop" onClick={closeDrawer} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-[11px] font-extrabold uppercase tracking-[.14em] text-brand-black hover:bg-[#ffdb68]">Explore the collection <ArrowRight size={14} /></Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-6" aria-label="Items in your bag">
              {items.map((item) => (
                <li key={item.key} className="grid grid-cols-[72px_1fr] gap-4 py-5">
                  <Link to={`/product/${item.product.slug}`} onClick={closeDrawer} className="aspect-[4/5] overflow-hidden rounded-md bg-brand-card"><img src={item.product.images[0]} alt="" className="h-full w-full object-cover" /></Link>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <Link to={`/product/${item.product.slug}`} onClick={closeDrawer} className="text-sm font-semibold text-white hover:text-brand-gold">{item.product.name}</Link>
                      <button type="button" aria-label={`Remove ${item.product.name}`} onClick={() => removeItem(item.key)} className="-mr-1 shrink-0 p-1 text-brand-gray transition hover:text-red-300"><X size={15} /></button>
                    </div>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-brand-gray">{[item.color, item.size && `Size ${item.size}`].filter(Boolean).join(' · ')}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex h-8 items-center rounded-full border border-white/20">
                        <button type="button" aria-label={`Decrease quantity of ${item.product.name}`} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.key, item.quantity - 1)} className="px-2.5 text-white disabled:opacity-30"><Minus size={13} /></button>
                        <span className="w-5 text-center text-xs" aria-live="polite">{item.quantity}</span>
                        <button type="button" aria-label={`Increase quantity of ${item.product.name}`} disabled={item.quantity >= item.product.stock} onClick={() => updateQuantity(item.key, item.quantity + 1)} className="px-2.5 text-white disabled:opacity-30"><Plus size={13} /></button>
                      </div>
                      <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 bg-brand-card/60 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
              <div className="flex items-center justify-between text-sm"><span className="text-brand-gray">Subtotal</span><span className="text-lg font-bold">{formatPrice(subtotal)}</span></div>
              <p className="mt-1 text-[11px] text-brand-gray">Delivery is added at checkout.</p>
              <Link to="/checkout" onClick={closeDrawer} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-5 py-3.5 text-[11px] font-extrabold uppercase tracking-[.14em] text-brand-black transition hover:bg-[#ffdb68]">Checkout <ArrowRight size={15} /></Link>
              <Link to="/cart" onClick={closeDrawer} className="mt-3 block text-center text-[11px] font-semibold uppercase tracking-[.16em] text-brand-gray underline underline-offset-4 hover:text-brand-gold">View full bag</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
