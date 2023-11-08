import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {FC, useMemo, useState} from "react";
import { useLocation } from "react-router-dom";

import styles from "./order-card.module.css";
import OrderDetail from "../order-detail/order-detail";
import { useSelector } from "../../../services/store";
import { IIngredient } from "../../../types/ingredient";
import { TOrderFeed } from "../../../types/order-feed";
import { formatDate } from "../../../utils/date";
import { getStatusLabel, getStatusColor } from "../../../utils/order";
import { getBurgerIngredientsStore } from "../../../utils/store";
import Modal from "../../modal/modal";


type TOrderCard = {
  order: TOrderFeed;
  isShowStatus?: boolean;
}

const OrderCard: FC<TOrderCard> = ({ order, isShowStatus = true }) => {
  const location = useLocation();
  const { ingredients } = useSelector(getBurgerIngredientsStore);
  const [isModal, setModal] = useState(false);

  const images = useMemo(() => {
    let hasBun = false;
    let idx = 0;

    return order.ingredients.map((id: string) => {
      const ingredient = ingredients.find((item: IIngredient) => item._id === id)

      if (ingredient && ingredient.type === 'bun') {
        if (hasBun) return;
        hasBun = true;
      }

      idx += 1;
      if (idx < 6) {
        return (
          <div className={styles.imageContainer} key={idx}>
            <div className={styles.imageCard}>
              <img
                src={ingredient && ingredient.image_mobile}
                className={styles.image}
                alt="ingredient"
              />
            </div>
          </div>
        )
      } else if (idx === 6) {
        return (
          <div className={styles.imageContainer} key={idx}>
            <div className={styles.imageCardCount}>
              <p className='text text_type_main-default'>
                +{order.ingredients.length - 6}
              </p>
            </div>
            <div className={styles.imageCard}>
              <img
                src={ingredient && ingredient.image_mobile}
                className={styles.image}
                alt="ingredient"
              />
            </div>
          </div>
        )
      }
    })
  }, [ingredients, order.ingredients]);

  const totalPrice = useMemo(() => {
    return order.ingredients.reduce((acc, id) => {
      const ingredient = ingredients.find((item: IIngredient) => item._id === id)
      acc = ingredient ? acc + ingredient.price : 0;
      return acc
    }, 0)
  }, [order.ingredients, ingredients]);

  function handleClickCard() {
    setModal(true);
    window.history.pushState(null, '', `${location.pathname}/${order.number}`);
  }

  function handleCloseModal() {
    setModal(false);
    window.history.pushState(null, '', location.pathname);
  }

  return (
    <>
      <div className={styles.cardOrder} onClick={handleClickCard} >
        <div className={styles.orderNumber}>
          <span className="text text_type_digits-default">#{ order.number }</span>
          <span className={`text text_type_main-default text_color_inactive ${styles.timestamp}`}>
            { formatDate(order.createdAt) }
          </span>
        </div>
        <div className={styles.info}>
          <div className={`text text_type_main-medium ${styles.name}`}>
            { order.name }
          </div>
          {isShowStatus &&
            <div
              className="text text_type_main-small"
              style={{'color': getStatusColor(order.status)}}
            >
              { getStatusLabel(order.status) }
            </div>
          }
        </div>
        <div className={styles.ingredients}>
          <div className={styles.images}>
            { images }
          </div>
          <div className={styles.price}>
            <span className="text text_type_digits-default">{ totalPrice }</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
      {isModal &&
        <Modal header={`#${order.number}`} onClose={handleCloseModal} >
          <OrderDetail orderNumber={order.number} isShowTitle={false} />
        </Modal>
      }
    </>
  )
}

export default OrderCard;