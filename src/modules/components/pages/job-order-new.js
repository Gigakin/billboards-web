// Modules
import React from "react";
import { Link } from "react-router-dom";

// Imports
import Methods from "../../methods";

// Components
import JobList from "../common/job-list";
import OrderDetails from "./job-order-new/order-details";
import PartyDetails from "./job-order-new/party-details";

// Services
import AccountOwnerService from "../../services/account-owners-service";

// Classes
class NewJobOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      accountOwners: [],
      currentTab: "order",

      job: {},
      jobDetails: {
        type: "frontlit",
        quality: "banner",
        sizeUnits: "feets"
      },
      jobsList: [],
      customer: {},
      designer: {
        designer: "a"
      },
      createOrderError: false,
      selectedParty: {}
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

  // Get Account Owners
  getAccountOwners = () => {
    AccountOwnerService.getAccountOwners().then(owners => {
      return this.setState({ accountOwners: owners });
    });
  };

  // Get Order Details from Component
  getOrderDetailsFromComponent = orderdetails => {
    if (orderdetails) {
      return this.setState({
        order: orderdetails,
        currentTab: "party"
      });
    }
  };

  // Get Party Details from Component
  getPartyDetailsFromComponent = partydetails => {
    if (partydetails) {
      return this.setState({
        party: partydetails,
        currentTab: "party"
      });
    }
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
    return this.props.history.push("/orders");
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
    let { accountOwners, currentTab } = this.state;
    let { job, jobDetails, jobsList, selectedParty } = this.state;

    return (
      <div className="new-order">
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
              <li className={currentTab === "jobs" ? "uk-active" : null}>
                <a onClick={() => this.switchTab("jobs")}>3. Job Types</a>
              </li>
              <li className={currentTab === "review" ? "uk-active" : null}>
                <a onClick={() => this.switchTab("review")}>4. Review</a>
              </li>
            </ul>

            {/* Switcher */}
            <div className="uk-tab-content">
              {/* Order Details */}
              {currentTab === "order" ? (
                <div>
                  <div className="uk-padding">
                    <div className="uk-width-1-1">
                      <OrderDetails
                        accountOwners={accountOwners}
                        methods={{
                          saveOrderDetails: this.getOrderDetailsFromComponent
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Party Details */}
              {currentTab === "party" ? (
                <PartyDetails
                  methods={{
                    savePartyDetails: this.getPartyDetailsFromComponent
                  }}
                />
              ) : null}

              {/* Jobs List */}
              {currentTab === "jobs" ? (
                <div>
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
                                  <label className="uk-form-label">
                                    Quality
                                  </label>
                                  <div className="uk-form-controls">
                                    <select
                                      id="quality"
                                      className="uk-select"
                                      onChange={this.captureJobDetails}
                                      required
                                    >
                                      <option value="banner">Banner</option>
                                      <option value="board">Board</option>
                                      <option value="star">Star</option>
                                      <option value="hoarding">Hoarding</option>
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
                              <label className="uk-form-label">
                                Dimensions
                              </label>
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
                                  <option value="feets">in Feets</option>
                                  <option value="inches">in Inches</option>
                                  <option value="meters">in Meters</option>
                                  <option value="centimeters">
                                    in Centimeters
                                  </option>
                                </select>
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
                                      name="frontlitOptions"
                                      value="1lit"
                                    />{" "}
                                    1-Lit
                                  </label>
                                  <label className="uk-margin-right">
                                    <input
                                      className="uk-radio"
                                      type="radio"
                                      name="frontlitOptions"
                                      value="framing"
                                    />{" "}
                                    Framing
                                  </label>
                                  <label className="uk-margin-right">
                                    <input
                                      className="uk-radio"
                                      type="radio"
                                      name="frontlitOptions"
                                      value="pasting"
                                    />{" "}
                                    Pasting
                                  </label>
                                  <label className="uk-margin-right">
                                    <input
                                      className="uk-radio"
                                      type="radio"
                                      name="frontlitOptions"
                                      value="piping"
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
                                      name="backlitOptions"
                                      value="framing"
                                    />{" "}
                                    Framing
                                  </label>
                                  <label className="uk-margin-right">
                                    <input
                                      className="uk-radio"
                                      type="radio"
                                      name="backlitOptions"
                                      value="lolypop"
                                    />{" "}
                                    Lolypop
                                  </label>
                                  <label className="uk-margin-right">
                                    <input
                                      className="uk-radio"
                                      type="radio"
                                      name="backlitOptions"
                                      value="onlyprint"
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

                            {/* Uploads */}
                            <div className="uk-width-1-1 uk-margin-small">
                              <label className="uk-form-label">
                                Customer's Design File
                              </label>
                              <div className="js-upload" uk-form-custom="">
                                <input type="file" />
                                <button
                                  type="button"
                                  className="uk-button uk-button-default"
                                  tabIndex="-1"
                                >
                                  Select File
                                </button>
                              </div>
                            </div>

                            {/* Notes */}
                            <div className="uk-width-1-1 uk-margin-small">
                              <label className="uk-form-label">Notes</label>
                              <div className="uk-form-controls">
                                <textarea
                                  id="notes"
                                  className="uk-textarea"
                                  onChange={this.captureJobDetails}
                                />
                              </div>
                            </div>

                            {/* Submit */}
                            <div className="uk-width-1-1@s uk-flex uk-flex-between">
                              <button
                                type="submit"
                                className="uk-button uk-button-primary"
                              >
                                Add to Jobs
                              </button>
                              <button
                                type="button"
                                className="uk-button uk-button-primary"
                              >
                                Continue
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
                </div>
              ) : null}

              {/* Review */}
              {currentTab === "review" ? (
                <div>
                  <form className="uk-form-stacked" onSubmit={this.createOrder}>
                    <div className="uk-grid uk-grid-small">
                      <div className="new-order__content__two-columns uk-width-1-1 uk-flex">
                        <div className="uk-width-1-2 new-order__content__two-columns__left">
                          <div className="uk-padding">
                            {/* Assign Designer */}
                            <div className="uk-width-1-1 uk-margin">
                              <label className="uk-form-label">
                                Assign Designer
                              </label>
                              <div className="uk-form-controls">
                                <select
                                  id="designer"
                                  className="uk-select"
                                  onChange={this.captureDesignerDetails}
                                  required
                                >
                                  <option value="a">Designer A</option>
                                  <option value="b">Designer B</option>
                                  <option value="c">Designer C</option>
                                </select>
                              </div>
                            </div>
                            {/* Other Notes */}
                            <div className="uk-width-1-1 uk-margin">
                              <label className="uk-form-label">
                                Other Notes
                              </label>
                              <textarea
                                type="text"
                                id="description"
                                onChange={this.captureDesignerDetails}
                                className="uk-textarea"
                              />
                            </div>
                            {/* Submit Order */}
                            <div className="uk-width-1-1 uk-flex uk-flex-right">
                              <button
                                type="submit"
                                className="uk-button uk-button-primary"
                              >
                                Submit Order
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="uk-width-1-2 new-order__content__two-columns__right">
                          <div className="uk-padding">
                            {/* Review: Order Details */}
                            <div className="uk-width-1-1 uk-margin-small">
                              <h2 className="uk-margin-remove">{job.name}</h2>
                              <span>{job.description}</span>
                            </div>
                            {/* Review: Party Details */}
                            <div className="uk-width-1-1 uk-margin-small">
                              <span>
                                {selectedParty.label
                                  ? `Bill to: ${selectedParty.label}`
                                  : null}
                              </span>
                            </div>
                            {/* Review: Job Types */}
                            <div className="uk-width-1-1 uk-margin-small">
                              <h5 className="uk-margin-small-bottom">
                                Jobs in this Order
                              </h5>
                              <div>
                                {jobsList && jobsList.length ? (
                                  jobsList.map((job, index) => (
                                    <li key={`joblist_job_${index}`}>
                                      {Methods.capitalize(job.type)} &middot;{" "}
                                      {`${job.sizeWidth} x ${job.sizeHeight} ${
                                        job.sizeUnits
                                      }`}
                                    </li>
                                  ))
                                ) : (
                                  <span className="uk-text-muted">
                                    There are no jobs in this order.<br />Use
                                    the Job Types tab to add jobs.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default NewJobOrder;
