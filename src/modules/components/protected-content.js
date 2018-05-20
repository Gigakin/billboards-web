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
import Dashboard from "./pages/dashboard";
import JobOrders from "./pages/job-orders";
import NewJobOrder from "./pages/job-order-new";
import Bills from "./pages/bills";

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
        <div className="container">
          <div className="container__content">
            <div className="container__content__inner">
              <div className="uk-flex">
                <div className="uk-flex-none">
                  {/* Sidebar */}
                  {AuthService.isLoggedIn() ? <Sidebar /> : null}
                </div>
                <div className="uk-flex-auto container__content__inner--scrollable-y">
                  {/* Routes */}
                  <Switch>
                    <ProtectedRoute exact path="/" component={Root} />
                    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                    <ProtectedRoute exact path="/jobs" component={JobOrders} />
                    <ProtectedRoute exact path="/jobs/new" component={NewJobOrder} />
                    <ProtectedRoute exact path="/bills" component={Bills} />
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
