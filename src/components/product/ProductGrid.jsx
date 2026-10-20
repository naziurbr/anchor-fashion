import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  if (!products.length) {
    return <div className="border border-white/10 px-6 py-16 text-center">
      <p className="font-display text-2xl text-white">Nothing in this edit just yet.</p>
      <p className="mt-2 text-sm text-brand-gray">Try adjusting your filters or search for another piece.</p>
    </div>;
  }
  return <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 md:gap-x-6 md:gap-y-10 xl:grid-cols-4"><ProductCards products={products} /></div>;
}

function ProductCards({ products }) {
  return products.map((product) => <ProductCard key={product.id} product={product} />);
}
