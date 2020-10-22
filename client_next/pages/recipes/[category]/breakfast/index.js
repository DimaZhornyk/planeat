import React from "react"
import Client from "../../lib/apollo"
import ContentPage from "../../src/components/utils/ContentPage";
import QUERY from "../../src/components/utils/query"

export async function getStaticPath(context) {
    console.log(context);
    return {
        paths: [
            {params: {product: "potato"}},
            {params: {product: "tomato"}},
            {params: {product: "cucumber"}}
        ],
        fallback: false
    }
}

export async function getStaticProps(context) {
    console.log(context);
    const {data} = await Client.query({
        query: QUERY("breakfast")
    });

    return {
        props: {
            data: {
                recipes: data.recipes,
                categories: data.categories,
                categoriesTexts: data.categoriesTexts,
                products: data.products,
                categoriesProducts: data.categoriesProducts
            }
        }
    }
}

function Main({data}) {

    return (
        <>
            <title>Смачний сніданок на швидку руку: Рецепти</title>
            <meta name="description"
                  content="Швидкі сніданки! Найкращі рецепти, прості та корисні страви для вас та вашої сім'ї. Дізнайтеся, які сніданки ви можете приготувати всього за кілька хвилин! Смачно, швидко, корисно! "/>
            <ContentPage data={data} type={"breakfast"}/>
        </>
    )
}

export default Main
