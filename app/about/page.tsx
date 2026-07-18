import Navbar from '@/components/Navbar/Navbar';
import PreFooter from '@/components/PreFooter/PreFooter';
import Footer from '@/components/Footer/Footer';
import styles from './about.module.scss';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className={styles.hero}>
        <h1>About Us</h1>
        <p>Built on reliability, driven by results.</p>
      </section>

      <section className={styles.story}>
        <h2>Our Story</h2>
        <p>
          Founded to solve the everyday frustrations of freight movement, our team has grown
          into a full-service logistics partner trusted across multiple industries. We combine
          hands-on operational experience with modern technology to move cargo efficiently,
          transparently, and on time.
        </p>
      </section>

      <section className={styles.values}>
        <h2>What We Stand For</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Reliability</h3>
            <p>We do what we say we'll do, every time.</p>
          </div>
          <div className={styles.card}>
            <h3>Transparency</h3>
            <p>Clear pricing, clear communication, no surprises.</p>
          </div>
          <div className={styles.card}>
            <h3>Partnership</h3>
            <p>We grow when our clients grow.</p>
          </div>
        </div>
      </section>
      <PreFooter />
      <Footer />
    </>
  );
}