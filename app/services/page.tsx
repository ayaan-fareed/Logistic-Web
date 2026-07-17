import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './services.module.scss';

const services = [
  { title: 'Air Freight', desc: 'Express, priority, and deferred options across global trade lanes.', icon: '✈️' },
  { title: 'Ocean Freight', desc: 'FCL, LCL, and specialised cargo movements with structured routing.', icon: '🚢' },
  { title: 'Customs Brokerage', desc: 'In-house licensed brokerage covering classification and compliance.', icon: '📋' },
  { title: 'Warehousing & 3PL', desc: 'Scalable storage, pick and pack, and distribution solutions.', icon: '🏭' },
  { title: 'Project Cargo', desc: 'Specialist handling for oversized and complex shipments.', icon: '📦' },
  { title: 'Domestic & Linehaul Transport', desc: 'Local, metro, and interstate transport with full visibility.', icon: '🚛' },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <section className={styles.hero}>
        <h1>Our Services</h1>
        <p>End-to-end logistics solutions built around your cargo.</p>
      </section>

      <section className={styles.grid}>
        {services.map((s) => (
          <div key={s.title} className={styles.card}>
            <div className={styles.icon}>{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}