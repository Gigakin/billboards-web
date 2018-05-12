// Modules
import React from "react";

// Components
import OrderList from "../common/order-list";

// Classes
class NewJobOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
      jobsList: [],
      customer: {},
      designer: {},
      createOrderError: false
    };
  }

  // Capture Job Details
  captureJobDescription = event => {
    return this.setState({
      job: {
        ...this.state.job,
        [event.target.id]: event.target.value
      }
    });
  };

  // Capture Job Details Options
  // Maybe push the values in an array?
  captureJobDescriptionOption = event => {
    return this.setState({
      job: {
        ...this.state.job,
        [event.target.id]: event.target.value
      }
    });
  };

  // Capture Customer Details
  captureCustomerInformation = event => {
    let value = event.target.value;
    if (event.target.id === "phoneNumber") {
      value = parseInt(value, 10);
    }
    return this.setState({
      customer: {
        ...this.state.customer,
        [event.target.id]: value
      }
    });
  };

  // Capture Billing Address
  captureBillingAddress = event => {
    return this.setState({
      customer: {
        ...this.state.customer,
        billingAddress: {
          ...this.state.customer.billingAddress,
          [event.target.id]: event.target.value
        }
      }
    });
  };

  // Capture Shipping Address
  captureShippingAddress = event => {
    return this.setState({
      customer: {
        ...this.state.customer,
        shippingAddress: {
          ...this.state.customer.shippingAddress,
          [event.target.id]: event.target.value
        }
      }
    });
  };

  // Match Billing and Shipping Addresses
  // What can be done here to make it work?
  matchBillingAndShippinhAddresses = event => {
    console.log(event.target.value);
  };

  // Capture Designer Details
  captureDesignerDetails = event => {
    return this.setState({
      designer: {
        ...this.state.designer,
        [event.target.id]: event.target.value
      }
    });
  };

  // Create Order
  createOrder = event => {
    event.preventDefault();
    let { customer, designer, job } = this.state;
    let payload = { customer, designer, job };
    console.log(payload);
  };

  render() {
    return (
      <form className="uk-flex" onSubmit={this.createOrder}>
        <div className="uk-width-1-1 uk-padding-large">
          {/* Header */}
          <div className="uk-width-1-1">
            <h2>New Job Order</h2>
          </div>
          {/* Job Description */}
          <div className="uk-width-1-1 uk-margin-large-bottom">
            <h4>Job Description</h4>
            <div className="uk-grid uk-grid-small uk-form-stacked">
              <div className="uk-width-1-2">
                <label className="uk-form-label">Job Name</label>
                <div className="uk-form-controls">
                  <input
                    type="text"
                    id="name"
                    onChange={this.captureJobDescription}
                    className="uk-input"
                    autoFocus
                    required
                  />
                </div>
              </div>
              <div className="uk-width-1-2">
                <label className="uk-form-label">Job Description</label>
                <input
                  type="text"
                  id="description"
                  onChange={this.captureJobDescription}
                  className="uk-input"
                />
              </div>
              <div className="uk-width-1-1 uk-margin">
                <label className="uk-margin-right">
                  <input
                    type="checkbox"
                    onChange={this.captureJobDescriptionOption}
                    className="uk-checkbox"
                    value="designing"
                  />{" "}
                  Designing
                </label>
                <label className="uk-margin-right">
                  <input
                    type="checkbox"
                    onChange={this.captureJobDescriptionOption}
                    className="uk-checkbox"
                    value="scanning"
                  />{" "}
                  Scanning
                </label>
              </div>
            </div>
          </div>

          {/* Party Information */}
          <div className="uk-width-1-1 uk-margin-large-bottom">
            <h4>Customer Information</h4>
            <div className="uk-grid uk-grid-small uk-form-stacked">
              <div className="uk-width-1-2 uk-margin">
                <label className="uk-form-label">Phone Number</label>
                <div className="uk-form-controls">
                  <input
                    type="number"
                    id="phoneNumber"
                    onChange={this.captureCustomerInformation}
                    className="uk-input"
                    minLength="10"
                    maxLength="10"
                    required
                  />
                </div>
              </div>
              <div className="uk-width-1-2 uk-margin">
                <label>
                  <input
                    type="checkbox"
                    onChange={this.matchBillingAndShippinhAddresses}
                    className="uk-checkbox"
                    value="true"
                  />{" "}
                  Shipping address is the same as Billing Address
                </label>
              </div>

              {/* Billing Address */}
              <div className="uk-width-1-2">
                <h4>Bill to Party</h4>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">Bill to Party</label>
                  <div className="uk-form-controls">
                    <input
                      type="text"
                      id="partyName"
                      onChange={this.captureBillingAddress}
                      className="uk-input"
                      required
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">Contact Person</label>
                  <div className="uk-form-controls">
                    <input
                      type="text"
                      id="contactPerson"
                      onChange={this.captureBillingAddress}
                      className="uk-input"
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">Email Address</label>
                  <div className="uk-form-controls">
                    <input
                      type="email"
                      id="email"
                      onChange={this.captureBillingAddress}
                      className="uk-input"
                      required
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">GSTIN</label>
                  <div className="uk-form-controls">
                    <input
                      type="text"
                      id="gstin"
                      onChange={this.captureBillingAddress}
                      className="uk-input"
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">Billing Address</label>
                  <div className="uk-form-controls">
                    <input
                      type="text"
                      id="billingAddress"
                      onChange={this.captureBillingAddress}
                      className="uk-input"
                      required
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">State</label>
                  <div className="uk-form-controls">
                    <select
                      id="state"
                      onChange={this.captureBillingAddress}
                      className="uk-select"
                      required
                    >
                      <option value="" defaultChecked />
                      <option value="mh">Maharashtra</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="uk-width-1-2">
                <h4>Ship to Party</h4>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">Ship to Party</label>
                  <div className="uk-form-controls">
                    <input
                      type="text"
                      id="partyName"
                      onChange={this.captureShippingAddress}
                      className="uk-input"
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">Contact Person</label>
                  <div className="uk-form-controls">
                    <input
                      type="text"
                      id="contactPerson"
                      onChange={this.captureShippingAddress}
                      className="uk-input"
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">Email Address</label>
                  <div className="uk-form-controls">
                    <input
                      type="email"
                      id="email"
                      onChange={this.captureShippingAddress}
                      className="uk-input"
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">GSTIN</label>
                  <div className="uk-form-controls">
                    <input
                      type="text"
                      id="gstin"
                      onChange={this.captureShippingAddress}
                      className="uk-input"
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">Billing Address</label>
                  <div className="uk-form-controls">
                    <input
                      type="text"
                      id="billingAddress"
                      onChange={this.captureShippingAddress}
                      className="uk-input"
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">State</label>
                  <div className="uk-form-controls">
                    <select
                      id="state"
                      onChange={this.captureShippingAddress}
                      className="uk-select"
                    >
                      <option value="" defaultChecked />
                      <option value="mh">Maharashtra</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Types */}
          <div className="uk-width-1-1 uk-margin-large-bottom">
            <h4>Job Types</h4>
            <ul uk-tab="">
              <li className="uk-active">
                <a onClick={() => this.switchTab(1)}>Front-lit</a>
              </li>
              <li>
                <a onClick={() => this.switchTab(2)}>Back-lit</a>
              </li>
              <li>
                <a onClick={() => this.switchTab(3)}>Vinyl</a>
              </li>
              <li>
                <a onClick={() => this.switchTab(4)}>Indoor</a>
              </li>
            </ul>
            <div className="uk-width-1-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              delectus maxime vitae ex eius iste similique nemo quidem. Dolorum
              cum vitae iure veritatis labore obcaecati hic rem! Animi, sunt
              numquam.
            </div>
          </div>

          {/* Order List */}
          <div className="uk-width-1-1 uk-margin-large-bottom">
            <h4>Order List</h4>
            <OrderList />
          </div>

          {/* Assign Designer */}
          <div className="uk-grid uk-width-1-1 uk-margin-large-bottom">
            <div className="uk-width-2-3">
              <h4>Assign Designer</h4>
              <div className="uk-form-stacked">
                <div className="uk-width-1-2 uk-margin">
                  <label className="uk-form-label">Designer</label>
                  <div className="uk-form-controls">
                    <select
                      type="text"
                      id="designer"
                      onChange={this.captureDesignerDetails}
                      className="uk-select"
                      required
                    >
                      <option />
                      <option>Designer A</option>
                      <option>Designer B</option>
                      <option>Designer C</option>
                    </select>
                  </div>
                </div>
                <div className="uk-width-1-2">
                  <label className="uk-form-label">Other Notes</label>
                  <textarea
                    type="text"
                    id="description"
                    onChange={this.captureDesignerDetails}
                    className="uk-textarea"
                  />
                </div>
              </div>
            </div>

            {/* Final Submit */}
            <div className="uk-width-1-3">
              <button type="submit" className="uk-button uk-button-primary">
                Create Order
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

// Exports
export default NewJobOrder;