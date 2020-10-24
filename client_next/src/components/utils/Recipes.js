import React from 'react'
import {Col, Empty, Row} from "antd";
import RecipeCard from "./card/RecipeCard";
import {connect} from "react-redux";

function Recipes({recipes}) {

    const displayRecipe = recipes.map((recipe, index) => (
        <Col xl={8} lg={8} md={12} sm={12} xs={24} key={index}>
            <RecipeCard id={recipe.id} image={recipe.recipeImage.url} caption={recipe.recipeCaption}
                        time={recipe.time} calories={recipe.calories}/>
        </Col>
    ));

    return (
        <>
            <Row gutter={[16, 16]}>
                {recipes.length !== 0 ? displayRecipe : <Empty description={"Немає обраних рецептів..."} style={{margin: "0 auto"}}/>}
            </Row>
        </>
    )
}

const mapStateToProps = state => {
    console.log(state);
    return {
        recipes: state.recipesReducer.filteredRecipes
    };
};

export default connect(mapStateToProps, null)(Recipes);