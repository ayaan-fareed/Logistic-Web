'use client';
import { motion } from 'framer-motion';
import DotMap from '@/components/DotMap/DotMap';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={`${styles.hero} dark-section`}>
      <div className="glow-orb" style={{ width: 500, height: 500, background: 'var(--color-accent)', top: '-100px', right: '-150px' }} />
      <div className="glow-orb" style={{ width: 400, height: 400, background: '#3a5aff', bottom: '-100px', left: '-100px' }} />

      <DotMap />

      <div className={styles.content}>
        <motion.span
          className={styles.badge}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Freight & Logistics
        </motion.span>

        <motion.h1
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Every leg of the journey. One operator.
        </motion.h1>

        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Air, ocean, and ground freight managed end-to-end — with full visibility from origin to final delivery.
        </motion.p>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <a href="/contact" className={styles.primaryBtn}>Get a quote</a>
          <a href="/services" className={styles.secondaryBtn}>Our services →</a>
        </motion.div>
      </div>
    </section>
  );
}