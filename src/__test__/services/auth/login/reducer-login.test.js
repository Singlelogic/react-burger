import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../../../../services/auth/login/actions";
import {
  loginReducer,
  initialState,
} from "../../../../services/auth/login/reducer";


describe("Auth login reducer", () => {
  it("should return the initial state", () => {
    expect(
      loginReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(
      loginReducer(initialState, {
        type: LOGIN_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isLoginRequest: true,
      isLoginSuccess: false,
      isLoginFailed: false,
    });
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      loginReducer(initialState, {
        type: LOGIN_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isLoginRequest: false,
      isLoginSuccess: true,
      isLoginFailed: false,
    });
  });

  it("should handle LOGIN_FAILED", () => {
    expect(
      loginReducer(initialState, {
        type: LOGIN_FAILED,
      })
    ).toEqual({
      ...initialState,
      isLoginRequest: false,
      isLoginSuccess: false,
      isLoginFailed: true,
    });
  });
});
