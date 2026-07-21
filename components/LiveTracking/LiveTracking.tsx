'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import TrackShipment from '@/components/TrackShipment/TrackShipment';
import { modeIcon, projectToXY } from '@/lib/mapProjection';
import styles from './LiveTracking.module.scss';

type Hub = { id: string; name: string; x: number; y: number };
type RoutePair = [Hub, Hub];

type Shipment = {
  id: string;
  tracking_number: string;
  mode: string;
  current_city: string;
  current_lat: number;
  current_lng: number;
};

type Stats = {
  activeShipments: number;
  citiesServed: number;
  onTimeRate: string;
};

const hubs: Hub[] = [
  { id: 'ny', name: 'New York', x: 248, y: 168 },
  { id: 'ldn', name: 'London', x: 492, y: 142 },
  { id: 'dxb', name: 'Dubai', x: 590, y: 210 },
  { id: 'sin', name: 'Singapore', x: 732, y: 236 },
  { id: 'sha', name: 'Shanghai', x: 782, y: 180 },
  { id: 'syd', name: 'Sydney', x: 865, y: 400 },
];

const routePairs: RoutePair[] = [
  [hubs[0], hubs[1]], // NY -> London
  [hubs[1], hubs[2]], // London -> Dubai
  [hubs[2], hubs[3]], // Dubai -> Singapore
  [hubs[3], hubs[4]], // Singapore -> Shanghai
  [hubs[4], hubs[5]], // Shanghai -> Sydney
  [hubs[0], hubs[3]], // NY -> Singapore
  [hubs[1], hubs[4]], // London -> Shanghai
];

const shipmentCards = [
  { icon: '📦', label: 'Shipment In Transit', style: styles.cardTopRight },
  { icon: '🚢', label: 'Ocean Freight', style: styles.cardBottomLeft },
  { icon: '✈️', label: 'Air Freight', style: styles.cardMidRight },
  { icon: '🚛', label: 'Last Mile Delivery', style: styles.cardBottomRight },
];

const modes = [
  { icon: '🚢', label: 'Cargo Ship' },
  { icon: '✈️', label: 'Airplane' },
  { icon: '🚛', label: 'Truck' },
  { icon: '🏭', label: 'Warehouse' },
];


function routePath(a: Hub, b: Hub) {
  const midX = (a.x + b.x) / 2;
  const midY = (a.y + b.y) / 2;
  const offset = Math.max(60, Math.abs(a.x - b.x) * 0.18);
  const cy = midY - offset;
  return `M ${a.x} ${a.y} Q ${midX} ${cy} ${b.x} ${b.y}`;
}

export default function LiveTracking() {
  const baseId = useId();

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [liveStats, setLiveStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/shipments');
        const data = await res.json();
        setShipments(data.shipments || []);
        setLiveStats(data.stats || null);
      } catch (err) {
        console.error('Failed to load shipments:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const displayStats = useMemo(
    () => [
      {
        value: loading ? '—' : (liveStats?.activeShipments ?? '128'),
        label: 'Active Shipments',
      },
      {
        value: loading ? '—' : (liveStats?.citiesServed ?? '48'),
        label: 'Cities Served',
      },
      {
        value: loading ? '—' : (liveStats ? `${liveStats.onTimeRate}%` : '99.8%'),
        label: 'On-Time Delivery',
      },
      { value: '24/7', label: 'Tracking' },
    ],
    [liveStats, loading]
  );

  const routes = useMemo(
    () =>
      routePairs.map(([a, b], i) => ({
        id: `${baseId}-route-${i}`,
        path: routePath(a, b),
        duration: 3.5 + (i % 4) * 0.6,
        delay: -(i * 0.9),
      })),
    [baseId]
  );

  return (
    <section className={styles.tracking} id="tracking">
      <div className={styles.gridBg} aria-hidden="true" />
      <div className={styles.radialGlow} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.formPanel}>
          <span className={styles.eyebrow}>Live network</span>
          <h2 className={styles.title}>
            Track your shipment across the world.
          </h2>
          <p className={styles.copy}>
            Enter a booking or container number to see real-time milestones,
            ETAs, and every hand-off in your supply chain.
          </p>

          <TrackShipment />

          <div className={styles.modeRow}>
            {modes.map((mode) => (
              <span key={mode.label} className={styles.modeBadge}>
                <span className={styles.modeIcon}>{mode.icon}</span>
                {mode.label}
              </span>
            ))}
          </div>

          <div className={styles.stats}>
            {displayStats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mapPanel}>
          <svg
            className={styles.mapSvg}
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
            aria-label="Global logistics network"
          >
            <defs>
              <pattern
                id={`${baseId}-dots`}
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="5" cy="5" r="1.15" fill="#94a3b8" />
              </pattern>

              <mask id={`${baseId}-land`}>
                <rect width="1000" height="500" fill="#000" />
                <g fill="#fff">
                  <path d="M75 68l42-34 52 8 35 30-12 29-36 15-10 36-32 17-25-31-29-17 15-32z" />
                  <path d="M191 166l31 19 17 58 28 50-13 87-29 63-26-55 7-65-25-68-14-55z" />
                  <path d="M411 74l63-32 82 12 69 8 26 42-24 34-51-12-43 26-57-10-32 25-46-24 10-39z" />
                  <path d="M473 174l49 22 28 54-10 51-41 31-39-43-19-57 32-58z" />
                  <path d="M591 162l47-14 48 22 15 42-37 25-8 50-49 8-33-36 17-47z" />
                  <path d="M681 107l42-33 95 10 72 35 23 58-30 36-58-9-39-40-49 19-48-27z" />
                  <path d="M744 233l58 11 45 48 19 72-43 47-44-17-31-64-30-48 26-49z" />
                  <path d="M807 404l43 7 38 35-31 27-61-13-9-29z" />
                  <path d="M895 80l61 18 28 41-15 36-42-4-31-31z" />
                </g>
              </mask>

              <filter id={`${baseId}-glow`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect
              width="1000"
              height="500"
              fill={`url(#${baseId}-dots)`}
              mask={`url(#${baseId}-land)`}
              opacity="0.85"
            />

            <g>
              {routes.map((r) => (
                <path
                  key={r.id}
                  id={r.id}
                  d={r.path}
                  className={styles.route}
                />
              ))}
            </g>

            <g>
              {routes.map((r) =>
                [0, 1].map((offset) => (
                  <circle
                    key={`${r.id}-mover-${offset}`}
                    r="3"
                    className={styles.mover}
                  >
                    <animateMotion
                      dur={`${r.duration + offset * 0.8}s`}
                      repeatCount="indefinite"
                      begin={`${r.delay - offset * (r.duration / 2)}s`}
                      calcMode="linear"
                    >
                      <mpath href={`#${r.id}`} />
                    </animateMotion>
                  </circle>
                ))
              )}
            </g>

            <g>
              {hubs.map((hub, i) => (
                <g key={hub.id} transform={`translate(${hub.x}, ${hub.y})`}>
                  <circle
                    r="14"
                    className={styles.hubPulse}
                    style={{ animationDelay: `${i * 0.35}s` }}
                  />
                  <circle r="5" className={styles.hubCore} />
                  <text
                    x="0"
                    y="24"
                    textAnchor="middle"
                    className={styles.hubLabel}
                  >
                    {hub.name}
                  </text>
                </g>
              ))}
            </g>
          </svg>

          {!loading && (
            <div className={styles.mapOverlay}>
              <div className={styles.mapOverlayInner}>
                {shipments.map((shipment) => {
                  const { x, y } = projectToXY(
                    shipment.current_lat,
                    shipment.current_lng
                  );
                  const { icon, label } = modeIcon(shipment.mode);

                  return (
                    <motion.div
                      key={shipment.id}
                      className={styles.shipmentBadge}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className={styles.badgeIcon}>{icon}</span>
                      <span className={styles.badgeLabel}>{label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {shipmentCards.map((card) => (
            <div key={card.label} className={`${styles.floatingCard} ${card.style}`}>
              <span className={styles.floatingIcon}>{card.icon}</span>
              <span>{card.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
