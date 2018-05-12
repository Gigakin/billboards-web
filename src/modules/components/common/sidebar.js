// Modules
import React from "react";
import { NavLink } from "react-router-dom";

// Classes
class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__menu">
          <NavLink to="/dashboard" className="sidebar__menu__link">
            Dashboard
          </NavLink>
          <NavLink to="/jobs" className="sidebar__menu__link">
            Job Orders
          </NavLink>
        </div>
      </div>
    );
  }
}

// Exports
export default Sidebar;
