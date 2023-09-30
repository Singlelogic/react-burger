import { SET_USER } from "../actions";


const initialState = {
  data: null,
}

export const manageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        data: action.data,
      }
    default:
      return state;
  }
}
