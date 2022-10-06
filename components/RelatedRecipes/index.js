import styles from "@styles/RelatedRecipes.module.css";
import Link from "next/link";


export default function RelatedRecipes(props) {
  const { relatedRecipes } = props

  return (
    <div className={styles.grid}>
            {
                relatedRecipes.length > 0 ? (
                    <>
                        <div className={styles.title}>
                            Related Recipes
                        </div>
                        {
                        relatedRecipes.map((recipe) => (
                            
                            <div className={styles.card} key={recipe.sys.id}>
                            <div className={styles.imageHolder}>
                                <img src={recipe.featuredImage.url} alt={recipe.title} />
                            </div>
                            <div className={styles.details}>
                                <Link href={`recipes/${recipe.sys.id}`}>
                                <a>
                                {recipe.title} &rarr;
                                </a>
                                </Link>
                                <p>{recipe.excerpt}</p>
                            </div>
                            </div>
                        
                        ))
                        }
                    </>
                ) : null
            }
            </div>
  )
}