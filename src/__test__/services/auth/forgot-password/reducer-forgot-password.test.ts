import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from "../../../../services/auth/forgot-password/actions";
import {
  forgotPasswordReducer,
  initialState,
} from "../../../../services/auth/forgot-password/reducer";


describe("Auth forgot password reducer", () => {
  it("should return the initial state", () => {
    expect(
      forgotPasswordReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      forgotPasswordReducer(initialState, {
        type: FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isRequest: true,
      isFailed: false,
    });
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      forgotPasswordReducer(initialState, {
        type: FORGOT_PASSWORD_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: false,
    });
  });

  it("should handle FORGOT_PASSWORD_FAILED", () => {
    expect(
      forgotPasswordReducer(initialState, {
        type: FORGOT_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: true,
    });
  });
});
