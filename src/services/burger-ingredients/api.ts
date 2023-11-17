import { request } from '../base-api';

export const getIngredientsRequest = () => {
  return request('ingredients')
}
