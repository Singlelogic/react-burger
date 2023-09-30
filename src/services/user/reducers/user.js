import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  SET_USER,
} from "../actions";


const initialState = {
  user: null,
  isUserRequest: false,
  isUserFailed: false,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        isUserRequest: true,
        isUserFailed: false,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isUserRequest: false,
        isUserFailed: false,
      }
    case GET_USER_FAILED:
      return {
        ...state,
        user: null,
        isUserRequest: false,
        isUserFailed: true,
      }

    case SET_USER:
      return {
        ...state,
        user: action.user,
      }

    default:
      return state;
  }
}
