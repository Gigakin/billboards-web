// Modules
import React from "react";
import { Link } from "react-router-dom";

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
          <div className="lists__header">
            <div className="uk-width-1-1">
              <ul className="breadcrumbs">
                <Link to="/dashboard" className="breadcrumbs__item">
                  <span uk-icon="home" />
                </Link>
                <Link to="/invoices" className="breadcrumbs__item">
                  Invoice Management
                </Link>
                <Link to="#" className="breadcrumbs__item">
                  Orders List
                </Link>
              </ul>
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
