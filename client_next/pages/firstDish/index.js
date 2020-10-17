import React from "react"
import Client from "../../lib/apollo"
import gql from 'graphql-tag';
import ContentPage from "../../src/components/utils/ContentPage";

const QUERY = gql`
    query {
        recipes(where:{category:"firstDish"}){
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

    return { props: { data: { recipes: data.recipes, categories: data.categories, categoriesTexts: data.categoriesTexts } } }
}

function Main({ data }) {

    return (
        <>
            <title>Перші страви на кожен день</title>
            <meta
                name="description"
                content="На нашому сайті ви можете знайти прості рецепти перших страв, 
                якими зможете потішити своїх рідних. Перші страви на кожен день дозволять вам смачно харчуватися без проблем."
            />
        <ContentPage data={data} type={"firstDish"}/>
        </>
    )
}

export default Main
