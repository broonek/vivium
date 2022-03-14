import React, { Children } from "react";
import { useNavigate, Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  path?: string;
  isUserAuth: Boolean;
}
const PrivateRoute: React.FC<Props> = ({
  children: RouteComponent,
  path = "/",
  isUserAuth,
}) => {
  return isUserAuth ? <>{RouteComponent}</> : <Navigate to={path} />;
};

export default PrivateRoute;
