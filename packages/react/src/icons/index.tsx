import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
const base: IconProps = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
);
export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6l4 4 4-4" />
  </svg>
);
export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);
export const InfoIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6.25" />
    <path d="M8 7.25v4M8 5v.25" />
  </svg>
);
export const WarningIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 2.5l6 11H2z" />
    <path d="M8 7v3M8 12v.25" />
  </svg>
);
export const GoodIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6.25" />
    <path d="M5.25 8.25l1.75 1.75 3.75-4" />
  </svg>
);
export const CriticalIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6.25" />
    <path d="M5.75 5.75l4.5 4.5M10.25 5.75l-4.5 4.5" />
  </svg>
);
