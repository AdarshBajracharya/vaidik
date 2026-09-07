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
  // Dimension scales
  const emblemSizes = {
    sm: 38,
    md: 48,
    lg: 64,
  };

  const dim = emblemSizes[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''
        } ${className}`}
      id="vaidik-school-logo"
    >
      {/* Official Emblem Mark */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Vaidik Vidyapeeth Emblem"
      >
        {/* Top 5-pointed Star (Violet/Purple) */}
        <polygon
          points="60,6 63,16 73,16 65,22 68,32 60,26 52,32 55,22 47,16 57,16"
          fill="#6B3F87"
        />

        {/* Central Fountain Pen Nib & Spine */}
        <path
          d="M60 27 L61.5 76 L60 82 L58.5 76 Z"
          fill="#6B3F87"
        />
        <circle cx="60" cy="78" r="2" fill="#6B3F87" />

        {/* Left Student Figure - Vaidik Red (#D91F26) */}
        {/* Head */}
        <circle cx="44" cy="28" r="7.5" fill="#D91F26" />
        <circle cx="46.5" cy="26" r="4.5" fill="#FFFFFF" />

        {/* Left Body & Raised Arm */}
        <path
          d="M58.5 34 C58.5 34 50 42 42 43 C33 44 26 38 22 39 C28 44 38 48 42 56 C45 62 48 70 58.5 74 L58.5 34 Z"
          fill="#D91F26"
        />

        {/* Right Student Figure - Vaidik Blue (#164287) */}
        {/* Head */}
        <circle cx="76" cy="28" r="7.5" fill="#164287" />
        <circle cx="74" cy="26" r="4.5" fill="#D91F26" />

        {/* Right Body & Raised Arm */}
        <path
          d="M61.5 34 C61.5 34 70 42 78 43 C87 44 94 38 98 39 C92 44 82 48 78 56 C75 62 72 70 61.5 74 L61.5 34 Z"
          fill="#164287"
        />

        {/* Open Book Pages / Wings Base */}
        {/* Left Book Pages (Red & Blue curves) */}
        <path
          d="M60 92 C45 84 25 72 10 65 C16 71 35 80 50 85 C55 87 58 89 60 92 Z"
          fill="#D91F26"
        />
        <path
          d="M60 98 C46 90 28 80 14 74 C20 79 38 88 52 92 C56 93 58 95 60 98 Z"
          fill="#164287"
        />
        <path
          d="M60 86 C48 78 32 68 18 60 C24 64 42 73 54 78 C57 80 59 83 60 86 Z"
          fill="#164287"
        />

        {/* Right Book Pages (Blue & Red curves) */}
        <path
          d="M60 92 C75 84 95 72 110 65 C104 71 85 80 70 85 C65 87 62 89 60 92 Z"
          fill="#164287"
        />
        <path
          d="M60 98 C74 90 92 80 106 74 C100 79 82 88 68 92 C64 93 62 95 60 98 Z"
          fill="#D91F26"
        />
        <path
          d="M60 86 C72 78 88 68 102 60 C96 64 78 73 66 78 C63 80 61 83 60 86 Z"
          fill="#D91F26"
        />

        {/* Central Book Spine Apex */}
        <path
          d="M60 76 L63 99 L60 102 L57 99 Z"
          fill="#164287"
        />
      </svg>

      {/* Typography side */}
      {variant !== 'emblem-only' && (
        <div className="flex flex-col">
          <span
            className={`font-serif tracking-wider font-bold leading-none ${size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg md:text-xl'
              } ${variant === 'dark' ? 'text-white' : 'text-[#164287]'}`}
          >
            VAIDIK Vidyapeeth
          </span>
          <span
            className={`tracking-widest font-semibold uppercase leading-tight mt-0.5 ${size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px] md:text-xs'
              } ${variant === 'dark' ? 'text-red-400' : 'text-[#d91f26]'}`}
          >
            GOTHATAR, KATHMANDU, NEPAL
          </span>
        </div>
      )}
    </div>
  );
};
