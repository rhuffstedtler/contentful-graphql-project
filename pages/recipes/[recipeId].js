import Head from "next/head";
import Link from "next/link";
import {useRouter} from "next/router";
import styles from "../../styles/Home.module.css";
import {getRecipeAndMoreRecipes, getAllRecipesForHome} from "../../lib/api";

// Fetch for a single post

export async function getStaticProps({ params: { recipeId } }) {
  let { recipe, relatedRecipes } = await getRecipeAndMoreRecipes(false, recipeId);
  console.log(`in page recipe: ${JSON.stringify(recipe)}`)
  return {
      props: {
          recipe,
          relatedRecipes
      }
  }
}

// Fetch the other posts done at build time

export async function getStaticPaths() {

  const recipes = await getAllRecipesForHome(false);

  let paths = recipes.map((recipe) => ({
      params: {
          recipeId: recipe.sys.id
      }
  })
  );

  return {
      paths,
      fallback: true
  }
}

export default function Recipe({recipe, relatedRecipes}){

  const router = useRouter();

  return (
      <div className={styles.container}>
          <Head>
          <title>Recipe app</title>
          <meta name="description" content="Simple recipe app with Contentful CMS" />
          <link rel="icon" href="/favicon.ico" />
          </Head>

      <main className={styles.main}>

      {
          router.isFallBack ? (
              <div styles={styles.title}>
                  Loading
              </div>
          ): (
          <>
          
          <div className={styles.content}>

          <div styles={styles.title}>
              {recipe.title}
          </div>


          <p className={styles.meta}>
              {new Date(recipe.date).toDateString()}
          </p>


          <div className={styles.coverImage}>
              <img src={recipe.featuredImage.url} alt={recipe.title} />
          </div>

          </div>
          
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
              </>
          )
      }

          
      </main>

      <footer className={styles.footer}>
          <p>Simple recipe app</p>
      </footer>
      </div>
  )
}
