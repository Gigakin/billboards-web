// Modules
import React from "react";
import { Switch } from "react-router-dom";

// Routes
import { PublicRoute } from "./routes";

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
        <Navigation />
        {/* Routes */}
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/dashboard" component={() => "Dashboard"} />
          <PublicRoute exact path="/jobs" component={() => "Jobsß"} />
        </Switch>
      </main>
    );
  }
}

// Exports
export default Content;
