import { resetPasswordRequest } from "./api";
import { TAppThunk } from "../../store";


export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";

export interface IResetPasswordData {
  password: string;
  token: string;
}

interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

interface IForgotPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions =
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IForgotPasswordFailed;

export function resetPassword(data: IResetPasswordData): TAppThunk {
  return function(dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    resetPasswordRequest(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
        window.location.replace("/login");
        localStorage.removeItem("forgotPasswordPageVisited");
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      }
    });
  };
}
