import {v4 as uuidv4} from 'uuid';
import { sendOrderRequest } from './api';

export const ADD_INGREDIENT_BUN = 'ADD_INGREDIENT_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT_BUN = 'DELETE_INGREDIENT_BUN';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export function addIngredient(ingredient) {
  if (ingredient.type === 'bun') {
    return function(dispatch) {
      dispatch({
        type: ADD_INGREDIENT_BUN,
        bun: ingredient,
      })
    }
  } else {
    return function(dispatch) {
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: {...ingredient, id: uuidv4()},
      })
    }
  }
}

export function deleteIngredient(ingredient) {
  if (ingredient.type === 'bun') {
    return function(dispatch) {
      dispatch({
        type: DELETE_INGREDIENT_BUN,
        ingredient: ingredient,
      })
    }
  } else {
    return function(dispatch) {
      dispatch({
        type: DELETE_INGREDIENT,
        ingredient: ingredient,
      })
    }
  }
}

export function moveIngredient(dragIngredient, dropIngredient, ingredients) {
  let fromIndex = ingredients.indexOf(dragIngredient);
  let toIndex = ingredients.indexOf(dropIngredient);

  if (toIndex > fromIndex) {
    toIndex -= 1;
  }

  const newIngredients = [...ingredients];
  newIngredients.splice(toIndex, 0, newIngredients.splice(fromIndex, 1)[0]);

  return function(dispatch) {
    dispatch({
      type: MOVE_INGREDIENT,
      ingredients: newIngredients,
    })
  }
}

export function sendOrder(ingredientIds) {
  return function(dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    sendOrderRequest(ingredientIds).then(res => {
      if (res && res.success) {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          orderNumber: res.order.number,
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR,
        })
      } else {
        dispatch({
          type: SEND_ORDER_FAILED,
        });
      }
    });
  };
}
