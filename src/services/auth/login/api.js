import { baseAuthURL } from "../base-auth-api";
import { baseHandlerResponse } from "../../base-api";


export const loginRequest = (data) => {
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
    .then((res) => baseHandlerResponse(res))
    .catch(err => console.log("ERROR: ", err.message));
}
