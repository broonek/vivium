// import { createStore } from "redux";

interface isAuth {
  isAuth: Boolean;
}
interface SetAuthAction {
  type: "setAuth";
}
interface SetUnauthAction {
  type: "setUnAuth";
}
const initialState: isAuth = {
  isAuth: false,
};
type Action = SetAuthAction | SetUnauthAction;
const SignInReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "setAuth":
      return { isAuth: true };
    case "setUnAuth":
      return { isAuth: false };
    default:
      return state;
  }
};
export default SignInReducer;

// const store = createStore(reducerFn);
// export default store;
