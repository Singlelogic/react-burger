import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./login.module.css";
import { login } from "../../../services/auth/login/actions";
import { useDispatch } from "../../../services/store";


function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className={styles.container}>
      <span className={`text text_type_main-medium ${styles.title}`}>Вход</span>

      <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
        <EmailInput onChange={handleChangeForm} value={form.email} name={"email"} />
        <PasswordInput onChange={handleChangeForm} value={form.password} name={"password"} />
        <Button type="primary" size="medium" htmlType={"submit"}>
          Войти
        </Button>
      </form>

      <nav>
        <ul className={styles.list}>
          <li className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
            <Link to="/register" className={`${styles.link} pl-2`}>
              Зарегистрироваться
            </Link>
          </li>
          <li className="text text_type_main-default text_color_inactive">
            <span className="pr-2">Забыли пароль?</span>
            <Link to="/forgot-password" className={styles.link}>
              Восстановить пароль
            </Link>
          </li>
        </ul>
      </nav>

    </div>
  );
}

export default Login;
