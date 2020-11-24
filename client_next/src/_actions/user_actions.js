// import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';
import axios from "axios";
import {setAccessToken, setJwtToken} from "./jwt_actions";
import {BACKEND_URL} from "../../config";

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

export function auth(accessToken) {

    return (dispatch) => {
        return axios({
            method: "GET",
            url: `${BACKEND_URL}/auth/google/callback?${accessToken}`,
        })
            .then(res => res.data)
            .then(res => {
                console.log(res);
                dispatch(setJwtToken(res.jwt));
                dispatch(setAccessToken(accessToken));
                dispatch({
                    type: AUTH_USER,
                    payload: res.user
                });
                res.isAuth = true;
                return res;
            })
    };
}

export function logoutUser() {

    return {
        type: LOGOUT_USER,
        payload: null
    }
}