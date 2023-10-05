import { resetPasswordRequest } from "./api";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";


export function resetPassword(data) {
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
      } else {
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      }
    });
  };
}
