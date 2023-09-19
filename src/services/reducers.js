import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients/reducers/burger-ingredients';
import { detailIngredientReducer } from './burger-ingredients/reducers/detail-ingredient';
import { ConstructorIngredientsReducer } from './burger-constructor/reducers/burger-constructor';
import { orderReducer } from './burger-constructor/reducers/order';

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  detailIngredient: detailIngredientReducer,
  burgerConstructor: ConstructorIngredientsReducer,
  order: orderReducer,
});
