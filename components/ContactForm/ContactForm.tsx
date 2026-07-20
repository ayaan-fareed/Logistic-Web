'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import styles from './ContactForm.module.scss';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormState {
  fullName: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormState = {
  fullName: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
};

const ICONS = {
  message: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.5-5.8A8.38 8.38 0 0 1 3.5 11.5a8.5 8.5 0 0 1 12.2-6.7 8.38 8.38 0 0 1 3.8.9L21 3l-1.5 5.8a8.5 8.5 0 0 1 1.5 2.7z" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  mapPin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  envelope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-5a2 2 0 0 1 4 0v5" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

const revealContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const highlights = [
  {
    icon: 'message',
    title: 'Fast, personal replies',
    body: 'Our logistics specialists respond to every enquiry directly - usually within 24 hours.',
  },
  {
    icon: 'clock',
    title: 'Global coverage, local time',
    body: 'Operating across Australia, New Zealand, Hong Kong and China with offices in key markets.',
  },
  {
    icon: 'shield',
    title: 'Trusted & compliant',
    body: 'Licensed customs brokers, PCI-DSS payments and 256-bit SSL security across the platform.',
  },
];

const contactCards = [
  {
    icon: 'mapPin',
    label: 'Head Office',
    value: '2A International Square,\nTullamarine VIC 3043, Australia.',
  },
  {
    icon: 'envelope',
    label: 'Email',
    value: 'contact@unitedcarriers.com',
  },
  {
    icon: 'phone',
    label: 'Hotline',
    value: '1300 000 082',
  },
  {
    icon: 'building',
    label: 'Office Hours',
    value: 'Mon - Fri / 8:30AM - 5PM',
  },
];

const subjectOptions = [
  'General Enquiry',
  'Request a Quote',
  'Track a Shipment',
  'Customs & Compliance',
  'Partnerships',
  'Careers',
  'Other',
];

function validate(data: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Please enter your full name';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Please enter your email address';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Please enter your phone number';
  }

  if (!data.subject.trim()) {
    errors.subject = 'Please select a subject';
  }

  if (!data.message.trim()) {
    errors.message = 'Please enter a message';
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [apiError, setApiError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const nextForm = { ...form, [name]: value } as FormState;
    setForm(nextForm);

    if (touched[name as keyof FormState]) {
      setErrors(validate(nextForm));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      fullName: true,
      email: true,
      company: true,
      phone: true,
      subject: true,
      message: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          company: form.company,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
        setApiError(data.error || 'Something went wrong. Please try again later.');
      }
    } catch {
      setStatus('error');
      setApiError('Network error. Please check your connection and try again.');
    }
  };

  const showFieldError = (key: keyof FormState) => touched[key] && errors[key];

  return (
    <section className={styles.contactSection} aria-labelledby="contact-heading">
      <div className={styles.glowTop} aria-hidden="true" />
      <div className={styles.glowBottom} aria-hidden="true" />
      <div className={styles.dotPattern} aria-hidden="true" />

      <div className={styles.hero}>
        <div className={styles.container}>
          <motion.span
            className={styles.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contact
          </motion.span>
          <motion.h1
            id="contact-heading"
            className={styles.heading}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Talk to Our Team
          </motion.h1>
          <motion.p
            className={styles.heroSubheading}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you need a quote, tracking help, or a full supply-chain review, our freight specialists are ready to help you move faster.
          </motion.p>
        </div>
      </div>

      <div className={styles.contactBody}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <motion.div
              className={styles.infoColumn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={revealContainer}
            >
              <motion.div variants={revealItem}>
                <h2 className={styles.sectionHeading}>We&apos;re here to help</h2>
                <p className={styles.sectionSubheading}>
                  Reach out directly or send us a message. Our team usually responds within one business day.
                </p>
              </motion.div>

              <motion.ul className={styles.highlights} variants={revealItem}>
              {highlights.map((item) => (
                <li key={item.title} className={styles.highlight}>
                  <span className={styles.highlightIcon}>{ICONS[item.icon as keyof typeof ICONS]}</span>
                  <div className={styles.highlightContent}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </motion.ul>

            <motion.div className={styles.contactCards} variants={revealItem}>
              {contactCards.map((card) => (
                <div key={card.label} className={styles.card}>
                  <span className={styles.cardIcon}>{ICONS[card.icon as keyof typeof ICONS]}</span>
                  <div className={styles.cardBody}>
                    <span className={styles.cardLabel}>{card.label}</span>
                    {card.value.split('\n').map((line) => (
                      <span key={line} className={styles.cardValue}>{line}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div className={styles.responsePill} variants={revealItem}>
              {ICONS.check}
              <span>Average response within 24 hours</span>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.formColumn}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }}
          >
            <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
              <h3 className={styles.formTitle}>Start a Conversation</h3>
              <p className={styles.formSubtitle}>Fill in the form below and we will be in touch shortly.</p>

              <div className={styles.formGrid}>
                <div className={`${styles.field} ${showFieldError('fullName') ? styles.invalid : ''}`}>
                  <label htmlFor="fullName" className={styles.fieldLabel}>
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Smith"
                    className={styles.input}
                    autoComplete="name"
                    required
                  />
                  <span className={styles.fieldError}>{showFieldError('fullName') ? errors.fullName : ''}</span>
                </div>

                <div className={`${styles.field} ${showFieldError('email') ? styles.invalid : ''}`}>
                  <label htmlFor="email" className={styles.fieldLabel}>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@company.com"
                    className={styles.input}
                    autoComplete="email"
                    required
                  />
                  <span className={styles.fieldError}>{showFieldError('email') ? errors.email : ''}</span>
                </div>

                <div className={`${styles.field} ${showFieldError('company') ? styles.invalid : ''}`}>
                  <label htmlFor="company" className={styles.fieldLabel}>Company Name</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Acme Logistics Pty Ltd"
                    className={styles.input}
                    autoComplete="organization"
                  />
                  <span className={styles.fieldError} />
                </div>

                <div className={`${styles.field} ${showFieldError('phone') ? styles.invalid : ''}`}>
                  <label htmlFor="phone" className={styles.fieldLabel}>
                    Phone Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+61 400 000 000"
                    className={styles.input}
                    autoComplete="tel"
                    required
                  />
                  <span className={styles.fieldError}>{showFieldError('phone') ? errors.phone : ''}</span>
                </div>

                <div className={`${styles.field} ${styles.fullWidth} ${showFieldError('subject') ? styles.invalid : ''}`}>
                  <label htmlFor="subject" className={styles.fieldLabel}>
                    Subject <span className={styles.required}>*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={styles.select}
                    required
                  >
                    <option value="" disabled>Select a topic</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className={styles.fieldError}>{showFieldError('subject') ? errors.subject : ''}</span>
                </div>

                <div className={`${styles.field} ${styles.fullWidth} ${showFieldError('message') ? styles.invalid : ''}`}>
                  <label htmlFor="message" className={styles.fieldLabel}>
                    Message <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about your shipment, timeline, and any special requirements..."
                    className={styles.textarea}
                    rows={5}
                    required
                  />
                  <span className={styles.fieldError}>{showFieldError('message') ? errors.message : ''}</span>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <span className={styles.spinner} aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {status === 'success' && (
                <div className={`${styles.banner} ${styles.successBanner}`} role="alert">
                  {ICONS.check}
                  <span>Thank you. Your message has been sent and our team will be in touch shortly.</span>
                </div>
              )}

              {status === 'error' && (
                <div className={`${styles.banner} ${styles.errorBanner}`} role="alert">
                  {ICONS.alert}
                  <span>{apiError || 'Something went wrong. Please try again.'}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
}
