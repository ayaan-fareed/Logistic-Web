'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Stats.module.scss';

const stats = [
  { number: '2,500+', label: 'Shipments per month' },
  { number: '98.2%', label: 'On-time delivery rate' },
  { number: '8+', label: 'Years in operation' },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className={styles.stats} ref={ref}>
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={styles.statBox}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <h3 className={styles.number}>{stat.number}</h3>
            <p className={styles.label}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}