import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h3>YourLogistics</h3>
          <p>One operator. Every leg of the journey.</p>
        </div>

        <div className={styles.column}>
          <h4>Company</h4>
          <Link href="/">Home</Link>
          <Link href="/about">About us</Link>
          <Link href="/services">Services</Link>
          <Link href="/insights">Insights</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact us</Link>
        </div>

        <div className={styles.column}>
          <h4>Services</h4>
          <Link href="/services">Air Freight</Link>
          <Link href="/services">Ocean Freight</Link>
          <Link href="/services">Customs Brokerage</Link>
          <Link href="/services">Warehousing & 3PL</Link>
          <Link href="/services">Project Cargo</Link>
        </div>

        <div className={styles.column}>
          <h4>Head Office</h4>
          <p>Your Address Here</p>
          <p>fareedayaan234@gmail.com</p>
          <p>Office Hours: Mon–Fri / 8:30AM – 5PM</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} YourLogistics. All rights reserved.</p>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-conditions">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}