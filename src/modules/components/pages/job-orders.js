// Modules
import React from "react";

// Components
import SorTable from "../common/sor-table";

// Classes
class JobOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsList: []
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
      <div className="uk-flex">
        <div className="uk-width-1-1 uk-padding-large">
          {/* Header */}
          <div className="uk-width-1-1">
            <h2>Orders List</h2>
          </div>

          {/* Order List */}
          <div className="uk-width-1-1">
            <SorTable columns={this.tableColumns} data={jobsList} />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default JobOrders;
