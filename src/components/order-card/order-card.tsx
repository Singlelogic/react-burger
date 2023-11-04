import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./order-card.module.css";
import { IIngredient } from "../burger-constructor/burger-constructor";
import { TOrderFeed } from "../../types/order-feed";
import { formatDate } from "../../utils/date";
import { getBurgerIngredientsStore } from "../../utils/store";


type TOrderCard = {
  order: TOrderFeed;
  isShowStatus?: boolean;
}

const OrderCard: FC<TOrderCard> = ({ order, isShowStatus = true }) => {
  const { ingredients } = useSelector(getBurgerIngredientsStore);

  const totalPrice = useMemo(() => {
    return order.ingredients.reduce((acc, id) => {
      const ingredient = ingredients.find((ingredient: IIngredient) => ingredient._id === id)
      acc = ingredient ? acc + ingredient.price : 0;
      return acc
    }, 0)
  }, [order.ingredients, ingredients]);

  const getStatusLabel = useCallback((status: string) => {
    switch (status) {
      case 'created':
        return 'Создан';
      case 'pending':
        return 'Готовится';
      case 'done':
        return 'Выполнен';
      default:
        return 'unknown';
    }
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'pending':
        return styles.pending;
      default:
        return '';
    }
  }, []);

  return (
    <div className={styles.cardOrder}>
      <div className={styles.orderNumber}>
        <span className="text text_type_digits-default">#{ order.number }</span>
        <span className={`text text_type_main-default text_color_inactive ${styles.timestamp}`}>
          { formatDate(order.createdAt) }
        </span>
      </div>
      <div className={styles.info}>
        <div className={`text text_type_main-medium ${styles.name}`}>
          { order.name }
        </div>
        {isShowStatus &&
          <div className={`text text_type_main-small ${getStatusColor(order.status)}`}>
            { getStatusLabel(order.status) }
          </div>
        }
      </div>
      <div className={styles.ingredients}>
        <div className={styles.images}>Images</div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">{ totalPrice }</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderCard;
