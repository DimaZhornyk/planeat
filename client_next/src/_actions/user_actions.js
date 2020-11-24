// import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';

export function registerUser(dataToSubmit) {
    //make request here

    return {
        type: REGISTER_USER,
        payload: null
    }
}

export function loginUser(user) {

    return {
        type: LOGIN_USER,
        payload: user
    }
}

export function auth() {
    //make request here

    return {
        type: AUTH_USER,
        payload: null
    }
}

export function logoutUser() {
    //make request here

    return {
        type: LOGOUT_USER,
        payload: null
    }
}