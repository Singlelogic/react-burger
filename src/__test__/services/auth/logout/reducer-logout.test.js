import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../../../../services/auth/logout/actions";
import {
  logoutReducer,
  initialState,
} from "../../../../services/auth/logout/reducer";


describe("Auth logout reducer", () => {
  it("should return the initial state", () => {
    expect(
      logoutReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(
      logoutReducer(initialState, {
        type: LOGOUT_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLogoutRequest: true,
      isLogoutSuccess: false,
      isLogoutFailed: false,
    });
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      logoutReducer(initialState, {
        type: LOGOUT_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isLogoutRequest: false,
      isLogoutSuccess: true,
      isLogoutFailed: false,
    });
  });

  it("should handle LOGOUT_FAILED", () => {
    expect(
      logoutReducer(initialState, {
        type: LOGOUT_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLogoutRequest: false,
      isLogoutSuccess: false,
      isLogoutFailed: true,
    });
  });
});
