import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  TLogoutActions,
} from "./actions";


type TLogoutState = {
  isLogoutRequest: false;
  isLogoutSuccess: false;
  isLogoutFailed: false;
}

export const initialState: TLogoutState = {
  isLogoutRequest: false,
  isLogoutSuccess: false,
  isLogoutFailed: false,
}

export const logoutReducer = (state = initialState, action: TLogoutActions) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLogoutRequest: true,
        isLogoutSuccess: false,
        isLogoutFailed: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: true,
        isLogoutFailed: false,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: false,
        isLogoutFailed: true,
      }
    default:
      return state;
  }
}
