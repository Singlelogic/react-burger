import { combineReducers } from "redux";

import { loadReducer } from "./load";
import { manageReducer } from "./manage";


export const userReducer = combineReducers({
  loadUser: loadReducer,
  user: manageReducer,
});
