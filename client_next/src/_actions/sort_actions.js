import {
    FILTER_BY_PRODUCTS, FILTER_BY_TIME, FILTER_BY_UTENSILS,
    GET_RECIPES,
    SORT_BY_CALORIES,
    SORT_BY_PRODUCTS,
    SORT_BY_TIME, SORT_BY_UTENSILS
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

export function filterByUtensils(utensils) {
    return {
        type: FILTER_BY_UTENSILS,
        payload: utensils
    }
}

export function filterByTime(minTime, maxTime) {
    return {
        type: FILTER_BY_TIME,
        payload: {
            min: minTime,
            max: maxTime
        }
    }
}

export function filterByCalories(minCalories, maxCalories) {
    return {
        type: FILTER_BY_UTENSILS,
        payload: {
            min: minCalories,
            max: maxCalories
        }
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

export function sortByUtensils() {
    return {
        type: SORT_BY_UTENSILS,
        payload: undefined
    }
}