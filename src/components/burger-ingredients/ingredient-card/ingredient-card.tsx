import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, FC } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./ingredient-card.module.css";
import { getBurgerConstructor } from "../../burger-constructor/burger-constructor";
import { IIngredient } from "../../burger-constructor/burger-constructor";
import {
  IIngredientProp,
} from "../../burger-constructor/burger-constructor-item/burger-constructor-item";


const CardIngredient: FC<IIngredientProp> = ({ ingredient }) => {
  const burgerConstructor = useSelector(getBurgerConstructor);

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

  return (
    <div className={styles.content}>
      <Link style= {{ textDecoration: "none" }} to={{
        pathname: `ingredients/${ingredient._id}`,
        search: "isModal=true",
      }}>
        <div className={styles.card} ref={refDrag}>
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
      </Link>
    </div>
  )
}

export default CardIngredient;
