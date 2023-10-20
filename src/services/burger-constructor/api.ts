import { baseURL, fetchWithRefresh } from "../base-api";


export const sendOrderRequest = (ingredientIds: string[]) => {
  return fetchWithRefresh(baseURL + "orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      "ingredients": ingredientIds,
    })
  })
}