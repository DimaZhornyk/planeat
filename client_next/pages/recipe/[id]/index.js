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
import Markdown from "markdown-to-jsx";
import MediaQuery from "react-responsive";
import {Col, Row} from "antd";


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
                    recipePreparationTime
                    recipePortions
                    recipeText
                    products{
                        name
                        caption
                        icon{
                            url
                        }
                    }
                    utensils{
                        name
                        caption
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
    console.log(data.recipe);
    return {props: {recipe: data.recipe, categories: data.categories}}
}


function RecipePage({recipe, categories}) {

    const getDishes = recipe.utensils.map(utensil => {
        return (
            <div className={styles["utils-list-container"]}>
                <img src={BACKEND_URL + utensil.icon.url} alt={"utensil-icon"} className={styles["utils-icon"]}/>
                <p style={{margin: "0 0 0 15px"}}>{utensil.caption}</p>
            </div>
        )
    });

    const getMobileDishes = recipe.utensils.map(utensil => {
        return (
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={styles["utils-list-container"]}>
                    <img src={BACKEND_URL + utensil.icon.url} alt={"utensil-icon"} className={styles["utils-icon"]}/>
                    <p style={{margin: "0 0 0 15px"}}>{utensil.caption}</p>
                </div>
            </Col>
        )
    })

    const getIngredients = recipe.products.map(product => {
        return (
            <div className={styles["utils-list-container"]}>
                <img src={BACKEND_URL + product.icon.url} alt={"ingredient-icon"} className={styles["utils-icon"]}/>
                <p style={{margin: "0 0 0 15px"}}>{product.caption}</p>
            </div>
        )
    });

    const getMobileIngredients = recipe.products.map(product => {
        return (
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={styles["utils-list-container"]}>
                    <img src={BACKEND_URL + product.icon.url} alt={"ingredient-icon"} className={styles["utils-icon"]}/>
                    <p style={{margin: "0 0 0 15px"}}>{product.caption}</p>
                </div>
            </Col>
        )
    })

    return (
        <>
            <Head>
                <title>{recipe.recipeCaption}</title>
            </Head>
            <MediaQuery minDeviceWidth={1027}>
                <div className={styles["recipe-container"]}>
                    <Header categories={categories}/>
                    <div className={styles["recipe-content"]}>
                        <div className={styles["left-column-recipe"]}>
                            <img src={BACKEND_URL + recipe.recipeImage.url} alt={recipe.recipeCaption + "-image"}
                                 className={styles["recipe-image"]}/>
                            <div className={styles["dishes-and-ingredients"]}>
                                {recipe.utensils.length !== 0 &&
                                <>
                                    <div className={styles["dishes"]}>
                                        <h3 style={{fontWeight: "600"}}>Прибори:</h3>
                                        <Scrollbars universal={true}>
                                            {getDishes}
                                        </Scrollbars>
                                    </div>
                                </>
                                }
                                {recipe.products.length !== 0 &&
                                <>
                                    <div className={styles["ingredients"]}>
                                        <h3 style={{fontWeight: "600"}}>Інгредієнти:</h3>
                                        <Scrollbars universal={true}>
                                            {getIngredients}
                                        </Scrollbars>
                                    </div>
                                </>
                                }
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
                                                <p>{`Підготовка:    ${recipe.recipePreparationTime}хв.`}</p>
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
                                                <p>{recipe.recipePortions + " порції(й)"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{fontSize: "15px"}}>{recipe.recipeDescription}</p>
                                </div>
                                <p style={{fontSize: "18px"}}>Покроковий рецепт:</p>
                                <p className={"recipeText"}>
                                    <Markdown>
                                        {recipe.recipeText}
                                    </Markdown>
                                </p>
                            </Scrollbars>
                        </div>
                    </div>
                    <Share recipeId={recipe.id}/>
                </div>
            </MediaQuery>

            <MediaQuery maxDeviceWidth={1026}>
                <div className={styles["recipe-container"]}>
                    <Header categories={categories}/>
                    <h1 style={{fontWeight: "800"}}>{recipe.recipeCaption}</h1>
                    <img src={BACKEND_URL + recipe.recipeImage.url} alt={recipe.recipeCaption + "-image"}
                         className={styles["recipe-image"]}/>
                    <div className={styles["metrics"]}>
                        <div style={{display: "flex"}}>
                            <div className={styles["metric"]} style={{width: "200px"}}>
                                <Icon component={ClockImageSvg} className={styles["metric-icon"]}/>
                                <p>{`Підготовка:    ${recipe.recipePreparationTime}хв.`}</p>
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
                                <p>{recipe.recipePortions + " порції(й)"}</p>
                            </div>
                        </div>
                    </div>
                    {recipe.utensils.length !== 0 &&
                    <>
                        <h3 style={{fontWeight: "600"}}>Прибори:</h3>
                        <Row>
                            {getMobileDishes}
                        </Row>
                    </>
                    }
                    {recipe.products.length !== 0 &&
                    <>
                        <h3 style={{fontWeight: "600"}}>Інгредієнти:</h3>
                        <Row>
                            {getMobileIngredients}
                        </Row>
                    </>
                    }
                    <p style={{fontSize: "18px"}}>Покроковий рецепт:</p>
                    <p className={"recipeText"}>
                        <Markdown>
                            {recipe.recipeText}
                        </Markdown>
                    </p>
                    <Share recipeId={recipe.id}/>
                </div>
            </MediaQuery>
        </>
    )
}

export default RecipePage