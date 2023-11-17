import { IResetPasswordData } from "./actions";
import { request } from "../../base-api";


export const resetPasswordRequest = (data: IResetPasswordData) => {
  return request("auth/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": data.password,
      "token": data.token,
    })
  })
}
