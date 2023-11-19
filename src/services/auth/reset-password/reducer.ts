import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  TResetPasswordActions,
} from "./actions";


type TResetPassword = {
  isRequest: boolean;
  isSuccess: boolean;
  isFailed: boolean;
}

export const initialState: TResetPassword = {
  isRequest: false,
  isSuccess: false,
  isFailed: false,
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordActions) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isRequest: true,
        isSuccess: false,
        isFailed: false,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isRequest: false,
        isSuccess: true,
        isFailed: false,
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        isRequest: false,
        isSuccess: false,
        isFailed: true,
      }
    default:
      return state;
  }
}
