import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class AppHeader extends React.Component {
    render() {
        return (
          <header className={styles.header}>
            <nav className={styles.nav}>
              <ul className={styles.ul}>
                <li>
                  <button className={styles.btn}>
                    <BurgerIcon type="secondary" />
                    <span className={styles.btn_text}>Конструктор</span>
                  </button>
                </li>
                <li>  
                  <button className={styles.btn}>
                    <ListIcon type="secondary" />
                    <span className={styles.btn_text}>Лента заказов</span>
                  </button>
                </li>
              </ul>
              <Logo />
              <ul className={styles.ul_end}>
                <li>
                  <button className={styles.btn}>
                    <ProfileIcon type="secondary" />
                    <span className={styles.btn_text}>Личный кабинет</span>
                  </button>
                </li>
              </ul>
            </nav>
          </header>
        )
    }
}

export default AppHeader;
