// Modules
import React from "react";

// Classes
class NewJobOrder extends React.Component {
  render() {
    return (
      <div className="uk-flex">
        <div className="uk-width-1-1 uk-padding-large">
          {/* Header */}
          <div className="uk-width-1-1">
            <h2>New Job Order</h2>
          </div>
          {/* Job Description */}
          <div className="uk-width-1-1 uk-margin-bottom">
            <h4>Job Description</h4>
            <form className="uk-grid uk-grid-small uk-form-stacked">
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
                  required
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
            </form>
          </div>

          {/* Party Information */}
          <div className="uk-width-1-1 uk-margin-bottom">
            <h4>Customer Information</h4>
            <form className="uk-grid uk-grid-small uk-form-stacked">
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
                    class="uk-checkbox"
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
                      required
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
                      required
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
                      onChange={this.captureBillingAddressState}
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
                      onChange={this.captureShippingAddress}
                      className="uk-input"
                      required
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
                      onChange={this.captureShippingAddress}
                      className="uk-input"
                      required
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
                      required
                    />
                  </div>
                </div>
                <div className="uk-width-1-1 uk-margin">
                  <label className="uk-form-label">State</label>
                  <div className="uk-form-controls">
                    <select
                      id="state"
                      onChange={this.captureShippingAddressState}
                      className="uk-select"
                      required
                    >
                      <option value="" defaultChecked />
                      <option value="mh">Maharashtra</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default NewJobOrder;
