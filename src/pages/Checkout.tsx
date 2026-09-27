import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Wallet, Banknote, ArrowRight, Check, Lock } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Order } from '@/types';

export default function Checkout() {
  const { cart, cartSubtotal, shipping, cartTotal, clearCart, addOrder, user } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    payment: 'cod',
    cardNumber: '',
    expiry: '',
    cvv: '',
    upi: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
        <h1 className="font-serif text-2xl font-semibold text-stone-900 mb-3">Your cart is empty</h1>
        <p className="text-stone-500 text-sm mb-6">Add some products before checking out.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all">
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) e.phone = '10 digits required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!form.pin.trim()) e.pin = 'Required';
    else if (!/^\d{6}$/.test(form.pin)) e.pin = '6 digits required';
    if (form.payment === 'card') {
      if (!form.cardNumber.trim()) e.cardNumber = 'Required';
      if (!form.expiry.trim()) e.expiry = 'Required';
      if (!form.cvv.trim()) e.cvv = 'Required';
    }
    if (form.payment === 'upi' && !form.upi.trim()) e.upi = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const generateOrderNumber = () => {
    return 'LC' + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100).toString().padStart(2, '0');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const orderNumber = generateOrderNumber();
    const today = new Date();
    const deliveryDate = new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000);
    const order: Order = {
      orderNumber,
      date: today.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      total: cartTotal,
      items: [...cart],
      contact: { name: form.name, email: form.email, phone: form.phone },
      address: { address: form.address, city: form.city, state: form.state, pin: form.pin },
      paymentMethod: form.payment === 'cod' ? 'Cash on Delivery' : form.payment === 'upi' ? 'UPI' : 'Card',
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    };
    addOrder(order);
    clearCart();
    navigate('/order-confirmed', { state: { order } });
  };

  const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
    { id: 'upi', label: 'UPI', icon: Wallet },
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
  ];

  const inputCls = (field: string) =>
    `w-full h-11 px-3.5 rounded-xl border bg-stone-50 text-sm focus:outline-none focus:bg-white transition-all ${
      errors[field] ? 'border-rose-300 focus:border-rose-400' : 'border-stone-200 focus:border-stone-400'
    }`;

  return (
    <div className="animate-fade-in">
      <div className="border-b border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-3xl font-semibold text-stone-900">Checkout</h1>
          <p className="text-sm text-stone-500 mt-1 flex items-center gap-1.5"><Lock size={13} /> Secure checkout</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Contact */}
            <section className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="font-serif text-lg font-semibold text-stone-900 mb-4">Contact Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">Full Name</label>
                  <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls('name')} placeholder="Jane Doe" />
                  {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls('email')} placeholder="you@example.com" />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls('phone')} placeholder="9876543210" />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="font-serif text-lg font-semibold text-stone-900 mb-4">Delivery Address</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">Address</label>
                  <input type="text" value={form.address} onChange={(e) => set('address', e.target.value)} className={inputCls('address')} placeholder="Street address, house no." />
                  {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">City</label>
                  <input type="text" value={form.city} onChange={(e) => set('city', e.target.value)} className={inputCls('city')} placeholder="Mumbai" />
                  {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">State</label>
                  <input type="text" value={form.state} onChange={(e) => set('state', e.target.value)} className={inputCls('state')} placeholder="Maharashtra" />
                  {errors.state && <p className="text-xs text-rose-500 mt-1">{errors.state}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">PIN Code</label>
                  <input type="text" maxLength={6} value={form.pin} onChange={(e) => set('pin', e.target.value)} className={inputCls('pin')} placeholder="400001" />
                  {errors.pin && <p className="text-xs text-rose-500 mt-1">{errors.pin}</p>}
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="bg-white rounded-2xl border border-stone-100 p-6">
              <h2 className="font-serif text-lg font-semibold text-stone-900 mb-4">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((m) => (
                  <div key={m.id}>
                    <label
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        form.payment === m.id ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={form.payment === m.id}
                        onChange={(e) => set('payment', e.target.value)}
                        className="accent-stone-800"
                      />
                      <m.icon size={18} className="text-stone-600" />
                      <span className="text-sm font-medium text-stone-800">{m.label}</span>
                      {form.payment === m.id && <Check size={16} className="ml-auto text-stone-900" />}
                    </label>

                    {form.payment === m.id && m.id === 'card' && (
                      <div className="grid sm:grid-cols-2 gap-3 mt-3 p-3.5 rounded-xl bg-stone-50 animate-fade-in">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-stone-600 mb-1.5">Card Number</label>
                          <input type="text" value={form.cardNumber} onChange={(e) => set('cardNumber', e.target.value)} className={inputCls('cardNumber')} placeholder="1234 5678 9012 3456" />
                          {errors.cardNumber && <p className="text-xs text-rose-500 mt-1">{errors.cardNumber}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-stone-600 mb-1.5">Expiry Date</label>
                          <input type="text" value={form.expiry} onChange={(e) => set('expiry', e.target.value)} className={inputCls('expiry')} placeholder="MM/YY" />
                          {errors.expiry && <p className="text-xs text-rose-500 mt-1">{errors.expiry}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-stone-600 mb-1.5">CVV</label>
                          <input type="text" maxLength={3} value={form.cvv} onChange={(e) => set('cvv', e.target.value)} className={inputCls('cvv')} placeholder="123" />
                          {errors.cvv && <p className="text-xs text-rose-500 mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    )}

                    {form.payment === m.id && m.id === 'upi' && (
                      <div className="mt-3 p-3.5 rounded-xl bg-stone-50 animate-fade-in">
                        <label className="block text-xs font-medium text-stone-600 mb-1.5">UPI ID</label>
                        <input type="text" value={form.upi} onChange={(e) => set('upi', e.target.value)} className={inputCls('upi')} placeholder="yourname@upi" />
                        {errors.upi && <p className="text-xs text-rose-500 mt-1">{errors.upi}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h3 className="font-serif text-lg font-semibold text-stone-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-stone-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-stone-400">Qty {item.quantity}</p>
                    </div>
                    <span className="text-xs font-semibold text-stone-900 whitespace-nowrap">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5 text-sm border-t border-stone-100 pt-4">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="text-stone-900 font-medium">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-emerald-600 font-medium' : 'text-stone-900'}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
              </div>
              <div className="border-t border-stone-100 mt-4 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-medium text-stone-700">Total</span>
                <span className="font-serif text-2xl font-semibold text-stone-900">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <button
                type="submit"
                className="w-full mt-5 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all hover:scale-[1.01]"
              >
                Place Order <ArrowRight size={16} />
              </button>
              <p className="text-center text-xs text-stone-400 mt-3 flex items-center justify-center gap-1">
                <Lock size={12} /> Your information is safe
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
