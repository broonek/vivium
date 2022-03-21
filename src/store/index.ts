import { createStore, combineReducers } from "redux";
import SignInReducer from "./SignInReducer";
import DriverDataReducer from "./DriverDataReducer";
const store = createStore(
  combineReducers({
    SignInReducer,
    DriverDataReducer,
  })
);
export default store;
