import { RootState } from "../services/store";


/* burgerConstructor */
export const getBurgerConstructor = (state: RootState) => state.burgerConstructor;

/* burgerIngredients */
export const getBurgerIngredientsStore = (state: RootState) => state.burgerIngredients;

/* orderFeed */
export const getOrderFeedStore = (state: RootState) => state.orderFeed;
