import {FILTER_BY_PRODUCTS, GET_RECIPES} from "./sort_types";

export function getRecipes(recipes) {
    return {
        type: GET_RECIPES,
        payload: recipes
    }
}

export function filterByProducts(products) {
    return {
        type: FILTER_BY_PRODUCTS,
        payload: products
    }
}