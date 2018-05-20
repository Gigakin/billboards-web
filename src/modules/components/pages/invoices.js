// Modules
import React from "react";

// Components
import BillsTable from "../common/bills-table";
import MockData from "../../stores/mock_data.json";

// Classes
class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: MockData
    };
    this.tableColumns = ["#", "Party Name", "Job Name", "Job Date", "Actions"];
  }

  render() {
    let { invoices } = this.state;
    return (
      <div className="uk-flex">
        <div className="uk-width-1-1 uk-padding-large">
          {/* Header */}
          <div className="uk-width-1-1">
            <h2>Invoice Management</h2>
          </div>

          {/* Bills */}
          <div className="uk-width-1-1">
            <BillsTable columns={this.tableColumns} data={invoices} />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default Bills;
