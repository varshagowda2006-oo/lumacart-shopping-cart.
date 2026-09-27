import { SlidersHorizontal } from 'lucide-react';

interface Props {
  category: string;
  onCategoryChange: (cat: string) => void;
  maxPrice: number;
  priceFilter: number;
  onPriceChange: (price: number) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  categories: string[];
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-az', label: 'Name: A-Z' },
];

export default function Filters({
  category,
  onCategoryChange,
  maxPrice,
  priceFilter,
  onPriceChange,
  sort,
  onSortChange,
  categories,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
        <SlidersHorizontal size={16} />
        Filters
      </div>

      {/* Category */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-stone-400 mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                category === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-stone-400 mb-3">
          Max Price: ₹{priceFilter.toLocaleString('en-IN')}
        </h3>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={100}
          value={priceFilter}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-stone-800 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-400 mt-1">
          <span>₹0</span>
          <span>₹{maxPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-stone-400 mb-3">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full h-10 px-3 rounded-xl border border-stone-200 bg-white text-sm text-stone-800 focus:outline-none focus:border-stone-400 transition-all cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
