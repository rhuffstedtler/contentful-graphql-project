import styles from "@styles/AuthorCard.module.css";
import Link from "next/link";


export default function AuthorCard(props) {
  const { author } = props

  return (
    <div className={styles.authorCard}>
      <img src={author.image?.url} alt={author.name} />
      <div className={styles.authorDetails}>
        <div className="cardTitle">
          {author.name}
        </div>
        <div>
          {author.description}
        </div>
      </div>
    </div>
  )
}