import { IResetPasswordData } from "./actions";
import { baseURL, checkResponse } from "../../base-api";


export const resetPasswordRequest = (data: IResetPasswordData) => {
  return fetch(baseURL + "password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": data.password,
      "token": data.token,
    })
  })
    .then((res) => checkResponse(res))
    .catch(err => console.log("ERROR: ", err.message));
}
