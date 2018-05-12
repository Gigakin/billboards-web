// Modules
import React from "react";
import { Switch } from "react-router-dom";

// Routes
import { PublicRoute } from "./routes";

// Pages
import Login from "./pages/login";
import ProtectedContent from "./protected-content";

// Classes
class Content extends React.Component {
  render() {
    return (
      <main>
        {/* Routes */}
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <ProtectedContent />
        </Switch>
      </main>
    );
  }
}

// Exports
export default Content;
