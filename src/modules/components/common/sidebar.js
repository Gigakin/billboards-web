// Modules
import React from "react";
import { Link } from "react-router-dom";

// Classes
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmenuVisible: true
    };
  }

  // Toggle Submenu
  toggleSubmenu = () => {
    let { isSubmenuVisible } = this.state;
    return this.setState({ isSubmenuVisible: !isSubmenuVisible });
  };

  render() {
    let { isSubmenuVisible } = this.state;
    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          <Link to="/dashboard" className="sidebar__menu__link">
            <span uk-icon="thumbnails" /> Dashboard
          </Link>
          <Link
            to="#"
            className="sidebar__menu__link"
            onClick={this.toggleSubmenu}
          >
            <span uk-icon="tag" /> Job Management
          </Link>
          {/* Submenu */}
          {isSubmenuVisible ? (
            <div>
              <Link
                to="/jobs"
                className="sidebar__menu__link sidebar__menu__link--indented"
              >
                <span uk-icon="chevron-right" />Orders List
              </Link>
              <Link
                to="/jobs/new"
                className="sidebar__menu__link sidebar__menu__link--indented"
              >
                <span uk-icon="chevron-right" />Create New Job
              </Link>
            </div>
          ) : null}
          {/* Billing */}
          <Link to="/bills" className="sidebar__menu__link">
            <span uk-icon="cart" /> Billing
          </Link>
        </div>
      </div>
    );
  }
}

// Exports
export default Sidebar;
