import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 md:mb-14 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-2.5 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <span className="w-6 h-[2px] bg-[#d91f26] inline-block"></span>
          <span className="text-xs md:text-sm font-semibold tracking-wider uppercase text-[#d91f26]">
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={`font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight ${
          light ? 'text-white' : 'text-[#164287]'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-3 text-base md:text-lg leading-relaxed ${
            light ? 'text-slate-200' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
