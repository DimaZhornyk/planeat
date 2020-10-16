import {useRouter} from 'next/router'
import React from "react"
import gql from "graphql-tag";
import Client from "../../../lib/apollo";


export async function getStaticPaths() {
    const {data} = await Client.query({
        query: gql`
            query { recipes{
                id
            }}`
    })

    const ids = data.recipes.map((recipe) => ({
        params: {id: recipe.id}
    }))

    return {paths: ids, fallback: false}
}

export async function getStaticProps({params}) {
    const {data} = await Client.query({
        query: gql`
            query {
                recipe(id: ${params.id}){
                    id
                    timeText
                    calories
                    recipeCaption
                    recipeSlug
                    recipeDescription
                    recipeImage{
                        url
                    }
                    category
                }
            }`
    })
    return {props: {recipe: data.recipe}}
}


function RecipePage({recipe}) {

    return (
        <>
            <p>{recipe.recipeCaption}</p>
        </>
    )
}

export default RecipePage