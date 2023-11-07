import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  SET_USER,
  TUserActions,
} from "../actions";


type TUserManageState = {
  data: null;
  isRequest: boolean;
  isFailed: boolean;
}

const initialState: TUserManageState = {
  data: null,
  isRequest: false,
  isFailed: false,
}

export const manageReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.data,
      }
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        isRequest: true,
        isFailed: false,
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isRequest: false,
        isFailed: false,
      }
    case UPDATE_USER_FAILED:
      return {
        ...state,
        isRequest: false,
        isFailed: true,
      }
    default:
      return state;
  }
}