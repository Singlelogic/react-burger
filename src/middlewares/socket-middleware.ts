import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware } from "redux";

import { RootState } from "../services/store";
import { TOrderFeed, TOrdersFeed } from "../types/order-feed";


export type TWsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    wsOpen: ActionCreatorWithoutPayload,
    wsClose: ActionCreatorWithoutPayload,
    wsMessage: ActionCreatorWithPayload<TOrdersFeed>,
    wsError: ActionCreatorWithPayload<string>,
    setOrders: ActionCreatorWithPayload<Array<TOrderFeed>>,
};

export const socketMiddleware = (wsActions: TWsActionTypes): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        wsOpen,
        wsClose,
        wsMessage,
        wsError,
      } = wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(wsOpen());
        };

        socket.onerror = event  => {
          dispatch(wsError("Error"));
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: TOrdersFeed = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = event => {
          dispatch(wsClose());
        };

        if (wsDisconnect.match(action)) {
          socket.close();
          socket = null;
          dispatch(wsClose());
        }
      }

      next(action);
    };
  };
};
