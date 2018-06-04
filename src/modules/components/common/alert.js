// Modules
import React from "react";

// Classes
class Alert extends React.Component {
  render() {
    let { type, message } = this.props;
    return (
      <div className={`uk-alert uk-alert-${type}`}>
        <div className="uk-text-small">{message}</div>
      </div>
    );
  }
}

// Default Props
Alert.defaultProps = {
  type: "warning",
  message: "An alert"
};

// Exports
export default Alert;
