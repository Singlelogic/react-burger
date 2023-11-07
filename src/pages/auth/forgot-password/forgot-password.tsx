import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./forgot-password.module.css";
import { useDispatch } from "../../../services/store";
import { forgotPassword } from "../../../services/auth/forgot-password/actions";


function ForgotPassword() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "" });

  useEffect(() => {
    localStorage.setItem("forgotPasswordPageVisited", "true");
  }, [])

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(form));
  };

  return (
    <div className={styles.container}>
      <span className={`text text_type_main-medium ${styles.title}`}>
        Восстановление пароля
      </span>

      <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
        <EmailInput
          onChange={handleChangeForm}
          value={form.email}
          placeholder={"Укажите e-mail"}
          name={"email"}
        />
        <Button type="primary" size="medium" htmlType={"submit"}>
          Восстановить
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

export default ForgotPassword;
