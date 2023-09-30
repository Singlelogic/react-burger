import { combineReducers } from "redux";

import { loginReducer } from "./login/reducer";
import { logoutReducer } from "./logout/reducer";
import { registrationReducer } from "./registration/reducer";


export const authReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  registration: registrationReducer,
});
