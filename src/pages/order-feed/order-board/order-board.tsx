import styles from "./order-board.module.css";


const OrderBoard = () => {
  return (
    <div className={styles.content}>

      <div className={styles.listOrderStatuses}>
        <div className={`text text_type_main-medium ${styles.statusDone}`}>
          <span>Готовы:</span>
        </div>
        <div className={`text text_type_main-medium ${styles.statusProgress}`}>
          <span>В работе:</span>
        </div>
      </div>

      <div className={styles.completedInTime}>
        <div className="text text_type_main-medium">
          Выполнено за все время:
        </div>
        <div className="ttext text_type_digits-large">
          1234
        </div>
      </div>

      <div className={styles.completedToday}>
        <div className="text text_type_main-medium">
          Выполнено за сегодня:
        </div>
        <div className="text text_type_digits-large">
          1234
        </div>
      </div>

    </div>
  )
}

export default OrderBoard;
