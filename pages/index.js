import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import MainLayout from "@layouts/main";
import styles from '@styles/Home.module.css'
import {getAllRecipesForHome} from "../lib/api"
import Card from "@components/Card"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


export default function Home({allPosts}) {
  return (
    <MainLayout>
      <div className={styles.container}>
        <Head>
          <title>Scrumptious Receipes</title>
          <meta name="description" content="This is a recipe site" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className={styles.grid}>
          {
            allPosts.length > 0 ? (
              allPosts.map((post) => (
                <Card post={post}/>
              ))
            ) : (
              <div className={styles.card}>
                <p>No posts added!</p>
              </div>
            )
          }
        </div>  
      </div>
    </MainLayout>
  )
}

export async function getStaticProps({preview = false}){
  let allPosts = (await getAllRecipesForHome(preview))  ?? [];

  return {
      props: { preview, allPosts }
      
  }
  
}