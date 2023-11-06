import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  TLogoutActions,
} from "./actions";


type TLogoutState = {
  isLogoutRequest: false;
  isLogoutSuccess: false;
}

const initialState: TLogoutState = {
  isLogoutRequest: false,
  isLogoutSuccess: false,
}

export const logoutReducer = (state = initialState, action: TLogoutActions) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLogoutRequest: true,
        isLogoutSuccess: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: false,
      }
    case LOGOUT_FAILED:
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: true,
      }
    default:
      return state;
  }
}
