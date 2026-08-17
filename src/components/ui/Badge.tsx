import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'emerald' | 'blue' | 'slate' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  const variantStyles = {
    gold: 'bg-blue-50 text-blue-900 border border-blue-200 font-extrabold',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold',
    blue: 'bg-sky-50 text-sky-900 border border-sky-200 font-bold',
    slate: 'bg-slate-100 text-slate-800 border border-slate-200 font-bold',
    red: 'bg-red-50 text-red-800 border border-red-200 font-bold',
  };

  return (
    <span className={`inline-flex items-center rounded-full uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
