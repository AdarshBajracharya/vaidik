import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'emblem-only';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
  onClick,
}) => {
  const emblemSizes = {
    sm: 38,
    md: 48,
    lg: 64,
  };

  const dim = emblemSizes[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      id="vaidik-school-logo"
    >
      {/* Logo image from the public folder */}
      <img
        src="/logo.png"
        alt="Vaidik Vidyapeeth Logo"
        width={dim}
        height={dim}
        style={{
          width: dim,
          height: dim,
          objectFit: 'contain',
        }}
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        draggable={false}
      />

      {/* School name and address */}
      {variant !== 'emblem-only' && (
        <div className="flex flex-col">
          <span
            className={`font-serif tracking-wider font-bold leading-none ${
              size === 'sm'
                ? 'text-base'
                : size === 'lg'
                  ? 'text-2xl'
                  : 'text-lg md:text-xl'
            } ${
              variant === 'dark' ? 'text-white' : 'text-[#164287]'
            }`}
          >
            VAIDIK Vidyapeeth
          </span>

          <span
            className={`tracking-widest font-semibold uppercase leading-tight mt-0.5 ${
              size === 'sm'
                ? 'text-[9px]'
                : size === 'lg'
                  ? 'text-xs'
                  : 'text-[10px] md:text-xs'
            } ${
              variant === 'dark' ? 'text-red-400' : 'text-[#d91f26]'
            }`}
          >
            GOTHATAR, KATHMANDU, NEPAL
          </span>
        </div>
      )}
    </div>
  );
};