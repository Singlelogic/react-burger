import { logoutRequest } from "./api";
import { TAppThunk } from "../../store";
import { setUser } from "../../user/actions";
import { deleteCookie } from "../../utils/cookie";


export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export interface ILogoutData {
  refreshToken?: string;
}

interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export type TLogoutActions =
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed;

export const logout = (data: ILogoutData): TAppThunk => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logoutRequest(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
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
