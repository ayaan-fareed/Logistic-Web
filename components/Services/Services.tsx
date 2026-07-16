'use client';
import { motion } from 'framer-motion';
import styles from './Services.module.scss';

const services = [
  {
    title: 'Air Freight',
    desc: 'Express, priority, and deferred options across global trade lanes.',
    icon: '✈️',
  },
  {
    title: 'Ocean Freight',
    desc: 'FCL, LCL, and specialised cargo movements with structured routing.',
    icon: '🚢',
  },
  {
    title: 'Customs Brokerage',
    desc: 'In-house licensed brokerage covering classification and compliance.',
    icon: '📋',
  },
  {
    title: 'Warehousing & 3PL',
    desc: 'Scalable storage, pick and pack, and distribution solutions.',
    icon: '🏭',
  },
  {
    title: 'Project Cargo',
    desc: 'Specialist handling for oversized and complex shipments.',
    icon: '📦',
  },
  {
    title: 'Domestic & Linehaul Transport',
    desc: 'Local, metro, and interstate transport with full visibility.',
    icon: '🚛',
  },
];

export default function Services() {
  return (
    <section className={styles.services}>
      <div className={styles.header}>
        <h2>Everything your freight needs. Under one group.</h2>
        <p>From air to sea, from customs clearance to final delivery.</p>
      </div>

      <div className={styles.grid}>
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.icon}>{service.icon}</div>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.desc}>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}