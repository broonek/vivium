import React from "react";
import { Navigate } from "react-router-dom";
import { IPrivateRoute } from "../utils/Interfaces";

const PrivateRoute: React.FC<IPrivateRoute> = ({
  children: RouteComponent,
  path = "/",
  isUserAuth,
}) => {
  return isUserAuth ? <>{RouteComponent}</> : <Navigate to={path} />;
};

export default PrivateRoute;
