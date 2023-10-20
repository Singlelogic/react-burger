import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./registration.module.css";
import { registration } from "../../../services/auth/registration/actions";


function Registration() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(registration(form));
  }

  return (
    <div className={styles.container}>
      <span className={`text text_type_main-medium ${styles.title}`}>Регистрация</span>

      <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChangeForm}
          value={form.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"E-mail"}
          onChange={handleChangeForm}
          value={form.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput onChange={handleChangeForm} value={form.password} name={"password"} />
        <Button type="primary" size="medium" htmlType={"submit"}>
          Зарегистрироваться
        </Button>
      </form>

      <div className="text text_type_main-default text_color_inactive">
        <span className="pr-2">Уже зарегистрированы?</span>
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </div>

    </div>
  )
}

export default Registration;
