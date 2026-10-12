type IconProps = { className?: string };

const common = {
  'aria-hidden': true,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

export const ArrowRight = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowLeft = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);
export const ChevronLeft = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);
export const ChevronRight = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);
export const ExternalIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
);
export const CalendarIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </svg>
);
export const ClockIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const PinIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const DownloadIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);
export const SlidesIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);
export const MenuIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);
export const CloseIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const PauseIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M9 6v12M15 6v12" />
  </svg>
);
export const PlayIcon = ({ className }: IconProps) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8 5.5v13a.5.5 0 0 0 .77.42l10-6.5a.5.5 0 0 0 0-.84l-10-6.5A.5.5 0 0 0 8 5.5Z" />
  </svg>
);
