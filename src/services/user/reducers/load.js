import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from "../actions";


const initialState = {
  isRequest: false,
  isFailed: false,
}

export const loadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        isRequest: true,
        isFailed: false,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        isRequest: false,
        isFailed: false,
      }
    case GET_USER_FAILED:
      return {
        ...state,
        isRequest: false,
        isFailed: true,
      }
    default:
      return state;
  }
}
