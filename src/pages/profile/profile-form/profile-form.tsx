import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";

import styles from "./profile-form.module.css";
import { useDispatch, useSelector } from "../../../services/store";
import { updateUser } from "../../../services/user/actions";
import { getUserStore} from "../../../utils/store";


function ProfileForm() {
  const dispatch = useDispatch();
  const { user: { data } } = useSelector(getUserStore);
  const [form, setForm] = useState({name: data?.name , email: data?.email, password: "********"});

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(updateUser(form));
  };

  const cancelChange = () => {
    const name = data?.name;
    const email = data?.email;
    setForm({...form, name, email});
  }

  const isChange = useMemo(() => {
    return data?.name !== form.name || data?.email !== form.email
  }, [form, data?.name, data?.email]);

  return (
    <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChangeForm}
        icon={"EditIcon"}
        value={form.name ? form.name : ''}
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
        value={form.email ? form.email : ''}
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
