// Modules
import React from "react";
import { Link } from "react-router-dom";

// Components
import Select from "../common/select";

// Services
import OrderService from "../../services/order-service";
import AccountOwnerService from "../../services/account-owners-service";

// Classes
class NewJobOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        owner: 1
      },
      party: {},
      selectedParty: {},
      accountOwners: [],
      currentTab: "order"
    };
  }

  // Get Account Owners
  getAccountOwners = () => {
    AccountOwnerService.getAccountOwners().then(owners => {
      return this.setState({ accountOwners: owners });
    });
  };

  // Find Party By Number
  findPartyByNumber = selectedoption => {
    return;
  };

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

  // Capture Billing Details
  capturePartyDetails = event => {
    let value = event.target.value;
    if (event.target.id === "postalCode") {
      value = parseInt(value, 10);
    }
    return this.setState({
      party: {
        ...this.state.party,
        [event.target.id]: value
      }
    });
  };

  // Create Order
  createOrder = event => {
    event.preventDefault();
    let { order, party } = this.state;
    OrderService.createOrder({ order: order, party: party }).then(order => {
      console.log(order);
    });
  };

  // Switch Tab
  switchTab = tab => {
    if (tab) return this.setState({ currentTab: tab });
    return false;
  };

  componentDidMount() {
    return this.getAccountOwners();
  }

  render() {
    let { accountOwners, selectedParty, currentTab } = this.state;

    return (
      <form className="new-order">
        <div className="uk-width-1-1">
          {/* Header */}
          <div className="lists__header">
            <div className="uk-width-1-1">
              <ul className="breadcrumbs">
                <Link to="/dashboard" className="breadcrumbs__item">
                  <span uk-icon="home" />
                </Link>
                <Link to="/orders" className="breadcrumbs__item">
                  Order Management
                </Link>
                <Link to="#" className="breadcrumbs__item">
                  Create New Order
                </Link>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="new-order__content">
            {/* Tabs */}
            <ul uk-tab="">
              <li className={currentTab === "order" ? "uk-active" : null}>
                <a onClick={() => this.switchTab("order")}>1. Order Details</a>
              </li>
              <li className={currentTab === "party" ? "uk-active" : null}>
                <a onClick={() => this.switchTab("party")}>2. Party Details</a>
              </li>
            </ul>

            {/* Switcher */}
            <div className="uk-tab-content">
              {/* Order Details */}
              {currentTab === "order" ? (
                <div>
                  <div className="uk-padding">
                    <div className="uk-width-1-1">
                      <div className="uk-grid uk-grid-small uk-form-stacked">
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
                          <label className="uk-form-label">
                            Job Description
                          </label>
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
                                    <option
                                      value={owner.id}
                                      key={`account_owner_${index}`}
                                    >
                                      {owner.owner}
                                    </option>
                                  ))
                                : null}
                            </select>
                          </div>
                        </div>
                        <div className="uk-width-1-2 uk-margin">
                          <label className="uk-margin-right">
                            <input
                              type="checkbox"
                              className="uk-checkbox"
                              value="designing"
                            />{" "}
                            Designing
                          </label>
                          <label className="uk-margin-right">
                            <input
                              type="checkbox"
                              className="uk-checkbox"
                              value="scanning"
                            />{" "}
                            Scanning
                          </label>
                        </div>
                        <div className="uk-width-1-2 uk-margin-top uk-flex uk-flex-right">
                          <button
                            type="submit"
                            className="uk-button uk-button-primary"
                          >
                            Save and Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Party Details */}
              {currentTab === "party" ? (
                <div className="uk-padding">
                  <div className="uk-grid uk-grid-small uk-form-stacked uk-margin">
                    <div className="uk-width-1-2 uk-margin">
                      <label className="uk-form-label">Phone Number</label>
                      <div className="uk-form-controls">
                        <Select
                          value={selectedParty}
                          onChange={this.findPartyByNumber}
                          options={this.dummyParties}
                        />
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="uk-width-1-1 uk-grid uk-grid-small">
                      <div className="uk-width-1-1 uk-margin-small">
                        <h4>Bill to Party</h4>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">Bill to Party</label>
                        <div className="uk-form-controls">
                          <input
                            type="text"
                            id="partyName"
                            onChange={this.capturePartyDetails}
                            className="uk-input"
                            required
                          />
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">Contact Person</label>
                        <div className="uk-form-controls">
                          <input
                            type="text"
                            id="contactPerson"
                            onChange={this.capturePartyDetails}
                            className="uk-input"
                          />
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">Email Address</label>
                        <div className="uk-form-controls">
                          <input
                            type="email"
                            id="email"
                            onChange={this.capturePartyDetails}
                            className="uk-input"
                            required
                          />
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">GSTIN</label>
                        <div className="uk-form-controls">
                          <input
                            type="text"
                            id="gstin"
                            onChange={this.capturePartyDetails}
                            className="uk-input"
                          />
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">Billing Address</label>
                        <div className="uk-form-controls">
                          <input
                            type="text"
                            id="addressLine1"
                            onChange={this.capturePartyDetails}
                            className="uk-input"
                            required
                          />
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">City</label>
                        <div className="uk-form-controls">
                          <input
                            type="text"
                            id="city"
                            onChange={this.capturePartyDetails}
                            className="uk-input"
                            required
                          />
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">State</label>
                        <div className="uk-form-controls">
                          <select
                            id="state"
                            onChange={this.capturePartyDetails}
                            className="uk-select"
                            required
                          >
                            <option value="" defaultChecked />
                            <option value="Maharashtra">Maharashtra</option>
                          </select>
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">Postal Code</label>
                        <div className="uk-form-controls">
                          <input
                            type="number"
                            id="postalCode"
                            onChange={this.capturePartyDetails}
                            className="uk-input"
                            minLength="6"
                            maxLength="6"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Submit */}
                  <div className="uk-width-1-1 uk-flex uk-flex-right">
                    <button
                      type="button"
                      className="uk-button uk-button-primary uk-margin-small-right"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="uk-button uk-button-primary"
                    >
                      Create Draft Order
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    );
  }
}

// Exports
export default NewJobOrder;
