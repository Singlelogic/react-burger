import { getIngredientsRequest } from "./api";
import { TAppThunk } from "../store";
import { IIngredient } from "../../types/ingredient";


export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

interface IIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  data: Array<IIngredient>;
}

interface IIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TBurgerIngredientsActions =
  | IIngredientsRequest
  | IIngredientsSuccess
  | IIngredientsFailed;

export const getIngredients = (): TAppThunk => {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}
