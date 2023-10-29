import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ListOrders from "./list-orders/list-orders";
import OrderBoard from "./order-board/order-board";
import styles from "./order-feed.module.css";
import { wssOrderFeedURL } from "../../services/base-api";
import {
  wsConnect as wsConnectOrderFeed,
  wsDisconnect as wsDisconnectOrderFeed,
} from "../../services/order-feed/actions";


const OrderFeed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectOrderFeed(wssOrderFeedURL));

    return () => {
      dispatch(wsDisconnectOrderFeed());
    }
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={`text text_type_main-large ${styles.header}`}>
          Лента заказов
        </h1>
        <div className={styles.main}>
          <ListOrders />
          <OrderBoard />
        </div>
      </div>
    </div>
  )
}

export default OrderFeed;
