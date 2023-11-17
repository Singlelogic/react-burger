import { ILogoutData } from "./actions";
import { request } from "../../base-api";


export const logoutRequest = (data: ILogoutData) => {
  return request("auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      token: data.refreshToken,
    }),
  })
}
