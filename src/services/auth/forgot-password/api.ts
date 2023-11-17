import { request } from "../../base-api";
import { IForgotPasswordData } from "./actions";


export const forgotPasswordRequest = (data: IForgotPasswordData) => {
  return request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": data.email,
    })
  })
}
