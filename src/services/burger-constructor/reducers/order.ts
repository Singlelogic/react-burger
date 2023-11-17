import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  TBurgerConstructorActions,
} from '../actions';


type TOrderState = {
  sendOrderRequest: boolean;
  sendOrderFailed: boolean;
  orderNumber: null,
}

const initialState: TOrderState = {
  sendOrderRequest: false,
  sendOrderFailed: false,
  orderNumber: null,
}

export const orderReducer = (state = initialState, action: TBurgerConstructorActions) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST:
      return {
        ...state,
        sendOrderRequest: true,
        sendOrderFailed: false,
      }
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.orderNumber,
        sendOrderRequest: false,
        sendOrderFailed: false,
      }
    case SEND_ORDER_FAILED:
      return {
        ...state,
        sendOrderRequest: false,
        sendOrderFailed: true,
      }
    default:
      return state;
  }
}
