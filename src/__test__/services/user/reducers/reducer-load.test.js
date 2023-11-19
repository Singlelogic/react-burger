import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from "../../../../services/user/actions";
import {
  loadReducer,
  initialState,
} from "../../../../services/user/reducers/load";


describe("User load reducer", () => {
  it("should return the initial state", () => {
    expect(
      loadReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle GET_USER_REQUEST", () => {
    expect(
      loadReducer(initialState, {
        type: GET_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      isRequest: true,
      isFailed: false,
    });
  });

  it("should handle GET_USER_SUCCESS", () => {
    expect(
      loadReducer(initialState, {
        type: GET_USER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: false,
    });
  });

  it("should handle GET_USER_FAILED", () => {
    expect(
      loadReducer(initialState, {
        type: GET_USER_FAILED,
      })
    ).toEqual({
      ...initialState,
      isRequest: false,
      isFailed: true,
    });
  });
});
