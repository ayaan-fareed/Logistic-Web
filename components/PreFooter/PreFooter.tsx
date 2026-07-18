'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './PreFooter.module.scss';

export default function PreFooter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.08 }
    );

    const animElements = sectionRef.current?.querySelectorAll(`.${styles.fadeIn}`);
    animElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.preFooter} ref={sectionRef}>
      {/* Background watermark */}
      <div className={styles.watermark} aria-hidden="true">
        UNITED CARRIERS
      </div>

      {/* Dotted world map */}
      <div className={styles.worldMap} aria-hidden="true" />

      {/* Particles */}
      <div className={styles.particles} aria-hidden="true" />

      {/* Main Grid */}
      <div className={styles.grid}>
        {/* Column 1 — Connect With Us */}
        <div className={`${styles.column} ${styles.fadeIn}`}>
          <h4>Connect With Us</h4>
          <p className={styles.intro}>
            United Carriers delivers end-to-end freight solutions across air, ocean, and road — trusted by businesses in Australia, New Zealand, and Asia.
          </p>
          <div className={styles.socialIcons}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l11.733 16h4.267l-11.733-16z"/>
                <path d="M4 20l6.768-6.768M20 4l-6.768 6.768"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2 — Quick Navigation */}
        <div className={`${styles.column} ${styles.fadeIn}`}>
          <h4>Quick Navigation</h4>
          <nav className={styles.navLinks}>
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/services">Services</Link>
            <Link href="/industries">Industries</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        {/* Column 3 — Global Contact */}
        <div className={`${styles.column} ${styles.fadeIn}`}>
          <h4>Global Contact</h4>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Head Office</span>
              <p>2A International Square,<br />Tullamarine VIC 3043, Australia.</p>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <p>contact@unitedcarriers.com</p>
            </div>
            <div className={styles.contactRow}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Hotline</span>
                <p>1300 000 082</p>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Office Hours</span>
                <p>Mon – Fri / 8:30AM – 5PM</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Operating Across</span>
              <p>Australia&nbsp;/&nbsp;New Zealand&nbsp;/&nbsp;Hong Kong&nbsp;/&nbsp;China</p>
            </div>
          </div>
        </div>

        {/* Column 4 — Trusted & Secure */}
        <div className={`${styles.column} ${styles.fadeIn}`}>
          <h4>Trusted &amp; Secure</h4>
          <p className={styles.trustStatement}>
            Payments secured via PCI-DSS compliant gateway. Card details are never stored on our servers.
          </p>
          <div className={styles.paymentGrid}>
            <span className={styles.badge}>VISA</span>
            <span className={styles.badge}>
              <svg viewBox="0 0 24 24" width="20" height="14">
                <circle cx="9" cy="12" r="6" fill="#eb001b" opacity="0.85"/>
                <circle cx="15" cy="12" r="6" fill="#f79e1b" opacity="0.85"/>
              </svg>
            </span>
            <span className={styles.badge}>AMEX</span>
            <span className={styles.badge}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="18" height="14">
                <rect x="1" y="4" width="22" height="16" rx="3"/>
                <path d="M12 9v6M9 12h6"/>
              </svg>
            </span>
            <span className={styles.badge}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </span>
            <span className={styles.badge}>GPay</span>
          </div>
          <div className={styles.securityBadge}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <span>PCI-DSS Certified · 256-bit SSL</span>
          </div>
        </div>
      </div>

      {/* Thin divider */}
      <div className={styles.divider} />
    </section>
  );
}
