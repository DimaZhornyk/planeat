import {AUTH_USER, LOGIN_USER, LOGOUT_USER} from "../_actions/types";

let initialState = {
    isAuth: undefined,
    user: {}
};

export default function UR(state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                ...action.payload
            };
        case AUTH_USER:
            return {
                ...state,
                isAuth: true,
                ...action.payload
            };
        case LOGOUT_USER:
            localStorage.removeItem("jwt");
            localStorage.removeItem("access_token");
            return {
                user: {},
                isAuth: false,
            };
        default:
            return state;
    }
}