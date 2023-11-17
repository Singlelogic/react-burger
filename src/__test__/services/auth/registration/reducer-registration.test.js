import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
} from "../../../../services/auth/registration/actions";
import {
  registrationReducer,
  initialState,
} from "../../../../services/auth/registration/reducer";


describe("Auth registration reducer", () => {
  it("should return the initial state", () => {
    expect(
      registrationReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle REGISTRATION_REQUEST", () => {
    expect(
      registrationReducer(initialState, {
        type: REGISTRATION_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isRegistrationRequest: true,
      isRegistrationSuccess: false,
      isRegistrationFailed: false,
    });
  });

  it("should handle REGISTRATION_SUCCESS", () => {
    expect(
      registrationReducer(initialState, {
        type: REGISTRATION_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isRegistrationRequest: false,
      isRegistrationSuccess: true,
      isRegistrationFailed: false,
    });
  });

  it("should handle REGISTRATION_FAILED", () => {
    expect(
      registrationReducer(initialState, {
        type: REGISTRATION_FAILED,
      })
    ).toEqual({
      ...initialState,
      isRegistrationRequest: false,
      isRegistrationSuccess: false,
      isRegistrationFailed: true,
    });
  });
});
