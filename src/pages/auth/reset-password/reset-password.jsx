import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./reset-password.module.css";
import { resetPassword } from "../../../services/auth/reset-password/actions";


function ResetPassword() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ password: "", code: "" });

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form));
  };

  return (
    <div className={styles.container}>
      <span className={`text text_type_main-medium ${styles.title}`}>
        Восстановление пароля
      </span>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type={"password"}
          placeholder={"Введите новый пароль"}
          onChange={handleChangeForm}
          value={form.password}
          name={"password"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChangeForm}
          value={form.code}
          name={"code"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="medium" htmlType={"submit"}>
          Сохранить
        </Button>
      </form>

      <nav>
        <ul className={styles.list}>
          <li className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
            <Link to="/login" className={`${styles.link} pl-2`}>
              Войти
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default ResetPassword;