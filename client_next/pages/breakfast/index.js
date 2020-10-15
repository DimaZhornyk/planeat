import React from "react"
import styles from "../../styles/Main.module.css"
import { Col, Row } from 'antd'
import Header from "../../src/components/views/Header/Header";
import Client from "../../lib/apollo"
import gql from 'graphql-tag';
import RecipeCard from "../../src/components/utils/card/RecipeCard";

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

    const displayRecipe = data.recipes.map(recipe => (
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
            <RecipeCard id={recipe.id} image={recipe.recipeImage.url} caption={recipe.recipeCaption} time ={recipe.timeText} calories = {recipe.calories}/>
        </Col>
    ));

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header categories={data.categories} />
            <div className={styles["main-page-wrapper"]}>
                <Row gutter={[16, 16]}>
                    {displayRecipe}
                </Row>
            </div>
        </div>
    )
}

export default Main
