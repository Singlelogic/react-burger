import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  SET_USER,
} from "../../../../services/user/actions";
import {
  manageReducer,
  initialState,
} from "../../../../services/user/reducers/manage";


describe("User manage reducer", () => {
  it("should return the initial state", () => {
    expect(
      manageReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle UPDATE_USER_REQUEST", () => {
    expect(
      manageReducer(initialState, {
        type: UPDATE_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isRequest: true,
      isFailed: false,
    });
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    expect(
      manageReducer(initialState, {
        type: UPDATE_USER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: false,
    });
  });

  it("should handle UPDATE_USER_FAILED", () => {
    expect(
      manageReducer(initialState, {
        type: UPDATE_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: true,
    });
  });

  it("should handle SET_USER", () => {
    expect(
      manageReducer(initialState, {
        type: SET_USER,
        data: "DATA"
      })
    ).toEqual({
      ...initialState,
      data: "DATA",
    });
  });
});
