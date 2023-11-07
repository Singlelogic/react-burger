import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./reset-password.module.css";
import { useDispatch } from "../../../services/store";
import { resetPassword } from "../../../services/auth/reset-password/actions";


function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", token: "" });

  useEffect(() => {
    if (!localStorage.getItem("forgotPasswordPageVisited")) {
      navigate("/forgot-password");
    }
  }, [navigate]);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword(form));
  };

  return (
    <div className={styles.container}>
      <span className={`text text_type_main-medium ${styles.title}`}>
        Восстановление пароля
      </span>

      <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
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
          value={form.token}
          name={"token"}
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
