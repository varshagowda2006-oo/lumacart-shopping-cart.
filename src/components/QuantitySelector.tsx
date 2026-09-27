import { Minus, Plus } from 'lucide-react';

interface Props {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  size?: 'sm' | 'md';
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease, size = 'md' }: Props) {
  const dims = size === 'sm'
    ? 'h-8 w-8 text-xs'
    : 'h-10 w-10 text-sm';

  return (
    <div className="inline-flex items-center rounded-xl border border-stone-200 bg-white overflow-hidden">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className={`${dims} flex items-center justify-center text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus size={size === 'sm' ? 13 : 16} />
      </button>
      <span className={`min-w-[2.5rem] text-center font-medium text-stone-900 ${size === 'sm' ? 'text-sm' : ''}`}>
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className={`${dims} flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus size={size === 'sm' ? 13 : 16} />
      </button>
    </div>
  );
}
