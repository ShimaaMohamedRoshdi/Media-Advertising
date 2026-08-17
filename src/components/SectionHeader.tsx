import React from 'react';
import { Badge } from './ui/Badge';

interface SectionHeaderProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {badgeText && <Badge variant="gold">{badgeText}</Badge>}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 max-w-3xl leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-medium leading-relaxed mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};
