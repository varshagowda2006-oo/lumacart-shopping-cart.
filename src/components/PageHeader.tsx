import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Props {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionTo?: string;
}

export default function PageHeader({ title, subtitle, actionLabel, actionTo }: Props) {
  return (
    <div className="border-b border-stone-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-stone-900">{title}</h1>
            {subtitle && <p className="mt-2 text-stone-500 text-sm lg:text-base">{subtitle}</p>}
          </div>
          {actionLabel && actionTo && (
            <Link
              to={actionTo}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-stone-900 group"
            >
              {actionLabel}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
