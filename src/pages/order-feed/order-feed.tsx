import { useEffect } from "react";
import { useDispatch } from "react-redux";

import OrderBoard from "./order-board/order-board";
import styles from "./order-feed.module.css";
import OrderList from "../../components/order-list/order-list";
import { wssBaseOrderFeedURL } from "../../services/base-api";
import {
  wsConnect as wsConnectOrderFeed,
  wsDisconnect as wsDisconnectOrderFeed,
} from "../../services/order-feed/actions";
import { useSelector } from "../../services/store";
import { getOrderFeedStore } from "../../utils/store";
import { WebSocketStatus } from "../../types/order-feed";
import { Loader } from "../../ui/loader/loader";


const OrderFeed = () => {
  const dispatch = useDispatch();
  const { status, ordersFeed: { orders } } = useSelector(getOrderFeedStore);

  useEffect(() => {
    dispatch(wsConnectOrderFeed(wssBaseOrderFeedURL + "/all"));

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
          {status === WebSocketStatus.ONLINE ?
            <>
              <div className={styles.list}>
                <OrderList orders={orders} isShowStatus={false} />
              </div>
              <div>
                <OrderBoard/>
              </div>
            </>
          :
            <Loader size="large" />
          }
        </div>
      </div>
    </div>
  )
}

export default OrderFeed;
