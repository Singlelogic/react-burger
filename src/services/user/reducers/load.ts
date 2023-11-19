import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  TUserActions,
} from "../actions";


type TUserState = {
  isRequest: boolean;
  isFailed: boolean;
}

export const initialState: TUserState = {
  isRequest: false,
  isFailed: false,
}

export const loadReducer = (state = initialState, action: TUserActions) => {
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
