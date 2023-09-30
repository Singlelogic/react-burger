import { baseAuthURL } from "../base-auth-api";
import { baseHandlerResponse } from "../../base-api";


export const registrationRequest = (data) => {
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
    .then((res) => baseHandlerResponse(res))
    .catch(err => console.log("ERROR: ", err.message));
}