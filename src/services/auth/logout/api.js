import { baseAuthURL } from "../base-auth-api";
import { checkResponse } from "../../base-api";


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
    .then((res) => checkResponse(res))
    .catch(err => console.log("ERROR: ", err.message));
}
