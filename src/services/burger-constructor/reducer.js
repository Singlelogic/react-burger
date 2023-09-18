import {
  ADD_INGREDIENT_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT_BUN,
  DELETE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  MOVE_INGREDIENT,
} from './actions';

const initialState = {
  ingredients: [],
  bun: null,
}

const orderInitialState = {
  sendOrderRequest: false,
  sendOrderFailed: false,
  orderNumber: null,
}

export const ConstructorIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_BUN:
      return {
        ...state,
        bun: action.bun,
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    case DELETE_INGREDIENT_BUN:
      return {
        ...state,
        bun: null,
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient) => {
          return ingredient.id !== action.ingredient.id;
        })
      };
    case MOVE_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
      }
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        ingredients: [],
        bun: null,
      }
    default:
      return state;
  }
}

export const orderReducer = (state = orderInitialState, action) => {
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
