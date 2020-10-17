import React from "react"
import Client from "../../lib/apollo"
import ContentPage from "../../src/components/utils/ContentPage";
import QUERY from "../../src/components/utils/query"

export async function getStaticProps() {
    const { data } = await Client.query({
        query: QUERY("firstDish")
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

function Main({ data }) {

    return (
        <>
            <title>Перші страви на кожен день</title>
            <meta
                name="description"
                content="На нашому сайті ви можете знайти прості рецепти перших страв, 
                якими зможете потішити своїх рідних. Перші страви на кожен день дозволять вам смачно харчуватися без проблем."
            />
        <ContentPage data={data} type={"firstDish"}/>
        </>
    )
}

export default Main
