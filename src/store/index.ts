import { createStore, combineReducers } from "redux";
import SignInReducer from "./SignInReducer";
import DriverDataReducer from "./DriverDataReducer";
const store = createStore(
  combineReducers({
    SignInReducer,
    DriverDataReducer,
  })
);
console.log(store.getState());
export default store;
