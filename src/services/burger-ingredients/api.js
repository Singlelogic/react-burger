import { baseURL, baseHandlerResponse } from '../base-api';

export const getIngredientsRequest = () => {
  return fetch(baseURL + 'ingredients')
    .then((res) => baseHandlerResponse(res))
    .catch(err => console.log('ERROR: ', err.message));
}
