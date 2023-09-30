import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "./actions";


const initialState = {
  isRegistrationRequest: false,
  isRegistrationSuccess: false,
}

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {
        ...state,
        isRegistrationRequest: true,
        isRegistrationSuccess: false,
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isRegistrationRequest: false,
        isRegistrationSuccess: false,
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        isRegistrationRequest: false,
        isRegistrationSuccess: true,
      }
    default:
      return state;
  }
}
