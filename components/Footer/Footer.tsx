'use client';

import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link href="/" className={styles.footerBrand} aria-label="United Carriers home">
          <span>UNITED</span>
          <span>CARRIERS</span>
        </Link>

        <div>
          <p>Services</p>
          <Link href="/services">Air freight</Link>
          <Link href="/services">Ocean freight</Link>
          <Link href="/services">Road freight</Link>
        </div>

        <div>
          <p>Company</p>
          <Link href="/about">Our approach</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div>
          <p>Connect</p>
          <a href="mailto:hello@unitedcarriers.com">hello@unitedcarriers.com</a>
          <a href="tel:+61290000000">+61 2 9000 0000</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} United Carriers</span>
        <span>Privacy &nbsp; Terms</span>
        <span>Made for movement</span>
      </div>
    </footer>
  );
}