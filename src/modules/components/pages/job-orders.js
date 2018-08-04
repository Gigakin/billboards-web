// Modules
import React from "react";
import { Link } from "react-router-dom";

// Assets
import Strings from "../../strings";

// Components
import OrdersList from "../common/orders-list";
import Notification from "../common/notification";

// Services
import OrderService from "../../services/order-service";
import JobService from "../../services/job-service";

// Classes
class JobOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      jobTypes: [],
      jobQualities: [],
      jobFeatures: [],
      jobStatuses: []
    };
  }

  // Get Orders
  getOrders = () => {
    OrderService.getOrders().then(
      orders => {
        return this.setState({ orders: orders });
      },
      error => {
        return Notification.Notify({
          text: "Failed to get the list of orders",
          type: "error"
        });
      }
    );
  };

  // Get Job Types
  getJobTypes = () => {
    JobService.getJobTypes().then(
      jobtypes => this.setState({ jobTypes: jobtypes }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of job types",
          type: "error"
        });
      }
    );
  };

  // Get Job Qualities
  getJobQualities = () => {
    JobService.getJobQualities().then(
      jobqualities => this.setState({ jobQualities: jobqualities }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of job qualities",
          type: "error"
        });
      }
    );
  };

  // Get Job Features
  getJobFeatures = () => {
    JobService.getJobFeatures().then(
      jobfeatures => this.setState({ jobFeatures: jobfeatures }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of job features",
          type: "error"
        });
      }
    );
  };

  // Get Job Uoms
  getJobStatuses = () => {
    JobService.getJobStatuses().then(
      uoms => this.setState({ jobStatuses: uoms }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of measurement units",
          type: "error"
        });
      }
    );
  };

  // Edit Order
  editOrder = order => {
    if (order) {
      return this.props.history.push(`/orders/${order.id}/edit`);
    }
  };

  // Delete Order
  deleteOrder = order => {
    OrderService.deleteOrder(order.id).then(
      response => {
        this.getOrders();
        Notification.Notify({
          text: response.message ? response.message : "Order deleted"
        });
      },
      error => {
        return Notification.Notify({
          text: Strings.COMMON.UNKNOWN_ERROR,
          type: "error"
        });
      }
    );
  };

  componentDidMount() {
    this.getOrders();
    this.getJobTypes();
    this.getJobQualities();
    this.getJobFeatures();
    this.getJobStatuses();
  }

  render() {
    let {
      orders,
      jobFeatures,
      jobQualities,
      jobTypes,
      jobStatuses
    } = this.state;
    return (
      <div className="lists">
        <div className="uk-width-1-1">
          {/* Header */}
          <div className="lists__header">
            <div className="uk-width-1-1">
              <ul className="breadcrumbs">
                <Link to="/dashboard" className="breadcrumbs__item">
                  <span uk-icon="home" />
                </Link>
                <Link to="/orders" className="breadcrumbs__item">
                  Order Management
                </Link>
                <Link to="#" className="breadcrumbs__item">
                  Orders List
                </Link>
              </ul>
            </div>
          </div>

          {/* Order List */}
          <div className="uk-width-1-1">
            <OrdersList
              data={orders}
              jobTypes={jobTypes}
              jobFeatures={jobFeatures}
              jobQualities={jobQualities}
              jobStatuses={jobStatuses}
              methods={{
                editOrder: this.editOrder,
                deleteOrder: this.deleteOrder
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default JobOrders;
