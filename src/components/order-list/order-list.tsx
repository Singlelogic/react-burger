import { FC } from "react";

import styles from "./order-list.module.css";
import OrderCard from "../order-card/order-card";
import { TOrderFeed } from "../../types/order-feed";


type TOrderList = {
  orders: Array<TOrderFeed>;
  isShowStatus?: boolean;
}

const OrderList: FC<TOrderList> = ({ orders, isShowStatus }) => {
  return (
    <div className={styles.content}>
      {orders.map((order) => {
        return (
          <div key={order._id} className={styles.card}>
            <OrderCard order={order} isShowStatus={isShowStatus} />
          </div>
        )
      })}
    </div>
  )
}

export default OrderList;
