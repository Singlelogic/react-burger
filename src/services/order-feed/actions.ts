import { createAction } from "@reduxjs/toolkit";

import { TOrderFeedActions } from "../../types/order-feed";


export const wsConnect = createAction<string, "ORDER_FEED_CONNECT">("ORDER_FEED_CONNECT");
export const wsDisconnect = createAction("ORDER_FEED_DISCONNECT");
export const wsConnecting = createAction("ORDER_FEED_WS_CONNECTING");
export const wsOpen = createAction("ORDER_FEED_WS_OPEN");
export const wsClose = createAction("ORDER_FEED_WS_CLOSE");
export const wsMessage = createAction<TOrderFeedActions, "ORDER_FEED_WS_MESSAGE">("ORDER_FEED_WS_MESSAGE");
export const wsError = createAction<string, "ORDER_FEED_WS_ERROR">("ORDER_FEED_WS_ERROR");
export const setOrders = createAction<string, "SET_ORDERS">("SET_ORDERS");
