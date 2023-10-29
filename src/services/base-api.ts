import { setCookie, getCookie } from "./utils/cookie";


export const baseURL = "https://norma.nomoreparties.space/api/";
export const wssOrderFeedURL = "wss://norma.nomoreparties.space/orders/all";

interface IOptions {
  [key: string]: any,
}

export const fetchWithRefresh = async (url: string, options: IOptions) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const data = await refreshToken();
      if (data === undefined || !data.success) {
        return Promise.reject(data);
      }
      localStorage.setItem("accessToken", data.accessToken.split("Bearer ")[1]);
      setCookie("refreshToken", data.refreshToken);
      options.headers.authorization = data.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json()
    .then((err) => Promise.reject(err))
    .catch(err => console.log("ERROR: ", err.message));
};

export const refreshToken = () => {
  return fetch(baseURL + "auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then(checkResponse)
    .catch(err => console.log("ERROR: ", err.message))
};
