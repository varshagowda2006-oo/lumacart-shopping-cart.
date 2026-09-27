import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-stone-400 text-lg font-serif">No products found</p>
        <p className="text-stone-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
        <Link
          to="/shop"
          className="inline-block mt-6 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 transition-colors"
        >
          Browse all products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
