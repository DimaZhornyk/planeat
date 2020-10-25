import React, {ReactElement} from "react";
import gql from "graphql-tag";
import Client from "../../../lib/apollo";
import Header from "../../../src/components/views/Header/Header";
import Share from "../../../src/components/views/Share/Share";
import styles from "../../../styles/Recipe.module.css";
import {BACKEND_URL} from "../../../config";
import ClockImageSvg from "../../../src/static/icons/clock.svg"


export async function getStaticPaths() {
    const {data} = await Client.query({
        query: gql`
            query { recipes{
                id
            }}`
    });

    const ids = data.recipes.map((recipe) => ({
        params: {id: recipe.id}
    }));

    return {paths: ids, fallback: false}
}

export async function getStaticProps({params}) {
    const {data} = await Client.query({
        query: gql`
            query {
                recipe(id: ${params.id}){
                    id
                    time
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
    });
    return {props: {recipe: data.recipe, categories: data.categories}}
}


function RecipePage({recipe, categories}) {

    return (
        <div style={{minHeight: "100vh", display: 'flex', flexDirection: "column"}}>
            <Header categories={categories}/>
            {console.log(recipe)}
            <div className={styles["recipe-content"]}>
                <div className={styles["left-column-recipe"]}>
                    <img src={BACKEND_URL + recipe.recipeImage.url} alt={recipe.recipeCaption + "-image"}/>
                    <div className={styles["dishes-and-ingredients"]}>
                        <div className={styles["dishes"]}>
                            <h3>Прибори:</h3>

                        </div>
                        <div className={styles["ingredients"]}>
                            <h3>Інгредієнти:</h3>
                        </div>
                    </div>
                </div>
                <div className={styles["right-column-recipe"]}>
                    <h1>{recipe.recipeCaption}</h1>
                    <div className={"metrics"}>
                        <div>
                            <div
                                style={{border: "1px solid rgba(0, 0, 0, 0.15)", borderRadius: "8px", display: "flex"}}>
                                {/*<img src={ClockImageSvg} alt={"clock"} style={{width: "21px", height: "21px"}}/>*/}
                                <ClockImageSvg/>
                                <span>{recipe.timeText}</span>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
            <Share recipeId={recipe.id}/>
        </div>
    )
}

export default RecipePage