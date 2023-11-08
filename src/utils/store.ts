import { RootState } from "../services/store";


/* burgerConstructor */
export const getBurgerConstructor = (state: RootState) => state.burgerConstructor;

/* burgerIngredients */
export const getBurgerIngredientsStore = (state: RootState) => state.burgerIngredients;

/* order */
export const getOrderStore = (state: RootState) => state.order;

/* orderFeed */
export const getOrderFeedStore = (state: RootState) => state.orderFeed;
