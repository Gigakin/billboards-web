// Modules
import React from "react";

// Components
import OrderList from "../common/order-list";

// Classes
class JobOrders extends React.Component {
  // Create New Order
  createNewOrder = event => {
    return this.props.history.push("/jobs/new");
  };

  render() {
    return (
      <div className="uk-flex">
        <div className="uk-width-1-1 uk-padding-large">
          {/* Header */}
          <div className="uk-width-1-1">
            <h2>Job Orders</h2>
              </div>

          {/* Order List */}
          <div className="uk-width-1-1">
            <OrderList />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default JobOrders;
