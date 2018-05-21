// Modules
import React from "react";

// Components
import OrdersList from "../common/orders-list";
import MockData from "../../stores/mock_data.json";

// Classes
class JobOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsList: MockData
    };
    this.tableColumns = [
      "Party Name",
      "Job Name",
      "Total Sq. Ft.",
      "Assigned To",
      "Status",
      "Actions"
    ];
  }

  render() {
    let { jobsList } = this.state;
    return (
    <div className="lists">
        <div className="uk-width-1-1">
          {/* Header */}
          <div className="new-order__header">
            <div className="uk-width-1-1 uk-flex-inline">
              <h2 className="new-order__header__title">Orders List</h2>
            </div>
          </div>

          {/* Order List */}
          <div className="uk-width-1-1">
            <OrdersList columns={this.tableColumns} data={jobsList} />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default JobOrders;
