import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

import {
  wsConnect as OrderFeedWsConnect,
  wsDisconnect as OrderFeedWsDisconnect,
  wsConnecting as OrderFeedWsConnecting,
  wsOpen as OrderFeedWsOpen,
  wsClose as OrderFeedWsClose,
  wsMessage as OrderFeedWsMessage,
  wsError as OrderFeedWsError,
} from "./order-feed/actions";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "../middlewares/socket-middleware";
import { TOrderFeedActions } from "../types/order-feed";


export type RootState = ReturnType<typeof rootReducer>;

const orderFeedMiddleware = socketMiddleware({
  wsConnect: OrderFeedWsConnect,
  wsDisconnect: OrderFeedWsDisconnect,
  wsConnecting: OrderFeedWsConnecting,
  wsOpen: OrderFeedWsOpen,
  wsClose: OrderFeedWsClose,
  wsMessage: OrderFeedWsMessage,
  wsError: OrderFeedWsError,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderFeedMiddleware);
  }
});

export type TAppActions = TOrderFeedActions;
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
