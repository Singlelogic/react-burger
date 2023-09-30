import { logoutRequest } from "./api";
import { setUser } from "../../user/actions";
import { deleteCookie } from "../../utils/cookie";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";


export function logout(refreshToken) {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logoutRequest(refreshToken).then(res => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
        console.log("res", res);
        localStorage.removeItem("accessToken");
        deleteCookie("refreshToken");
        dispatch(setUser(null));
      } else {
        dispatch({
          type: LOGOUT_FAILED
        });
      }
    });
  };
}