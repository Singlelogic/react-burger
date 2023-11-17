import {
  ADD_INGREDIENT_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT_BUN,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
  TBurgerConstructorActions,
} from '../actions';
import { IIngredient } from "../../../types/ingredient";

type TConstructorIngredientsState = {
  ingredients: Array<IIngredient>;
  bun: null | IIngredient;
}

const initialState: TConstructorIngredientsState = {
  ingredients: [],
  bun: null,
}

export const ConstructorIngredientsReducer = (state = initialState, action: TBurgerConstructorActions) => {
  switch (action.type) {
    case ADD_INGREDIENT_BUN:
      return {
        ...state,
        bun: action.ingredient,
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
