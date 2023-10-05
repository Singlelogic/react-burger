import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./profile-form.module.css";
import { updateUser } from "../../../services/user/actions";


const getUserStore = (store) => store.user.user.data;

function ProfileForm() {
  const dispatch = useDispatch();
  const { name, email } = useSelector(getUserStore);
  const [form, setForm] = useState({name, email, password: "********"});

  const handleChangeForm = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  const cancelChange = () => {
    setForm({...form, name, email});
  }

  const isChange = useMemo(() => {
    return name !== form.name || email !== form.email
  })

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      {isChange &&
        <>
          <Button type="primary" size="medium" htmlType={"submit"}>
            Сохранить
          </Button>
          <Button type="primary" size="medium" htmlType={"button"} onClick={cancelChange}>
            Отменить
          </Button>
        </>
      }
    </form>
  )
}

export default ProfileForm;
