import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

import styles from "./order-card.module.css";


//type TOrder = {
//  name: string;
//  number: number;
//  status: string;
//  timestamp: Date;
//  ingredients: string[];
//  cost: number;
//}

const OrderCard = () => {
  return (
    <div className={styles.cardOrder}>
      <div className={styles.orderNumber}>
        <span className="text text_type_digits-default">#1234</span>
        <span className={`text text_type_main-default text_color_inactive ${styles.timestamp}`}>
          Time
        </span>
      </div>
      <div className={styles.info}>
        <div className="text text_type_main-medium">Name</div>
        <div className="text text_type_main-small">Status</div>
      </div>
      <div className={styles.ingredients}>
        <div className={styles.images}>Images</div>
        <div className={styles.price}>
          <span className="text text_type_digits-default">1234</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderCard;
