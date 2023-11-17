import { combineReducers } from "redux";

import { authReducer } from "./auth/reducers";
import { ConstructorIngredientsReducer } from "./burger-constructor/reducers/burger-constructor";
import { orderReducer } from "./burger-constructor/reducers/order";
import { burgerIngredientsReducer } from "./burger-ingredients/reducers/burger-ingredients";
import { orderFeedReducer } from "./order-feed/reducer";
import { userReducer } from "./user/reducers";


export const rootReducer = combineReducers({
  auth: authReducer,
  burgerConstructor: ConstructorIngredientsReducer,
  burgerIngredients: burgerIngredientsReducer,
  order: orderReducer,
  orderFeed: orderFeedReducer,
  user: userReducer,
});
