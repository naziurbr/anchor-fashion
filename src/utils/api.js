import { products } from '../data/products';

export async function fetchProducts({ category, search = '' } = {}) {
  const query = search.trim().toLowerCase();
  return products.filter((product) =>
    (!category || product.category.toLowerCase() === category.toLowerCase())
    && (!query || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query)),
  );
}
