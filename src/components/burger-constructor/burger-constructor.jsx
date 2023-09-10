import { useState, useContext, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';
import { ConstructorContext } from '../../services/burger-constructor/constructor-context';
import { SET_ORDER_NUMBER } from '../../services/burger-constructor/actions';

function BurgerConstructor() {
  const [isVisible, setIsVisible] = useState(false);
  const { burgerConstructor, burgerConstructorDispatch } = useContext(ConstructorContext);

  function handleOrder() {
    sendOrder();
    handleOpenModal();
  }

  function sendOrder() {
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "ingredients": _getIngredientIds(),
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`${res.statusText} (status: ${res.status})`);
        }
        return res.json()
      })
      .then((data) => {
        if (data.success) {
          burgerConstructorDispatch({
            type: SET_ORDER_NUMBER,
            payload: {
              number: data.order.number,
            },
          })
        }
      })
      .catch(e => {
        console.log('Error:', e.message);
      });
  }

  function _getIngredientIds() {
    let ingredientIds = [];

    if (burgerConstructor.bun) {
      ingredientIds.push(burgerConstructor.bun._id);
    }
    burgerConstructor.ingredients.map((ingredient) => {
      return ingredientIds.push(ingredient._id);
    })

    return ingredientIds;
  }

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

  return (
    <div className={styles.burger_constructor}>

      <div className={styles.list_ingredients}>
        {burgerConstructor.bun &&
          <ConstructorElement
            type="top"
            isLocked={true}
            text={burgerConstructor.bun.name + " (верх)"}
            price={burgerConstructor.bun.price}
            thumbnail={burgerConstructor.bun.image}
          />
        }

        <div className={styles.middle_ingredients}>
          {burgerConstructor.ingredients.map((ingredient) => {
            return <BurgerConstructorItem key={ingredient.id} ingredient={ingredient} />
          })}
        </div>

        {burgerConstructor.bun &&
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={burgerConstructor.bun.name + " (низ)"}
            price={burgerConstructor.bun.price}
            thumbnail={burgerConstructor.bun.image}
          />
        }
      </div>

      <div className={styles.order}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <CurrencyIcon type="primary"/>
        <Button type="primary" size="medium" onClick={handleOrder}>
          Оформить заказ
        </Button>
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
