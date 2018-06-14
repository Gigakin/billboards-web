// Modules
import React from "react";
import { Link } from "react-router-dom";

// Components
import JobList from "../common/job-list";

// Services
import OrderService from "../../services/order-service";
import JobTypesService from "../../services/job-types-service";

// Classes
class EditJobOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        name: "",
        description: "",
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
      owner: {
        owner: ""
      },
      jobs: [],
      jobDetails: {
        type: "1",
        quality: "banner",
        sizeUnits: "feets"
      },
      jobTypes: [],
      currentTab: "order"
    };
  }

  // Get Order Details
  getOrderDetails = orderid => {
    OrderService.getOrderById(orderid).then(details => {
      return this.setState({
        order: details,
        party: details.party,
        owner: details.owner
      });
    });
  };

  // Get Job Types
  getJobTypes = () => {
    JobTypesService.getJobTypes().then(jobtypes => {
      return this.setState({ jobTypes: jobtypes });
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
    let { jobDetails, jobs } = this.state;
    return this.setState({
      jobs: jobs.concat(jobDetails)
    });
  };

  // Remove Job
  removeJob = jobid => {
    let { jobs } = this.state;
    return this.setState({
      jobs: jobs.filter((_, index) => index !== jobid)
    });
  };

  // Save Jobs
  saveJobs = event => {
    let { order, jobs } = this.state;
    OrderService.addJobs(order.id, jobs).then(response => {
      console.log(response);
    });
  };

  // Switch Tab
  switchTab = tab => {
    if (tab) return this.setState({ currentTab: tab });
    return false;
  };

  componentDidMount() {
    let { params } = this.props.match;
    if (params.id) {
      this.getJobTypes();
      this.getOrderDetails(params.id);
    }
  }

  render() {
    let {
      order,
      party,
      owner,
      jobDetails,
      jobs,
      jobTypes,
      currentTab
    } = this.state;

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
                      <div className="uk-grid uk-grid-small uk-form-stacked">
                        <div className="uk-width-1-3">
                          <label className="uk-form-label">Job Name</label>
                          <div className="uk-form-controls">
                            <input
                              id="name"
                              onChange={this.captureOrderDetails}
                              value={order.name}
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
                            value={order.description}
                            className="uk-input"
                            required
                          />
                        </div>
                        <div className="uk-width-1-3">
                          <label className="uk-form-label">Account Owner</label>
                          <div className="uk-form-control">
                            <input
                              type="text"
                              className="uk-input"
                              value={owner.owner}
                              disabled
                            />
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
                        <input
                          type="text"
                          className="uk-input"
                          value={party.mobile}
                          disabled
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
                            value={party.name}
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
                            value={party.contact_person}
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
                            value={party.email}
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
                            value={party.gstin}
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
                            value={party.address_line_1}
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
                            value={party.city}
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
                            value={party.state}
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
                            value={party.postal_code}
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
                      type="button"
                      className="uk-button uk-button-primary"
                      onClick={() => this.switchTab("jobs")}
                    >
                      Add Jobs
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Jobs */}
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
                                  {jobTypes && jobTypes.length
                                    ? jobTypes.map((type, index) => (
                                        <option
                                          value={type.id}
                                          key={`job_type_${index}`}
                                        >
                                          {type.type}
                                        </option>
                                      ))
                                    : null}
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
                              {/* Quality: Backlit */}
                              {jobDetails.type === "1" ? (
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
                              {/* Quality: Frontlit */}
                              {jobDetails.type === "2" ? (
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
                              {/* Quality: Indoor */}
                              {jobDetails.type === "3" ? (
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
                              {/* Quality: Vinyl */}
                              {jobDetails.type === "4" ? (
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
                              {jobDetails.type === "1" ? (
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
                              {/* Frontlit */}
                              {jobDetails.type === "2" ? (
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
                              {jobDetails.type === "3" ? (
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
                              {jobDetails.type === "4" ? (
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
                                type="button"
                                className="uk-button uk-button-primary"
                              >
                                Previous
                              </button>
                              <div>
                                <button
                                  type="submit"
                                  className="uk-button uk-button-primary uk-margin-small-right"
                                >
                                  Add to Jobs
                                </button>
                                <button
                                  type="button"
                                  className="uk-button uk-button-primary"
                                  disabled={!jobs || jobs.length === 0}
                                  onClick={this.saveJobs}
                                >
                                  Finish
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="uk-width-1-2 new-order__content__two-columns__right">
                        <JobList
                          list={jobs}
                          methods={{
                            deleteItem: this.removeJob
                          }}
                        />
                      </div>
                    </form>
                  </div>
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
export default EditJobOrder;
