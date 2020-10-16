import React from "react"
import styles from "../styles/Main.module.css"
import { Col, Row, Collapse } from 'antd'
import Header from "../src/components/views/Header/Header";
import RecipeCard from "../src/components/utils/card/RecipeCard";
import Markdown from 'markdown-to-jsx';

function GetContentPage({ data, type }) {
    const displayRecipe = data.recipes.map(recipe => (
        <Col xl={8} lg={8} md={12} sm={12} xs={24}>
            <RecipeCard id={recipe.id} image={recipe.recipeImage.url} caption={recipe.recipeCaption} time={recipe.timeText} calories={recipe.calories} />
        </Col>
    ));

    const category = data.categoriesTexts.find((category) => {
        return category.CategoryNameText === type
    })

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header categories={data.categories} />
            <div className={styles["main-page-wrapper"]}>
                <Row gutter={[16, 16]}>
                    {displayRecipe}
                </Row>
                <Markdown>{category.CategoryText}</Markdown>
            </div>
        </div>
    )
}
export default GetContentPage