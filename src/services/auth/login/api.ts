import { ILoginData } from "./actions";
import { request } from "../../base-api";


export const loginRequest = (data: ILoginData) => {
  return request("auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": data.email,
      "password": data.password,
    })
  })
}
