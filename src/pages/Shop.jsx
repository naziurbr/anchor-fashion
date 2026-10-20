import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import FilterSidebar from '../components/product/FilterSidebar';
import ProductGrid from '../components/product/ProductGrid';
import { fetchProducts } from '../utils/api';
import { useNavigation } from '../utils/navigation';

const defaults = { sort: 'featured', size: '', color: '', maxPrice: 5000 };

export default function Shop({ category = '' }) {
  const { location } = useNavigation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const search = params.get('search') || '';
  const showNew = params.get('new') === 'true';
  const [result, setResult] = useState({ key: '', products: [] });
  const [filters, setFilters] = useState(defaults);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const requestKey = `${category}|${search}|${showNew}`;

  useEffect(() => {
    let active = true;
    fetchProducts({ category, search }).then((result) => {
      if (active) {
        setResult({
          key: requestKey,
          products: showNew ? result.filter((product) => product.isNew) : result,
        });
      }
    }).catch(() => {
      if (active) setResult({ key: requestKey, products: [] });
    });
    return () => { active = false; };
  }, [category, search, showNew, requestKey]);

  const loading = result.key !== requestKey;
  const visible = useMemo(() => result.products.filter((product) =>
    (!filters.size || product.sizes.includes(filters.size))
    && (!filters.color || product.colors.includes(filters.color))
    && product.price <= filters.maxPrice,
  ).sort((a, b) => {
    if (filters.sort === 'price-asc') return a.price - b.price;
    if (filters.sort === 'price-desc') return b.price - a.price;
    if (filters.sort === 'name-asc') return a.name.localeCompare(b.name);
    return Number(b.featured) - Number(a.featured);
  }), [result.products, filters]);

  return (
    <main className="page-shell min-h-[65vh] py-12 md:py-16">
      <div className="mb-10 border-b border-white/10 pb-8 md:mb-12">
        <p className="mb-3 text-[11px] uppercase tracking-[.25em] text-brand-gold">{category ? 'The collection' : showNew ? 'Just arrived' : 'The Anchor collection'}</p>
        <h1 className="font-display text-4xl font-semibold capitalize tracking-[-.04em] text-white md:text-6xl">{search ? `Search: “${search}”` : showNew ? 'New arrivals' : category || 'Shop all'}</h1>
        <p className="mt-3 text-sm text-brand-gray">{category ? `A considered selection from our ${category} collection.` : 'Thoughtful pieces for the everyday, wherever it takes you.'}</p>
      </div>
      <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[.16em] text-brand-gray">
        <span>{loading ? 'Finding your edit…' : `${visible.length} ${visible.length === 1 ? 'piece' : 'pieces'}`}</span>
        <span className="hidden sm:block">{search && <span className="inline-flex items-center gap-1"><Search size={12} /> Search results</span>}</span>
        <button type="button" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)} aria-expanded={mobileFiltersOpen} aria-controls="shop-filters" className="inline-flex items-center gap-2 border border-white/20 px-3 py-2 font-semibold tracking-[.12em] text-white hover:border-brand-gold hover:text-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-gold md:hidden">
          <SlidersHorizontal size={14} /> Filter &amp; sort
        </button>
      </div>
      <div className="grid gap-8 md:grid-cols-[190px_1fr]">
        <div id="shop-filters" className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block`}>
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>
        {loading ? <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <div key={i} className="aspect-[4/5] animate-pulse bg-white/5" />)}</div> : <ProductGrid products={visible} />}
      </div>
    </main>
  );
}
