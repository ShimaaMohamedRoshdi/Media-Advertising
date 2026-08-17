import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-white text-slate-900 placeholder-slate-400 text-sm rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 ${
            leftIcon ? 'pl-10' : 'px-3.5'
          } py-2.5 shadow-sm ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-300 hover:border-slate-400 focus:border-amber-500 focus:ring-amber-500/20'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};
