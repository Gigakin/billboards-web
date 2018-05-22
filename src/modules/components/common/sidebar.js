// Modules
import React from "react";
import { Link } from "react-router-dom";

// Classes
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isJobsSubmenuVisible: true,
      isInvoiceSubmenuVisible: true
    };
  }

  // Toggle Jobs Submenu
  toggleJobsSubmenu = () => {
    let { isJobsSubmenuVisible } = this.state;
    return this.setState({ isJobsSubmenuVisible: !isJobsSubmenuVisible });
  };

  // Toggle Invoice Submenu
  toggleInvoiceSubmenu = () => {
    let { isInvoiceSubmenuVisible } = this.state;
    return this.setState({ isInvoiceSubmenuVisible: !isInvoiceSubmenuVisible });
  };

  render() {
    let { isJobsSubmenuVisible, isInvoiceSubmenuVisible } = this.state;
    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          <Link to="/dashboard" className="sidebar__menu__link">
            <span uk-icon="thumbnails" /> Dashboard
          </Link>
          <Link
            to="#"
            className="sidebar__menu__link"
            onClick={this.toggleJobsSubmenu}
          >
            <span uk-icon="tag" /> Order Management
          </Link>
          {/* Jobs Submenu */}
          {isJobsSubmenuVisible ? (
            <div>
              <Link
                to="/orders"
                className="sidebar__menu__link sidebar__menu__link--indented"
              >
                <span uk-icon="chevron-right" />Orders List
              </Link>
              <Link
                to="/orders/new"
                className="sidebar__menu__link sidebar__menu__link--indented"
              >
                <span uk-icon="chevron-right" />Create New Order
              </Link>
            </div>
          ) : null}
          {/* Billing */}
          <Link
            to="#"
            className="sidebar__menu__link"
            onClick={this.toggleInvoiceSubmenu}
          >
            <span uk-icon="cart" /> Invoice Management
          </Link>
          {/* Jobs Submenu */}
          {isInvoiceSubmenuVisible ? (
            <div>
              <Link
                to="/invoices"
                className="sidebar__menu__link sidebar__menu__link--indented"
              >
                <span uk-icon="chevron-right" />Orders List
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

// Exports
export default Sidebar;
