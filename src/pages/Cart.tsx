import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Tag, Truck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import CartItemRow from '@/components/CartItem';
import PageHeader from '@/components/PageHeader';

export default function Cart() {
  const { cart, cartSubtotal, shipping, cartTotal, clearCart } = useStore();

  if (cart.length === 0) {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Your Cart" />
        <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-stone-100 flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-stone-400" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-stone-900">Your cart is waiting.</h2>
          <p className="mt-3 text-stone-500 text-sm max-w-sm mx-auto">
            Discover pieces you'll love and start filling it up.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all"
          >
            Start Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const remaining = Math.max(0, 999 - cartSubtotal);
  const freeShipping = shipping === 0;

  return (
    <div className="animate-fade-in">
      <PageHeader title="Your Cart" subtitle={`${cart.length} ${cart.length === 1 ? 'item' : 'items'}`} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Items */}
          <div className="space-y-3">
            {cart.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
            <div className="flex justify-between pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
              >
                <ArrowRight size={16} className="rotate-180" />
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-sm text-stone-400 hover:text-rose-500 transition-colors"
              >
                Clear cart
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Order Summary</h3>

              {/* Free shipping progress */}
              <div className="mb-4 p-3 rounded-xl bg-stone-50">
                {freeShipping ? (
                  <p className="text-xs text-emerald-600 flex items-center gap-2">
                    <Truck size={14} /> You've unlocked free shipping!
                  </p>
                ) : (
                  <>
                    <p className="text-xs text-stone-600 mb-2">
                      Add ₹{remaining.toLocaleString('en-IN')} more for free shipping
                    </p>
                    <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (cartSubtotal / 999) * 100)}%` }}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className={freeShipping ? 'text-emerald-600 font-medium' : 'text-stone-900'}>
                    {freeShipping ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                {cartSubtotal > 0 && !freeShipping && (
                  <div className="flex justify-between text-stone-400 text-xs">
                    <span className="flex items-center gap-1"><Tag size={12} /> Free shipping over</span>
                    <span>₹999</span>
                  </div>
                )}
              </div>

              <div className="border-t border-stone-100 mt-4 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-medium text-stone-700">Total</span>
                <span className="font-serif text-2xl font-semibold text-stone-900">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full mt-5 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all hover:scale-[1.01]"
              >
                Proceed to Checkout
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
