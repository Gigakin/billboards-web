// Modules
import React from "react";
import { Route } from "react-router-dom";

// Public Route
export const PublicRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => <Component {...props} />} />;
};
