import { getUserRequest, updateUserRequest } from "./api";
import { getCookie } from "../utils/cookie";


export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const SET_USER = "SET_USER";

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken") && getCookie("refreshToken")) {
      dispatch(getUser());
    }
  };
};

export function setUser(user) {
  return function(dispatch) {
    dispatch({
      type: SET_USER,
      data: user,
    })
  }
}

export function getUser() {
  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    getUserRequest()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
          });
          dispatch(setUser(res.user));
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
  };
}

export function updateUser(data) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUserRequest(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
          });
          dispatch(setUser(res.user));
        } else {
          dispatch({
            type: UPDATE_USER_FAILED,
          });
        }
      })
  };
}
