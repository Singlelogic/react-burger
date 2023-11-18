import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-details.module.css";
import { useSelector } from "../../../services/store";
import { Loader } from "../../../ui/loader/loader";
import { getOrderStore } from "../../../utils/store";


function OrderDetails() {
  const {
    sendOrderRequest,
    sendOrderFailed,
    orderNumber,
  } = useSelector(getOrderStore);

  return (
    sendOrderRequest ? (
      <Loader size="large" />
    ) : (
      sendOrderFailed ?
        <p className="text text_type_main-default">
          Ошибка отправки заказа!
        </p>
      :
        <div className={styles.content}>
          <p className="text text_type_digits-large" data-test-id="order-number">
            {orderNumber}
          </p>
          <p className="text text_type_main-default">Идентификатор заказа</p>
          <p className={styles.icon}><CheckMarkIcon type="secondary" /></p>
          <p className="text text_type_main-small">Ваш заказ начали готовить</p>
          <p className="text text_type_main-small text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
    )
  )
}

export default OrderDetails;
