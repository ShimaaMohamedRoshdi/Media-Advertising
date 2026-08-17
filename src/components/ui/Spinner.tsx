import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '', label }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3">
      <Loader2 className={`${sizeMap[size]} text-gold-400 animate-spin ${className}`} />
      {label && <p className="text-sm font-medium text-slate-400">{label}</p>}
    </div>
  );
};
