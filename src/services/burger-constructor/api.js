import { baseURL, baseHandlerResponse } from '../base-api';

export const sendOrderRequest = (ingredientIds) => {
  return fetch(baseURL + 'orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "ingredients": ingredientIds,
    })
  })
    .then((res) => baseHandlerResponse(res))
    .catch(err => console.log('ERROR: ', err.message));
}
