import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import PageHeader from '@/components/PageHeader';

const MAX_PRICE = 3000;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [priceFilter, setPriceFilter] = useState(MAX_PRICE);
  const [sort, setSort] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (category !== 'All') {
      result = result.filter((p) => p.category === category);
    }

    result = result.filter((p) => p.price <= priceFilter);

    switch (sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-az':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [search, category, priceFilter, sort]);

  const handleSearch = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) params.set('search', value);
    else params.delete('search');
    setSearchParams(params, { replace: true });
  };

  const handleCategory = (cat: string) => {
    setCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat !== 'All') params.set('category', cat);
    else params.delete('category');
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Shop All"
        subtitle={`${filtered.length} ${filtered.length === 1 ? 'product' : 'products'}`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + mobile filter toggle */}
        <div className="flex items-center gap-3 mb-6">
          <SearchBar value={search} onChange={handleSearch} placeholder="Search products..." />
          <button
            onClick={() => setShowFilters(true)}
            className="lg:hidden flex items-center gap-2 h-11 px-4 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 shrink-0"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block sticky top-24 self-start">
            <Filters
              category={category}
              onCategoryChange={handleCategory}
              maxPrice={MAX_PRICE}
              priceFilter={priceFilter}
              onPriceChange={setPriceFilter}
              sort={sort}
              onSortChange={setSort}
              categories={categories}
            />
          </aside>

          {/* Product grid */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-stone-500">
                Showing <span className="font-medium text-stone-900">{filtered.length}</span> {filtered.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-lg font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 text-stone-400 hover:text-stone-600">
                <X size={20} />
              </button>
            </div>
            <Filters
              category={category}
              onCategoryChange={handleCategory}
              maxPrice={MAX_PRICE}
              priceFilter={priceFilter}
              onPriceChange={setPriceFilter}
              sort={sort}
              onSortChange={setSort}
              categories={categories}
            />
            <button
              onClick={() => setShowFilters(false)}
              className="w-full mt-8 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
