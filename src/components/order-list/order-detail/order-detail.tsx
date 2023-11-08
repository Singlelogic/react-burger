import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./order-detail.module.css";
import { getOrderRequest } from "../../../services/burger-constructor/api";
import { setOrders } from "../../../services/order-feed/actions";
import { useSelector } from "../../../services/store";
import { IIngredient } from "../../../types/ingredient";
import { TOrderFeed } from "../../../types/order-feed";
import { formatDate } from "../../../utils/date";
import { getBurgerIngredientsStore, getOrderFeedStore } from "../../../utils/store";
import { getStatusLabel, getStatusColor } from "../../../utils/order";


interface IOrderDetail {
  orderNumber?: number;
  isShowTitle?: boolean;
}

export interface ICustomIngredient extends IIngredient {
  count: number;
}

interface ICustomIngredients {
  [key: string]: ICustomIngredient,
}

const OrderDetail: FC<IOrderDetail> = ({ orderNumber, isShowTitle = true }) => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getBurgerIngredientsStore);
  const { ordersFeed: { orders } } = useSelector(getOrderFeedStore);
  const { id: paramId } = useParams();

  const order = useMemo(() => {
    const id = orderNumber ? orderNumber : paramId;
    return orders.find((order: TOrderFeed) => {
      return order.number === parseInt(id as string)
    });
  }, [orders, orderNumber, paramId]);

  useEffect(() => {
    if (!order && paramId) {
      getOrderRequest(paramId).then(res => {
        dispatch(setOrders(res.orders))
      })
    }
  }, [dispatch, order, orderNumber, paramId])

  const groupedIngredients = useMemo(() => {
    if (order) {
      return order.ingredients.reduce((acc: ICustomIngredients, itemId: string) => {
        if (acc[itemId] === undefined) {
          const ingredient = ingredients.find(
            (ingredient: IIngredient) => ingredient._id === itemId)
          ;
          // @ts-ignore
          acc[itemId] = {...ingredient, count: 1}
        } else {
          acc[itemId] = {...acc[itemId], count: acc[itemId]['count'] + 1}
        }
        return acc
      }, {})
    }
  }, [order, ingredients]);

  const totalPrice = useMemo(() => {
    if (order) {
      return Object.values(groupedIngredients as ICustomIngredients).reduce(
        (acc: number, item: ICustomIngredient) => {
          return acc += (item.price * item.count)
        }, 0
      )
    }
  }, [order, groupedIngredients]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {order ?
          <div>
            {isShowTitle &&
              <div className={`text text_type_digits-default ${styles.number}`}>
                #{order.number}
              </div>
            }

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
              {Object.values(groupedIngredients as ICustomIngredients).map((ingredient: ICustomIngredient) => {
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
        :
          <span>Заказ не найден!</span>
        }
      </div>
    </div>
  )
}

export default OrderDetail;
