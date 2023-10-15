import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./burger-constructor.module.css";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";
import OrderDetails from "./order-details/order-details";
import Modal from "../modal/modal";
import { getUserStore } from "../protected-route-element/protected-route-element";
import { addIngredient, sendOrder } from "../../services/burger-constructor/actions";


export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  id?: number;
}
export const getBurgerConstructor = (state: any) => state.burgerConstructor;

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const burgerConstructor = useSelector(getBurgerConstructor)
  const { loadUser, user } = useSelector(getUserStore);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'burger-ingredients',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      // @ts-ignore
      dispatch(addIngredient(ingredient))
    },
  })

  const isOrderAllowed = useMemo(() => {
    return burgerConstructor.bun !== null;
  }, [burgerConstructor.bun])

  function handleOrder() {
    if (!loadUser.isRequest) {
      if (user.data) {
        // @ts-ignore
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
      ingredientIds.push(burgerConstructor.bun._id);
    }
    burgerConstructor.ingredients.map((ingredient: IIngredient) => {
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
    const priceIngredients = ingredients.reduce((acc: number, ingredient: IIngredient) => {
      return acc + ingredient.price
    }, 0);

    return priceBun + priceIngredients;
  }, [burgerConstructor])

  const className = `${styles.list_ingredients} ${ isHover ? styles.on_hover : '' }`;

  return (
    <div className={styles.burger_constructor}>

      <div className={className} ref={dropTarget}>
        {burgerConstructor.bun &&
          <>
            <span className={styles.drag_bun}><DragIcon type="primary" /></span>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={burgerConstructor.bun.name + " (верх)"}
              price={burgerConstructor.bun.price}
              thumbnail={burgerConstructor.bun.image}
            />
          </>
        }

        <div className={styles.middle_ingredients}>
          {burgerConstructor.ingredients.map((ingredient: IIngredient) => {
            return <BurgerConstructorItem key={ingredient.id} ingredient={ingredient} />
          })}
        </div>

        {burgerConstructor.bun &&
          <>
            <span className={styles.drag_bun}><DragIcon type="primary" /></span>
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
        <Button
          type="primary"
          size="medium"
          onClick={handleOrder}
          htmlType={"button"}
          disabled={!isOrderAllowed}
        >
          Оформить заказ
        </Button>
      </div>
      {!isOrderAllowed &&
        <div className={styles.help_text}>
          Для оформления заказа необходимо добавить булку!
        </div>
      }

      {isVisible &&
        <Modal onClose={handleCloseModal} >
          <OrderDetails />
        </Modal>
      }
    </div>
  );
}

export default BurgerConstructor;
