import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo, useState } from "react";

import styles from "./profile-form.module.css";
import { useDispatch, useSelector } from "../../../services/store";
import { updateUser } from "../../../services/user/actions";
import { getUserStore} from "../../../utils/store";


function ProfileForm() {
  const dispatch = useDispatch();
  const { user: { data } } = useSelector(getUserStore);
  const nameFromStore = data?.name || '';
  const emailFromStore = data?.email || '';
  const [form, setForm] = useState({
    name: nameFromStore ,
    email: emailFromStore,
    password: "********"
  });

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  const cancelChange = () => {
    setForm({...form, name: nameFromStore, email: emailFromStore});
  }

  const isChange = useMemo(() => {
    return nameFromStore !== form.name || emailFromStore !== form.email
  }, [form, nameFromStore, emailFromStore]);

  return (
    <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
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
