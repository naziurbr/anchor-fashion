import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function PromoBox() {
  const { promo, applyPromo } = useCart();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const apply = () => setMessage(applyPromo(code) ? '' : 'That code is not valid.');

  if (promo) return <p role="status" className="mt-4 border border-brand-gold/40 bg-brand-gold/10 p-3 text-xs text-brand-gold">{promo} applied: 20% off your order.</p>;
  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <input value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); apply(); } }} placeholder="Promo code" aria-label="Promo code" className="form-input min-w-0 flex-1" />
        <button type="button" onClick={apply} className="border border-brand-gold px-4 text-[11px] font-bold uppercase tracking-wider text-brand-gold hover:bg-brand-gold hover:text-brand-black">Apply</button>
      </div>
      {message && <p role="alert" className="mt-1 text-[11px] text-red-300">{message}</p>}
    </div>
  );
}
