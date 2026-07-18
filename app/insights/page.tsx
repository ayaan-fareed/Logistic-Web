import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import Navbar from '@/components/Navbar/Navbar';
import PreFooter from '@/components/PreFooter/PreFooter';
import Footer from '@/components/Footer/Footer';
import styles from './insights.module.scss';

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <section className={styles.insights}>
        <div className={styles.header}>
          <h1>Insights</h1>
          <p>Stay ahead of the shifts shaping trade across APAC.</p>
        </div>

        <div className={styles.grid}>
          {posts.map((post) => (
            <Link href={`/insights/${post.slug}`} key={post.slug} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image src={post.thumbnail} alt={post.title} fill className={styles.image} />
              </div>
              <span className={styles.category}>{post.category} | {post.date}</span>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.excerpt}>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <PreFooter />
      <Footer />
    </>
  );
}