import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "./actions";


const initialState = {
  isLogoutRequest: false,
  isLogoutSuccess: false,
}

export const logoutReducer = (state = initialState, action) => {
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
