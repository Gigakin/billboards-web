// Modules
import React from "react";

// Components
import JobList from "../common/job-list";
import Select from "../common/select";

// Classes
class NewJobOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
      jobDetails: {
        type: "frontlit",
        quality: "quality1",
        sizeUnits: "meters"
      },
      jobsList: [],
      customer: {},
      designer: {},
      createOrderError: false,
      selectedParty: ""
    };
    this.jobDetails = {};

    // this should be a state property
    this.dummyParties = [
      {
        value: "9420675178",
        label: "Ajay Gupta (9420675178)"
      },
      {
        value: "8308986944",
        label: "John Doe (8308986944)"
      }
    ];
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

  // Find Party By Phone
  // Fetches the list of the customers
  findPartyByNumber = selectedoption => {
    if (selectedoption) {
      return this.setState({
        selectedParty: selectedoption
      });
    }
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
  matchBillingAndShippingAddresses = event => {
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

  // Capture Job Details
  captureJobDetails = event => {
    return this.setState({
      jobDetails: {
        ...this.state.jobDetails,
        [event.target.id]: event.target.value
      }
    });
  };

  // Add Job
  addJob = event => {
    event.preventDefault();
    let { jobDetails, jobsList } = this.state;
    return this.setState({
      jobsList: jobsList.concat(jobDetails)
    });
  };

  // Remove Job
  removeJob = jobid => {
    let { jobsList } = this.state;
    return this.setState({
      jobsList: jobsList.filter((_, index) => index !== jobid)
    });
  };

  // Create Order
  createOrder = event => {
    event.preventDefault();
    let { customer, designer, job } = this.state;
    let payload = { customer, designer, job };
    console.log(payload);
  };

  // Back to Order List
  goBack = event => {
    return this.props.history.push("/jobs");
  };

  render() {
    let { jobsList, jobDetails, selectedParty } = this.state;
    return (
      <div className="new-order">
        <div className="uk-width-1-1">
          {/* Header */}
          <div className="new-order__header">
            <div className="uk-width-1-1 uk-flex-inline">
              <h2 className="new-order__header__title">New Job Order</h2>
            </div>
          </div>

          {/* Content */}
          <div className="new-order__content">
            {/* Tabs */}
            <ul uk-tab="">
              <li>
                <a href="#order">1. Order Details</a>
              </li>
              <li>
                <a href="#customer">2. Party Details</a>
              </li>
              <li>
                <a href="#jobs">3. Job Types</a>
              </li>
              <li>
                <a href="#review">4. Review</a>
              </li>
            </ul>

            {/* Switcher */}
            <ul className="uk-switcher">
              {/* Order Details */}
              <li>
                <div className="uk-padding">
                  <div className="uk-width-1-1">
                    <form
                      onSubmit={() => false}
                      className="uk-grid uk-grid-small uk-form-stacked"
                    >
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
                      <div className="uk-width-1-2 uk-margin">
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
                      <div className="uk-width-1-2 uk-margin-top uk-flex uk-flex-right">
                        <button
                          type="submit"
                          className="uk-button uk-button-primary"
                        >
                          Save and Continue
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </li>

              {/* Customer Details */}
              <li>
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
                            onChange={this.captureBillingAddress}
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
                            onChange={this.captureBillingAddress}
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
                            onChange={this.captureBillingAddress}
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
                            onChange={this.captureBillingAddress}
                            className="uk-input"
                          />
                        </div>
                      </div>
                      <div className="uk-width-1-2 uk-margin-small">
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
                      <div className="uk-width-1-2 uk-margin-small">
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
                  </div>
                  {/* Submit */}
                  <div className="uk-width-1-1 uk-flex uk-flex-right">
                    <button
                      type="button"
                      className="uk-button uk-button-primary uk-margin-small-right"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="uk-button uk-button-primary"
                    >
                      Save and Continue
                    </button>
                  </div>
                </div>
              </li>

              {/* Jobs List */}
              <li>
                <div className="new-order__content__two-columns">
                  <form
                    onSubmit={this.addJob}
                    className="uk-grid uk-form-stacked"
                  >
                    {/* Left */}
                    <div className="uk-width-1-2">
                      <div className="uk-padding">
                        <div className="uk-grid uk-grid-small">
                          {/* Type */}
                          <div className="uk-width-1-1 uk-margin">
                            <label className="uk-form-label">Type</label>
                            <div className="uk-form-controls">
                              <select
                                id="type"
                                className="uk-select"
                                onChange={this.captureJobDetails}
                                required
                              >
                                <option value="frontlit">Front-lit</option>
                                <option value="backlit">Back-lit</option>
                                <option value="vinyl">Vinyl</option>
                                <option value="indoor">Indoor</option>
                              </select>
                            </div>
                          </div>

                          {/* Quantity*/}
                          <div className="uk-width-1-2@s">
                            <label className="uk-form-label">Quantity</label>
                            <div className="uk-form-controls">
                              <input
                                type="number"
                                id="quantity"
                                onChange={this.captureJobDetails}
                                className="uk-input"
                                required
                              />
                            </div>
                          </div>

                          <div className="uk-width-1-2@s uk-flex uk-flex-middle">
                            {/* Quality: Frontlit */}
                            {jobDetails.type === "frontlit" ? (
                              <div className="uk-width-1-1">
                                <label className="uk-form-label">Quality</label>
                                <div className="uk-form-controls">
                                  <select
                                    id="quality"
                                    className="uk-select"
                                    onChange={this.captureJobDetails}
                                    required
                                  >
                                    <option value="quality1">
                                      Quality Option 01
                                    </option>
                                    <option value="quality2">
                                      Quality Option 02
                                    </option>
                                  </select>
                                </div>
                              </div>
                            ) : null}
                            {/* Quality: Backlit */}
                            {jobDetails.type === "backlit" ? (
                              <div className="uk-width-1-1 uk-margin">
                                <label>
                                  <input
                                    type="checkbox"
                                    className="uk-checkbox"
                                    value="scanning"
                                  />{" "}
                                  Star Backlit
                                </label>
                              </div>
                            ) : null}
                            {/* Quality: Vinyl */}
                            {jobDetails.type === "vinyl" ? (
                              <div className="uk-width-1-1 uk-margin">
                                <label>
                                  <input
                                    type="checkbox"
                                    className="uk-checkbox"
                                    value="scanning"
                                  />{" "}
                                  Transparent
                                </label>
                              </div>
                            ) : null}
                            {/* Quality: Indoor */}
                            {jobDetails.type === "indoor" ? (
                              <div className="uk-width-1-1 uk-margin">
                                <label>
                                  <input
                                    type="checkbox"
                                    className="uk-checkbox"
                                    value="scanning"
                                  />{" "}
                                  Eco
                                </label>
                              </div>
                            ) : null}
                          </div>

                          {/* Dimensions */}
                          <div className="uk-margin">
                            <label className="uk-form-label">Dimensions</label>
                            <div className="uk-form-controls">
                              <input
                                type="text"
                                id="sizeWidth"
                                onChange={this.captureJobDetails}
                                className="uk-input uk-width-1-3@s"
                                placeholder="Width"
                                required
                              />
                              <input
                                type="text"
                                id="sizeHeight"
                                onChange={this.captureJobDetails}
                                className="uk-input uk-width-1-3@s"
                                placeholder="Height"
                                required
                              />
                              <select
                                id="sizeUnits"
                                onChange={this.captureJobDetails}
                                className="uk-select uk-width-1-3@s"
                                required
                              >
                                <option value="meters">in Meters</option>
                                <option value="inches">in Inches</option>
                                <option value="feets">in Feets</option>
                              </select>
                            </div>
                          </div>

                          {/* Uploads */}
                          {/* Raw Design Files */}
                          <div className="uk-width-1-2">
                            <label className="uk-form-label">
                              Customer's Design File
                            </label>
                            <div className="uk-form-controls">
                              <input type="number" className="uk-input" />
                            </div>
                          </div>
                          {/* Finalized Design Files */}
                          <div className="uk-width-1-2">
                            <label className="uk-form-label">
                              Finalized Design File
                            </label>
                            <div className="uk-form-controls">
                              <input type="number" className="uk-input" />
                            </div>
                          </div>

                          {/* Options */}
                          <div className="uk-margin">
                            <div className="uk-form-label">Options</div>
                            {/* Frontlit */}
                            {jobDetails.type === "frontlit" ? (
                              <div className="uk-form-controls">
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="1lit"
                                  />{" "}
                                  1-Lit
                                </label>
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="framing"
                                  />{" "}
                                  Framing
                                </label>
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="pasting"
                                  />{" "}
                                  Pasting
                                </label>
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="piping"
                                  />{" "}
                                  Piping
                                </label>
                              </div>
                            ) : null}
                            {jobDetails.type === "backlit" ? (
                              <div className="uk-form-controls">
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="framing"
                                  />{" "}
                                  Framing
                                </label>
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="lolypop"
                                  />{" "}
                                  Lolypop
                                </label>
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="onlyprint"
                                  />{" "}
                                  Only Print
                                </label>
                              </div>
                            ) : null}
                            {jobDetails.type === "vinyl" ? (
                              <div className="uk-form-controls">
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="foamsheetpasting"
                                  />{" "}
                                  Foamsheet Pasting
                                </label>
                              </div>
                            ) : null}
                            {jobDetails.type === "indoor" ? (
                              <div className="uk-form-controls">
                                <label className="uk-margin-right">
                                  <input
                                    className="uk-radio"
                                    type="radio"
                                    name="mattelamination"
                                  />{" "}
                                  Matte Lamination
                                </label>
                              </div>
                            ) : null}
                          </div>

                          {/* Submit */}
                          <div className="uk-width-1-1@s">
                            <button
                              type="submit"
                              className="uk-button uk-button-primary"
                            >
                              Add to Jobs
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Jobs List */}
                    <div className="uk-width-1-2 new-order__content__two-columns__right">
                      <JobList
                        list={jobsList}
                        methods={{
                          deleteItem: this.removeJob
                        }}
                      />
                    </div>
                  </form>
                </div>
              </li>

              {/* Review */}
              <li>
                <div className="uk-form-stacked uk-padding">
                  <div className="uk-grid uk-grid-small">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Saepe, iure? Culpa alias assumenda aspernatur dolorem,
                    accusamus dignissimos. Doloremque aperiam sapiente
                    distinctio consequuntur, ratione odio iusto quod quia, ea
                    doloribus voluptatum.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default NewJobOrder;
