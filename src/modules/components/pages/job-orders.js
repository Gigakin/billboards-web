// Modules
import React from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

// Assets
import Strings from "../../strings";

// Components
import OrdersList from "../common/orders-list";
import Notification from "../common/notification";

// Services
import OrderService from "../../services/order-service";
import PermissionService from "../../services/permission-service";

// Classes
class JobOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      userRole: null
    };
  }

  // Get Orders
  getOrders = () => {
    OrderService.getOrders().then(
      orders => {
        if (orders && orders.length) {
          let { userRole } = this.state;
          if (userRole) {
            let filteredOrders = [];

            // Designer
            if (userRole === "designer") {
              orders.forEach(o => {
                // Orders with Jobs
                if (o.jobs && o.jobs.length) {
                  o.jobs.forEach(j => {
                    if (j.status === 1) return filteredOrders.push(o);
                  });
                }

                // Draft orders
                if (!o.jobs || o.jobs.length === 0) {
                  return filteredOrders.push(o);
                }
              });
            }

            // Printer
            else if (userRole === "printer") {
              orders.forEach(o => {
                if (o.jobs && o.jobs.length) {
                  o.jobs.forEach(j => {
                    if (j.status === 2) return filteredOrders.push(o);
                  });
                }
              });
            }

            // Other roles
            else {
              filteredOrders = orders;
            }

            // Filtered Orders
            // Remove duplicate orders
            filteredOrders = _.uniq(filteredOrders, "id");
            return this.setState({ orders: filteredOrders });
          } else {
            return this.setState({
              orders: orders
            });
          }
        }
      },
      error => {
        return Notification.Notify({
          text: "Failed to get the list of orders",
          type: "error"
        });
      }
    );
  };

  // Edit Order
  editOrder = order => {
    if (order) {
      return this.props.history.push(`/orders/${order.id}/edit?tab=jobs`);
    }
  };

  // Review Order
  reviewOrder = order => {
    if (order) {
      return this.props.history.push(`/orders/${order.id}/edit?tab=review`);
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

  componentWillMount() {
    let role = PermissionService.getRole();
    if (role) this.setState({ userRole: role });
    return;
  }

  componentDidMount() {
    this.getOrders();
  }

  render() {
    let { orders } = this.state;
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
              methods={{
                editOrder: this.editOrder,
                reviewOrder: this.reviewOrder,
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
