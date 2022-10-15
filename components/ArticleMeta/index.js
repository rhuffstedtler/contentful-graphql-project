import styles from "@styles/ArticleMeta.module.css";
import Image from "next/image";
import Link from "next/link";


export default function ArticleMeta(props) {
  const { author, date } = props

  return (
    <div className={styles.meta}>
      <div className={styles.authorImage}>
        <Image src={author.image.url + `?fm=webp&fit=fill&w=200&h=200`}
        layout='fill'
        objectFit="cover"
        />
      </div>
      <div className={styles.byline}>
        <div>{author.name}</div>
        <div className={styles.date}>
        Last Updated {new Date(date).toDateString()}
        </div>
      </div>
      
    </div>
  )
}