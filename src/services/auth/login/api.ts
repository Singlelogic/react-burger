import { baseAuthURL } from "../base-auth-api";
import { checkResponse } from "../../base-api";


interface ILoginData {
  email: string;
  password: string;
}

export const loginRequest = (data: ILoginData) => {
  return fetch(baseAuthURL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": data.email,
      "password": data.password,
    })
  })
    .then((res) => checkResponse(res))
    .catch(err => console.log("ERROR: ", err.message));
}
