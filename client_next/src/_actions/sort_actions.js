import {
    FILTER_BY_PRODUCTS,
    GET_RECIPES,
    SORT_BY_ACCESSORIES,
    SORT_BY_CALORIES,
    SORT_BY_PRODUCTS,
    SORT_BY_TIME
} from "./sort_types";

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

export function sortByTime() {
    return {
        type: SORT_BY_TIME,
        payload: undefined
    }
}

export function sortByCalories() {
    return {
        type: SORT_BY_CALORIES,
        payload: undefined
    }
}

export function sortByProducts() {
    return {
        type: SORT_BY_PRODUCTS,
        payload: undefined
    }
}

export function sortByAccessories() {
    return {
        type: SORT_BY_ACCESSORIES,
        payload: undefined
    }
}