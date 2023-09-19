
export const baseURL = "https://norma.nomoreparties.space/api/"

export const baseHandlerResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status);
}
