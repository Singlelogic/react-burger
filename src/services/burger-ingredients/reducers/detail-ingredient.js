import { SELECT_INGREDIENT, UNSELECT_INGREDIENT } from '../actions';

const initialState = {
  ingredient: null,
}

export const detailIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_INGREDIENT:
      return {
        ...state,
        ingredient: action.ingredient,
      }
    case UNSELECT_INGREDIENT:
      return {
        ...state,
        ingredient: null,
      }
    default:
      return state;
  }
}
