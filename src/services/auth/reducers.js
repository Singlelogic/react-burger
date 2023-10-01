import { combineReducers } from "redux";

import { forgotPasswordReducer } from "./forgot-password/reducer";
import { loginReducer } from "./login/reducer";
import { logoutReducer } from "./logout/reducer";
import { registrationReducer } from "./registration/reducer";


export const authReducer = combineReducers({
  forgotPassword: forgotPasswordReducer,
  login: loginReducer,
  logout: logoutReducer,
  registration: registrationReducer,
});
