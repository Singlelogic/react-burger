import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import styles from "./burger-constructor.module.css";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";
import { addIngredient, sendOrder } from "../../services/burger-constructor/actions";
import { useDispatch, useSelector } from "../../services/store";
import { IIngredient } from "../../types/ingredient";
import { getBurgerConstructor, getUserStore } from "../../utils/store";


function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const burgerConstructor = useSelector(getBurgerConstructor)
  const { loadUser, user } = useSelector(getUserStore);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'burger-ingredients',
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient: IIngredient) {
      dispatch(addIngredient(ingredient))
    },
  })

  const isOrderAllowed = useMemo(() => {
    return burgerConstructor.bun !== null;
  }, [burgerConstructor.bun])

  function handleOrder() {
    if (!loadUser.isRequest) {
      if (user.data) {
        dispatch(sendOrder(ingredientIds));
        handleOpenModal();
      } else {
        return navigate("/login");
      }
    }
  }

  const ingredientIds = useMemo(() => {
    let ingredientIds = [];

    if (burgerConstructor.bun) {
      for (let i = 0; i < 2; i++) {
        ingredientIds.push(burgerConstructor.bun._id);
      }
    }

    burgerConstructor.ingredients.map((ingredient) => {
      return ingredientIds.push(ingredient._id);
    })

    return ingredientIds;
  }, [burgerConstructor.bun, burgerConstructor.ingredients])

  function handleOpenModal() {
    setIsVisible(true);
  }

  function handleCloseModal() {
    setIsVisible(false);
  }

  const totalPrice = useMemo(() => {
    const bun = burgerConstructor.bun;
    const ingredients = burgerConstructor.ingredients;

    const priceBun = bun ? bun.price * 2 : 0;
    const priceIngredients = ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price
    }, 0);

    return priceBun + priceIngredients;
  }, [burgerConstructor])

  const className = `${styles.listIngredients} ${ isHover ? styles.onHover : '' }`;

  return (
    <div className={styles.content}>

      <div className={className} ref={dropTarget} data-test-id="constructor-drop">
        {burgerConstructor.bun &&
          <>
            <span className={styles.dragBun}><DragIcon type="primary" /></span>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerConstructor.bun.name + " (верх)"}
              price={burgerConstructor.bun.price}
              thumbnail={burgerConstructor.bun.image}
            />
          </>
        }

        <div className={styles.middleIngredients}>
          {burgerConstructor.ingredients.map((ingredient) => {
            return <BurgerConstructorItem key={ingredient.id} ingredient={ingredient} />
          })}
        </div>

        {burgerConstructor.bun &&
          <>
            <span className={styles.dragBun}><DragIcon type="primary" /></span>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={burgerConstructor.bun.name + " (низ)"}
              price={burgerConstructor.bun.price}
              thumbnail={burgerConstructor.bun.image}
            />
          </>
        }
      </div>

      <div className={styles.order}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <CurrencyIcon type="primary"/>
        <div
          className={`${isOrderAllowed ? '': styles.tooltipContent}`}
          data-tooltip="Для оформления заказа необходимо добавить булку!"
        >
          <Button
            type="primary"
            size="medium"
            onClick={handleOrder}
            htmlType={"button"}
            disabled={!isOrderAllowed}
            data-test-id="btn-make-an-order"
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isVisible &&
        <Modal onClose={handleCloseModal} >
          <OrderDetails />
        </Modal>
      }
    </div>
  );
}

export default BurgerConstructor;
