import {
    SET_FILTER_CALORIES,
    SET_FILTER_PRODUCTS, SET_FILTER_TIME, SET_FILTER_UTENSILS, GET_INITIAL,
    SET_RECIPES,
    SORT_BY_CALORIES,
    SORT_BY_PRODUCTS,
    SORT_BY_TIME, SORT_BY_UTENSILS
} from "./sort_types";
import gql from "graphql-tag";
import Client from "../../lib/apollo"

const QUERY = gql`query {
            recipes {
            id
            calories
            time
            recipeCaption
            recipeImage{
                url
            }
            category
            products {
                name
            }
            utensils {
                name
            }
        }
    }`;

export function setRecipes(recipes) {
    return {
        type: SET_RECIPES,
        payload: recipes
    }
}

export function fetchRecipes(filters) {
    //TODO improve filters
    return (dispatch, getState) => {
        console.log(getState().recipesReducer);
        Client.query({query: QUERY})
            .then(({data}) => {
                dispatch({
                    type: SET_RECIPES,
                    payload: data.recipes
                })
            })
    }
}

export function getInitial() {
    return {
        type: GET_INITIAL,
        payload: undefined
    }
}


export function filterByProducts(products) {
    return {
        type: SET_FILTER_PRODUCTS,
        payload: products
    }
}

export function filterByUtensils(utensils) {
    return {
        type: SET_FILTER_UTENSILS,
        payload: utensils
    }
}

export function filterByTime(minTime, maxTime) {
    return {
        type: SET_FILTER_TIME,
        payload: {
            min: minTime,
            max: maxTime
        }
    }
}

export function filterByCalories(minCalories, maxCalories) {
    return {
        type: SET_FILTER_CALORIES,
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