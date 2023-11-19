import { getUserRequest, updateUserRequest } from "./api";
import { getCookie } from "../../utils/cookie";
import { TAppThunk } from "../store";


export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";
export const UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST" = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";
export const SET_USER: "SET_USER" = "SET_USER";

interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
}

interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
}

interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

interface ISetUserFailed {
  readonly type: typeof SET_USER;
  data: IUserData | null;
}

export type TUserActions =
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed
  | ISetUserFailed;

interface IUserData {
  name: string;
  email: string;
}

export const checkUserAuth = (): TAppThunk => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken") && getCookie("refreshToken")) {
      dispatch(getUser());
    }
  };
};

export const setUser = (user: IUserData | null): TAppThunk => {
  return function(dispatch) {
    dispatch({
      type: SET_USER,
      data: user,
    })
  }
}

export const getUser = (): TAppThunk => {
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
      .catch(err => console.log("ERROR: ", err));
  };
}

export const updateUser = (data: IUserData): TAppThunk => {
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
     .catch(err => console.log("ERROR: ", err));
  };
}
