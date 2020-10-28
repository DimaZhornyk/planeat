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
import Head from "next/head";
import {Scrollbars} from 'react-custom-scrollbars';


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
                    products{
                        name
                        icon{
                            url
                        }
                    }
                    utensils{
                        name
                        icon{
                            url
                        }
                    }
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
    console.log(data.recipe)
    return {props: {recipe: data.recipe, categories: data.categories}}
}


function RecipePage({recipe, categories}) {

    const getDishes = recipe.utensils.map(utensil => {
        return (
            <div className={styles["utils-list-container"]}>
                <img src={BACKEND_URL + utensil.icon.url} alt={"utensil-icon"} className={styles["utils-icon"]}/>
                <p style={{margin: "0 0 0 15px"}}>{utensil.name}</p>
            </div>
        )
    })

    const getIngredients = recipe.products.map(product => {
        return (
            <div className={styles["utils-list-container"]}>
                <img src={BACKEND_URL + product.icon.url} alt={"ingredient-icon"} className={styles["utils-icon"]}/>
                <p style={{margin: "0 0 0 15px"}}>{product.name}</p>
            </div>
        )
    })

    return (
        <>
            <Head>
                <title>{recipe.recipeCaption}</title>
            </Head>
            <div style={{minHeight: "100vh", display: 'flex', flexDirection: "column"}}>
                <Header categories={categories}/>
                <div className={styles["recipe-content"]}>
                    <div className={styles["left-column-recipe"]}>
                        <img src={BACKEND_URL + recipe.recipeImage.url} alt={recipe.recipeCaption + "-image"}/>
                        <div className={styles["dishes-and-ingredients"]}>
                            <div className={styles["dishes"]}>
                                <h3 style={{fontWeight: "600"}}>Прибори:</h3>
                                {getDishes}
                            </div>
                            <div className={styles["ingredients"]}>
                                <h3 style={{fontWeight: "600"}}>Інгредієнти:</h3>
                                {getIngredients}
                            </div>
                        </div>
                    </div>
                    <div className={styles["right-column-recipe"]}>
                        <Scrollbars style={{height: "100%"}} universal={true}>
                            <div className={styles["heading-block"]}>
                                <h1 style={{fontWeight: "800"}}>{recipe.recipeCaption}</h1>
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
                                <p style={{fontSize: "15px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sit
                                    felis
                                    sed
                                    nec platea a, magna.</p>
                            </div>
                            <p style={{fontSize: "18px"}}>Покроковий рецепт:</p>
                            <p className={"recipeText"}>{recipe.recipeDescription}</p>
                        </Scrollbars>
                    </div>
                </div>
                <Share recipeId={recipe.id}/>
            </div>

        </>
    )
}

export default RecipePage