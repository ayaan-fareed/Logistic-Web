// Hero.tsx
'use client';
import { motion } from 'framer-motion';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Every leg of the journey
      </motion.h1>
    </section>
  );
}