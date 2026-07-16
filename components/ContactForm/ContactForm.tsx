'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.scss';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.field}>
        <label>Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </div>

      <div className={styles.field}>
        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>

      <div className={styles.field}>
        <label>Phone</label>
        <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
      </div>

      <div className={styles.field}>
        <label>Message</label>
        <textarea name="message" rows={5} value={form.message} onChange={handleChange} required />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && <p className={styles.success}>Message sent successfully!</p>}
      {status === 'error' && <p className={styles.error}>Something went wrong. Try again.</p>}
    </motion.form>
  );
}
