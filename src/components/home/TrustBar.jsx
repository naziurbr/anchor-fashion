import { Gem, RotateCcw, Truck, Wallet } from 'lucide-react';

const items = [
  [Truck, 'Free delivery', 'Orders over ৳999'],
  [RotateCcw, 'Easy returns', '7-day free returns'],
  [Gem, 'Premium quality', 'Finest materials only'],
  [Wallet, 'Pay your way', 'bKash · Nagad · Rocket · COD'],
];

export default function TrustBar() {
  return (
    <section className="border-b border-white/10 bg-brand-card">
      <ul className="page-shell grid grid-cols-2 gap-y-5 py-6 md:grid-cols-4">
        {items.map(([Icon, title, note]) => (
          <li key={title} className="flex items-center gap-3">
            <Icon size={20} strokeWidth={1.5} className="shrink-0 text-brand-gold" aria-hidden="true" />
            <div><p className="text-xs font-semibold text-white">{title}</p><p className="text-[11px] text-brand-gray">{note}</p></div>
          </li>
        ))}
      </ul>
    </section>
  );
}
