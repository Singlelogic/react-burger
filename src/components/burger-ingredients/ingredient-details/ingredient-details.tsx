import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import styles from "./ingredient-details.module.css";
import Nutrient from "./nutrient/nutrient";
import Modal from "../../modal/modal";
import { IIngredient } from "../../../types/ingredient";
import { getBurgerIngredientsStore } from "../../../utils/store";


interface ICardIngredient {
  ingredientId?: string
}

const IngredientDetails: FC<ICardIngredient> = ({ ingredientId }) => {
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const [searchParams] = useSearchParams();
  const { ingredients, ingredientsRequest } = useSelector(getBurgerIngredientsStore);
  const id = ingredientId ? ingredientId : paramId;

  const ingredient = useMemo(() => {
    return ingredients.find((item: IIngredient) => item._id === id);
  }, [ingredients, id]);

  function handleCloseModal() {
    navigate("/");
  }

  return (
    <>
      <div className={`text text_type_main-large ${styles.title}`}>
        Детали ингредиента
      </div>
      <div>
        {!ingredientsRequest && ingredient ?
          <div className={styles.content}>
            <img src={ingredient.image} alt={ingredient.name} />
            <p className="text text_type_main-medium">{ingredient.name}</p>
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
