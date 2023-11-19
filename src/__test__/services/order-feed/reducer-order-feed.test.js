import {
  ORDER_FEED_WS_CONNECTING,
  ORDER_FEED_WS_OPEN,
  ORDER_FEED_WS_CLOSE,
  ORDER_FEED_WS_MESSAGE,
  ORDER_FEED_WS_ERROR,
  SET_ORDERS,
} from "../../../services/order-feed/actions";
import { orderFeedReducer, initialState } from "../../../services/order-feed/reducer";
import { WebSocketStatus } from "../../../types/order-feed";


describe("Order feed web socket reducer", () => {
  it("should return the initial state", () => {
    expect(
      orderFeedReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle ORDER_FEED_WS_CONNECTING", () => {
    expect(
      orderFeedReducer(initialState, {
        type: ORDER_FEED_WS_CONNECTING,
      })
    ).toEqual({
      ...initialState,
      status: WebSocketStatus.CONNECTING,
    });
  });

  it("should handle ORDER_FEED_WS_OPEN", () => {
    expect(
      orderFeedReducer(initialState, {
        type: ORDER_FEED_WS_OPEN,
      })
    ).toEqual({
      ...initialState,
      status: WebSocketStatus.ONLINE,
      connectingError: "",
    });
  });

  it("should handle ORDER_FEED_WS_CLOSE", () => {
    expect(
      orderFeedReducer(initialState, {
        type: ORDER_FEED_WS_CLOSE,
      })
    ).toEqual({
      ...initialState,
      status: WebSocketStatus.OFFLINE,
    });
  });

  it("should handle ORDER_FEED_WS_MESSAGE", () => {
    expect(
      orderFeedReducer(initialState, {
        type: ORDER_FEED_WS_MESSAGE,
        payload: "DATA",
      })
    ).toEqual({
      ...initialState,
      ordersFeed: "DATA",
    });
  });

  it("should handle ORDER_FEED_WS_ERROR", () => {
    expect(
      orderFeedReducer(initialState, {
        type: ORDER_FEED_WS_ERROR,
        payload: "ERROR",
      })
    ).toEqual({
      ...initialState,
      connectingError: "ERROR",
    });
  });
});
