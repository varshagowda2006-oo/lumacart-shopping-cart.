import { CheckCircle, Info, XCircle, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useStore();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 items-end pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-slide-in-right pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-lg shadow-stone-300/40 border border-stone-100 min-w-[260px] max-w-sm"
        >
          {toast.type === 'success' && <CheckCircle size={18} className="text-emerald-500 shrink-0" />}
          {toast.type === 'info' && <Info size={18} className="text-stone-500 shrink-0" />}
          {toast.type === 'error' && <XCircle size={18} className="text-rose-500 shrink-0" />}
          <p className="text-sm text-stone-700 flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-300 hover:text-stone-500 shrink-0"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
