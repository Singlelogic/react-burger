import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../../../../services/burger-ingredients/actions";
import {
  burgerIngredientsReducer
} from "../../../../services/burger-ingredients/reducers/burger-ingredients";


describe("ingredientsReducer", () => {
  it("should return the initial state", () => {
    expect(
      burgerIngredientsReducer(undefined, {})
    ).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_REQUEST", () => {
    expect(
      burgerIngredientsReducer([], {
        type: GET_INGREDIENTS_REQUEST,
      })
    ).toEqual({
      ingredientsRequest: true,
      ingredientsFailed: false,
    });
  });

  it("should handle GET_INGREDIENTS_SUCCESS", () => {
    expect(
      burgerIngredientsReducer([], {
        type: GET_INGREDIENTS_SUCCESS,
        data: "DATA"
      })
    ).toEqual({
      ingredientsRequest: false,
      ingredientsFailed: false,
      ingredients: "DATA",
    });
  });

  it("should handle GET_INGREDIENTS_FAILED", () => {
    expect(
      burgerIngredientsReducer([], {
        type: GET_INGREDIENTS_FAILED,
      })
    ).toEqual({
      ingredientsRequest: false,
      ingredientsFailed: true,
    });
  });
});
