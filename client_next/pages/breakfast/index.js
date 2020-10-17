import React from "react"
import Client from "../../lib/apollo"
import ContentPage from "../../src/components/utils/ContentPage";
import QUERY from "../../src/components/utils/query"

export async function getStaticProps() {
    const {data} = await Client.query({
        query: QUERY("breakfast")
    });

    console.log(data);

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
        <ContentPage data={data} type={"breakfast"}/>
    )
}

export default Main
