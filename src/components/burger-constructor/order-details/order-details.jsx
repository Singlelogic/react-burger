import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

function OrderDetails() {
  return (
    <div className={styles.content}>
      <p className="text text_type_digits-large">034536</p>
      <p className="text text_type_main-default">Идентификатор заказа</p>
      <p className={styles.icon}><CheckMarkIcon type="secondary" /></p>
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;
