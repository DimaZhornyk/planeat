import {
    FILTER_BY_PRODUCTS,
    FILTER_BY_TIME, FILTER_BY_UTENSILS, GET_RECIPES, SORT_BY_ACCESSORIES,
    SORT_BY_CALORIES, SORT_BY_PRODUCTS,
    SORT_BY_TIME
} from "../_actions/sort_types";

const initialState = {
    recipes: [],
    filteredRecipes: [],
    products: [],
    utensils: [],
    sort: SORT_BY_TIME
};

const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            let recipes = action.payload;
            return {...state, recipes: recipes, filteredRecipes: recipes};
        case FILTER_BY_PRODUCTS:
            let products = action.payload;
            if (products.length === 0) return {...state, filteredRecipes: state.recipes};
            let filteredRecipes = state.recipes.filter((recipe) => {
                return recipe.products.find((recipeProduct) => {
                    return products.find((product) => product.name === recipeProduct.name);
                })
            });
            return {
                ...state,
                filteredRecipes,
                products
            };
        case FILTER_BY_UTENSILS:
            let utensils = action.payload;
            if (utensils.length === 0) return {...state, filteredRecipes: state.recipes};
            let filtered = state.recipes.filter((recipe) => {
                return recipe.utensils.find((recipeUtensil) => {
                    return utensils.find((product) => product.name === recipeUtensil.name);
                })
            });
            return {
                ...state,
                filtered,
                utensils
            };
        case FILTER_BY_TIME:
            //filter
            return state;
        case SORT_BY_TIME:
            return {
                ...state,
                sort: SORT_BY_TIME,
                filteredRecipes: [...state.filteredRecipes].sort((a, b) => {
                    return a.time - b.time
                })
            };
        case SORT_BY_CALORIES:
            return {
                ...state,
                sort: SORT_BY_CALORIES,
                filteredRecipes: [...state.filteredRecipes].sort((a, b) => {
                    return a.calories - b.calories
                })
            };
        case SORT_BY_PRODUCTS:
            return {
                ...state,
                sort: SORT_BY_PRODUCTS,
                filteredRecipes: [...state.filteredRecipes].sort((a, b) => {
                    return a.products.length - b.products.length
                })
            };
        case SORT_BY_ACCESSORIES:
            return {
                ...state,
                sort: SORT_BY_ACCESSORIES,
                filteredRecipes: [...state.filteredRecipes].sort((a, b) => {
                    return a.utensils.length - b.utensils.length
                })
            };
        default:
            return state;
    }
};

export default recipesReducer;