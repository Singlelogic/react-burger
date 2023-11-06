import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  TForgotPasswordActions,
} from "./actions";


type TForgotPasswordState = {
  isRequest: boolean;
  isFailed: boolean;
}

const initialState: TForgotPasswordState = {
  isRequest: false,
  isFailed: false,
}

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        isRequest: true,
        isFailed: false,
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isRequest: false,
        isFailed: false,
      }
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        isRequest: false,
        isFailed: true,
      }
    default:
      return state;
  }
}
