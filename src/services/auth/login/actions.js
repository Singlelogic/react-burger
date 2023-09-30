import { loginRequest } from "./api";
import { setUser } from "../../user/actions";
import { setCookie } from "../../utils/cookie";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";


export function login(data) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    loginRequest(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: LOGIN_SUCCESS,
        });
        dispatch(setUser(res.user));
        localStorage.setItem("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      } else {
        dispatch({
          type: LOGIN_FAILED
        });
      }
    });
  };
}
