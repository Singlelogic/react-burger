import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "../../../../services/auth/reset-password/actions";
import {
  resetPasswordReducer,
  initialState,
} from "../../../../services/auth/reset-password/reducer";


describe("Auth reset-password reducer", () => {
  it("should return the initial state", () => {
    expect(
      resetPasswordReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      resetPasswordReducer(initialState, {
        type: RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isRequest: true,
      isSuccess: false,
      isFailed: false,
    });
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      resetPasswordReducer(initialState, {
        type: RESET_PASSWORD_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isSuccess: true,
      isFailed: false,
    });
  });

  it("should handle RESET_PASSWORD_FAILED", () => {
    expect(
      resetPasswordReducer(initialState, {
        type: RESET_PASSWORD_FAILED,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isSuccess: false,
      isFailed: true,
    });
  });
});
