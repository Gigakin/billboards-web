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
import JobOrderDetails from "./pages/job-order-details";
import Handovers from "./pages/handovers";
import Invoices from "./pages/invoices";
import CreateInvoice from "./pages/invoices-create";

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
                    <ProtectedRoute exact path="/orders" component={JobOrders} />
                    <ProtectedRoute exact path="/orders/new" component={NewJobOrder} />
                    <ProtectedRoute exact path="/orders/:id" component={JobOrderDetails} />
                    <ProtectedRoute exact path="/handovers" component={Handovers} />
                    <ProtectedRoute exact path="/invoices" component={Invoices} />
                    <ProtectedRoute exact path="/invoices/:orderid" component={CreateInvoice} />
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
