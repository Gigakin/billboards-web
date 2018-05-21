// Modules
import React from "react";

// Components
import InvoicesList from "../common/invoices-list";
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
      <div className="lists">
        <div className="uk-width-1-1">
          {/* Header */}
          <div className="new-order__header">
            <div className="uk-width-1-1 uk-flex-inline">
              <h2 className="new-order__header__title">Invoice Management</h2>
            </div>
          </div>

          {/* Bills */}
          <div className="uk-width-1-1">
            <InvoicesList columns={this.tableColumns} data={invoices} />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default Bills;
