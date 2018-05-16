// Modules
import React from "react";
import { Link } from "react-router-dom";

// Classes
class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          <Link to="/dashboard" className="sidebar__menu__link">
            Dashboard
          </Link>
          <div className="sidebar__menu__section-title">Job Management</div>
          <Link to="/jobs" className="sidebar__menu__link">
            Orders List
          </Link>
          <Link to="/jobs/new" className="sidebar__menu__link">
            Create New Job
          </Link>
        </div>
      </div>
    );
  }
}

// Exports
export default Sidebar;
