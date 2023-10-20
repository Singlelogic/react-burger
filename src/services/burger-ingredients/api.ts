import { baseURL, checkResponse } from '../base-api';

export const getIngredientsRequest = () => {
  return fetch(baseURL + 'ingredients')
    .then((res) => checkResponse(res))
    .catch(err => console.log('ERROR: ', err.message));
}
