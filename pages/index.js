import Head from 'next/head'
import MainLayout from "@layouts/main";
import styles from '@styles/Home.module.css'
import {getRecipesForHome} from "../lib/api"
import Card from "@components/Card"



export default function Home({allPosts}) {
  return (
    <MainLayout>
      <Head>
        <title>Scrumptious Recipes</title>
        <meta name="description" content="This is a recipe site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.grid}>
        {
          allPosts.length > 0 ? (
            allPosts.map((post) => (
              <Card key={post.sys.id} post={post}/>
            ))
          ) : (
            <div className={styles.card}>
              <p>No posts added!</p>
            </div>
          )
        }
      </div>
    </MainLayout>
  )
}

export async function getStaticProps({preview = false}){
  let allPosts = (await getRecipesForHome(preview))  ?? [];

  return {
      props: { preview, allPosts }
      
  }
  
}