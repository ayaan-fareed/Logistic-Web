'use client';

import styles from './IntroVisual.module.scss';

export default function IntroVisual() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 420 340"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="introCardBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          <pattern id="introGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0 L0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          </pattern>

          <pattern id="introDots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.2" fill="#CBD5E1" />
          </pattern>

          <filter id="introShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="14" stdDeviation="20" floodColor="#0F172A" floodOpacity="0.09" />
          </filter>
        </defs>

        <rect
          x="10"
          y="10"
          width="400"
          height="320"
          rx="24"
          fill="url(#introCardBg)"
          filter="url(#introShadow)"
        />

        <rect
          x="10"
          y="10"
          width="400"
          height="320"
          rx="24"
          fill="url(#introGrid)"
          opacity="0.7"
        />

        <circle cx="210" cy="170" r="120" fill="#F1F5F9" opacity="0.5" />
        <circle cx="210" cy="170" r="120" fill="url(#introDots)" opacity="0.5" />

        <path
          d="M110 190 Q210 60 310 190"
          fill="none"
          stroke="#93C5FD"
          strokeWidth="3"
          strokeDasharray="8 8"
          className={styles.route}
        />

        <g className={styles.ship}>
          <path d="M120 245 h180 l-15 32 h-150 z" fill="#0F172A" />
          <rect x="145" y="212" width="36" height="30" rx="4" fill="#2563EB" />
          <rect x="192" y="212" width="36" height="30" rx="4" fill="#FF6B35" />
          <rect x="239" y="212" width="36" height="30" rx="4" fill="#2563EB" />
        </g>

        <g className={styles.plane}>
          <path
            d="M305 95 l-8 26 18-8 18 8-4-26-24-8z"
            fill="#0F172A"
          />
          <path d="M305 95 l-14 8h28z" fill="#0F172A" />
        </g>

        <g className={styles.pill}>
          <rect x="40" y="45" width="134" height="42" rx="21" fill="white" opacity="0.92" />
          <circle cx="62" cy="66" r="5" fill="#22C55E" />
          <text x="76" y="71" fontSize="12" fontWeight="700" fill="#0F172A">
            98.2% on time
          </text>
        </g>

        <g className={styles.pill}>
          <rect x="260" y="265" width="124" height="38" rx="19" fill="white" opacity="0.92" />
          <text x="280" y="289" fontSize="12" fontWeight="700" fill="#0F172A">
            2,500+ shipments
          </text>
        </g>
      </svg>
    </div>
  );
}
