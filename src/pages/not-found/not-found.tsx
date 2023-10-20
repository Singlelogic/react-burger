import { Link } from "react-router-dom";

import styles from "./not-found.module.css";


function NotFound404() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={`text text_type_digits-medium ${styles.title}`}>
          Oops! 404 Error
        </span>
        <div className={`text text_type_main-default ${styles.body}`}>
          <span>Запрашиваемая страница не найдена</span>
          <span>
            Проверьте адрес или перейдите на
            <Link to='/' className="text text_type_main-default pl-2 link">
              домашнюю страницу
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default NotFound404;
