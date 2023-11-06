import { loginRequest } from "./api";
import { TAppThunk } from "../../store";
import { setUser } from "../../user/actions";
import { setCookie } from "../../utils/cookie";


export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export interface ILoginData {
  email: string;
  password: string;
}

interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
}

interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export type TLoginActions =
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed;

export const login = (data: ILoginData): TAppThunk => {
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
