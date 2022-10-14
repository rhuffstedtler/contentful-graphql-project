import styles from "@styles/Card.module.css"
import Image from "next/image"
import Link from "next/link"

//TODO: Properly structure the props and render the right stuff
export default function Card(props) {
  const { post } = props
  //const { title, featuredImage, excerpt} = post

  return (
    <div className={styles.card} key={post.sys.id}>
      <div className={styles.imageHolder}>
        <Image src={post.featuredImage.url + `?fm=webp&fit=fill&w=600&h=600`}
          layout='fill'
          objectFit="cover"
        />
      </div>
      <div className="cardTitle">
        <Link href={`recipes/${post.sys.id}`}>
          <a>{post.title}</a>
        </Link>
      </div> 
      <div>{post.excerpt}</div>
    </div>
  )
}


