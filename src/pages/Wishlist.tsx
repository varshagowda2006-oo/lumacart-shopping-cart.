import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import PageHeader from '@/components/PageHeader';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, moveWishlistToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Wishlist" />
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 flex items-center justify-center mb-6">
            <Heart size={32} className="text-rose-300" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-stone-900">Your wishlist is empty</h2>
          <p className="mt-3 text-stone-500 text-sm max-w-sm mx-auto">
            Save the pieces you love by tapping the heart icon on any product.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all"
          >
            Browse Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Wishlist" subtitle={`${wishlist.length} saved ${wishlist.length === 1 ? 'item' : 'items'}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <p className="text-[11px] uppercase tracking-wider text-stone-400">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-sm font-medium text-stone-900 mt-1 hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-base font-semibold text-stone-900">₹{product.price.toLocaleString('en-IN')}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => moveWishlistToCart(product.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-700 transition-colors"
                  >
                    <ShoppingCart size={14} /> Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="h-9 w-9 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 hover:text-rose-500 hover:border-rose-200 transition-all"
                    aria-label="Remove"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
