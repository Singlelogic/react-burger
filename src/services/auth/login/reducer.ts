import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  TLoginActions,
} from "./actions";


type TLoginState = {
  isLoginRequest: boolean;
  isLoginSuccess: boolean;
  isLoginFailed: boolean;
}

export const initialState: TLoginState = {
  isLoginRequest: false,
  isLoginSuccess: false,
  isLoginFailed: false,
}

export const loginReducer = (state = initialState, action: TLoginActions) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoginRequest: true,
        isLoginSuccess: false,
        isLoginFailed: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginRequest: false,
        isLoginSuccess: true,
        isLoginFailed: false,
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoginRequest: false,
        isLoginSuccess: false,
        isLoginFailed: true,
      }
    default:
      return state;
  }
}
