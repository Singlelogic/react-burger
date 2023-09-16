
const url = "https://norma.nomoreparties.space/api/orders"

export const sendOrderRequest = (ingredientIds) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "ingredients": ingredientIds,
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status);
    })
    .catch(err => {
      console.log('ERROR: ', err.message);
    })
}
