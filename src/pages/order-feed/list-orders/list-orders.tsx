import { FC } from "react";

import styles from "./list-orders.module.css";
import OrderCard from "../../../components/order-card/order-card";
import { TOrderFeed } from "../../../types/order-feed";


type TListOrders = {
  orders: Array<TOrderFeed>;
}

const ListOrders: FC<TListOrders> = ({ orders }) => {
  return (
    <div className={styles.content}>
      {orders.map((order) => {
        return (
          <div key={order._id} className={styles.card}>
            <OrderCard order={order} isShowStatus={false} />
          </div>
        )
      })}
    </div>
  )
}

export default ListOrders;
