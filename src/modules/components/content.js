// Modules
import React from "react";
import { Switch, Redirect } from "react-router-dom";

// Routes
import { PublicRoute, ProtectedRoute } from "./routes";

// Services
import AuthService from "../services/auth-service";

// Components
import Navigation from "./common/navigation";

// Pages
import Login from "./pages/login";

// Classes
class Content extends React.Component {
  render() {
    return (
      <main>
        {/* Navigation */}
        {AuthService.isLoggedIn() ? <Navigation /> : null}
        {/* Routes */}
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <ProtectedRoute exact path="/dashboard" component={() => "Dashboard"} />
          <ProtectedRoute exact path="/jobs" component={() => "Jobsß"} />
          <ProtectedRoute exact path="/" component={() => <Redirect to="/dashboard" />} />
        </Switch>
      </main>
    );
  }
}

// Exports
export default Content;
