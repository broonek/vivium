import "./App.css";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  interface isAuthState {
    SignInReducer: { isAuth: boolean };
  }
  const isAuth = useSelector(
    (state: isAuthState) => state.SignInReducer.isAuth
  );
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute path="/sign-in" isUserAuth={isAuth}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
