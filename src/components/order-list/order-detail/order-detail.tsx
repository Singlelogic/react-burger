import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./order-detail.module.css";
import { IIngredient } from "../../burger-constructor/burger-constructor";
import { formatDate } from "../../../utils/date";
import { getBurgerIngredientsStore, getOrderFeedStore } from "../../../utils/store";
import { getStatusLabel, getStatusColor } from "../../../utils/order";
import { TOrderFeed } from "../../../types/order-feed";


const OrderDetail = () => {
  const { ingredients } = useSelector(getBurgerIngredientsStore);
  const { ordersFeed: { orders } } = useSelector(getOrderFeedStore);
  const { id } = useParams();

  const order = useMemo(() => {
    return orders && orders.find((order: TOrderFeed) => order._id === id);
  }, [orders, id]);

  const groupedIngredients = useMemo(() => {
    return order.ingredients.reduce((acc: any, itemId: string) => {
      if (acc[itemId] === undefined) {
        const ingredient = ingredients.find(
          (ingredient: IIngredient) => ingredient._id === itemId)
        ;
        acc[itemId] = {...ingredient, count: 1}
      } else {
        acc[itemId] = {...acc[itemId], count: acc[itemId]['count'] + 1}
      }
      return acc
    }, {})
  }, [order.ingredients, ingredients]);

  const totalPrice = useMemo(() => {
    return Object.values(groupedIngredients).reduce((acc: any, item: any) => {
      return acc += (item.price * item.count)
    }, 0)
  }, [groupedIngredients]);

  return (
    <>
      {order &&
        <div className={styles.container}>
          <div className={styles.content}>

            <div className={`text text_type_digits-default ${styles.number}`}>
              #{ order.number }
            </div>

            <div className={`text text_type_main-medium ${styles.name}`}>
              { order.name }
            </div>

            <div
              className={`text text_type_main-small ${styles.status}`}
              style={{'color': getStatusColor(order.status)}}
            >
              { getStatusLabel(order.status) }
            </div>

            <div className={`text text_type_main-medium ${styles.structure}`}>
              Состав:
            </div>

            <div className={styles.ingredients}>
              {Object.values(groupedIngredients).map((ingredient: any) => {
                return (
                  <div key={ingredient._id} className={styles.ingredient}>
                    <div className={styles.image}>
                      <img src={ ingredient.image_mobile } alt="ingredient" />
                    </div>
                    <div className={`text text_type_main-default ${styles.ingredientName}`}>
                      { ingredient.name }
                    </div>
                    <div className={styles.price}>
                      <span className="text text_type_digits-default">
                        { ingredient.count }&nbsp;x&nbsp;{ ingredient.price }
                      </span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={styles.footer}>
              <span className="text text_type_main-default text_color_inactive">
                { formatDate(order.createdAt) }
              </span>
              <div className={styles.totalPrice}>
                <div className="text text_type_digits-default">
                  <>{ totalPrice }</>
                </div>
                <CurrencyIcon type="primary" />
              </div>
            </div>

          </div>
        </div>
      }
    </>
  )
}

export default OrderDetail;
