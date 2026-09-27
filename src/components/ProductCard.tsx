import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/context/StoreContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm transition-all hover:scale-110 ${
            wished ? 'text-rose-500' : 'text-stone-500'
          }`}
        >
          <Heart
            size={17}
            fill={wished ? 'currentColor' : 'none'}
            className={wished ? 'animate-heart-beat' : ''}
          />
        </button>
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide bg-stone-900 text-white">
            {product.badge}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => addToCart(product)}
            className="w-full py-2.5 rounded-xl bg-white text-stone-900 text-sm font-semibold shadow-md hover:bg-stone-900 hover:text-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-wider text-stone-400 mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5 text-xs text-stone-500">
          <span className="text-amber-500">★</span>
          <span>{product.rating}</span>
          <span className="text-stone-300">·</span>
          <span>{product.reviews} reviews</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-base font-semibold text-stone-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-stone-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {discount > 0 && (
            <span className="text-xs text-emerald-600 font-medium ml-auto">{discount}% off</span>
          )}
        </div>
      </div>
    </div>
  );
}
