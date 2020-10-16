import React from "react"
import Client from "../../lib/apollo"
import gql from 'graphql-tag';
import ContentPage from "../ContentPage";

const QUERY = gql`
    query {
        recipes(where:{category:"breakfast"}){
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
    }`

export async function getStaticProps() {
    const { data } = await Client.query({
        query: QUERY
    })

    return { props: { data:{recipes: data.recipes, categories: data.categories} } }
}

function Main({ data }) {

    return (
        <ContentPage data={data} />
    )
}

export default Main
