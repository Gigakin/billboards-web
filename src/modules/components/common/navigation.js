// Modules
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert";

// Services
import AuthService from "../../services/auth-service";

// Classes
class Navigation extends React.Component {
  // Logout
  logout = () => {
    Swal({
      text: "Logout?",
      buttons: true
    }).then(logout => {
      if (logout) {
        AuthService.logout();
        return this.props.history.push("/login");
      }
      return false;
    });
  };

  render() {
    return (
      <div className="navigation">
        {/* Brand */}
        <Link to="/" className="navigation__brand">
          billboards
        </Link>
        {/* Actions */}
        <div className="navigation__actions">
          <div className="navigation__actions__action">
            <button
              className="uk-button uk-button-small uk-button-primary"
              onClick={this.logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default withRouter(Navigation);
