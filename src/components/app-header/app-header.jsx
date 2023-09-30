import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link, NavLink } from "react-router-dom";

import styles from "./app-header.module.css";


function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li className={styles.item}>
            <NavLink to="/" className={styles.link}>
              <BurgerIcon type="secondary" />
              <span className={styles.link_text}>Конструктор</span>
            </NavLink>
          </li>
          <li>  
            <NavLink to="#" className={styles.link}>
              <ListIcon type="secondary" />
              <span className={styles.link_text}>Лента заказов</span>
            </NavLink>
          </li>
        </ul>
        <Link to="/">
          <Logo />
        </Link>
        <ul className={styles.ul_end}>
          <li>
            <NavLink to="/profile" className={styles.link}>
              <ProfileIcon type="secondary" />
              <span className={styles.link_text}>Личный кабинет</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
