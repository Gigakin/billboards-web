// Modules
import React from "react";
import { Link } from "react-router-dom";

// Classes
class CreateInvoice extends React.Component {
  render() {
    return (
      <div className="lists">
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
                Generate Invoice
              </Link>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default CreateInvoice;
