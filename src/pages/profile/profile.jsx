import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./profile.module.css";
import { logout } from "../../services/auth/logout/actions";
import { getCookie } from "../../services/utils/cookie";


function Profile() {
  const dispatch = useDispatch();

  const logoutOnClick = () => {
    const refreshToken = getCookie("refreshToken");
    dispatch(logout(refreshToken));
  }

  const classNameLink = `text text_type_main-medium text_color_inactive ${styles.link}`;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <nav className={styles.nav}>
            <ul className={styles.list}>
              <li className={styles.item}>
                <NavLink to="" className={({ isActive }) =>
                  `${classNameLink} ${isActive ? styles.active : ""}`
                }>
                  Профиль
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink to="orders" className={({ isActive }) =>
                  `${classNameLink} ${isActive ? styles.active : ""}`
                }>
                  История заказов
                </NavLink>
              </li>
              <li className={styles.item}>
                <NavLink to="#" className={classNameLink} onClick={logoutOnClick}>
                  Выход
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="text text_type_main-default help-text">
            В этом разделе вы можете изменить свои персональные данные
          </div>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Profile;
