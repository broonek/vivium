import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector } from "react-redux";
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
