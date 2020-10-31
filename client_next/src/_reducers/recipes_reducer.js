import {
    SET_FILTER_PRODUCTS,
    SET_FILTER_TIME,
    SET_FILTER_UTENSILS,
    SET_RECIPES,
    SORT_BY_UTENSILS,
    SORT_BY_CALORIES,
    SORT_BY_PRODUCTS,
    SORT_BY_TIME, SET_FILTER_CALORIES, GET_INITIAL, FETCH_RECIPES
} from "../_actions/sort_types";

const initialState = {
    recipes: [],
    products: [],
    utensils: [],
    sort: SORT_BY_TIME,
    time: {
        min: 0,
        max: 0
    },
    calories: {
        min: 0,
        max: 0
    }
};

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RECIPES:

            return state;
        case SET_RECIPES:
            let recipes = action.payload;
            return {...state, recipes: recipes};
        case GET_INITIAL:
            return {
                ...initialState,
                recipes: state.recipes
            };
        case SET_FILTER_PRODUCTS:
/*            let products = action.payload;
            if (products.length === 0) return {...state, filteredRecipes: state.recipes};
            let filteredRecipes = state.recipes.filter((recipe) => {
                return recipe.products.find((recipeProduct) => {
                    return products.find((product) => product.name === recipeProduct.name);
                })
            });*/
            return {
                ...state,
                products: action.payload
            };
        case SET_FILTER_UTENSILS:
            /*let utensils = action.payload;
            if (utensils.length === 0) return {...state, filteredRecipes: state.recipes};
            console.log(utensils);
            let filtered = state.recipes.filter((recipe) => {
                return recipe.utensils.find((recipeUtensil) => {
                    return utensils.find((product) => product.name === recipeUtensil.name);
                })
            });*/
            return {
                ...state,
                utensils: action.payload
            };
        case SET_FILTER_TIME:
            /*let timeParams = action.payload;
            let filteredByTime = state.filteredRecipes.filter((recipe) => {
                return recipe.time >= timeParams.min && recipe.time <= timeParams.max;
            });*/
            return {
                ...state,
                time: action.payload
            };
        case SET_FILTER_CALORIES:
            /*let caloriesParams = action.payload;
            let filteredByCalories = state.filteredRecipes.filter((recipe) => {
                return recipe.calories >= caloriesParams.min && recipe.calories <= caloriesParams.max;
            });*/
            return {
                ...state,
                calories: action.payload
            };
        case SORT_BY_TIME:
            return {
                ...state,
                sort: SORT_BY_TIME,
                recipes: [...state.recipes].sort((a, b) => {
                    return a.time - b.time
                })
            };
        case SORT_BY_CALORIES:
            return {
                ...state,
                sort: SORT_BY_CALORIES,
                recipes: [...state.recipes].sort((a, b) => {
                    return a.calories - b.calories
                })
            };
        case SORT_BY_PRODUCTS:
            return {
                ...state,
                sort: SORT_BY_PRODUCTS,
                recipes: [...state.recipes].sort((a, b) => {
                    return a.products.length - b.products.length
                })
            };
        case SORT_BY_UTENSILS:
            return {
                ...state,
                sort: SORT_BY_UTENSILS,
                recipes: [...state.recipes].sort((a, b) => {
                    return a.utensils.length - b.utensils.length
                })
            };
        default:
            return state;
    }
};

export const getProducts = state => state.recipesReducer.products;
export const getUtensils = state => state.recipesReducer.utensils;

export default recipesReducer;