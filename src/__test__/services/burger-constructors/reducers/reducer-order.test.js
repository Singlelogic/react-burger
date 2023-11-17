import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from "../../../../services/burger-constructor/actions";
import {
  orderReducer,
  initialState,
} from "../../../../services/burger-constructor/reducers/order";


describe("Order reducer", () => {
  it("should return the initial state", () => {
    expect(
      orderReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle SEND_ORDER_REQUEST", () => {
    expect(
      orderReducer(initialState, {
        type: SEND_ORDER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      sendOrderRequest: true,
      sendOrderFailed: false,
    });
  });

  it("should handle SEND_ORDER_SUCCESS", () => {
    expect(
      orderReducer(initialState, {
        type: SEND_ORDER_SUCCESS,
        orderNumber: 1,
      })
    ).toEqual({
      ...initialState,
      orderNumber: 1,
      sendOrderRequest: false,
      sendOrderFailed: false,
    });
  });

  it("should handle SEND_ORDER_SUCCESS", () => {
    expect(
      orderReducer(initialState, {
        type: SEND_ORDER_FAILED,
      })
    ).toEqual({
      ...initialState,
      sendOrderRequest: false,
      sendOrderFailed: true,
    });
  });
});
