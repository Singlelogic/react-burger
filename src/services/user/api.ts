import { baseURL, fetchWithRefresh } from "../base-api";


export const getUserRequest = () => {
  return fetchWithRefresh(baseURL + "auth/user", {
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
  })
}

interface IUpdateUserData {
  name: string;
  email: string;
}

export const updateUserRequest = (data: IUpdateUserData) => {
  return fetchWithRefresh(baseURL + "auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      "name": data.name,
      "email": data.email,
    })
  })
}
