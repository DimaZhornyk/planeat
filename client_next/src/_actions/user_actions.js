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
    axios(
      {
        method: "POST",
        url: `${AUTH_BACKEND_URL}/user/sign_up`,
      },
      { login, email, password },
      { withCredentials: true }
    )
      .then((res) => res.data)
      .then((res) => {
        fetchIds()
          .then((res) => res.data)
          .then((res) => {
            dispatch(setJwtToken("res.jwt"));
            dispatch(setAccessToken(accessToken));
            console.log(res);
            dispatch({
              type: AUTH_USER,
              payload: { ids: res },
            });
            res.isAuth = true;
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
              payload: { ids: res },
            });
            res.isAuth = true;
          });
        return res;
      });
}

export function loginUser(email, password, accessToken) {
  return (dispatch) => {
    let response =
      accessToken === undefined
        ? axios(
            {
              method: "POST",
              url: `${AUTH_BACKEND_URL}/user/sign_in`,
            },
            { email, password },
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
            dispatch(setAccessToken(accessToken));
            console.log(res);
            dispatch({
              type: AUTH_USER,
              payload: { ids: res },
            });
            res.isAuth = true;
          });
        return res;
      });
  };
}

export function deleteRecipe(id) {
  return (dispatch, getState) => {
    const state = getState();
    let ids = state.user.ids;
    const jwt = state.jwt.jwt;
    const userId = state.user.id;
    let index = ids.indexOf(parseInt(id));
    ids.splice(index, 1);

    return axios
      .delete(
        `${AUTH_BACKEND_URL}/favorites`,
        { slug: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        dispatch({
          type: DELETE_RECIPE,
          payload: index,
        });
      });
  };
}

export function addRecipe(id) {
  return (dispatch, getState) => {
    const state = getState();
    let ids = state.user.ids;
    if (ids === null) ids = [];
    ids.push(id);
    const jwt = state.jwt.jwt;
    const userId = state.user.id;

    return axios
      .post(
        `${AUTH_BACKEND_URL}/favorites`,
        { slug: id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("DISPATCH");
        console.log(res);
        dispatch({
          type: ADD_RECIPE,
          payload: ids,
        });
      });
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: null,
  };
}
