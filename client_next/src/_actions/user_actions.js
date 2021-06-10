import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  DELETE_RECIPE,
  ADD_RECIPE,
} from "./types";
import axios from "axios";
import { setAccessToken, setJwtToken } from "./jwt_actions";
import { AUTH_BACKEND_URL } from "../../config";

export function registerUser(login, email, password) {
  return (dispatch) => {
    axios
      .post(
        `${AUTH_BACKEND_URL}/user/sign_up`,
        { login: login, email: email, password: password },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .then((res) => {
        fetchIds()
          .then((res) => res.data)
          .then((res) => {
            dispatch(setJwtToken("res.jwt"));
            dispatch(setAccessToken(""));
            console.log(res);
            dispatch({
              type: AUTH_USER,
              payload: { ids: res },
            });
            res.isAuth = true;
          })
          .catch((err) => {
            console.log(err);
          });
        return res;
      });
  };
}

function fetchIds() {
  return axios.get(`${AUTH_BACKEND_URL}/favorites`, {
    withCredentials: true,
  });
}

export function auth() {
  return (dispatch) =>
    axios
      .post(`${AUTH_BACKEND_URL}/user/test_auth`, { withCredentials: true })
      .then((res) => res.data)
      .then((res) => {
        fetchIds()
          .then((res) => res.data)
          .then((res) => {
            dispatch(setJwtToken("res.jwt"));
            dispatch(setAccessToken("accessToken"));
            console.log(res);
            dispatch({
              type: AUTH_USER,
              payload: { ids: res, isAuth: true },
            });
          });
        return res;
      });
}

export function loginUser(email, password, accessToken) {
  return (dispatch) => {
    let response =
      accessToken === undefined
        ? axios.post(
            `${AUTH_BACKEND_URL}/user/sign_in`,
            { email: email, password: password },
            { withCredentials: true }
          )
        : axios.post(
            `${AUTH_BACKEND_URL}/user/sign_in_google`,
            { token: accessToken },
            { withCredentials: true }
          );

    return response
      .then((res) => res.data)
      .then((res) => {
        fetchIds()
          .then((res) => res.data)
          .then((res) => {
            dispatch(setJwtToken("res.jwt"));
            dispatch(setAccessToken("accessToken"));
            console.log(res);
            dispatch({
              type: AUTH_USER,
              payload: { ids: res, isAuth: true },
            });
          })
          .catch((err) => {
            console.log(err);
          });
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function deleteRecipe(id) {
  return (dispatch, getState) => {
    const state = getState();
    let ids = state.user.ids;
    let index = ids.indexOf(id);
    ids.splice(index, 1);

    return axios
      .delete(
        `${AUTH_BACKEND_URL}/favorites`,
        { slug: id },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch({
          type: DELETE_RECIPE,
          payload: index,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function addRecipe(id) {
  return (dispatch, getState) => {
    const state = getState();
    let ids = state.user.ids;
    if (ids === null) ids = [];
    ids.push(id);

    return axios
      .post(
        `${AUTH_BACKEND_URL}/favorites`,
        { slug: id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("DISPATCH");
        console.log(ids);
        dispatch({
          type: ADD_RECIPE,
          payload: ids,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null,
  };
}
