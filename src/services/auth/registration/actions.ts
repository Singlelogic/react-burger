import { registrationRequest } from "./api";
import { setUser } from "../../user/actions";
import { setCookie } from "../../utils/cookie";
import { TAppThunk } from "../../store";


export const REGISTRATION_REQUEST: "REGISTRATION_REQUEST" = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED: "REGISTRATION_FAILED" = "REGISTRATION_FAILED";

export interface IRegistrationData {
  name: string;
  email: string;
  password: string;
}

interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
}

interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
}

export type TRegistrationActions =
  | IRegistrationRequest
  | IRegistrationSuccess
  | IRegistrationFailed;

export const registration = (data: IRegistrationData): TAppThunk => {
  return function(dispatch) {
    dispatch({
      type: REGISTRATION_REQUEST
    });
    registrationRequest(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: REGISTRATION_SUCCESS,
        });
        dispatch(setUser(res.user));
        localStorage.setItem("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
      } else {
        dispatch({
          type: REGISTRATION_FAILED
        });
      }
    });
  };
}
