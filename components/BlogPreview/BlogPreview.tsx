import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import styles from './BlogPreview.module.scss';

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className={styles.blogPreview}>
      <div className={styles.header}>
        <h2>What&apos;s moving in your industry</h2>
        <Link href="/insights" className={styles.viewAll}>View all</Link>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => (
          <Link href={`/insights/${post.slug}`} key={post.slug} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image src={post.thumbnail} alt={post.title} fill className={styles.image} />
            </div>
            <span className={styles.category}>{post.category} | {post.date}</span>
            <h3 className={styles.title}>{post.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
