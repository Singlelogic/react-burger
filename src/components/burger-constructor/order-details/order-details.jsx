import { useSelector } from 'react-redux';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader } from '../../../ui/loader/loader';
import styles from './order-details.module.css';

function OrderDetails() {
  const {
    sendOrderRequest,
    sendOrderFailed,
    orderNumber,
  } = useSelector(store => store.burgerConstructor);

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
          <p className="text text_type_digits-large">{orderNumber}</p>
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
