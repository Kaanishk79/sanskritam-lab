import React from 'react'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string
  className?: string
}

export const OmIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 4c2.5 0 4 1.5 4 3.5 0 1.8-1.2 2.8-2.5 3.3 2 .6 3.5 2.2 3.5 4.2 0 3-2.5 5-6 5-3.5 0-5.5-2.2-5.5-4.5 0-1.8 1.2-3.2 3-3.8-1.2-.6-2-1.8-2-3.2C6.5 6 8.5 4 12 4z" />
    <path d="M16 11c2.5 0 4.5-1.5 4.5-3.5" />
    <circle cx="18" cy="4" r="1.5" fill="currentColor" stroke="none" />
  </svg>
)

export const PalmLeafIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M2 12c4-8 16-8 20 0-4 8-16 8-20 0z" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="7" y1="9" x2="9" y2="12" />
    <line x1="12" y1="8" x2="13" y2="12" />
    <line x1="17" y1="9" x2="17" y2="12" />
    <line x1="7" y1="15" x2="9" y2="12" />
    <line x1="12" y1="16" x2="13" y2="12" />
    <line x1="17" y1="15" x2="17" y2="12" />
  </svg>
)

export const TempleIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 2l3 5H9l3-5z" />
    <path d="M4 11h16v2H4z" />
    <path d="M6 13v7" />
    <path d="M10 13v7" />
    <path d="M14 13v7" />
    <path d="M18 13v7" />
    <path d="M3 20h18v2H3z" />
    <path d="M7 7h10v4H7z" />
  </svg>
)

export const ShlokaIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M8 7h8" />
    <path d="M8 11h6" />
    <circle cx="12" cy="15" r="1" fill="currentColor" />
  </svg>
)
