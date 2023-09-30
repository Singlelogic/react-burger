import { getUserRequest } from "./api";


export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const SET_USER = "SET_USER";

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
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
      type: GET_USER_REQUEST,
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
      .catch(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      })
  };
}
