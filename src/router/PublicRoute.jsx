import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth";

export const PublicRoute = ({ children }) => {
  // cuando el usuario esta logeado no puede ver el login
  // si el usuario no esta logeado puede ver el login
  const { logged } = useContext(AuthContext);
  return !logged ? children : <Navigate to="/marvel" />;
};
