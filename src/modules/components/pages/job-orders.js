// Modules
import React from "react";
import { Link } from "react-router-dom";

// Components
import OrdersList from "../common/orders-list";

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
    OrderService.getOrders().then(orders => {
      return this.setState({ orders: orders });
    });
  };

  // Edit Order
  editOrder = order => {
    return console.log(order);
  };

  // Delete Order
  deleteOrder = order => {
    OrderService.deleteOrder(order.id).then(response => {
      return this.getOrders();
    });
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
