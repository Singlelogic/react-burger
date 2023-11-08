import { createReducer } from "@reduxjs/toolkit";

import { wsConnecting, wsOpen, wsClose, wsMessage, wsError, setOrders } from "./actions";
import { TOrdersFeed, WebSocketStatus, TOrderFeed } from "../../types/order-feed";


export type OrderFeedStore = {
  status: WebSocketStatus;
  ordersFeed: TOrdersFeed;
  connectingError: string;
}

const initialState: OrderFeedStore = {
  status: WebSocketStatus.OFFLINE,
  ordersFeed: {
    orders: [],
    total: "",
    totalToday: "",
  },
  connectingError: "",
}

export const orderFeedReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
      state.status = WebSocketStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.status = WebSocketStatus.ONLINE;
      state.connectingError = "";
    })
    .addCase(wsClose, state => {
      state.status = WebSocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action: {payload: string}) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action: {payload: TOrdersFeed}) => {
      state.ordersFeed = action.payload;
    })
    .addCase(setOrders, (state, action: {payload: Array<TOrderFeed>}) => {
      state.ordersFeed.orders = action.payload;
    })
})
