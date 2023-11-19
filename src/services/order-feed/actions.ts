import { createAction } from "@reduxjs/toolkit";

import { TOrderFeed, TOrdersFeed } from "../../types/order-feed";


export const ORDER_FEED_CONNECT = "ORDER_FEED_CONNECT";
export const ORDER_FEED_DISCONNECT = "ORDER_FEED_DISCONNECT";
export const ORDER_FEED_WS_CONNECTING = "ORDER_FEED_WS_CONNECTING";
export const ORDER_FEED_WS_OPEN = "ORDER_FEED_WS_OPEN";
export const ORDER_FEED_WS_CLOSE = "ORDER_FEED_WS_CLOSE";
export const ORDER_FEED_WS_MESSAGE = "ORDER_FEED_WS_MESSAGE";
export const ORDER_FEED_WS_ERROR = "ORDER_FEED_WS_ERROR";
export const SET_ORDERS = "SET_ORDERS";

export const wsConnect = createAction<string, typeof ORDER_FEED_CONNECT>(ORDER_FEED_CONNECT);
export const wsDisconnect = createAction(ORDER_FEED_DISCONNECT);
export const wsConnecting = createAction(ORDER_FEED_WS_CONNECTING);
export const wsOpen = createAction(ORDER_FEED_WS_OPEN);
export const wsClose = createAction(ORDER_FEED_WS_CLOSE);
export const wsMessage = createAction<TOrdersFeed, typeof ORDER_FEED_WS_MESSAGE>(ORDER_FEED_WS_MESSAGE);
export const wsError = createAction<string, typeof ORDER_FEED_WS_ERROR>(ORDER_FEED_WS_ERROR);
export const setOrders = createAction<Array<TOrderFeed>, typeof SET_ORDERS>(SET_ORDERS);


interface IWsConnect {
  readonly type: typeof ORDER_FEED_CONNECT;
  payload: string;
}

interface IWsDisconnect {
  readonly type: typeof ORDER_FEED_DISCONNECT;
}

interface IWsConnecting {
  readonly type: typeof ORDER_FEED_WS_CONNECTING;
}

interface IWsOpen {
  readonly type: typeof ORDER_FEED_WS_OPEN;
}

interface IWsClose {
  readonly type: typeof ORDER_FEED_WS_CLOSE;
}

interface IWsMessage {
  readonly type: typeof ORDER_FEED_WS_MESSAGE;
  payload: TOrdersFeed;
}

interface IWsError {
  readonly type: typeof ORDER_FEED_WS_ERROR;
  payload: string;
}

interface ISetOrders {
  readonly type: typeof SET_ORDERS;
  payload: Array<TOrderFeed>;
}

export type TWsActions =
  | IWsConnect
  | IWsDisconnect
  | IWsConnecting
  | IWsOpen
  | IWsClose
  | IWsMessage
  | IWsError
  | ISetOrders;
