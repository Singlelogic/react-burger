import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SELECT_INGREDIENT,
  UNSELECT_INGREDIENT,
} from './actions';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

const detailIngredientInitialState = {
  ingredient: null,
}

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true,
        ingredientsFailed: false,
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.data,
        ingredientsRequest: false,
        ingredientsFailed: false,
      }
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      }
    default:
      return state;
  }
}

export const detailIngredientReducer = (state = detailIngredientInitialState, action) => {
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
