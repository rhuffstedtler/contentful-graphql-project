import styles from "@styles/RecipeStep.module.css";
import Image from "next/image";


export default function RecipeStep(props) {
  const { author, date } = props

  return (
    <div className={styles.step}>
      {/* <div className={styles.authorImage}>
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
      */}
      STEP!!!
    </div>
  )
}