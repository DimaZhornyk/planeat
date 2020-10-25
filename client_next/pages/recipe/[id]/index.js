import React, {ReactElement} from "react";
import gql from "graphql-tag";
import Client from "../../../lib/apollo";
import Header from "../../../src/components/views/Header/Header";
import Share from "../../../src/components/views/Share/Share";
import styles from "../../../styles/Recipe.module.css";
import {BACKEND_URL} from "../../../config";
import ClockImageSvg from "../../../src/static/icons/clockIcon.svg";
import FireImageSvg from "../../../src/static/icons/fireIcon.svg";
import DishImageSvg from "../../../src/static/icons/dishIconOrange.svg";
import Icon from "@ant-design/icons";


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
                    <div className={styles["heading-block"]}>
                        <h1>{recipe.recipeCaption}</h1>
                        <div className={styles["metrics"]}>
                            <div style={{display: "flex"}}>
                                <div className={styles["metric"]} style={{width: "200px"}}>
                                    <Icon component={ClockImageSvg} className={styles["metric-icon"]}/>
                                    <p>{`Підготовка:   5хв. `}</p>
                                </div>
                                <div className={styles["metric"]} style={{width: "100px"}}>
                                    <Icon component={FireImageSvg} className={styles["metric-icon"]}/>
                                    <p>{recipe.calories} кКал</p>
                                </div>
                            </div>
                            <div style={{display: "flex"}}>
                                <div className={styles["metric"]} style={{width: "200px"}}>
                                    <Icon component={ClockImageSvg} className={styles["metric-icon"]}/>
                                    <p>{`Приготування:   ${recipe.time}хв.`}</p>
                                </div>
                                <div className={styles["metric"]} style={{width: "100px"}}>
                                    <Icon component={DishImageSvg} className={styles["metric-icon"]}/>
                                    <p>1 порція</p>
                                </div>
                            </div>
                        </div>
                        <p style={{fontSize: "15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit felis
                            sed
                            nec platea a, magna.</p>
                    </div>
                    <p style={{fontSize: "18px"}}>Покроковий рецепт:</p>
                    <p style={{color: "rgba(0, 0, 0, 0.65)"}}>{recipe.recipeDescription}</p>
                </div>
            </div>
            <Share recipeId={recipe.id}/>
        </div>
    )
}

export default RecipePage