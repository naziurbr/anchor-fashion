import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from '../../utils/navigation';
import { formatPrice } from '../../utils/format';

export default function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <article className="grid grid-cols-[90px_1fr] gap-4 border-b border-white/10 py-5 sm:grid-cols-[120px_1fr_auto] sm:gap-6">
      <Link to={`/product/${item.product.slug}`} className="aspect-[4/5] overflow-hidden bg-brand-card"><img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" /></Link>
      <div className="flex flex-col items-start">
        <Link to={`/product/${item.product.slug}`} className="font-display text-lg text-white hover:text-brand-gold">{item.product.name}</Link>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-brand-gray">{item.product.category}{item.color && ` · ${item.color}`}{item.size && ` · Size ${item.size}`}</p>
        <p className="mt-3 text-sm font-semibold">{formatPrice(item.product.price)}</p>
        <div className="mt-auto flex items-center gap-4 pt-4 sm:pt-8">
          <div className="flex h-9 items-center border border-white/20"><button type="button" aria-label={`Decrease quantity of ${item.product.name}`} onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))} className="px-2.5 text-white"><Minus size={13} /></button><span className="w-6 text-center text-xs">{item.quantity}</span><button type="button" aria-label={`Increase quantity of ${item.product.name}`} onClick={() => onQuantityChange(Math.min(item.product.stock, item.quantity + 1))} className="px-2.5 text-white"><Plus size={13} /></button></div>
          <button type="button" onClick={onRemove} className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-gray transition hover:text-red-300"><Trash2 size={13} /> Remove</button>
        </div>
      </div>
      <p className="hidden text-sm font-semibold text-white sm:block">{formatPrice(item.product.price * item.quantity)}</p>
    </article>
  );
}
