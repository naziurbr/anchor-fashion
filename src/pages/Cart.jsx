import { ArrowRight, ShoppingBag } from 'lucide-react';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';
import { Link } from '../utils/navigation';
import { formatPrice } from '../utils/format';

const DELIVERY_FEE = 100;

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  return (
    <main className="page-shell min-h-[65vh] py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-[.25em] text-brand-gold">Your selection</p>
      <h1 className="mt-3 font-display text-4xl text-white md:text-6xl">Your bag<span className="ml-3 align-middle font-sans text-sm font-normal text-brand-gray">({items.reduce((count, item) => count + item.quantity, 0)})</span></h1>
      {!items.length ? <div className="mt-10 border-y border-white/10 py-16 text-center"><ShoppingBag className="mx-auto text-brand-gold" size={30} strokeWidth={1.3} /><h2 className="mt-5 font-display text-2xl">Your bag is taking a quiet moment.</h2><p className="mt-2 text-sm text-brand-gray">There’s nothing here just yet. Find something you’ll reach for again and again.</p><Link to="/shop" className="mt-6 inline-flex items-center gap-2 bg-brand-gold px-5 py-3 text-[11px] font-bold uppercase tracking-[.15em] text-brand-black hover:bg-[#ffdb68]">Explore the collection <ArrowRight size={14} /></Link></div>
        : <div className="mt-9 grid gap-10 lg:grid-cols-[1fr_330px] lg:gap-16"><section aria-label="Items in your bag">{items.map((item) => <CartItem key={item.key} item={item} onQuantityChange={(qty) => updateQuantity(item.key, qty)} onRemove={() => removeItem(item.key)} />)}<Link to="/shop" className="mt-6 inline-block text-[11px] font-semibold uppercase tracking-[.16em] text-brand-gray underline underline-offset-4 hover:text-brand-gold">Continue shopping</Link></section>
          <aside className="h-fit border border-white/10 p-5 md:p-6"><h2 className="font-display text-xl">Order summary</h2><div className="mt-6 space-y-3 text-xs"><div className="flex justify-between text-brand-gray"><span>Subtotal</span><span className="text-white">{formatPrice(subtotal)}</span></div><div className="flex justify-between text-brand-gray"><span>Delivery</span><span className="text-white">{formatPrice(DELIVERY_FEE)}</span></div></div><div className="mt-5 flex justify-between border-t border-white/10 pt-4 text-sm font-semibold"><span>Total</span><span>{formatPrice(subtotal + DELIVERY_FEE)}</span></div><p className="mt-2 text-[11px] text-brand-gray">Flat delivery fee across Bangladesh.</p><Link to="/checkout" className="mt-6 flex w-full items-center justify-center gap-2 bg-brand-gold px-5 py-3.5 text-[11px] font-bold uppercase tracking-[.16em] text-brand-black transition hover:bg-[#ffdb68]">Continue to checkout <ArrowRight size={15} /></Link></aside>
        </div>}
    </main>
  );
}
