// Modules
import React from "react";

// Imports
import Strings from "../../strings";

// Components
import Alert from "../common/alert";

// Services
import AuthService from "../../services/auth-service";
import PermissionService from "../../services/permission-service";
import StorageService from "../../services/storage-service";

// Classes
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {},
      isProcessingForm: false,
      loginError: false
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
    let { credentials } = this.state;
    this.setState({ loginError: null, isProcessingForm: true });
    AuthService.login(credentials).then(
      response => {
        let { user, access_token } = response;
        PermissionService.setRole(user.role);
        StorageService.setLocalData("access_token", access_token);
        return this.props.history.push("/dashboard");
      },
      error => {
        let { response } = error;
        this.setState({
          loginError:
            response && response.data
              ? response.data.message
              : Strings.COMMON.UNKNOWN_NETWORK_ERROR,
          isProcessingForm: false
        });
      }
    );
  };

  render() {
    let { loginError } = this.state;

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
                  {/* Alert */}
                  {loginError ? (
                    <Alert type="danger" message={loginError} />
                  ) : null}
                  {/* Form */}
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
                      className="uk-button uk-button-primary"
                      onClick={this.login}
                    >
                      Login
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
