import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import styles from "./ingredient-details.module.css";
import Nutrient from "./nutrient/nutrient";
import { getBurgerIngredients } from "../burger-ingredients";
import Modal from "../../modal/modal";


function IngredientDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { ingredients, ingredientsRequest } = useSelector(getBurgerIngredients);

  const ingredient = useMemo(() => {
    return ingredients.find((item) => item._id === id);
  }, [ingredients, id]);

  const isModal = useMemo(() => {
    const param = searchParams.get("isModal");
    return param && param === "true";
  }, [searchParams]);

  function handleCloseModal() {
    navigate("/");
  }

  const content = useMemo(() => {
    return (
      <>
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
      </>
    )
  }, [ingredientsRequest, ingredient])

  return (
    <>
      {isModal ?
        <Modal header="Детали ингредиента" onClose={handleCloseModal} >
          {content}
        </Modal>
      :
        <>
          <div className={`text text_type_main-large ${styles.title}`}>
            Детали ингредиента
          </div>
          {content}
        </>
      }
    </>
  )
}

export default IngredientDetails;
