import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  TRegistrationActions,
} from "./actions";


type TRegistrationState = {
  isRegistrationRequest: boolean;
  isRegistrationSuccess: boolean;
  isRegistrationFailed: boolean;
}

export const initialState: TRegistrationState = {
  isRegistrationRequest: false,
  isRegistrationSuccess: false,
  isRegistrationFailed: false,
}

export const registrationReducer = (state = initialState, action: TRegistrationActions) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {
        ...state,
        isRegistrationRequest: true,
        isRegistrationSuccess: false,
        isRegistrationFailed: false,
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isRegistrationRequest: false,
        isRegistrationSuccess: true,
        isRegistrationFailed: false,
      }
    case REGISTRATION_FAILED:
      return {
        ...state,
        isRegistrationRequest: false,
        isRegistrationSuccess: false,
        isRegistrationFailed: true,
      }
    default:
      return state;
  }
}
