// Modules
import React from "react";

// Components
import StatCard from "../common/stat-card";

// Services
import StorageService from "../../services/storage-service";

// Classes
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    // Get User Details
    let user = StorageService.getLocalDataAsJson("user");
    if (user) return this.setState({ user: user });
  }

  render() {
    let { user } = this.state;
    return (
      <div className="uk-padding-large">
        {/* Greeting */}
        <div className="uk-width-1-1 uk-margin-medium-bottom">
          <h1>Hi {user.firstname}!</h1>
          <p>Here's the progress you've made so far...</p>
        </div>
        {/* Cards */}
        <div className="uk-grid uk-margin-medium-bottom">
          <div className="uk-width-1-3">
            <StatCard count="32" title="Jobs" theme="purple" />
          </div>
          <div className="uk-width-1-3">
            <StatCard count="19" title="Designs" theme="red" />
          </div>
          <div className="uk-width-1-3">
            <StatCard count="17" title="Prints" theme="green" />
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default Dashboard;
