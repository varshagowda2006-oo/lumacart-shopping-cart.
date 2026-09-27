import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoryImages } from '@/data/products';
import PageHeader from '@/components/PageHeader';

const cats = [
  { name: 'Fashion', desc: 'Wardrobe essentials made from natural fabrics' },
  { name: 'Accessories', desc: 'Bags, eyewear, watches and finishing touches' },
  { name: 'Beauty', desc: 'Skincare and self-care for everyday rituals' },
  { name: 'Home', desc: 'Candles, lighting and textiles for cozy spaces' },
  { name: 'Lifestyle', desc: 'Bottles, journals and organizers for daily life' },
];

export default function Categories() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Categories" subtitle="Browse our curated collections by category" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/shop?category=${cat.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={categoryImages[cat.name]}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl text-white font-semibold">{cat.name}</h3>
                <p className="text-xs text-white/80 mt-1 mb-3">{cat.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white group-hover:gap-2.5 transition-all">
                  Shop now <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
