import { baseURL, baseHandlerResponse } from "../base-api";


export const getUserRequest = () => {
  return fetch(baseURL + "auth/user", {
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
  })
    .then((res) => baseHandlerResponse(res))
}
