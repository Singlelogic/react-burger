import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";

import styles from "./burger-constructor-item.module.css";
import {
  deleteIngredient,
  moveIngredient,
} from "../../../services/burger-constructor/actions";
import { useDispatch, useSelector } from "../../../services/store";
import { IIngredient } from "../../../types/ingredient";
import { getBurgerConstructor } from "../../../utils/store";


interface IBurgerConstructorItem {
  ingredient: IIngredient;
}

const BurgerConstructorItem: FC<IBurgerConstructorItem> = ({ ingredient }) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getBurgerConstructor);

  const [{ opacity }, refDrag] = useDrag({
    type: 'burger-constructor',
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.3 : 1,
    })
  })

  const [{ isHover }, targetDrop] = useDrop({
    accept: 'burger-constructor',
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(dragIngredient: IIngredient) {
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
          handleClose={() => dispatch(deleteIngredient(ingredient))}
        />
      </section>
    </section>
  )
}

export default BurgerConstructorItem;
