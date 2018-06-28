// Modules
import React from "react";
import { Link } from "react-router-dom";

// Assets
import Strings from "../../strings";

// Components
import JobList from "../common/job-list";
import Notification from "../common/notification";

// Services
import OrderService from "../../services/order-service";
import JobService from "../../services/job-service";
import PermissionService from "../../services/permission-service";

// Classes
class EditJobOrder extends React.Component {
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
      owner: {
        owner: ""
      },
      jobs: [],
      jobDetails: {
        type: "1",
        sizeUnits: "1",
        isHighPriority: false,
        feature: null,
        file: null,
        hasFileAttachment: false,
        deliveryExpectedBy: null,
        notes: null
      },
      jobTypes: [],
      jobQualities: [],
      jobFeatures: [],
      jobMeasurements: [],
      jobCharges: [],
      advanceAmounts: {},
      currentTab: "order",
      canSubmitAdvances: false,
      permissions: {}
    };
    this.filesToBeUploaded = [];
  }

  // Get Order Details
  getOrderDetails = orderid => {
    OrderService.getOrderById(orderid).then(
      details => {
        return this.setState({
          order: details,
          party: details.party,
          owner: details.owner,
          jobs: details.jobs
        });
      },
      error => {
        return Notification.Notify({
          text: "Failed to get order details",
          type: "error"
        });
      }
    );
  };

  // Get Job Types
  getJobTypes = () => {
    JobService.getJobTypes().then(
      jobtypes => this.setState({ jobTypes: jobtypes }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of job types",
          type: "error"
        });
      }
    );
  };

  // Get Job Qualities
  getJobQualities = () => {
    JobService.getJobQualities().then(
      jobqualities => this.setState({ jobQualities: jobqualities }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of job qualities",
          type: "error"
        });
      }
    );
  };

  // Get Job Features
  getJobFeatures = () => {
    JobService.getJobFeatures().then(
      features => this.setState({ jobFeatures: features }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of job features",
          type: "error"
        });
      }
    );
  };

  // Get Job Uoms
  getJobUoms = () => {
    JobService.getJobUoms().then(
      uoms => {
        return this.setState({ jobMeasurements: uoms });
      },
      error => {
        return Notification.Notify({
          text: "Failed to get list of measurement units",
          type: "error"
        });
      }
    );
  };

  // Get Charges
  getJobCharges = () => {
    JobService.getJobCharges().then(
      charges => this.setState({ jobCharges: charges }),
      error => {
        return Notification.Notify({
          text: "Failed to get charges for jobs",
          type: "error"
        });
      }
    );
  };

  // Capture Job Details
  captureJobDetails = event => {
    let id = event.target.id;

    if (id === "type") {
      return this.setState({
        jobDetails: {
          ...this.state.jobDetails,
          [event.target.id]: event.target.value,
          feature: null
        }
      });
    }

    return this.setState({
      jobDetails: {
        ...this.state.jobDetails,
        [event.target.id]: event.target.value
      }
    });
  };

  // Capture Feature One
  captureFeature = featureid => {
    return this.setState({
      jobDetails: {
        ...this.state.jobDetails,
        feature: featureid
      }
    });
  };

  // Capture Job Priority
  captureJobPriority = event => {
    let { jobDetails } = this.state;
    return this.setState({
      jobDetails: {
        ...this.state.jobDetails,
        isHighPriority: !jobDetails.isHighPriority
      }
    });
  };

  // Capture File to be Uploaded
  captureFileToBeUploaded = event => {
    event.preventDefault();
    let file = event.target.files[0];
    return this.setState({
      jobDetails: {
        ...this.state.jobDetails,
        hasFileAttachment: true,
        file: file
      }
    });
  };

  // Upload Customer Desing File
  uploadCustomerDesignFile = (jobid, file) => {
    if (jobid && file) {
      let formData = new FormData();
      formData.append("file", file);
      OrderService.addCustomerFile(jobid, formData).then(
        response => {
          Notification.Notify({
            text: `File uploaded for Job ID: ${jobid}`,
            type: "success"
          });
        },
        error => {
          return Notification.Notify({
            text: `Failed to upload file for Job ID: ${jobid}`,
            type: "error"
          });
        }
      );
    }
  };

  // Add Job
  addJob = event => {
    event.preventDefault();
    let { jobDetails, jobs } = this.state;
    this.jobsForm.reset();
    return this.setState({
      jobs: jobs.concat(jobDetails)
    });
  };

  // Remove Job
  removeJob = jobid => {
    let { order, jobs } = this.state;

    // Prevent deletion if there
    // is only one order in jobs
    if (jobs.length > 1) {
      // Even index and job id
      jobid--;
      return this.setState({
        jobs: jobs.filter((_, index) => {
          return index !== jobid;
        })
      });
    } else {
      OrderService.removeJob(order.id, jobid).then(
        response => {
          return Notification.Notify({
            text: response.message
              ? response.message
              : "Removed job from order",
            type: "success"
          });
        },
        error => {
          let { data } = error.response;
          return Notification.Notify({
            text: data ? data : Strings.COMMON.UNKNOWN_ERROR,
            type: "error"
          });
        }
      );
    }
  };

  // Save Jobs
  saveJobs = event => {
    let { order, jobs } = this.state;
    OrderService.addJobs(order.id, jobs).then(
      response => {
        // Upload files
        if (response.jobsWithFiles && response.jobsWithFiles.length) {
          // Get all file with attachments
          let jobsWithAttachments = jobs.map(item => {
            if (item.hasFileAttachment) return item;
          });
          // Map with jobid and upload files
          response.jobsWithFiles.forEach((jobid, index) => {
            this.uploadCustomerDesignFile(
              jobid,
              jobsWithAttachments[index].file
            );
          });
        }
        // Refresh jobs
        this.getOrderDetails(order.id);
        // Switch to Review Tab
        this.switchTab("review");
        // Create Notification
        return Notification.Notify({
          text: response.message
            ? response.message
            : "Added jobs to the order!",
          type: "success"
        });
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

  // Send to In Progress
  sendToInProgress = () => {
    let { order, advanceAmounts } = this.state;
    OrderService.setAdvanceAmounts(order.id, advanceAmounts).then(
      response => {
        OrderService.markAsInProgress(order.id).then(
          response => {
            this.props.history.push(`/orders/${order.id}`);
            return Notification.Notify({
              text: "Order marked as In Progress",
              type: "success"
            });
          },
          error => {
            return Notification.Notify({
              text: "Failed to mark order as in progress. Please try again.",
              type: "error"
            });
          }
        );
      },
      error => {
        return Notification.Notify({
          text: "Failed to set advnace amounts for jobs",
          type: "error"
        });
      }
    );
  };

  // Calculate Total Amount
  captureAdvanceAmount = (event, job) => {
    if (event && job) {
      let amount = event.target.value;

      // Reset States
      this.setState({ canSubmitAdvances: true });
      this.refs[`job_advance_error_${job.id}`].innerHTML = "";

      // Compare amounts
      if (job.rate) {
        if (amount > job.rate.cost) {
          this.setState({ canSubmitAdvances: false });
          this.refs[
            `job_advance_error_${job.id}`
          ].innerHTML = `Advance cannot be more than ${job.rate.cost}`;
          return;
        }
      }

      if (amount) amount = parseFloat(amount);
      return this.setState({
        advanceAmounts: {
          ...this.state.advanceAmounts,
          [job.id]: amount
        }
      });
    }
  };

  // Switch Tab
  switchTab = tab => {
    if (tab) return this.setState({ currentTab: tab });
    return false;
  };

  componentWillMount() {
    // Get Permisissions
    let role = PermissionService.getRole();
    let permissions = PermissionService.getPermissions(role);
    if (permissions) return this.setState({ permissions: permissions });
  }

  componentDidMount() {
    // Get Required Data
    let { params } = this.props.match;
    if (params.id) {
      this.getJobTypes();
      this.getJobQualities();
      this.getJobFeatures();
      this.getJobUoms();
      this.getJobCharges();
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
      jobQualities,
      jobFeatures,
      jobMeasurements,
      currentTab,
      permissions,
      canSubmitAdvances
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
                              disabled
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
                            disabled
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
                              value={order.is_designing}
                              defaultChecked={order.is_designing}
                              disabled
                            />{" "}
                            Designing
                          </label>
                          <label className="uk-margin-right">
                            <input
                              type="checkbox"
                              className="uk-checkbox"
                              value={order.is_scanning}
                              defaultChecked={order.is_scanning}
                              disabled
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
                            Next
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                      ref={element => (this.jobsForm = element)}
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
                                  disabled={!permissions.canAddJobs}
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
                                  disabled={!permissions.canAddJobs}
                                  className="uk-input"
                                  min={1}
                                  required
                                />
                              </div>
                            </div>

                            {/* Quality */}
                            <div className="uk-width-1-2@s uk-flex uk-flex-middle">
                              <div className="uk-width-1-1">
                                <label className="uk-form-label">Quality</label>
                                <div className="uk-form-controls">
                                  <select
                                    id="quality"
                                    className="uk-select"
                                    onChange={this.captureJobDetails}
                                    disabled={!permissions.canAddJobs}
                                    required
                                  >
                                    <option defaultChecked />
                                    {jobQualities && jobQualities.length
                                      ? jobQualities.map(
                                          (quality, index) =>
                                            // eslint-disable-next-line
                                            quality.job_type ==
                                            jobDetails.type ? (
                                              <option
                                                value={quality.id}
                                                key={`job_quality_${index}`}
                                              >
                                                {quality.quality}
                                              </option>
                                            ) : null
                                        )
                                      : null}
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* Dimensions */}
                            <div className="uk-margin">
                              <label className="uk-form-label">
                                Dimensions
                              </label>
                              <div className="uk-form-controls">
                                <input
                                  type="number"
                                  id="sizeWidth"
                                  onChange={this.captureJobDetails}
                                  disabled={!permissions.canAddJobs}
                                  className="uk-input uk-width-1-3@s"
                                  placeholder="Width"
                                  autoComplete="off"
                                  min={1}
                                  required
                                />
                                <input
                                  type="number"
                                  id="sizeHeight"
                                  onChange={this.captureJobDetails}
                                  disabled={!permissions.canAddJobs}
                                  className="uk-input uk-width-1-3@s"
                                  placeholder="Height"
                                  autoComplete="off"
                                  min={1}
                                  required
                                />
                                <select
                                  id="sizeUnits"
                                  onChange={this.captureJobDetails}
                                  disabled={!permissions.canAddJobs}
                                  className="uk-select uk-width-1-3@s"
                                  required
                                >
                                  {jobMeasurements && jobMeasurements.length
                                    ? jobMeasurements.map(
                                        (measurement, index) => (
                                          <option
                                            value={measurement.id}
                                            key={`job_uom_${index}`}
                                          >
                                            {`In ${measurement.unit}`}
                                          </option>
                                        )
                                      )
                                    : null}
                                </select>
                              </div>
                            </div>

                            {/* Options */}
                            <div className="uk-margin">
                              <div className="uk-form-label">Options</div>
                              <div className="uk-form-controls">
                                {jobFeatures && jobFeatures.length
                                  ? jobFeatures.map((feature, index) => {
                                      // eslint-disable-next-line
                                      return jobDetails.type ==
                                        feature.job_type ? (
                                        <label
                                          key={`job_feature_${index}`}
                                          className="uk-margin-right"
                                        >
                                          <input
                                            type="radio"
                                            name={feature.job_type}
                                            className="uk-radio"
                                            onChange={() =>
                                              this.captureFeature(feature.id)
                                            }
                                            disabled={!permissions.canAddJobs}
                                            value={feature.feature}
                                          />{" "}
                                          {feature.feature}
                                        </label>
                                      ) : null;
                                    })
                                  : null}
                              </div>
                            </div>

                            {/* Uploads */}
                            <div className="uk-width-1-1 uk-margin-small">
                              <label className="uk-form-label">
                                Customer's Design File
                              </label>
                              <div className="js-upload" uk-form-custom="">
                                <input
                                  type="file"
                                  onChange={this.captureFileToBeUploaded}
                                />
                                <button
                                  type="button"
                                  className="uk-button uk-button-default"
                                  disabled={!permissions.canAddJobs}
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
                                  disabled={!permissions.canAddJobs}
                                />
                              </div>
                            </div>

                            {/* Delivery Expected By */}
                            <div className="uk-width-1-1 uk-margin-small">
                              <label className="uk-form-label">
                                Delivery Expected By
                              </label>
                              <div className="uk-form-controls">
                                <input
                                  type="date"
                                  id="delivery_expected_by"
                                  className="uk-input"
                                  onChange={this.captureJobDetails}
                                  disabled={!permissions.canAddJobs}
                                  required
                                />
                              </div>
                            </div>

                            {/* Is High Priority */}
                            <div className="uk-width-1-1 uk-margin-small">
                              <label className="uk-form-label">
                                <input
                                  type="checkbox"
                                  className="uk-checkbox"
                                  defaultChecked={jobDetails.isHighPriority}
                                  onChange={this.captureJobPriority}
                                  disabled={!permissions.canAddJobs}
                                  value="isHighPriority"
                                />{" "}
                                Is High Priority?
                              </label>
                            </div>

                            {/* Submit */}
                            <div className="uk-width-1-1@s uk-flex uk-flex-between">
                              <button
                                type="button"
                                className="uk-button uk-button-primary"
                                onClick={() => this.switchTab("party")}
                              >
                                Previous
                              </button>
                              <div>
                                <button
                                  type="submit"
                                  className="uk-button uk-button-primary uk-margin-small-right"
                                  disabled={!permissions.canAddJobs}
                                >
                                  Add to Jobs
                                </button>

                                {permissions.canAddJobs ? (
                                  <button
                                    type="button"
                                    className="uk-button uk-button-primary"
                                    disabled={!jobs || jobs.length === 0}
                                    onClick={this.saveJobs}
                                  >
                                    Finish
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="uk-button uk-button-primary"
                                    onClick={() => this.switchTab("review")}
                                  >
                                    Review Order
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="uk-width-1-2 new-order__content__two-columns__right">
                        <JobList
                          list={jobs}
                          jobTypes={jobTypes}
                          sizeUnits={jobMeasurements}
                          jobQualities={jobQualities}
                          jobFeatures={jobFeatures}
                          methods={{
                            deleteItem: jobid => this.removeJob(jobid)
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
                  <div className="order-details">
                    {/* Order Details */}
                    <div className="order-details__header">
                      <div className="uk-text-lead">{order.name}</div>
                      <div className="uk-text-subtitle">{party.name}</div>
                    </div>
                    <div className="order-details__jobs-list">
                      {jobs && jobs.length ? (
                        jobs.map((job, index) => {
                          return (
                            <div
                              key={`order_item_${index}`}
                              className="order-details__jobs-list__item"
                            >
                              <div className="uk-text-lead order-details__jobs-list__item__title">
                                {jobTypes.map(item => {
                                  // eslint-disable-next-line
                                  return item.id == job.type ? item.type : null;
                                })}{" "}
                                {job.is_high_priority ? (
                                  <span
                                    className="uk-text-danger"
                                    uk-icon="bolt"
                                  />
                                ) : null}
                              </div>
                              {job.feature ? (
                                <div className="uk-width-1-1">
                                  <span className="uk-text-small uk-text-primary">
                                    {jobFeatures && jobFeatures.length
                                      ? jobFeatures.map(item => {
                                          // eslint-disable-next-line
                                          return item.id == job.feature
                                            ? `with ${item.feature}`
                                            : null;
                                        })
                                      : null}
                                  </span>
                                </div>
                              ) : null}
                              <div className="uk-grid uk-grid-small uk-margin-small">
                                <div className="uk-width-1-2">
                                  <span className="uk-text-small">Type : </span>
                                  <span className="uk-text-small uk-text-primary">
                                    {jobTypes.map(item => {
                                      // eslint-disable-next-line
                                      return item.id == job.type
                                        ? item.type
                                        : null;
                                    })}
                                  </span>
                                </div>
                                <div className="uk-width-1-2">
                                  <span className="uk-text-small">
                                    Quality :{" "}
                                  </span>
                                  <span className="uk-text-small uk-text-primary">
                                    {jobQualities.map(item => {
                                      // eslint-disable-next-line
                                      return item.id == job.quality
                                        ? item.quality
                                        : null;
                                    })}
                                  </span>
                                </div>
                                <div className="uk-width-1-2">
                                  <span className="uk-text-small">
                                    Quantity :{" "}
                                  </span>
                                  <span className="uk-text-small uk-text-primary">
                                    {job.quantity}
                                  </span>
                                </div>
                                <div className="uk-width-1-2">
                                  <span className="uk-text-small">
                                    Dimensions :{" "}
                                  </span>
                                  <span className="uk-text-small uk-text-primary">
                                    {job.sizeWidth} x {job.sizeHeight}{" "}
                                    {job.sizeUnits
                                      ? jobMeasurements.map(
                                          size =>
                                            // eslint-disable-next-line
                                            size.id == job.sizeUnits
                                              ? size.unit
                                              : null
                                        )
                                      : "-"}
                                  </span>
                                </div>
                                <div className="uk-width-1-1">
                                  <span className="uk-text-small">
                                    Notes : {job.notes ? job.notes : "No notes"}
                                  </span>
                                </div>
                              </div>
                              {/* Add Textboxes here */}
                              {permissions.canSeeCostsInReviewOrder ? (
                                <div className="uk-width-1-1">
                                  <div className="uk-margin-small-bottom">
                                    <div className="uk-text-subtitle">
                                      Costs
                                    </div>
                                  </div>
                                  <div className="uk-grid uk-width-1-1">
                                    <div className="uk-width-1-3">
                                      <label className="uk-form-label">
                                        Rate Per Sq. Ft.
                                      </label>
                                      <input
                                        type="number"
                                        className="uk-input"
                                        value={job.rate ? job.rate.charge : ""}
                                        min={1}
                                        disabled
                                        required
                                      />
                                    </div>
                                    <div className="uk-width-1-3">
                                      <label className="uk-form-label">
                                        Total Cost
                                      </label>
                                      <input
                                        type="number"
                                        className="uk-input"
                                        value={job.rate ? job.rate.cost : ""}
                                        disabled
                                        required
                                      />
                                    </div>
                                    <div className="uk-width-1-3">
                                      <label className="uk-form-label">
                                        Advance{" "}
                                        <span
                                          className="uk-text-danger"
                                          ref={`job_advance_error_${job.id}`}
                                        />
                                      </label>
                                      <input
                                        type="number"
                                        className="uk-input"
                                        onChange={event =>
                                          this.captureAdvanceAmount(event, job)
                                        }
                                        max={job.rate ? job.rate.cost : ""}
                                        min={0}
                                        disabled={
                                          order.status && order.status.id !== 1
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          );
                        })
                      ) : (
                        // Placeholder
                        <div className="uk-width-1-1 uk-padding">
                          <div className="uk-placeholder">
                            There are no jobs in this order.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="order-details__footer">
                    <div className="uk-flex uk-flex-between">
                      <button
                        type="button"
                        className="uk-button uk-button-default"
                        onClick={() => {
                          this.switchTab("jobs");
                        }}
                      >
                        Previous
                      </button>
                      {permissions.canSendForDesigning ? (
                        <button
                          type="button"
                          className="uk-button uk-button-primary"
                          onClick={this.sendToInProgress}
                          disabled={
                            (order.jobs && order.jobs.length < 1) ||
                            !canSubmitAdvances
                          }
                        >
                          {order.status && order.status.id !== 1
                            ? "Status: Order Sent for Designing"
                            : "Send for Designing"}
                        </button>
                      ) : null}
                    </div>
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
