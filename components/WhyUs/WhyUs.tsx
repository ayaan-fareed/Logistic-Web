'use client';
import { motion } from 'framer-motion';
import styles from './WhyUs.module.scss';

const features = [
  {
    title: 'One Point of Contact',
    desc: 'No more chasing multiple vendors. One team manages your entire shipment.',
    icon: '👤',
  },
  {
    title: 'Full Supply Chain Visibility',
    desc: 'Track your freight in real time and get proactive updates.',
    icon: '📍',
  },
  {
    title: 'Compliance You Can Trust',
    desc: 'Licensed customs brokers keep your shipments within every regulation.',
    icon: '✅',
  },
  {
    title: 'Competitive, Transparent Pricing',
    desc: 'No hidden fees. Clear pricing backed by responsive sales support.',
    icon: '💰',
  },
  {
    title: 'Fast Issue Resolution',
    desc: 'When something unexpected happens, we solve it immediately.',
    icon: '⚡',
  },
];

export default function WhyUs() {
  return (
    <section className={styles.whyUs}>
      <div className={styles.header}>
        <span className={styles.tag}>Why us</span>
        <h2>Logistics that works as hard as you do.</h2>
      </div>

      <div className={styles.grid}>
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={styles.card}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.icon}>{feature.icon}</div>
            <div>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.desc}>{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}