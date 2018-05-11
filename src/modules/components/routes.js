// Modules
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Services
import AuthService from "../services/auth-service";

// Public Route
export const PublicRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};

// Protected Route
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return AuthService.isLoggedIn() ? (
          <Component {...props} />
        ) : props.location.pathname === "/" ? (
          <Redirect to={`/login`} />
        ) : (
          <Redirect to={`/login?return=${props.location.pathname}`} />
        );
      }}
    />
  );
};
