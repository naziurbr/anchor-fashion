import PromoBox from '../components/cart/PromoBox';
import { pricing } from '../utils/pricing';
import { useState } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigation } from '../utils/navigation';
import { formatPrice } from '../utils/format';


const initialValues = { name: '', phone: '', email: '', address: '', city: '' };
const requiredFields = ['name', 'phone', 'email', 'address', 'city'];
const fieldLabels = { name: 'Full name', phone: 'Phone number', email: 'Email address', address: 'Delivery address', city: 'City' };

export default function Checkout() {
  const { promo, items, subtotal, clearCart } = useCart();
  const { discount, delivery, total } = pricing(subtotal, promo);
  const { go } = useNavigation();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [pay, setPay] = useState('Cash on Delivery');

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};
    requiredFields.forEach((key) => {
      if (!values[key].trim()) nextErrors[key] = `${fieldLabels[key]} is required.`;
    });
    if (values.phone.trim() && !/^[+0-9()\-\s]{8,18}$/.test(values.phone.trim())) nextErrors.phone = 'Enter a valid phone number.';
    if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) {
      clearCart();
      setSuccess(true);
    }
  }

  if (success) return <main className="page-shell flex min-h-[65vh] items-center justify-center py-16"><section className="max-w-lg text-center"><CheckCircle2 className="mx-auto text-brand-gold" size={44} strokeWidth={1.4} /><p className="mt-5 text-[11px] font-semibold uppercase tracking-[.24em] text-brand-gold">Demo order confirmed</p><h1 className="mt-3 font-display text-4xl text-white">Order Simulated Successfully!</h1><p className="mt-4 text-sm leading-6 text-brand-gray">Thank you, {values.name}. This was a demo checkout. No payment was taken and your order has not been sent to a real store.</p><button type="button" onClick={() => go('/shop')} className="mt-7 bg-brand-gold px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-brand-black">Back to shopping</button></section></main>;
  if (!items.length) return <main className="page-shell min-h-[60vh] py-16 text-center"><h1 className="font-display text-4xl">Your bag is empty.</h1><p className="mt-3 text-sm text-brand-gray">Add something from the collection before checking out.</p><Link to="/shop" className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-brand-gold">Explore the collection</Link></main>;

  return (
    <main className="page-shell min-h-[65vh] py-10 md:py-14">
      <Link to="/cart" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-brand-gray hover:text-white"><ArrowLeft size={14} /> Back to bag</Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_350px] lg:gap-16">
        <section>
          <p className="text-[11px] uppercase tracking-[.24em] text-brand-gold">Almost yours</p><h1 className="mt-2 font-display text-4xl text-white">Delivery details</h1>
          <div role="status" className="mt-6 flex items-start gap-3 border border-brand-gold/50 bg-brand-gold/10 p-4 text-xs leading-5 text-white"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-brand-gold" /><span><strong>Demo Mode: No real payments will be processed.</strong> Your details stay in this browser and the order will not be submitted anywhere.</span></div>
          <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
            {requiredFields.map((name) => <label key={name} className="block text-[11px] font-semibold uppercase tracking-[.16em] text-brand-gray">{fieldLabels[name]}<input name={name} type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'} autoComplete={name === 'name' ? 'name' : name === 'phone' ? 'tel' : name === 'email' ? 'email' : 'off'} value={values[name]} onChange={(event) => setValues((current) => ({ ...current, [name]: event.target.value }))} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `${name}-error` : undefined} className={`mt-2 block w-full border bg-brand-black px-3 py-3 text-sm normal-case tracking-normal text-white placeholder:text-brand-gray/50 focus:outline-none ${errors[name] ? 'border-red-400' : 'border-white/20 focus:border-brand-gold'}`} placeholder={name === 'phone' ? '+880 1XXX-XXXXXX' : ''} />{errors[name] && <span id={`${name}-error`} role="alert" className="mt-1 block text-[11px] normal-case tracking-normal text-red-300">{errors[name]}</span>}</label>)}
            <PromoBox /><fieldset className="pt-2"><legend className="mb-3 text-[11px] font-semibold uppercase tracking-[.16em] text-brand-gray">Payment method</legend><div className="grid gap-2 sm:grid-cols-2">{['Cash on Delivery', 'bKash', 'Nagad', 'Rocket'].map((m) => <label key={m} className={`flex cursor-pointer items-center gap-3 border p-4 text-xs text-white ${pay === m ? 'border-brand-gold bg-brand-gold/5' : 'border-white/15'}`}><input type="radio" name="payment" checked={pay === m} onChange={() => setPay(m)} className="accent-[#F2C94C]" />{m}</label>)}</div>{pay !== 'Cash on Delivery' && <p className="mt-2 text-[11px] text-brand-gray">Demo: no {pay} payment is taken. Live mobile-banking payment needs a payment gateway.</p>}</fieldset>
            <button type="submit" className="w-full bg-brand-gold px-5 py-4 text-[11px] font-bold uppercase tracking-[.16em] text-brand-black transition hover:bg-[#ffdb68]">Place demo order · {formatPrice(total)}</button>
          </form>
        </section>
        <aside className="h-fit border border-white/10 p-5"><h2 className="font-display text-xl">In your bag</h2><div className="mt-5 space-y-4">{items.map((item) => <div key={item.key} className="flex items-center gap-3"><img src={item.product.images[0]} alt="" className="h-16 w-12 object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-xs text-white">{item.product.name}</p><p className="mt-1 text-[11px] text-brand-gray">Qty {item.quantity}{item.size && ` · ${item.size}`}</p></div><p className="text-xs text-white">{formatPrice(item.product.price * item.quantity)}</p></div>)}</div><div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs"><div className="flex justify-between text-brand-gray"><span>Subtotal</span><span className="text-white">{formatPrice(subtotal)}</span></div>{discount > 0 && <div className="flex justify-between text-brand-gold"><span>Promo</span><span>-{formatPrice(discount)}</span></div>}<div className="flex justify-between text-brand-gray"><span>Delivery</span><span className="text-white">{(delivery ? formatPrice(delivery) : 'Free')}</span></div><div className="flex justify-between border-t border-white/10 pt-3 text-sm font-semibold text-white"><span>Total</span><span>{formatPrice(total)}</span></div></div></aside>
      </div>
    </main>
  );
}
