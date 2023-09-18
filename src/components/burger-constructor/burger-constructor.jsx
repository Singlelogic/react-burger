import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './burger-constructor.module.css';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { addIngredient, sendOrder } from '../../services/burger-constructor/actions';

function BurgerConstructor() {
  const [isVisible, setIsVisible] = useState(false);
  const burgerConstructor = useSelector(store => store.burgerConstructor)

  const dispatch = useDispatch();

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'burger-ingredients',
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient))
    },
  })

  const isOrderAllowed = useMemo(() => {
    return burgerConstructor.bun !== null;
  }, [burgerConstructor.bun])

  function handleOrder() {
    dispatch(sendOrder(ingredientIds));
    handleOpenModal();
  }

  const ingredientIds = useMemo(() => {
    let ingredientIds = [];

    if (burgerConstructor.bun) {
      ingredientIds.push(burgerConstructor.bun._id);
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
          {burgerConstructor.ingredients.map((ingredient) => {
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
