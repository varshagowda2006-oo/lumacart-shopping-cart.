import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Product, CartItem, User, Order } from '@/types';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: Product[];
  user: User | null;
  orders: Order[];
  toasts: Toast[];
  cartCount: number;
  cartSubtotal: number;
  shipping: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  moveToWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  moveWishlistToCart: (productId: number) => void;
  isWishlisted: (productId: number) => boolean;
  login: (user: User) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: number) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const CART_KEY = 'lumacart_cart';
const WISHLIST_KEY = 'lumacart_wishlist';
const USER_KEY = 'lumacart_user';
const ORDERS_KEY = 'lumacart_orders';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>(CART_KEY, [])
  );
  const [wishlist, setWishlist] = useState<Product[]>(() =>
    loadFromStorage<Product[]>(WISHLIST_KEY, [])
  );
  const [user, setUser] = useState<User | null>(() =>
    loadFromStorage<User | null>(USER_KEY, null)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage<Order[]>(ORDERS_KEY, [])
  );
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const showToast = useCallback(
    (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2800);
    },
    []
  );

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity }];
      });
      showToast(`${product.name} added to cart`);
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (productId: number) => {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
      showToast('Removed from cart', 'info');
    },
    [showToast]
  );

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        if (prev.some((p) => p.id === product.id)) {
          showToast(`${product.name} removed from wishlist`, 'info');
          return prev.filter((p) => p.id !== product.id);
        }
        showToast(`${product.name} added to wishlist`);
        return [...prev, product];
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (productId: number) => {
      setWishlist((prev) => prev.filter((p) => p.id !== productId));
      showToast('Removed from wishlist', 'info');
    },
    [showToast]
  );

  const moveToWishlist = useCallback(
    (productId: number) => {
      setCart((prev) => {
        const item = prev.find((i) => i.product.id === productId);
        if (item) {
          setWishlist((wl) => {
            if (wl.some((p) => p.id === productId)) return wl;
            return [...wl, item.product];
          });
          showToast(`${item.product.name} moved to wishlist`);
        }
        return prev.filter((i) => i.product.id !== productId);
      });
    },
    [showToast]
  );

  const moveWishlistToCart = useCallback(
    (productId: number) => {
      setWishlist((prev) => {
        const product = prev.find((p) => p.id === productId);
        if (product) {
          setCart((cart) => {
            const existing = cart.find((item) => item.product.id === product.id);
            if (existing) {
              return cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            }
            return [...cart, { product, quantity: 1 }];
          });
          showToast(`${product.name} moved to cart`);
        }
        return prev.filter((p) => p.id !== productId);
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback(
    (productId: number) => wishlist.some((p) => p.id === productId),
    [wishlist]
  );

  const login = useCallback(
    (u: User) => {
      setUser(u);
      showToast(`Welcome back, ${u.name.split(' ')[0]}!`);
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast('You have been logged out', 'info');
  }, [showToast]);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 79;
  const cartTotal = cartSubtotal + shipping;

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        user,
        orders,
        toasts,
        cartCount,
        cartSubtotal,
        shipping,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        moveToWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveWishlistToCart,
        isWishlisted,
        login,
        logout,
        addOrder,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
