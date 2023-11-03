import { useMemo } from "react";
import { useSelector } from "react-redux";

import styles from "./order-board.module.css";
import { getOrderFeedStore } from "../../../utils/store";


const OrderBoard = () => {
  const { ordersFeed: { orders, total, totalToday } } = useSelector(getOrderFeedStore);

  return (
    <>
      <div className={styles.listOrderStatuses}>
        <div className={`text text_type_main-medium ${styles.statusDone}`}>
          <span>Готовы:</span>
            {orders && orders.map((order: any) => {
              if (order.status === 'done') {
                return <div className={styles.done} key={order._id}>{ order.number }</div>
              }
            })}
        </div>
        <div className={`text text_type_main-medium ${styles.statusProgress}`}>
          <span>В работе:</span>
            {orders && orders.map((order: any) => {
              if (order.status === 'pending') {
                return <div key={order._id}>{ order.number }</div>
              }
            })}
        </div>
      </div>

      <div className={styles.completedInTime}>
        <div className="text text_type_main-medium">
          Выполнено за все время:
        </div>
        <div className="ttext text_type_digits-large">
          { total }
        </div>
      </div>

      <div className={styles.completedToday}>
        <div className="text text_type_main-medium">
          Выполнено за сегодня:
        </div>
        <div className="text text_type_digits-large">
          { totalToday }
        </div>
      </div>
    </>
  )
}

export default OrderBoard;
