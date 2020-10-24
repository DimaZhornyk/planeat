import {
    FILTER_BY_ACCESSORIES,
    FILTER_BY_PRODUCTS,
    FILTER_BY_TIME, GET_RECIPES, SORT_BY_ACCESSORIES,
    SORT_BY_CALORIES, SORT_BY_PRODUCTS,
    SORT_BY_TIME
} from "../_actions/sort_types";

const initialState = {
    recipes: [],
    filteredRecipes: [],
    filterStack: []
};

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            let recipes = state.recipes.concat(action.payload);
            return {...state, recipes: recipes, filteredRecipes: recipes};
        case FILTER_BY_PRODUCTS:
            let products = action.payload;
            if (products.length === 0) return {...state, filteredRecipes: state.recipes};
            let filteredRecipes = state.recipes.filter((recipe) => {
                return recipe.products.find((recipeProduct) => {
                    return products.find((product) => product.productName === recipeProduct.productName);
                })
            });
            return {
                ...state,
                filteredRecipes: filteredRecipes
            };
        case FILTER_BY_ACCESSORIES:
            //filter
            return state;
        case FILTER_BY_TIME:
            //filter
            return state;
        case SORT_BY_TIME:
            //sort by time
            return state;
        case SORT_BY_CALORIES:
            //sort by calories
            return state;
        case SORT_BY_PRODUCTS:
            //sort by quantity of products
            return state;
        case SORT_BY_ACCESSORIES:
            //sort by accessories
            return state;
        default:
            return state;
    }
};

export default recipesReducer;