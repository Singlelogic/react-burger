import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

import styles from "./burger-constructor-item.module.css";
import { IIngredient } from "../burger-constructor";
import {
  deleteIngredient,
  moveIngredient,
} from "../../../services/burger-constructor/actions";


export interface IIngredientProp {
  ingredient: IIngredient;
}
const getConstructorIngredients = (state: any) => state.burgerConstructor.ingredients;

const BurgerConstructorItem: FC<IIngredientProp> = ({ ingredient }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(getConstructorIngredients);

  const [{ opacity }, refDrag] = useDrag({
    type: 'burger-constructor',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    })
  })

  const [{ isHover }, targetDrop] = useDrop({
    accept: 'burger-constructor',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(dragIngredient) {
      // @ts-ignore
      dispatch(moveIngredient(dragIngredient, ingredient, ingredients));
    }
  })

  return (
    <section ref={targetDrop}>
      <span className={`${isHover ? styles.on_hover : styles.hidden}`}/>
      <section ref={refDrag} style={{ opacity }}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          // @ts-ignore
          handleClose={() => dispatch(deleteIngredient(ingredient))}
        />
      </section>
    </section>
  )
}

export default BurgerConstructorItem;
