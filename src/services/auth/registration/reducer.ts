import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  TRegistrationActions,
} from "./actions";


type TRegistrationState = {
  isRegistrationRequest: boolean;
  isRegistrationSuccess: boolean;
}

const initialState: TRegistrationState = {
  isRegistrationRequest: false,
  isRegistrationSuccess: false,
}

export const registrationReducer = (state = initialState, action: TRegistrationActions) => {
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
