import { FC, useMemo } from "react";
import { useParams } from "react-router-dom";

import styles from "./ingredient-details.module.css";
import Nutrient from "./nutrient/nutrient";
import { useSelector } from "../../../services/store";
import { IIngredient } from "../../../types/ingredient";
import { getBurgerIngredientsStore } from "../../../utils/store";


interface ICardIngredient {
  ingredientId?: string;
  isShowTitle?: boolean;
}

const IngredientDetails: FC<ICardIngredient> = ({ ingredientId, isShowTitle = true }) => {
  const { id: paramId } = useParams();
  const { ingredients, ingredientsRequest } = useSelector(getBurgerIngredientsStore);
  const id = ingredientId ? ingredientId : paramId;

  const ingredient = useMemo(() => {
    return ingredients.find((item: IIngredient) => item._id === id);
  }, [ingredients, id]);

  return (
    <>
      {isShowTitle &&
        <div className={`text text_type_main-large ${styles.title}`}>
          Детали ингредиента
        </div>
      }
      <div>
        {!ingredientsRequest && ingredient ?
          <div className={styles.content}>
            <img src={ingredient.image} alt={ingredient.name} />
            <p className="text text_type_main-medium" data-test-id="ingredient-name">
              {ingredient.name}
            </p>
            <div className={styles.nutrients}>
              <Nutrient title="Калории, ккал" value={ingredient.calories} />
              <Nutrient title="Белки, г" value={ingredient.proteins} />
              <Nutrient title="Жиры, г" value={ingredient.fat} />
              <Nutrient title="Углеводы, г" value={ingredient.carbohydrates} />
            </div>
          </div>
        :
          <span>Ингредиент с ID: "{id}" не найден!</span>
        }
      </div>
    </>
  )
}

export default IngredientDetails;
