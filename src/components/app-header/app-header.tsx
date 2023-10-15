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
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <span className={`${styles.link_text} ${isActive ? styles.active : ""}`}>
                    Конструктор
                  </span>
                </>
              )}
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
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <span className={`${styles.link_text} ${isActive ? styles.active : ""}`}>
                    Личный кабинет
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
