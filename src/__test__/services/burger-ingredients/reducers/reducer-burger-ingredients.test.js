import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../../../../services/burger-ingredients/actions";
import {
  burgerIngredientsReducer,
  initialState
} from "../../../../services/burger-ingredients/reducers/burger-ingredients";


describe("Burger ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(
      burgerIngredientsReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_SUCCESS,
        data: [1, 2, 3],
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredients: [1, 2, 3],
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      burgerIngredientsReducer(initialState, {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ...initialState,
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });
});
