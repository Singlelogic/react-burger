import {v4 as uuidv4} from 'uuid';
import { ADD_INGREDIENT, DELETE_INGREDIENT, SET_ORDER_NUMBER } from './actions';
import { initConstructor } from './constructor-context';

export const burgerConstructorReducer = (state = initConstructor, action) => {
  switch (action.type) {

    case ADD_INGREDIENT:
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
          totalPrice: getTotalPrice(state.ingredients, action.payload),
        };
      } else {
        const ingredient = {...action.payload, id: uuidv4()};
        const ingredients = [...state.ingredients, ingredient];
        return {
          ...state,
          ingredients: ingredients,
          totalPrice: getTotalPrice(ingredients, state.bun),
        };
      }

    case DELETE_INGREDIENT:
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: null,
          totalPrice: getTotalPrice(state.ingredients, null)
        };
      } else {
        let ingredients = state.ingredients.filter((ingredient) => {
          return ingredient.id !== action.payload.id;
        })
        return {
          ...state,
          ingredients: ingredients,
          totalPrice: getTotalPrice(ingredients, state.bun),
        };
      }

    case SET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload.number,
      }

    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}


function getTotalPrice(ingredients, bun) {
  const priceBun = bun ? bun.price * 2 : 0;
  const priceIngredients = ingredients.reduce((acc, ingredient) => {
    return acc + ingredient.price
  }, 0);

  return priceBun + priceIngredients;
}
