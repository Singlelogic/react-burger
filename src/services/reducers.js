import { combineReducers } from 'redux';
import { burgerIngredientsReducer } from './burger-ingredients/reducer';

export const rootReducer = combineReducers({
  ingredients: burgerIngredientsReducer,
});
