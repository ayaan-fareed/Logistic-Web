import styles from "./Testimonial.module.scss";

interface TestimonialProps {
  quote: string;
  author: string;
}

const Testimonial = ({ quote, author }: TestimonialProps) => {
  return (
    <blockquote className={styles.testimonial}>
      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
      <cite className={styles.author}>— {author}</cite>
    </blockquote>
  )
}

export default Testimonial
