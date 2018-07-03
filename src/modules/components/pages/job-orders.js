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

// Classes
class JobOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };
    this.tableColumns = [
      "Order #",
      "Order Name",
      "Party Name",
      "Account Owner",
      "Order Status",
      "Actions"
    ];
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
              columns={this.tableColumns}
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
