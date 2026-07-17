import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './industries.module.scss';

const industries = [
  { title: 'Retail & E-commerce', icon: '🛍️' },
  { title: 'Manufacturing', icon: '⚙️' },
  { title: 'Automotive', icon: '🚗' },
  { title: 'Healthcare & Pharma', icon: '💊' },
  { title: 'Food & Beverage', icon: '🍽️' },
  { title: 'Construction & Industrial', icon: '🏗️' },
];

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <section className={styles.hero}>
        <h1>Industries We Serve</h1>
        <p>Tailored logistics solutions across every sector.</p>
      </section>

      <section className={styles.grid}>
        {industries.map((ind) => (
          <div key={ind.title} className={styles.card}>
            <div className={styles.icon}>{ind.icon}</div>
            <h3>{ind.title}</h3>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}