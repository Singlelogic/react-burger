import { forgotPasswordRequest } from "./api";
import { TAppThunk } from "../../store";


export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS" = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";

interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export type TForgotPasswordActions =
  | IForgotPasswordRequest
  | IForgotPasswordSuccess
  | IForgotPasswordFailed;

export interface IForgotPasswordData {
  email: string;
}

export const forgotPassword = (data: IForgotPasswordData): TAppThunk => {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPasswordRequest(data)
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
          });
          window.location.replace("/reset-password");
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED,
          });
        }
      })
      .catch(err => {
        dispatch({ type: FORGOT_PASSWORD_FAILED});
        console.log("ERROR: ", err);
      });
  };
}
