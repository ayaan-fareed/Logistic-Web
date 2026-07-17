import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './careers.module.scss';

const openings = [
  { title: 'Logistics Coordinator', location: 'Karachi, PK', type: 'Full-time' },
  { title: 'Customs Documentation Officer', location: 'Karachi, PK', type: 'Full-time' },
  { title: 'Sales Executive — Freight Forwarding', location: 'Karachi, PK', type: 'Full-time' },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <section className={styles.hero}>
        <h1>Careers</h1>
        <p>Join a team that keeps global trade moving.</p>
      </section>

      <section className={styles.openings}>
        <h2>Current Openings</h2>
        <div className={styles.list}>
          {openings.map((job) => (
            <div key={job.title} className={styles.jobCard}>
              <div>
                <h3>{job.title}</h3>
                <span>{job.location} · {job.type}</span>
              </div>
              <a href="/contact" className={styles.applyBtn}>Apply</a>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}