import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./order-history.module.css";
import OrderCard from "../../../components/order-card/order-card";
import ListOrders from "../../../pages/order-feed/list-orders/list-orders";
import { wssBaseOrderFeedURL } from "../../../services/base-api";
import {
  wsConnect as wsConnectOrderFeed,
  wsDisconnect as wsDisconnectOrderFeed,
} from "../../../services/order-feed/actions";
import { getOrderFeedStore } from "../../../utils/store";
import { WebSocketStatus } from "../../../types/order-feed";
import { Loader } from "../../../ui/loader/loader";


const OrderHistory = () => {
  const dispatch = useDispatch();
  const { status, ordersFeed: { orders } } = useSelector(getOrderFeedStore);
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    dispatch(wsConnectOrderFeed(wssBaseOrderFeedURL + `?token=${token}`));

    return () => {
      dispatch(wsDisconnectOrderFeed());
    }
  }, [dispatch, token]);

  const reversedOrders = useMemo(() => {
    return orders ? [...orders].reverse() : [];
  }, [orders]);

  return (
    <div className={styles.content}>
      {status === WebSocketStatus.ONLINE ?
        <div className={styles.list}>
          {<ListOrders orders={reversedOrders} />}
        </div>
      : status === WebSocketStatus.CONNECTING ?
          <Loader size="large" />
        :
          <p className="text text_type_main-default error-text">
            Не удается подключиться к серверу!
          </p>
      }
    </div>
  )
}

export default OrderHistory;
