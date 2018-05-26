// Modules
import React from "react";
import { Link } from "react-router-dom";

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
          <div className="lists__header">
            <div className="uk-width-1-1">
              <ul className="breadcrumbs">
                <Link to="/dashboard" className="breadcrumbs__item">
                  <span uk-icon="home" />
                </Link>
                <Link to="/orders" className="breadcrumbs__item">
                  Order Management
                </Link>
              </ul>
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
