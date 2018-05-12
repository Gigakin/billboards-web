// Modules
import React from "react";
import { Switch, Redirect } from "react-router-dom";

// Routes
import { ProtectedRoute } from "./routes";

// Components
import Navigation from "./common/navigation";
import Sidebar from "./common/sidebar";

// Services
import AuthService from "../services/auth-service";

// Pages
import JobOrders from "./pages/job-orders";

// Root Component
const Root = () => <Redirect to="/dashboard" />;

// Classes
class ProtectedContent extends React.Component {
  render() {
    return (
      <main>
        {/* Navigation */}
        {AuthService.isLoggedIn() ? <Navigation /> : null}
        {/* Container */}
        <div className="main-container">
          <div className="main-container__content">
            <div className="main-container__content__inner">
              <div className="uk-flex">
                <div className="uk-flex-none">
                  {/* Sidebar */}
                  {AuthService.isLoggedIn() ? <Sidebar /> : null}
                </div>
                <div className="uk-flex-auto">
                  {/* Routes */}
                  <Switch>
                    <ProtectedRoute exact path="/" component={Root} />
                    <ProtectedRoute exact path="/dashboard" component={() => "Dashboard"} />
                    <ProtectedRoute exact path="/jobs" component={JobOrders} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

// Exports
export default ProtectedContent;
