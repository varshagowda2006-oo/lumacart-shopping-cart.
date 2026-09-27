import { Link } from 'react-router-dom';
import { Trash2, Heart } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types';
import { useStore } from '@/context/StoreContext';
import QuantitySelector from './QuantitySelector';

interface Props {
  item: CartItemType;
}

export default function CartItemRow({ item }: Props) {
  const { updateQuantity, removeFromCart, moveToWishlist } = useStore();
  const { product, quantity } = item;
  const subtotal = product.price * quantity;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-100 hover:shadow-sm transition-shadow">
      <Link to={`/product/${product.id}`} className="shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
        />
      </Link>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-stone-400">{product.category}</p>
            <Link
              to={`/product/${product.id}`}
              className="block text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors truncate"
            >
              {product.name}
            </Link>
            <p className="text-sm text-stone-700 mt-1">₹{product.price.toLocaleString('en-IN')}</p>
          </div>
          <p className="text-sm font-semibold text-stone-900 whitespace-nowrap">
            ₹{subtotal.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 mt-auto pt-3">
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => updateQuantity(product.id, quantity + 1)}
            onDecrease={() => updateQuantity(product.id, quantity - 1)}
            size="sm"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={() => moveToWishlist(product.id)}
              className="p-2 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-all"
              aria-label="Move to wishlist"
              title="Move to wishlist"
            >
              <Heart size={16} />
            </button>
            <button
              onClick={() => removeFromCart(product.id)}
              className="p-2 text-stone-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-all"
              aria-label="Remove"
              title="Remove"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
