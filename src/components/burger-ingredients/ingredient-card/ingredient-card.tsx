import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState, FC } from "react";
import { useDrag } from "react-dnd";

import styles from "./ingredient-card.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../../modal/modal";
import { useSelector } from "../../../services/store";
import { IIngredient } from "../../../types/ingredient";
import { getBurgerConstructor } from "../../../utils/store";


interface ICardIngredient {
  ingredient: IIngredient;
}

const CardIngredient: FC<ICardIngredient> = ({ ingredient }) => {
  const burgerConstructor = useSelector(getBurgerConstructor);
  const [isModal, setModal] = useState(false);

  const [, refDrag] = useDrag({
    type: 'burger-ingredients',
    item: ingredient,
  });

  const count = useMemo(() => {
    if (ingredient.type === 'bun' && burgerConstructor.bun) {
      return burgerConstructor.bun._id === ingredient._id ? 1 : 0;
    } else {
      return burgerConstructor.ingredients.reduce((acc: number, constructorIngredient: IIngredient) => {
        return acc + (constructorIngredient._id === ingredient._id ? 1 : 0)
      }, 0)
    }
  }, [
    burgerConstructor.ingredients,
    burgerConstructor.bun,
    ingredient._id,
    ingredient.type,
  ]);

  function handleClickCard() {
    setModal(true);
    window.history.pushState(null, '', `/ingredients/${ingredient._id}`);
  }

  function handleCloseModal() {
    setModal(false);
    window.history.pushState(null, '', '/');
  }

  return (
    <>
      <div className={styles.content} onClick={handleClickCard}>
        <div className={styles.card} ref={refDrag} data-test-id={ingredient._id}>
          {count !== 0 && <Counter count={count} size="small" />}
          <img src={ingredient.image} alt={ingredient.name} />
          <span className={styles.price}>
            <span className="text text_type_digits-default">{ingredient.price}</span>
            <CurrencyIcon type="primary" />
          </span>
          <span className="text text_type_main-small">
            {ingredient.name}
          </span>
        </div>
      </div>
      {isModal &&
        <Modal header="Детали ингредиента" onClose={handleCloseModal} >
          <IngredientDetails ingredientId={ingredient._id} isShowTitle={false} />
        </Modal>
      }
    </>
  )
}

export default CardIngredient;
