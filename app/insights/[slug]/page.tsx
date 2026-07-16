import Image from 'next/image';
import { getPostBySlug } from '@/lib/posts';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import styles from './post.module.scss';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <>
      <Navbar />
      <article className={styles.post}>
        <span className={styles.category}>{post.category} | {post.date}</span>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.imageWrapper}>
          <Image src={post.thumbnail} alt={post.title} fill className={styles.image} />
        </div>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
      <Footer />
    </>
  );
}
