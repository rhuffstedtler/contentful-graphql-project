import Head from "next/head";
import Image from "next/image"
import Link from "next/link";
import MainLayout from "@layouts/main";
import {useRouter} from "next/router";
import styles from "@styles/Recipe.module.css";
import {getRecipeAndMoreRecipes, getAllRecipesForHome} from "../../lib/api";
import ArticleMeta from "@components/ArticleMeta";
import AuthorCard from "@components/author/AuthorCard";
import RelatedRecipes from "@components/RelatedRecipes";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// Fetch for a single post

export async function getStaticProps({ params: { recipeId } }) {
  let { recipe, relatedRecipes } = await getRecipeAndMoreRecipes(false, recipeId);
  console.log(`\n\nin page recipe intro: ${JSON.stringify(recipe.introduction.json)}`)
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
            <h1>{recipe.title}</h1>

            <ArticleMeta author={recipe.author} date={recipe.date} />
        
            <div className={styles.featuredImage}>
              <Image src={recipe.featuredImage.url + '?fm=webp&fit=fill&w=1080&h=1080'}
                layout='fill'
                objectFit="cover"
              />
            </div>

            <div className={styles.introduction}>{documentToReactComponents(recipe.introduction.json)}</div>

            
            <RelatedRecipes relatedRecipes={relatedRecipes} />
          </>
          )
      }
      </div>
    </MainLayout>
  )
}
