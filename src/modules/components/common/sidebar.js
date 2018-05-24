// Modules
import React from "react";
import { Link } from "react-router-dom";

// Services
import PermissionService from "../../services/permission-service";

// Classes
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isJobsSubmenuVisible: true,
      isInvoiceSubmenuVisible: true,
      permissions: {}
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

  componentDidMount() {
    let role = PermissionService.getRole();
    let permissions = PermissionService.getPermissions(role);
    if (permissions) return this.setState({ permissions: permissions });
    return;
  }

  render() {
    let {
      permissions,
      isJobsSubmenuVisible,
      isInvoiceSubmenuVisible
    } = this.state;

    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          {/* Dashboard */}
          {permissions.canSeeDashboard ? (
            <Link to="/dashboard" className="sidebar__menu__link">
              <span uk-icon="thumbnails" /> Dashboard
            </Link>
          ) : null}

          {/* Order Management */}
          {permissions.canSeeOrderManagement ? (
            <div>
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
                  {/* Orders List */}
                  <Link
                    to="/orders"
                    className="sidebar__menu__link sidebar__menu__link--indented"
                  >
                    <span uk-icon="chevron-right" />Orders List
                  </Link>
                  {/* Create New Order */}
                  {permissions.canCreateNewOrder ? (
                    <Link
                      to="/orders/new"
                      className="sidebar__menu__link sidebar__menu__link--indented"
                    >
                      <span uk-icon="chevron-right" />Create New Order
                    </Link>
                  ) : null}
                  {/* Handovers */}
                  {permissions.canHandoverJob ? (
                    <Link
                      to="/handovers"
                      className="sidebar__menu__link sidebar__menu__link--indented"
                    >
                      <span uk-icon="chevron-right" />Handovers
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Billing */}
          {permissions.canSeeInvoiceManagement ? (
            <div>
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
          ) : null}
        </div>
      </div>
    );
  }
}

// Exports
export default Sidebar;
