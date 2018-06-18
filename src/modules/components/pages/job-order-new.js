// Modules
import React from "react";
import { Link } from "react-router-dom";

// Assets
import Strings from "../../strings";

// Components
import Typeahead from "../common/typeahead";
import Notification from "../common/notification";

// Services
import OrderService from "../../services/order-service";
import AccountOwnerService from "../../services/account-owners-service";
import PartyService from "../../services/party-service";

// Classes
class NewJobOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        name: "",
        description: "",
        is_designing: false,
        is_scanning: false,
        owner: 1
      },
      party: {
        id: "",
        name: "",
        contact_person: "",
        mobile: "",
        gstin: "",
        email: "",
        address_line_1: "",
        city: "",
        state: "",
        postal_code: ""
      },
      accountOwners: [],
      parties: [],
      currentTab: "order"
    };

    // Dummy Parties
    this.parties = [];
  }

  // Get Account Owners
  getAccountOwners = () => {
    AccountOwnerService.getAccountOwners().then(
      owners => this.setState({ accountOwners: owners }),
      error => {
        return Notification.Notify({
          text: `Failed to get list of account owners. (${error})`,
          type: "error"
        });
      }
    );
  };

  // Get Parties
  getParties = () => {
    PartyService.getParties().then(
      parties => {
        return parties.forEach(party => {
          this.parties.push(party.mobile);
          this.setState({ parties: parties });
        });
      },
      error => {
        return Notification.Notify({
          text: `Failed to get list of parties. (${error})`,
          type: "error"
        });
      }
    );
  };

  // Get Party Information
  getPartyInformation = partynumber => {
    if (partynumber) {
      let { parties } = this.state;
      let selectedParty = {};
      parties.forEach(party => {
        if (party.mobile === partynumber) {
          return (selectedParty = party);
        }
      });
      return this.setState({
        party: selectedParty
      });
    }
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

  // Capture Additional Features
  captureAdditionalOrderFeatures = event => {
    let id = event.target.id;
    return this.setState({
      order: {
        ...this.state.order,
        [id]: !this.state.order[id]
      }
    });
  };

  // Create Order
  createOrder = event => {
    event.preventDefault();
    let { order, party } = this.state;

    // Append additional info
    order.party = party.id;

    // Call service
    OrderService.createOrder(order).then(
      response => {
        Notification.Notify({
          text: response.message ? response.message : "Order created"
        });
        // Reset details
        return this.setState({
          party: {},
          order: { owner: 1 },
          currentTab: "order"
        });
        // TODO: Maybe take the user to the
        // TODO: newly created order details page??
      },
      error => {
        let { data } = error.response;
        return Notification.Notify({
          text: data ? data : Strings.COMMON.UNKNOWN_ERROR,
          type: "error"
        });
      }
    );
  };

  // Switch Tab
  switchTab = tab => {
    if (tab) return this.setState({ currentTab: tab });
    return false;
  };

  componentDidMount() {
    this.getParties();
    this.getAccountOwners();
  }

  render() {
    let { accountOwners, currentTab } = this.state;

    return (
      <form className="new-order" onSubmit={this.createOrder}>
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
              <li className="uk-disabled">
                <a>3. Add Jobs</a>
              </li>
              <li className="uk-disabled">
                <a>4. Review</a>
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
                              value={this.state.order.name}
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
                            value={this.state.order.description}
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
                              value={this.state.order.owner}
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
                              id="is_designing"
                              className="uk-checkbox"
                              onClick={this.captureAdditionalOrderFeatures}
                            />{" "}
                            Designing
                          </label>
                          <label className="uk-margin-right">
                            <input
                              type="checkbox"
                              id="is_scanning"
                              className="uk-checkbox"
                              onClick={this.captureAdditionalOrderFeatures}
                            />{" "}
                            Scanning
                          </label>
                        </div>
                        <div className="uk-width-1-2 uk-margin-top uk-flex uk-flex-right">
                          <button
                            type="button"
                            className="uk-button uk-button-primary"
                            onClick={() => this.switchTab("party")}
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
                        <Typeahead
                          maxVisible={4}
                          options={this.parties}
                          customClasses={{ input: "uk-input" }}
                          onOptionSelected={option =>
                            this.getPartyInformation(option)
                          }
                          inputProps={{
                            type: "number",
                            // Need to look into this "new-password"
                            autoComplete: "new-password"
                          }}
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
                            id="name"
                            onChange={this.capturePartyDetails}
                            value={this.state.party.name}
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
                            id="contact_person"
                            onChange={this.capturePartyDetails}
                            value={this.state.party.contact_person}
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
                            value={this.state.party.email}
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
                            value={this.state.party.gstin}
                            className="uk-input"
                          />
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
                        <label className="uk-form-label">Billing Address</label>
                        <div className="uk-form-controls">
                          <input
                            type="text"
                            id="address_line_1"
                            onChange={this.capturePartyDetails}
                            value={this.state.party.address_line_1}
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
                            value={this.state.party.city}
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
                            value={this.state.party.state}
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
                            id="postal_code"
                            onChange={this.capturePartyDetails}
                            value={this.state.party.postal_code}
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
                      onClick={() => this.switchTab("order")}
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
