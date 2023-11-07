import { createReducer } from "@reduxjs/toolkit";

import { wsConnecting, wsOpen, wsClose, wsMessage, wsError } from "./actions";
import { TOrdersFeed, WebSocketStatus } from "../../types/order-feed";


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
    .addCase(wsError, (state, action: any) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action: any) => {
      state.ordersFeed = action.payload;
    })
})
