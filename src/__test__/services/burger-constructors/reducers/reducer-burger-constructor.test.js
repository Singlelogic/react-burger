import { ingredient1, ingredient2, ingredients } from "../../../fixtures/ingredient";
import {
  ADD_INGREDIENT_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT_BUN,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR,
} from "../../../../services/burger-constructor/actions";
import {
  ConstructorIngredientsReducer,
  initialState,
} from "../../../../services/burger-constructor/reducers/burger-constructor";


describe("Constructor ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(
      ConstructorIngredientsReducer(undefined, {})
    ).toEqual(initialState);
  });

  it("should handle ADD_INGREDIENT_BUN", () => {
    expect(
      ConstructorIngredientsReducer(initialState, {
        type: ADD_INGREDIENT_BUN,
        ingredient: "DATA",
      })
    ).toEqual({
      ...initialState,
      bun: "DATA",
    });
  });

  it("should handle ADD_INGREDIENT", () => {
    expect(
      ConstructorIngredientsReducer(initialState, {
        type: ADD_INGREDIENT,
        ingredient: "DATA",
      })
    ).toEqual({
      ...initialState,
      ingredients: ["DATA"],
    });
  });

  it("should handle DELETE_INGREDIENT_BUN", () => {
    expect(
      ConstructorIngredientsReducer(initialState, {
        type: DELETE_INGREDIENT_BUN,
        ingredient: null,
      })
    ).toEqual({
      ...initialState,
      bun: null,
    });
  });

  it("should handle DELETE_INGREDIENT", () => {
    const constructorIngredient1 = {...ingredient1, id: 1};
    const constructorIngredient2 = {...ingredient2, id: 2};
    const customInitialState = {
      ...initialState,
      ingredients: [
        constructorIngredient1,
        constructorIngredient2,
      ]
    }

    expect(
      ConstructorIngredientsReducer(customInitialState, {
        type: DELETE_INGREDIENT,
        ingredient: constructorIngredient1,
      })
    ).toEqual({
      ...initialState,
      ingredients: [constructorIngredient2],
    });
  });

  it("should handle MOVE_INGREDIENT", () => {
    expect(
      ConstructorIngredientsReducer(initialState, {
        type: MOVE_INGREDIENT,
        ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients,
    });
  });

  it("should handle CLEAR_CONSTRUCTOR", () => {
    expect(
      ConstructorIngredientsReducer(initialState, {
        type: CLEAR_CONSTRUCTOR,
      })
    ).toEqual({
      ...initialState,
    });
  });
});
