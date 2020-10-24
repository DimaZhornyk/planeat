import React from "react"
import Client from "../../lib/apollo"
import ContentPage from "../../src/components/utils/ContentPage";
import QUERY from "../../src/components/utils/query"

export async function getStaticProps() {
    const { data } = await Client.query({
        query: QUERY("dessert")
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
            <title>Прості десерти на кожен день</title>
            <meta
                name="description"
                content="У нас ви знайдете швидкі рецепти десертів, які зможете готувати кожен день. 
                Швидкі десерти не тільки зекономлять ваш час, а ще подарують гарний настрій на весь день."
            />
        <ContentPage data={data} type={"dessert"} />
        </>
    )
}

export default Main
