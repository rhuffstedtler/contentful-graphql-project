const POST_GRAPHQL_FIELDS = `
sys {
  id
}
title
excerpt
author {
  name
  image {
    url
  }
  description
}
date
featuredImage {
  url
  width
  height
}
introduction {
  json
}
stepsCollection {
  items {
    shortDescription
    image {
      url
    }
    stepInstructions {
      json
    }

  }
}
`

async function fetchGraphQL(query, preview = false) {
    return fetch(
        `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
        {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
            preview
                ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                : process.env.CONTENTFUL_ACCESS_TOKEN
            }`,
        },
        body: JSON.stringify({ query }),
        }
    ).then((response) => response.json())
}

function extractRecipeEntries(fetchResponse) {
  return fetchResponse?.data?.recipeCollection?.items
}

export async function getRecipesForHome(preview) {
    const entries = await fetchGraphQL(
        `query {
            recipeCollection(limit:6) {
              items {
                ${POST_GRAPHQL_FIELDS}
              }
            }
          }`,
        preview
    )
    return extractRecipeEntries(entries)
}

function extractRecipe(fetchResponse){
  console.log(`FR: ${JSON.stringify(fetchResponse)}`)
  return fetchResponse?.data?.recipe;
}

export async function getRecipeAndMoreRecipes(preview,recipeId){
        
  // Get a singlepost/entry
  
  const entry = await fetchGraphQL(
      `query{
          recipe(id:"${recipeId}",preview:${preview ? true : false}){                
              ${POST_GRAPHQL_FIELDS}                
          }
      }`
  );


  // Get entries

  const entries = await fetchGraphQL(
      `query{
          recipeCollection(preview:${preview ? true : false}, limit:2){
              items{
                  ${POST_GRAPHQL_FIELDS}
              }
          }
      }`
  );



  // Extract a post
  const recipe = extractRecipe(entry);
  console.log(`Recipe: ${JSON.stringify(recipe)}`)

  // Get the related posts
  const relatedRecipes = extractRecipeEntries(entries).filter((_recipe) => _recipe.sys.id !== recipe.sys.id);

  return {
      recipe,
      relatedRecipes
  };
}