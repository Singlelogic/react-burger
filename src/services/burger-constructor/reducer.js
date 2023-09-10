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
        };
      } else {
        const ingredient = {...action.payload, id: uuidv4()};
        return {
          ...state,
          ingredients: [...state.ingredients, ingredient],
        };
      }

    case DELETE_INGREDIENT:
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: null,
        };
      } else {
        return {
          ...state,
          ingredients: state.ingredients.filter((ingredient) => {
            return ingredient.id !== action.payload.id;
          })
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
