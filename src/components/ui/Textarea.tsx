import React from 'react';
import type { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  rows = 4,
  ...props
}) => {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full bg-white text-slate-900 placeholder-slate-400 text-sm rounded-xl border px-3.5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 resize-y shadow-sm ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-300 hover:border-slate-400 focus:border-amber-500 focus:ring-amber-500/20'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
