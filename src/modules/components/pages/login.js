// Modules
import React from "react";

// Services
import AuthService from "../../services/auth-service";
import PermissionService from "../../services/permission-service";

// Classes
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {},
      isProcessingForm: false,
      loginError: false,
      role: "frontdesk"
    };
  }

  // Capture Credentials
  captureCredentials = event => {
    return this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.id]: event.target.value
      }
    });
  };

  // Login
  login = event => {
    event.preventDefault();
    AuthService.login();
    if (this.state.role) PermissionService.setRole(this.state.role);
    return this.props.history.push("/dashboard");
  };

  render() {
    return (
      <div className="login">
        <div
          className="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle"
          uk-grid=""
        >
          <div
            className="uk-background-cover"
            style={{ backgroundImage: "url('/assets/images/login_bg.jpg')" }}
            uk-height-viewport=""
          />
          <div className="uk-padding-large">
            <div className="uk-flex uk-flex-center">
              <div className="uk-width-1-2">
                <div className="uk-margin">
                  <h1>billboards</h1>
                  <p>
                    Welcome to billboards' Management Application. Please enter
                    your username and password to continue.
                  </p>
                </div>
                <form onSubmit={this.login} className="uk-form-stacked">
                  <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="username">
                      Email or Username
                    </label>
                    <div className="uk-form-controls">
                      <input
                        type="text"
                        id="username"
                        onChange={this.captureCredentials}
                        className="uk-input"
                        autoFocus
                        required
                      />
                    </div>
                  </div>
                  <div className="uk-margin">
                    <label className="uk-form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="uk-form-controls">
                      <input
                        type="password"
                        id="password"
                        onChange={this.captureCredentials}
                        className="uk-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="uk-margin">
                    <button
                      type="submit"
                      className="uk-button uk-button-primary uk-buttons-small uk-margin-right-small"
                      onClick={() => this.setState({ role: "frontdesk" })}
                    >
                      Login FD
                    </button>
                    <button
                      type="submit"
                      className="uk-button uk-button-primary uk-buttons-small uk-margin-right-small"
                      onClick={() => this.setState({ role: "designer" })}
                    >
                      Login D
                    </button>
                    <button
                      type="submit"
                      className="uk-button uk-button-primary uk-buttons-small uk-margin-right-small"
                      onClick={() => this.setState({ role: "printer" })}
                    >
                      Login P
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default Login;
