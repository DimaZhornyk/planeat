import React from "react"
import styles from "../../styles/Main.module.css"
import { Col, Row } from 'antd'
import Header from "../../src/components/views/Header/Header";
import Client from "../../lib/apollo"
import gql from 'graphql-tag';
import RecipeCard from "../../src/components/utils/card/RecipeCard";
import ContentPage from "../ContentPage";
const QUERY = gql`
    query {
        recipes(where:{category:"dessert"}){
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

    return { props: { data: { recipes: data.recipes, categories: data.categories } } }
}

function Main({ data }) {

    return (
        <ContentPage data = {data}/>
    )
}

export default Main
