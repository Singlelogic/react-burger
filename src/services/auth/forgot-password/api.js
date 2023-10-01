import { baseURL, checkResponse } from "../../base-api";


export const forgotPasswordRequest = (data) => {
  return fetch(baseURL + "password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": data.email,
    })
  })
    .then((res) => checkResponse(res))
    .catch(err => console.log("ERROR: ", err.message));
}
