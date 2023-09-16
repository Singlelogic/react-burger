import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients/reducer';
import { burgerConstructorReducer } from './burger-constructor/reducer';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
});
