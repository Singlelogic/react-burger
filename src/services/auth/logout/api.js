import { baseAuthURL } from "../base-auth-api";
import { baseHandlerResponse } from "../../base-api";


export const logoutRequest = (refreshToken) => {
  return fetch(baseAuthURL + "logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  })
    .then((res) => baseHandlerResponse(res))
    .catch(err => console.log("ERROR: ", err.message));
}
