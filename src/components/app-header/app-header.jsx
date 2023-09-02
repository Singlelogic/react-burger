import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li>
            <a href="#" className={styles.link}>
              <BurgerIcon type="secondary" />
              <span className={styles.link_text}>Конструктор</span>
            </a>
          </li>
          <li>  
            <a href="#" className={styles.link}>
              <ListIcon type="secondary" />
              <span className={styles.link_text}>Лента заказов</span>
            </a>
          </li>
        </ul>
        <Logo />
        <ul className={styles.ul_end}>
          <li>
            <a href="#" className={styles.link}>
              <ProfileIcon type="secondary" />
              <span className={styles.link_text}>Личный кабинет</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
