import React from "react"
import styles from "../../../styles/Main.module.css"
import { Col, Row, Collapse } from 'antd'
import Header from "../views/Header/Header";
import RecipeCard from "./card/RecipeCard";
import SearchFilter from "./filter/SearchFilter";
import Markdown from 'markdown-to-jsx';

function GetContentPage({ data, type }) {
    const displayRecipe = data.recipes.map((recipe, index) => (
        <Col xl={8} lg={8} md={12} sm={12} xs={24} key={index}>
            <RecipeCard id={recipe.id} image={recipe.recipeImage.url} caption={recipe.recipeCaption} time={recipe.timeText} calories={recipe.calories} />
        </Col>
    ));

    const category = data.categoriesTexts.find((category) => {
        return category.CategoryNameText === type
    });

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Header categories={data.categories} />
            <div className={styles["main-page-wrapper"]}>
                <Collapse defaultActiveKey={['1']} onChange={() => console.log("smth")} style={{width: "100%", margin: "20px", borderRadius: "7px"}}>
                    <Collapse.Panel header="Фільтри" key="1">
                        <SearchFilter/>
                    </Collapse.Panel>
                </Collapse>
                <Row gutter={[16, 16]}>
                    {data !== undefined && displayRecipe}
                </Row>
                <Markdown>{category.CategoryText}</Markdown>
            </div>
        </div>
    )
}
export default GetContentPage