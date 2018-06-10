// Modules
import React from "react";

// Components
import Select from "../../common/select";

// Classes
class PartyDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      party: {},
      selectedParty: {}
    };
  }

  // Capture Billing Details
  capturePartyDetails = event => {
    let value = event.target.value;
    if (event.target.id === "postal_code") {
      value = parseInt(value, 10);
    }
    return this.setState({
      party: {
        ...this.state.party,
        [event.target.id]: value
      }
    });
  };

  // Find Party By Number
  findPartyByNumber = selectedoption => {
    return console.log(selectedoption);
  };

  // Save Details
  saveDetails = event => {
    event.preventDefault();
    let { party } = this.state;
    return this.props.methods.savePartyDetails(party);
  };

  render() {
    let { selectedParty } = this.state;

    return (
      <div>
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
            <button type="submit" className="uk-button uk-button-primary">
              Save and Continue
            </button>
            <button type="submit" className="uk-button uk-button-primary">
              Create Draft Order
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Defualt Props
PartyDetails.defaultProps = {
  showSaveAndContinueButton: true,
  showCreateDraftOrderButton: false
};

// Exports
export default PartyDetails;
