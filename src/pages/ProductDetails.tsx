import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ArrowLeft, Check, Zap } from 'lucide-react';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import QuantitySelector from '@/components/QuantitySelector';
import ProductGrid from '@/components/ProductGrid';
import PageHeader from '@/components/PageHeader';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = id ? getProductById(Number(id)) : undefined;
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl text-stone-900 mb-3">Product not found</h1>
        <Link to="/shop" className="text-stone-600 hover:text-stone-900 underline">Back to shop</Link>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const related = getRelatedProducts(product);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title={product.name} subtitle={product.category} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/shop" className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 mb-6">
          <ArrowLeft size={16} /> Back to shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden bg-stone-50 aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-900 text-white">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-widest text-stone-400">{product.category}</p>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900 mt-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map((n) => (
                  <Star
                    key={n}
                    size={16}
                    className={n <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-stone-200'}
                  />
                ))}
              </div>
              <span className="text-sm text-stone-600">{product.rating}</span>
              <span className="text-stone-300">·</span>
              <span className="text-sm text-stone-500">{product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-5">
              <span className="text-3xl font-semibold text-stone-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-lg text-stone-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
              {discount > 0 && (
                <span className="text-sm font-medium text-emerald-600">{discount}% off</span>
              )}
            </div>

            <p className="text-stone-600 text-sm leading-relaxed mt-6">{product.description}</p>

            {/* Quantity + actions */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-stone-700">Quantity</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all hover:scale-[1.01]"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-all hover:scale-[1.01]"
                >
                  <Zap size={18} />
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`h-12 w-12 rounded-xl border flex items-center justify-center transition-all ${
                    wished
                      ? 'border-rose-200 bg-rose-50 text-rose-500'
                      : 'border-stone-200 text-stone-500 hover:border-stone-400'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} fill={wished ? 'currentColor' : 'none'} className={wished ? 'animate-heart-beat' : ''} />
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-stone-100">
              {['Free shipping over ₹999', '7-day returns', 'Secure checkout'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs text-stone-500">
                  <Check size={14} className="text-emerald-500 shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-stone-900 mb-8">You may also like</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
