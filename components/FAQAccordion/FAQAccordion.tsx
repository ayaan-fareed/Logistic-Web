import styles from "./FAQAccordion.module.scss";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion = ({ items }: FAQAccordionProps) => {
  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <details key={index} className={styles.item}>
          <summary className={styles.question}>{item.question}</summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export default FAQAccordion
