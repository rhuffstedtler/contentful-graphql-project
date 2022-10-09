import styles from "@styles/Card.module.css"
import Image from "next/image"
import Link from "next/link"

//TODO: Properly structure the props and render the right stuff
export default function Card(props) {
  const { post } = props
  //const { title, featuredImage, excerpt} = post

  return (
    <div className={styles.card} key={post.sys.id}>
      <div className={styles.details}>
      <div className={styles.imageHolder}>
          <Image src={post.featuredImage.url}
            height={post.featuredImage.height}
            width={post.featuredImage.width}
          />
        </div>
        <div className="cardTitle">
          <Link href={`recipes/${post.sys.id}`}>
            <a>{post.title}</a>
          </Link>
        </div> 
        <div>{post.excerpt}</div>
      </div>
    </div>
  )
}


