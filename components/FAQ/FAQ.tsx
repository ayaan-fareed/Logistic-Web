'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FAQ.module.scss';

const faqs = [
  {
    q: 'What does your company do?',
    a: 'We are a global freight forwarding and logistics provider delivering end-to-end supply chain solutions.',
  },
  {
    q: 'What shipping methods do you offer?',
    a: 'We offer airfreight, seafreight (FCL & LCL), breakbulk, RO/RO, and multimodal transport solutions.',
  },
  {
    q: 'Do you provide customs clearance services?',
    a: 'Yes, we offer in-house customs brokerage to manage import and export clearances efficiently.',
  },
  {
    q: 'How is freight pricing calculated?',
    a: 'Pricing depends on shipment size, weight, origin, destination, mode of transport, and market conditions.',
  },
  {
    q: 'How do I request a quote?',
    a: 'You can contact us via our website, email, or phone with your shipment details.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <h2 className={styles.heading}>F.A.Q</h2>
      <p className={styles.subheading}>Straightforward answers, so you can move forward with confidence.</p>

      <div className={styles.list}>
        {faqs.map((item, index) => (
          <div key={index} className={styles.item}>
            <button className={styles.question} onClick={() => toggle(index)}>
              {item.q}
              <span className={styles.icon}>{openIndex === index ? '−' : '+'}</span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className={styles.answerWrapper}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className={styles.answer}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}