// Modules
import React from "react";

// Classes
class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        owner: 1 // Default: Billboards
      }
    };
  }

  // Capture Order Details
  captureOrderDetails = event => {
    let value = event.target.value;
    if (event.target.id === "owner") {
      value = parseInt(value, 10);
    }
    return this.setState({
      order: {
        ...this.state.order,
        [event.target.id]: value
      }
    });
  };

  // Save Details
  saveDetails = event => {
    event.preventDefault();
    let { order } = this.state;
    return this.props.methods.saveOrderDetails(order);
  };

  render() {
    let { accountOwners } = this.props;

    return (
      <form
        onSubmit={this.saveDetails}
        className="uk-grid uk-grid-small uk-form-stacked"
      >
        <div className="uk-width-1-3">
          <label className="uk-form-label">Job Name</label>
          <div className="uk-form-controls">
            <input
              id="name"
              onChange={this.captureOrderDetails}
              className="uk-input"
              autoFocus
              required
            />
          </div>
        </div>
        <div className="uk-width-1-3">
          <label className="uk-form-label">Job Description</label>
          <input
            id="description"
            onChange={this.captureOrderDetails}
            className="uk-input"
            required
          />
        </div>
        <div className="uk-width-1-3">
          <label className="uk-form-label">Account Owner</label>
          <div className="uk-form-control">
            <select
              id="owner"
              onChange={this.captureOrderDetails}
              className="uk-select"
              required
            >
              {accountOwners && accountOwners.length
                ? accountOwners.map((owner, index) => (
                    <option value={owner.id} key={`account_owner_${index}`}>
                      {owner.owner}
                    </option>
                  ))
                : null}
            </select>
          </div>
        </div>
        <div className="uk-width-1-2 uk-margin">
          <label className="uk-margin-right">
            <input type="checkbox" className="uk-checkbox" value="designing" />{" "}
            Designing
          </label>
          <label className="uk-margin-right">
            <input type="checkbox" className="uk-checkbox" value="scanning" />{" "}
            Scanning
          </label>
        </div>
        <div className="uk-width-1-2 uk-margin-top uk-flex uk-flex-right">
          <button type="submit" className="uk-button uk-button-primary">
            Save and Continue
          </button>
        </div>
      </form>
    );
  }
}

// Default Props
OrderDetails.defaultProps = {
  accountOwners: []
};

// Exports
export default OrderDetails;
