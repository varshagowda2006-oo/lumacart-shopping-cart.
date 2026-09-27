import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Package, Heart, ShoppingCart, LogOut, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Account() {
  const { user, logout, orders, wishlist, cartCount } = useStore();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-full bg-stone-100 flex items-center justify-center mb-6">
          <UserIcon size={32} className="text-stone-400" />
        </div>
        <h1 className="font-serif text-2xl font-semibold text-stone-900 mb-3">You're not logged in</h1>
        <p className="text-stone-500 text-sm mb-6">Sign in to view your account and order history.</p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="animate-fade-in">
      <div className="border-b border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center font-serif text-xl font-semibold shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-stone-900">{user.name}</h1>
              <p className="text-sm text-stone-500 flex items-center gap-1.5 mt-1">
                <Mail size={14} /> {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-auto inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:border-rose-200 hover:text-rose-500 transition-all"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shortcuts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link to="/wishlist" className="group bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
              <Heart size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Wishlist</p>
              <p className="text-xs text-stone-400">{wishlist.length} saved items</p>
            </div>
            <ArrowRight size={16} className="ml-auto text-stone-300 group-hover:text-stone-600 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link to="/cart" className="group bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
              <ShoppingCart size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Cart</p>
              <p className="text-xs text-stone-400">{cartCount} items</p>
            </div>
            <ArrowRight size={16} className="ml-auto text-stone-300 group-hover:text-stone-600 group-hover:translate-x-1 transition-all" />
          </Link>
          <Link to="/shop" className="group bg-white rounded-2xl border border-stone-100 p-5 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Package size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-stone-900">Continue Shopping</p>
              <p className="text-xs text-stone-400">Explore new arrivals</p>
            </div>
            <ArrowRight size={16} className="ml-auto text-stone-300 group-hover:text-stone-600 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Order history */}
        <div className="bg-white rounded-2xl border border-stone-100 p-6">
          <h2 className="font-serif text-xl font-semibold text-stone-900 mb-1">Order History</h2>
          <p className="text-sm text-stone-500 mb-6">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 mx-auto rounded-full bg-stone-100 flex items-center justify-center mb-4">
                <Package size={24} className="text-stone-400" />
              </div>
              <p className="text-stone-500 text-sm">No orders yet.</p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all"
              >
                Start Shopping <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.orderNumber} className="border border-stone-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Order #{order.orderNumber}</p>
                      <p className="text-xs text-stone-400">{order.date} · {order.paymentMethod}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-stone-900">₹{order.total.toLocaleString('en-IN')}</span>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                        {order.estimatedDelivery}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {order.items.map((item) => (
                      <img
                        key={item.product.id}
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
