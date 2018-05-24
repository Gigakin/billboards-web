// Modules
import React from "react";
import { Link } from "react-router-dom";

// Components
import OrdersList from "../common/orders-list";
import MockData from "../../stores/mock_data.json";

// Classes
class Handovers extends React.Component {
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
            <div className="uk-width-1-1">
              <h2 className="new-order__header__title">Handovers</h2>
            </div>
            <div className="uk-width-1-1">
              <ul className="uk-breadcrumb">
                <li>
                  <Link to="/orders">Order Management</Link>
                </li>
                <li>
                  <span>Handovers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Order List */}
          <div className="uk-width-1-1">
            <OrdersList
              columns={this.tableColumns}
              data={jobsList}
              showActionButtons={false}
              showHandoverButton
            />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default Handovers;
