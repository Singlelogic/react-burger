import { combineReducers } from 'redux';
import {
  burgerIngredientsReducer,
  detailIngredientReducer,
} from './burger-ingredients/reducer';
import {
  ConstructorIngredientsReducer,
  orderReducer,
} from './burger-constructor/reducer';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  detailIngredient: detailIngredientReducer,
  burgerConstructor: ConstructorIngredientsReducer,
  order: orderReducer,
});
