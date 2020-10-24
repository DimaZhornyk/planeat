import React from "react"
import Client from "../../lib/apollo"
import ContentPage from "../../src/components/utils/ContentPage";
import QUERY from "../../src/components/utils/query"

export async function getStaticProps() {
    const { data } = await Client.query({
        query: QUERY("salad")
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
        <title>Швидкі салати</title>
        <meta
                name="description"
                content="Потрібні салати на швидку руку? Тоді ви завітали за адресою!"
            />
        <ContentPage data={data} type={"salad"}/>
        </>
        )
}

export default Main