import React from "react"
import Client from "../../lib/apollo"
import ContentPage from "../../src/components/utils/ContentPage";
import QUERY from "../../src/components/utils/query"

export async function getStaticProps() {
    const {data} = await Client.query({
        query: QUERY("mainDish")
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
            <title>Другі страви швидко і смачно</title>
            <meta name="description"
                  content="Швидкі рецепти других страв -  для тих, хто не може витрачати багато часу на кухні. Обирай продукти та готуй улюблені страви: на обід, вечерю чи свято!"/>
            <ContentPage data={data} type={"mainDish"}/>
        </>
    )
}

export default Main
