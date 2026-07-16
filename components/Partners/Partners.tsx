'use client';
import { motion } from 'framer-motion';
import styles from './Partners.module.scss';

const partners = [
  'Air China', 'Vietnam Airlines', 'British Airways', 'Malaysia Airlines',
  'China Southern', 'Qatar Airways', 'Emirates', 'Singapore Airlines',
  'MSC', 'Maersk', 'COSCO', 'CMA CGM',
];

export default function Partners() {
  return (
    <section className={styles.partners}>
      <h2 className={styles.heading}>Our partners</h2>
      <p className={styles.subheading}>Airlines & Shipping Lines</p>

      <motion.div
        className={styles.grid}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {partners.map((name) => (
          <div key={name} className={styles.logoBox}>
            {name}
          </div>
        ))}
      </motion.div>
    </section>
  );
}