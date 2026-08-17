import React from 'react';
import type { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  placeholder = 'Select an option',
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full bg-white text-slate-900 text-sm rounded-xl border px-3.5 py-2.5 transition-all duration-200 focus:outline-none focus:ring-2 shadow-sm ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-300 hover:border-slate-400 focus:border-amber-500 focus:ring-amber-500/20'
        } ${className}`}
        {...props}
      >
        <option value="" disabled className="bg-white text-slate-400">
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 font-semibold">{error}</p>}
    </div>
  );
};
