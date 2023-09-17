
export const baseURL = "https://norma.nomoreparties.space/api/"

export const baseHandler = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res.status);
}
