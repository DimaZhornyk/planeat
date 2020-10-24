import React from "react"
import Client from "../../lib/apollo"
import ContentPage from "../../src/components/utils/ContentPage";
import QUERY from "../../src/components/utils/query"

export async function getStaticProps() {
    const {data} = await Client.query({
        query: QUERY("quick")
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
            <title>Швидкі страви</title>
            <meta name="description"
                  content="Домашні страви швидкого приготування! Рецепти, які зможе приготувати кожен. Готуй смачно і за лічені хвилини! Найпростіші, найсмачніші та найрізноманітніші рецепти, подібрані індивідуально."/>
            <ContentPage data={data} type={"quick"}/>
        </>
    )
}

export default Main