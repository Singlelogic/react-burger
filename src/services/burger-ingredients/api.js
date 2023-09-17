import { baseURL, baseHandler } from '../base-api';

export const getIngredientsRequest = () => {
  return fetch(baseURL + 'ingredients')
    .then((res) => baseHandler(res))
    .catch(err => console.log('ERROR: ', err.message));
}
