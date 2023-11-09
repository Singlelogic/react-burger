import { setCookie, getCookie, deleteCookie } from "./utils/cookie";


export const baseURL = "https://norma.nomoreparties.space/api/";
export const wssBaseOrderFeedURL = "wss://norma.nomoreparties.space/orders";

interface IOptions {
  [key: string]: any,
}

export const request = (endpoint: string, options?: IOptions) => {
  return fetch(`${baseURL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const checkResponse = (res: any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const requestWithRefresh = async (endpoint: string, options: any) => {
  try {
    return await request(endpoint, options);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const data = await refreshToken();
      if (data === undefined || !data.success) {
        return Promise.reject(data);
      }
      localStorage.setItem("accessToken", data.accessToken.split("Bearer ")[1]);
      setCookie("refreshToken", data.refreshToken);
      options.headers.authorization = data.accessToken;
      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const refreshToken = () => {
  return request("auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .catch(err => {
      if (err === "Token is invalid") {
        localStorage.removeItem("accessToken");
        deleteCookie("refreshToken");
      }
    })
};
