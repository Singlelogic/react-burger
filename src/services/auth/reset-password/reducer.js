import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "./actions";


const initialState = {
  isRequest: false,
  isFailed: false,
}

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isRequest: true,
        isFailed: false,
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isRequest: false,
        isFailed: false,
      }
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        isRequest: false,
        isFailed: true,
      }
    default:
      return state;
  }
}
