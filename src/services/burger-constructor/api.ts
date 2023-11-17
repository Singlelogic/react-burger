import { request, requestWithRefresh } from "../base-api";


export const sendOrderRequest = (ingredientIds: string[]) => {
  return requestWithRefresh("orders", {
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

export const getOrderRequest = (orderNumber: string) => {
  return request(`orders/${orderNumber}`, {
    headers: {
      "Content-Type": "application/json",
    }
  })
}
