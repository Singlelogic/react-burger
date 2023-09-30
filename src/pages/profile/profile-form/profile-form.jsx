import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./profile-form.module.css";


const getUserStore = (store) => store.user.user.data;

function ProfileForm() {
  const { name, email } = useSelector(getUserStore);
  const [form, setForm] = useState({name, email, password: "********"});

  const handleChangeForm = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChangeForm}
        icon={"EditIcon"}
        value={form.name}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"text"}
        placeholder={"Логин"}
        onChange={handleChangeForm}
        icon={"EditIcon"}
        value={form.email}
        name={"email"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={handleChangeForm}
        icon={"EditIcon"}
        value={form.password}
        name={"password"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
      />
    </form>
  )
}

export default ProfileForm;
