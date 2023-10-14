import { baseURL, fetchWithRefresh } from "../base-api";


export const getUserRequest = () => {
  return fetchWithRefresh(baseURL + "auth/user", {
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
  })
}

export const updateUserRequest = (form) => {
  return fetchWithRefresh(baseURL + "auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      "name": form.name,
      "email": form.email,
    })
  })
}
