import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <ShoppingBag size={22} className="text-white" />
              <span className="font-serif text-xl font-semibold text-white">LumaCart</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">Discover things you'll love.</p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors" aria-label="Youtube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link to="/shop?sort=new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">About</h4>
            <p className="text-sm text-stone-400 leading-relaxed">
              LumaCart is a curated lifestyle store bringing you thoughtfully selected pieces for your style, space, and everyday life.
            </p>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-6 text-center">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} LumaCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
