import { IRegistrationData } from "./actions";
import { request } from "../../base-api";


export const registrationRequest = (data: IRegistrationData) => {
  return request("auth/register", {
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
}
