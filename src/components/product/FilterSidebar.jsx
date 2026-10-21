import { products } from '../../data/products';
export default function FilterSidebar({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });
  const sizes = [...new Set(products.flatMap((p) => p.sizes))];
  const colors = [...new Set(products.flatMap((p) => p.colors))];
  return (
    <aside className="space-y-7 border-b border-white/10 pb-6 md:border-b-0 md:border-r md:pr-6">
      <label className="block text-[11px] font-semibold uppercase tracking-[.2em] text-brand-gray">Sort by
        <select value={filters.sort} onChange={(event) => update('sort', event.target.value)} className="mt-2 block w-full border border-white/15 bg-brand-black px-3 py-2.5 text-sm normal-case tracking-normal text-white focus:border-brand-gold focus:outline-none">
          <option value="featured">Featured</option><option value="name-asc">Name A–Z</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>
        </select>
      </label>
      <fieldset>
        <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-brand-gray">Size</legend>
        <div className="flex flex-wrap gap-2">{sizes.map((size) => <button type="button" key={size} onClick={() => update('size', filters.size === size ? '' : size)} aria-pressed={filters.size === size} className={`filter-chip ${filters.size === size ? 'filter-chip-active' : ''}`}>{size}</button>)}</div>
      </fieldset>
      <label className="block text-[11px] font-semibold uppercase tracking-[.2em] text-brand-gray">Color
        <select value={filters.color} onChange={(event) => update('color', event.target.value)} className="mt-2 block w-full border border-white/15 bg-brand-black px-3 py-2.5 text-sm normal-case tracking-normal text-white focus:border-brand-gold focus:outline-none">
          <option value="">All colors</option>{colors.map((color) => <option key={color} value={color}>{color}</option>)}
        </select>
      </label>
      <label className="block text-[11px] font-semibold uppercase tracking-[.2em] text-brand-gray">Maximum price <span className="text-white">৳{Number(filters.maxPrice).toLocaleString('en-BD')}</span>
        <input type="range" min="500" max="7000" step="100" value={filters.maxPrice} onChange={(event) => update('maxPrice', Number(event.target.value))} className="mt-3 w-full accent-[#F2C94C]" aria-label="Maximum product price" />
      </label>
      <button type="button" onClick={() => onChange({ sort: 'featured', size: '', color: '', maxPrice: 7000 })} className="text-[11px] font-semibold uppercase tracking-[.18em] text-brand-gold underline underline-offset-4">Clear filters</button>
    </aside>
  );
}
