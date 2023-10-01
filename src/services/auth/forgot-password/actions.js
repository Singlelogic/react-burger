import { redirect } from "react-router-dom";

import { forgotPasswordRequest } from "./api";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";


export function forgotPassword(data) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    forgotPasswordRequest(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });
        return redirect("/reset-password");
      } else {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      }
    });
  };
}
