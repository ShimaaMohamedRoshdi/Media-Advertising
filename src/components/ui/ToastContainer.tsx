import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { ToastMessage } from '../../hooks/useToast';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  const borderColors = {
    success: 'border-emerald-500/40 bg-navy-900/95',
    error: 'border-red-500/40 bg-navy-900/95',
    warning: 'border-amber-500/40 bg-navy-900/95',
    info: 'border-sky-500/40 bg-navy-900/95',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 ${borderColors[toast.type]}`}
        >
          {icons[toast.type]}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-100">{toast.title}</h4>
            {toast.message && <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>}
          </div>
          <button
            onClick={() => onRemove(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
