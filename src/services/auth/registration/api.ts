import { baseAuthURL } from "../base-auth-api";
import { checkResponse } from "../../base-api";


interface IRegistrationData {
  name: string;
  email: string;
  password: string;
}

export const registrationRequest = (data: IRegistrationData) => {
  return fetch(baseAuthURL + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": data.name,
      "email": data.email,
      "password": data.password,
    })
  })
    .then((res) => checkResponse(res))
    .catch(err => console.log("ERROR: ", err.message));
}