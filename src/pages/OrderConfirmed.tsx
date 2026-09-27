import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, ArrowRight, Calendar } from 'lucide-react';
import type { Order } from '@/types';

export default function OrderConfirmed() {
  const location = useLocation();
  const order = (location.state as { order?: Order } | null)?.order;

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <h1 className="font-serif text-2xl font-semibold text-stone-900 mb-3">No order found</h1>
        <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all">
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 lg:py-20 text-center animate-fade-in">
      <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-6 animate-scale-in">
        <CheckCircle size={44} className="text-emerald-500" />
      </div>
      <h1 className="font-serif text-4xl font-semibold text-stone-900">Order Confirmed!</h1>
      <p className="mt-3 text-stone-500 text-sm lg:text-base">Thank you for shopping with LumaCart.</p>

      <div className="bg-white rounded-2xl border border-stone-100 p-6 mt-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider">Order Number</p>
            <p className="text-lg font-semibold text-stone-900 font-serif">#{order.orderNumber}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-stone-400 uppercase tracking-wider">Total Amount</p>
            <p className="text-lg font-semibold text-stone-900">₹{order.total.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 pt-4">
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin size={12} /> Delivery Address
            </p>
            <p className="text-sm text-stone-700">{order.contact.name}</p>
            <p className="text-sm text-stone-500">{order.address.address}</p>
            <p className="text-sm text-stone-500">{order.address.city}, {order.address.state} - {order.address.pin}</p>
          </div>
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar size={12} /> Estimated Delivery
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700">
              <Truck size={16} />
              <span className="text-sm font-medium">By {order.estimatedDelivery}</span>
            </div>
            <p className="text-xs text-stone-400 mt-2">Payment: {order.paymentMethod}</p>
          </div>
        </div>

        <div className="pt-4 mt-4 border-t border-stone-100">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Package size={12} /> Items ({order.items.length})
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {order.items.map((item) => (
              <div key={item.product.id} className="shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover" />
                <p className="text-[10px] text-stone-400 mt-1 text-center">x{item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
        <Link
          to="/shop"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all"
        >
          Continue Shopping <ArrowRight size={16} />
        </Link>
        <Link
          to="/account"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-stone-200 text-stone-800 text-sm font-semibold hover:border-stone-400 transition-all"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}
