'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './TrackShipment.module.scss';

type Shipment = {
  tracking_number: string;
  status: string;
  mode: string;
  current_city: string;
  origin_city: string;
  destination_city: string;
  eta: string;
};

export default function TrackShipment() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;

    setLoading(true);
    setError('');
    setShipment(null);

    try {
      const res = await fetch(`/api/track?number=${trackingNumber}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Shipment not found');
      } else {
        setShipment(data.shipment);
      }
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.trackBox}>
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Enter tracking number"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
          className={styles.input}
        />
        <button onClick={handleTrack} className={styles.trackBtn} disabled={loading}>
          {loading ? 'Tracking...' : 'Track'}
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <AnimatePresence>
        {shipment && (
          <motion.div
            className={styles.result}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className={styles.resultHeader}>
              <span className={styles.trackingNum}>{shipment.tracking_number}</span>
              <span className={`${styles.statusBadge} ${styles[shipment.status]}`}>
                {shipment.status.replace('_', ' ')}
              </span>
            </div>
            <p className={styles.route}>
              {shipment.origin_city} → <strong>{shipment.current_city}</strong> → {shipment.destination_city}
            </p>
            <p className={styles.meta}>Mode: {shipment.mode} · ETA: {shipment.eta}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
