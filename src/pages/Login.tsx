import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'register' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';
    if (mode === 'register' && form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    login({
      name: mode === 'register' ? form.name : form.email.split('@')[0].replace(/[._]/g, ' '),
      email: form.email,
    });
    navigate('/account');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-3">
              <ShoppingBag size={22} className="text-stone-800" />
              <span className="font-serif text-2xl font-semibold text-stone-900">LumaCart</span>
            </Link>
            <p className="text-sm text-stone-500">Discover things you'll love.</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-stone-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode('login'); setErrors({}); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'login' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode('register'); setErrors({}); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === 'register' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
              }`}
            >
              Register
            </button>
          </div>

          <h1 className="font-serif text-2xl font-semibold text-stone-900 mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-sm text-stone-500 mb-6">
            {mode === 'login' ? 'Sign in to continue shopping' : 'Join LumaCart in seconds'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Full Name</label>
                <div className="relative">
                  <UserIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                />
              </div>
              {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                  />
                </div>
                {errors.confirm && <p className="text-xs text-rose-500 mt-1">{errors.confirm}</p>}
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-stone-800 w-4 h-4 rounded"
                  />
                  Remember me
                </label>
                <button type="button" className="text-xs text-stone-500 hover:text-stone-900">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all hover:scale-[1.01] inline-flex items-center justify-center gap-2"
            >
              {mode === 'login' ? 'Login' : 'Create Account'}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-xs text-stone-400 mt-6">
            This is a demo — no real account is created.
          </p>
        </div>
      </div>
    </div>
  );
}
