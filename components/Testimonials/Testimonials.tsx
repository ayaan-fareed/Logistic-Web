'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Testimonials.module.scss';

const testimonials = [
  {
    name: 'Thomas Munro',
    role: 'Director at Picha Group',
    text: 'My business would not function without this team. Extremely talented with immense experience tailoring each consignment.',
  },
  {
    name: 'Francis Fung',
    role: 'APAC Supply Chain Director, Commscope',
    text: 'It was relentless attention to detail and pro-active monitoring that ensured a smooth dock to dock delivery.',
  },
  {
    name: 'Alex Hughes',
    role: 'Senior Management, Factory X',
    text: 'Your freight partner is more than just a service provider, they are an integral part of your business.',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={styles.testimonials}>
      <h2 className={styles.heading}>Trusted by businesses across APAC</h2>

      <div className={styles.slider}>
        <button className={styles.navBtn} onClick={prev}>‹</button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            <p className={styles.text}>"{testimonials[index].text}"</p>
            <h4 className={styles.name}>{testimonials[index].name}</h4>
            <span className={styles.role}>{testimonials[index].role}</span>
          </motion.div>
        </AnimatePresence>

        <button className={styles.navBtn} onClick={next}>›</button>
      </div>

      <div className={styles.dots}>
        {testimonials.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.activeDot : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}