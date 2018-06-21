// Modules
import React from "react";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert";

// Assets
import Methods from "../../methods";

// Services
import AuthService from "../../services/auth-service";
import StorageService from "../../services/storage-service";

// Classes
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  // Logout
  logout = () => {
    Swal({
      title: "Logout?",
      buttons: true
    }).then(logout => {
      if (logout) {
        AuthService.logout();
        return this.props.history.push("/login");
      }
      return false;
    });
  };

  componentDidMount() {
    // Get User Details
    let user = StorageService.getLocalDataAsJson("user");
    if (user) return this.setState({ user: user });
  }

  render() {
    let { user } = this.state;
    return (
      <div className="navigation">
        {/* Brand */}
        <Link to="/" className="navigation__brand">
          billboards
        </Link>
        {/* Actions */}
        <div className="navigation__actions">
          <div className="navigation__actions__action">
            <span>{`${user.firstname} ${user.lastname} (${Methods.capitalize(
              user.role
            )})`}</span>
          </div>
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
