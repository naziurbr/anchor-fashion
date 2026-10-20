import { useState } from 'react';
import { Check, ChevronRight, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProduct, products } from '../data/products';
import { Link } from '../utils/navigation';
import { formatPrice } from '../utils/format';
import ProductGrid from '../components/product/ProductGrid';
import SectionTitle from '../components/common/SectionTitle';

export default function ProductDetails({ slug }) {
  const product = getProduct(slug);
  const [image, setImage] = useState(0);
  const [size, setSize] = useState('');
  const [color, setColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  if (!product) return <main className="page-shell py-24 text-center"><h1 className="font-display text-4xl">We couldn’t find that piece.</h1><Link to="/shop" className="mt-5 inline-block text-brand-gold">Back to the collection</Link></main>;

  const related = getRelated(product);
  function submit() {
    if (product.sizes.length && !size) { setError('Please choose a size before adding this piece to your bag.'); return; }
    setError('');
    addItem(product, { size, color }, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <main className="page-shell py-8 md:py-12">
      <nav className="mb-7 flex items-center gap-2 text-[11px] uppercase tracking-wider text-brand-gray" aria-label="Breadcrumb"><Link to="/" className="hover:text-white">Home</Link><ChevronRight size={12} /><Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-white">{product.category}</Link><ChevronRight size={12} /><span className="text-white">{product.name}</span></nav>
      <div className="grid gap-8 md:grid-cols-[1.05fr_.95fr] md:gap-14">
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-brand-card"><img src={product.images[image]} alt={`${product.name}, view ${image + 1}`} className="h-full w-full object-cover" /></div>
          <div className="mt-3 grid grid-cols-4 gap-3">{product.images.map((src, index) => <button type="button" key={src} onClick={() => setImage(index)} aria-label={`Show product image ${index + 1}`} aria-pressed={image === index} className={`aspect-[4/5] overflow-hidden border ${image === index ? 'border-brand-gold' : 'border-transparent'}`}><img src={src} alt="" className="h-full w-full object-cover" /></button>)}</div>
        </div>
        <div className="py-1 md:py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-brand-gold">{product.category} · {product.isNew ? 'New arrival' : 'The Anchor edit'}</p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-white md:text-5xl">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-lg font-semibold text-white">{formatPrice(product.price)}{product.compareAt && <del className="text-sm font-normal text-brand-gray">{formatPrice(product.compareAt)}</del>}</div>
          <p className="mt-5 max-w-lg text-sm leading-7 text-brand-gray">{product.description}</p>
          <p className="mt-5 text-xs text-brand-gray"><span className={product.stock > 0 ? 'text-emerald-300' : 'text-red-300'}>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>{product.stock > 0 && product.stock <= 10 ? ' · Almost gone' : ''}</p>
          {product.colors.length > 0 && <fieldset className="mt-7"><legend className="mb-3 text-[11px] font-semibold uppercase tracking-[.18em] text-white">Color <span className="font-normal text-brand-gray">{color}</span></legend><div className="flex flex-wrap gap-2">{product.colors.map((option) => <button key={option} type="button" onClick={() => setColor(option)} aria-pressed={color === option} className={`border px-3 py-2 text-xs transition ${color === option ? 'border-brand-gold text-brand-gold' : 'border-white/20 text-brand-gray hover:border-white/50'}`}>{option}</button>)}</div></fieldset>}
          {product.sizes.length > 0 && <fieldset className="mt-6"><legend className="mb-3 text-[11px] font-semibold uppercase tracking-[.18em] text-white">Select size</legend><div className="flex flex-wrap gap-2">{product.sizes.map((option) => <button key={option} type="button" onClick={() => { setSize(option); setError(''); }} aria-pressed={size === option} className={`flex h-11 min-w-11 items-center justify-center border px-3 text-xs transition ${size === option ? 'border-brand-gold bg-brand-gold text-brand-black' : 'border-white/20 text-white hover:border-brand-gold'}`}>{option}</button>)}</div></fieldset>}
          {error && <p role="alert" className="mt-3 text-xs text-red-300">{error}</p>}
          <div className="mt-7 flex flex-wrap gap-3">
            <div className="flex h-12 items-center border border-white/20"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((n) => Math.max(1, n - 1))} className="px-3 text-white"><Minus size={14} /></button><span className="w-7 text-center text-sm">{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((n) => Math.min(product.stock, n + 1))} className="px-3 text-white"><Plus size={14} /></button></div>
            <button type="button" onClick={submit} disabled={product.stock < 1} className="flex min-h-12 flex-1 items-center justify-center gap-2 bg-brand-gold px-5 text-xs font-bold uppercase tracking-[.16em] text-brand-black transition hover:bg-[#ffdb68] disabled:opacity-50">{added ? <><Check size={16} /> Added to your bag</> : <><ShoppingBag size={16} /> Add to bag</>}</button>
          </div>
          <p className="mt-3 text-[11px] text-brand-gray">Demo store · Payment at checkout is simulated.</p>
          <div className="mt-8 border-t border-white/10 pt-6"><h2 className="text-[11px] font-semibold uppercase tracking-[.18em] text-white">A little more about this piece</h2><p className="mt-3 text-xs leading-6 text-brand-gray">Designed for repeat wear, made to feel like yours from the first moment. Need a hand? <Link to="/contact" className="text-brand-gold underline underline-offset-2">Talk to our team.</Link></p></div>
        </div>
      </div>
      <section className="mt-20 border-t border-white/10 pt-12"><SectionTitle eyebrow="Keep exploring" title="You may also like" /><ProductGrid products={related} /></section>
    </main>
  );
}

function getRelated(product) {
  return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
}
