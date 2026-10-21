import { Link } from '../utils/navigation';

const pages = {
  'size-guide': ['Size guide', [
    ['Panjabi and coats', 'S 38 · M 40 · L 42 · XL 44 · XXL 46. Panjabi sizes are typically chest size in inches.'],
    ['Denim and trousers', 'Waist sizes 30 to 38 inches.'],
    ['Between sizes?', 'Choose the larger size for a relaxed fit. Replace this with your own measured chart before launch.'],
  ]],
  shipping: ['Shipping & returns', [
    ['Delivery', 'Free on orders over ৳999. Orders of ৳999 or less pay a flat ৳100.'],
    ['Returns', '7-day free returns. Contact us to start one.'],
    ['Payment', 'Cash on Delivery works in this demo. bKash, Nagad and Rocket are shown at checkout and need a payment gateway to go live.'],
  ]],
  faq: ['FAQ', [
    ['Is there a promo code?', 'Use ANCHOR20 for 20% off at the bag or checkout.'],
    ['How do I find my size?', 'See the size guide linked in the footer.'],
    ['Can I really order?', 'Not yet. This is a demo, so no order is sent or paid.'],
  ]],
};

export default function Support({ topic }) {
  const page = pages[topic];
  if (!page) return <main className="page-shell py-24 text-center"><h1 className="font-display text-4xl">Page not found.</h1><Link to="/contact" className="mt-5 inline-block text-brand-gold">Contact us</Link></main>;
  return (
    <main className="page-shell min-h-[60vh] max-w-3xl py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-[.25em] text-brand-gold">Help</p>
      <h1 className="mt-2 font-display text-4xl text-white">{page[0]}</h1>
      <div className="mt-8 space-y-6 border-t border-white/10 pt-6">
        {page[1].map(([heading, text]) => <section key={heading}><h2 className="text-sm font-semibold text-white">{heading}</h2><p className="mt-2 text-sm leading-7 text-brand-gray">{text}</p></section>)}
      </div>
    </main>
  );
}
