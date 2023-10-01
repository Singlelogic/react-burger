import { baseURL, fetchWithRefresh } from "../base-api";


export const getUserRequest = () => {
  return fetchWithRefresh(baseURL + "auth/user", {
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
  })
}
