import React from "react"
import Client from "../../lib/apollo"
import gql from 'graphql-tag';
import ContentPage from "../../src/components/utils/ContentPage";
const QUERY = gql`
    query {
        recipes(where:{category:"dessert"}){
          id
          timeText
          calories
          recipeCaption
          recipeSlug
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

    return { props: { data: { recipes: data.recipes, categories: data.categories, categoriesTexts: data.categoriesTexts} } }
}

function Main({ data }) {

    return (
        <>
            <title>Прості десерти на кожен день</title>
            <meta
                name="description"
                content="У нас ви знайдете швидкі рецепти десертів, які зможете готувати кожен день. 
                Швидкі десерти не тільки зекономлять ваш час, а ще подарують гарний настрій на весь день."
            />
        <ContentPage data={data} type={"dessert"} />
        </>
    )
}

export default Main
