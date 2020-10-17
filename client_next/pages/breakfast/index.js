import React from "react"
import Client from "../../lib/apollo"
import gql from 'graphql-tag';
import ContentPage from "../../src/components/utils/ContentPage";

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
        categoriesTexts{
          CategoryNameText
          CategoryText
        }
        products{
          productCaption
          productCalories
          productProteins
          productFats
          productCarbohydrates
          icon{
            url
          }
          category
        }
        categoriesProducts{
          categoryProductName
          categoryProductDisplayNameUA
        }   
    }`

export async function getStaticProps() {
    const {data} = await Client.query({
        query: QUERY
    });

    console.log(data);

    return {
        props: {
            data: {
                recipes: data.recipes,
                categories: data.categories,
                categoriesTexts: data.categoriesTexts,
                products: data.products,
                categoriesProducts: data.categoriesProducts
            }
        }
    }
}

function Main({data}) {

    return (
        <ContentPage data={data} type={"breakfast"}/>
    )
}

export default Main
