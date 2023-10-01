import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from "./actions";


const initialState = {
  isRequest: false,
  isFailed: false,
}

export const forgotPasswordReducer = (state = initialState, action) => {
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
