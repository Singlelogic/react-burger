import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from '../actions';

const initialState = {
  sendOrderRequest: false,
  sendOrderFailed: false,
  orderNumber: null,
}

export const orderReducer = (state = initialState, action) => {
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
