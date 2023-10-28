import styles from "./list-orders.module.css";
import OrderCard from "../../../components/order-card/order-card";


const ListOrders = () => {
  return (
    <div className={styles.content}>
      <OrderCard />
    </div>
  )
}

export default ListOrders;
