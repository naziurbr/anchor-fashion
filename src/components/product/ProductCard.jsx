import { useState } from 'react';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from '../../utils/navigation';
import { formatPrice } from '../../utils/format';

export default function ProductCard({ product }) {
  const [choosingSize, setChoosingSize] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const discount = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  function add(size = '') {
    addItem(product, { size, color: product.colors[0] });
    setChoosingSize(false);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="product-card group">
      <div className="relative overflow-hidden bg-brand-card">
        <Link to={`/product/${product.slug}`} className="block aspect-[4/5]" aria-label={`View ${product.name}`}>
          <img src={product.images[0]} alt={`${product.name} in ${product.colors[0]}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          {product.images[1] && <img src={product.images[1]} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100" />}
        </Link>
        {product.isNew && <span className="absolute left-3 top-3 bg-brand-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-brand-black">New</span>}
        {discount > 0 && <span className="absolute right-3 top-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-brand-black">−{discount}%</span>}
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.name}`} className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-brand-black/90 text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100">
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="flex items-start justify-between gap-3 py-4">
        <div className="min-w-0">
          <Link to={`/product/${product.slug}`} className="text-sm font-medium text-white transition hover:text-brand-gold">{product.name}</Link>
          <p className="mt-1.5 text-[11px] uppercase tracking-[.15em] text-brand-gray">{product.category} · {product.colors.join(' / ')}</p>
          <p className="mt-2 text-sm font-semibold text-white">{formatPrice(product.price)} {product.compareAt && <del className="ml-1.5 text-xs font-normal text-brand-gray/70">{formatPrice(product.compareAt)}</del>}</p>
        </div>
        <button
          type="button"
          onClick={() => product.sizes.length ? setChoosingSize(!choosingSize) : add()}
          aria-label={choosingSize ? `Close size selector for ${product.name}` : `Quick add ${product.name}`}
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-white transition hover:border-brand-gold hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold"
        >
          {added ? <Check size={17} /> : <Plus size={17} />}
        </button>
      </div>
      {choosingSize && (
        <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3" aria-label={`Choose a size for ${product.name}`}>
          <span className="mr-1 text-[11px] uppercase tracking-wider text-brand-gray">Choose size</span>
          {product.sizes.map((size) => <button key={size} type="button" onClick={() => add(size)} className="border border-white/15 px-2.5 py-1 text-xs hover:border-brand-gold hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold">{size}</button>)}
        </div>
      )}
    </article>
  );
}
