import Head from "next/head";
import Link from "next/link";
import MainLayout from "@layouts/main";
import {useRouter} from "next/router";
import styles from "@styles/Recipe.module.css";
import {getRecipeAndMoreRecipes, getAllRecipesForHome} from "../../lib/api";
import AuthorCard from "@components/author/AuthorCard";
import RelatedRecipes from "@components/RelatedRecipes";

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
    <MainLayout>
      <div className={styles.container}>
          <Head>
          <title>Recipe app</title>
          <meta name="description" content="Simple recipe app with Contentful CMS" />
          <link rel="icon" href="/favicon.ico" />
          </Head>

        {
          router.isFallBack ? (
              <div styles={styles.title}>
                  Loading
              </div>
          ): (
          <>
          
            <div className={styles.content}>

            <div styles="title">
                {recipe.title}
            </div>


            <p className={styles.meta}>
                {new Date(recipe.date).toDateString()}
            </p>

            <AuthorCard author={recipe.author} />
          


            <div className={styles.featuredImage}>
                <img src={recipe.featuredImage.url} alt={recipe.title} />
            </div>

            </div>
            
            <RelatedRecipes relatedRecipes={relatedRecipes} />
          </>
          )
      }
      </div>
    </MainLayout>
  )
}
