'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import DotMap from '@/components/DotMap/DotMap';
import { modeIcon, projectToXY } from '@/lib/mapProjection';
import styles from './LiveMap.module.scss';

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

export default function LiveMap() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const statsRef = useRef(null);
  const isInView = useInView(statsRef, { once: true });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/shipments');
        const data = await res.json();
        setShipments(data.shipments || []);
        setStats(data.stats || null);
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

  return (
    <section className={styles.liveMap}>
      <div className={styles.mapArea}>
        <DotMap />

        {!loading &&
          shipments.map((shipment) => {
            const { x, y } = projectToXY(shipment.current_lat, shipment.current_lng);
            const { icon, label } = modeIcon(shipment.mode);

            return (
              <motion.div
                key={shipment.id}
                className={styles.badge}
                style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className={styles.icon}>{icon}</span>
                <span className={styles.label}>{label}</span>
              </motion.div>
            );
          })}
      </div>

      <div className={styles.statsGrid} ref={statsRef}>
        <motion.div
          className={styles.statBox}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h3>{loading ? '—' : stats?.activeShipments}</h3>
          <p>Active Shipments</p>
        </motion.div>

        <motion.div
          className={styles.statBox}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3>{loading ? '—' : stats?.citiesServed}</h3>
          <p>Cities Served</p>
        </motion.div>

        <motion.div
          className={styles.statBox}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>{loading ? '—' : `${stats?.onTimeRate}%`}</h3>
          <p>On-Time Delivery</p>
        </motion.div>

        <motion.div
          className={styles.statBox}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3>24/7</h3>
          <p>Tracking</p>
        </motion.div>
      </div>
    </section>
  );
}
