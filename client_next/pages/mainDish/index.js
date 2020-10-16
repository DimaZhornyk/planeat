import React from "react"
import Client from "../../lib/apollo"
import gql from 'graphql-tag';
import ContentPage from "../../src/components/utils/ContentPage";

const QUERY = gql`
    query {
        recipes(where:{category:"mainDish"}){
          id
          timeText
          calories
          recipeCaption
          recipeDescription
          recipeImage{
            url
          }
          category
        }
        categories{
            id
            categoryName
            categoryImage{
                url
            }
            categoryDisplayNameUA
        }
        categoriesTexts{
          CategoryNameText
          CategoryText
        }
    }`

export async function getStaticProps() {
    const { data } = await Client.query({
        query: QUERY
    })

    return { props: { data: { recipes: data.recipes, categories: data.categories, categoriesTexts: data.categoriesTexts  } } }
}

function Main({ data }) {

    return (
        <ContentPage data={data} type={"mainDish"}/>
    )
}

export default Main
