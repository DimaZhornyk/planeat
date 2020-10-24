import {combineReducers} from 'redux';
import user from './user_reducer';
import admin from './admin_reducer'
import recipesReducer from "./recipes_reducer";


const rootReducer = combineReducers({
    user, admin, recipesReducer
});

export default rootReducer;