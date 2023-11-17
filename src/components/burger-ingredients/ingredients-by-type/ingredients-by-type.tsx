import { FC } from "react";

import CardIngredient from "../ingredient-card/ingredient-card";
import { IIngredient } from "../../../types/ingredient";


interface IIngredientsByType {
  type: string;
  ingredients: IIngredient[];
}

const IngredientsByType: FC<IIngredientsByType> = ({ type, ingredients }) => {
  return (
    <section>
      <h2>{type}</h2>
      {ingredients.map((ingredient) => (
        <CardIngredient key={ingredient._id} ingredient={ingredient} />
      ))}
    </section>
  )
}

export default IngredientsByType;
