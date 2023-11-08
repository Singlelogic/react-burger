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
  setOrders as OrderFeedSetOrders,
} from "./order-feed/actions";
import { TForgotPasswordActions } from "./auth/forgot-password/actions";
import { TLoginActions } from "./auth/login/actions";
import { TLogoutActions } from "./auth/logout/actions";
import { TRegistrationActions } from "./auth/registration/actions";
import { TResetPasswordActions } from "./auth/reset-password/actions";
import { TBurgerConstructorActions } from "./burger-constructor/actions";
import { TBurgerIngredientsActions } from "./burger-ingredients/actions";
import { TUserActions } from "./user/actions";
import { rootReducer } from "./reducers";
import { socketMiddleware } from "../middlewares/socket-middleware";


export type RootState = ReturnType<typeof rootReducer>;

const orderFeedMiddleware = socketMiddleware({
  wsConnect: OrderFeedWsConnect,
  wsDisconnect: OrderFeedWsDisconnect,
  wsConnecting: OrderFeedWsConnecting,
  wsOpen: OrderFeedWsOpen,
  wsClose: OrderFeedWsClose,
  wsMessage: OrderFeedWsMessage,
  wsError: OrderFeedWsError,
  setOrders: OrderFeedSetOrders,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(orderFeedMiddleware);
  }
});

export type TAppActions = TForgotPasswordActions
  | TLoginActions
  | TLogoutActions
  | TRegistrationActions
  | TResetPasswordActions
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TUserActions;
export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TAppActions>
export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
