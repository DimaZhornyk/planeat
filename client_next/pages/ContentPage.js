import React from "react"
import styles from "../styles/Main.module.css"
import { Col, Row } from 'antd'
import Header from "../src/components/views/Header/Header";
import Client from "../lib/apollo"
import gql from 'graphql-tag';
import RecipeCard from "../src/components/utils/card/RecipeCard";

function GetContentPage({data}){
    const displayRecipe = data.recipes.map(recipe => (
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
            <RecipeCard id={recipe.id} image={recipe.recipeImage.url} caption={recipe.recipeCaption} time={recipe.timeText} calories={recipe.calories}/>
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
export default GetContentPage