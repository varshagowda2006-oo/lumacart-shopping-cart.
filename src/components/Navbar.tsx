import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Search,
  User,
  Menu,
  X,
  ShoppingCart,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Navbar() {
  const { cartCount, wishlist, user } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Categories', path: '/categories' },
    { label: 'Wishlist', path: '/wishlist' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -ml-2 text-stone-700"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <ShoppingBag size={22} className="text-stone-800" />
              <span className="font-serif text-xl lg:text-2xl font-semibold tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors">
                LumaCart
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    location.pathname === link.path
                      ? 'text-stone-900'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-stone-800 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <Link
                to="/wishlist"
                className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                aria-label="Wishlist"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    key={cartCount}
                    className="animate-badge-bounce absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to={user ? '/account' : '/login'}
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-all"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className="border-t border-stone-100 bg-white animate-fade-in">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products, categories..."
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-stone-200 bg-stone-50 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                />
              </form>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-stone-100 bg-white animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-stone-100 text-stone-900'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
