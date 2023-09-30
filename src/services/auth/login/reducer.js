import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "./actions";


const initialState = {
  isLoginRequest: false,
  isLoginSuccess: false,
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoginRequest: true,
        isLoginSuccess: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginRequest: false,
        isLoginSuccess: false,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoginRequest: false,
        isLoginSuccess: true,
      }
    default:
      return state;
  }
}
