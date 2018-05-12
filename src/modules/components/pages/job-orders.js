// Modules
import React from "react";

// Components
import OrderList from "../common/order-list";

// Classes
class JobOrders extends React.Component {
  render() {
    return (
      <div className="uk-flex">
        <div className="uk-width-1-1 uk-padding-large">
          {/* Header */}
          <div className="uk-width-1-1">
            <h2>Job Orders</h2>
            <p>Create, Review and Manage orders.</p>
          </div>

          {/* Actions */}
          <div className="uk-width-1-1">
            {/* Maybe add buttons here? */}
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
