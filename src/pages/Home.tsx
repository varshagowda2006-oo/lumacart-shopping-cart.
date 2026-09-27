import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products, categoryImages } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';

const featuredCategories = [
  { name: 'Fashion', desc: 'Wardrobe essentials' },
  { name: 'Accessories', desc: 'Finishing touches' },
  { name: 'Beauty', desc: 'Skincare & care' },
  { name: 'Home', desc: 'Cozy corners' },
  { name: 'Lifestyle', desc: 'Everyday carry' },
];

export default function Home() {
  const trending = products.slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] py-12 lg:py-20">
            <div className="order-2 lg:order-1 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-600 mb-6 animate-fade-in-up">
                <Sparkles size={13} className="text-amber-500" />
                Curated lifestyle collection
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-900 leading-[1.1] animate-fade-in-up delay-100">
                Find Your Everyday Favorites
              </h1>
              <p className="mt-5 text-base lg:text-lg text-stone-500 leading-relaxed animate-fade-in-up delay-200">
                Thoughtfully selected pieces for your style, space and everyday life.
              </p>
              <div className="flex flex-wrap gap-3 mt-8 animate-fade-in-up delay-300">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all hover:scale-[1.02] shadow-sm"
                >
                  Shop Collection
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/categories"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-stone-800 text-sm font-semibold border border-stone-200 hover:border-stone-400 transition-all"
                >
                  Explore Categories
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative animate-fade-in delay-200">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-stone-300/40 aspect-[4/3] lg:aspect-[5/4]">
                <img
                  src="https://images.pexels.com/photos/3865904/pexels-photo-3865904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Lifestyle shopping"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 bg-white rounded-2xl shadow-lg px-5 py-3.5 border border-stone-100">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Sparkles size={18} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">New arrivals</p>
                  <p className="text-xs text-stone-400">Weekly drops</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900">Shop by Category</h2>
          <p className="mt-2 text-stone-500 text-sm">Explore our curated collections</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {featuredCategories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={categoryImages[cat.name]}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg text-white font-semibold">{cat.name}</h3>
                <p className="text-xs text-white/80 mt-0.5">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 bg-white rounded-3xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900">Trending Now</h2>
            <p className="mt-2 text-stone-500 text-sm">Our most-loved pieces this week</p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-stone-900 group"
          >
            View all
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <ProductGrid products={trending} />
        <div className="text-center mt-10 sm:hidden">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-stone-100 text-stone-800 text-sm font-semibold"
          >
            View all products
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 min-h-[340px] flex items-center">
          <img
            src="https://images.pexels.com/photos/5585841/pexels-photo-5585841.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            alt="New arrivals"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative max-w-lg px-6 sm:px-10 py-12">
            <p className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">Just Arrived</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-white font-semibold leading-tight">
              Refresh Your Everyday
            </h2>
            <p className="mt-3 text-stone-300 text-sm lg:text-base">
              New arrivals made for your everyday moments.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3.5 rounded-xl bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-all hover:scale-[1.02]"
            >
              Explore New Arrivals
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-stone-50 border border-stone-100 px-6 sm:px-10 py-12 lg:py-16 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900">Stay in the loop</h2>
          <p className="mt-3 text-stone-500 text-sm lg:text-base max-w-md mx-auto">
            Get updates on new arrivals, offers and curated collections.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); (e.target as HTMLFormElement).reset(); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-7"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 h-12 px-4 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:border-stone-400 transition-all"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-xl bg-stone-900 text-white text-sm font-semibold hover:bg-stone-700 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
