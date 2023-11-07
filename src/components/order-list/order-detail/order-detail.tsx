import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import styles from "./order-detail.module.css";
import { wssBaseOrderFeedURL } from "../../../services/base-api";
import { useSelector } from "../../../services/store";
import { IIngredient } from "../../../types/ingredient";
import { TOrderFeed } from "../../../types/order-feed";
import { formatDate } from "../../../utils/date";
import { getBurgerIngredientsStore, getOrderFeedStore } from "../../../utils/store";
import { getStatusLabel, getStatusColor } from "../../../utils/order";
import {
  wsConnect as wsConnectOrderFeed,
  wsDisconnect as wsDisconnectOrderFeed
} from "../../../services/order-feed/actions";


const OrderDetail = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(getBurgerIngredientsStore);
  const { ordersFeed: { orders } } = useSelector(getOrderFeedStore);
  const location = useLocation();
  const { id } = useParams();
  const token = localStorage.getItem("accessToken")

  const order = useMemo(() => {
    return orders.find((order: TOrderFeed) => order._id === id);
  }, [orders, id]);

  useEffect(() => {
    if (!order) {
      const postfix = location.pathname === "/feed" ? "/all" : `?token=${token}`;
      dispatch(wsConnectOrderFeed(wssBaseOrderFeedURL + postfix));
    }
    return () => {
      dispatch(wsDisconnectOrderFeed());
    }
  }, [dispatch, order, location.pathname, token]);

  const groupedIngredients = useMemo(() => {
    if (order) {
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
    }
  }, [order, ingredients]);

  const totalPrice = useMemo(() => {
    if (order) {
      return Object.values(groupedIngredients).reduce((acc: any, item: any) => {
        return acc += (item.price * item.count)
      }, 0)
    }
  }, [order, groupedIngredients]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        {order ?
          <div>
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
        :
          <span>Заказ не найден!</span>
        }
      </div>
    </div>
  )
}

export default OrderDetail;
