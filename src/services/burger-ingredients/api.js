
const url = "https://norma.nomoreparties.space/api/ingredients"

export const getIngredientsRequest = () => {
  return fetch(url)
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
