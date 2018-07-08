// Modules
import React from "react";
import { Link } from "react-router-dom";

// Assets
import Methods from "../../methods";

// Components
import Notification from "../common/notification";

// Services
import OrderService from "../../services/order-service";
import JobService from "../../services/job-service";
import PermissionService from "../../services/permission-service";

// Classes
class JobOrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
      party: {},
      jobs: [],
      jobTypes: [],
      jobQualities: [],
      jobFeatures: [],
      jobMeasurements: [],
      isDesignFileUploaded: false,
      isPrintFileUploaded: false,
      permissions: {}
    };
  }

  // Get Order Details
  getOrderDetails = orderid => {
    OrderService.getOrderById(orderid).then(
      details => {
        return this.setState({
          order: details,
          party: details.party,
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
      jobfeatures => this.setState({ jobFeatures: jobfeatures }),
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
      uoms => this.setState({ jobMeasurements: uoms }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of measurement units",
          type: "error"
        });
      }
    );
  };

  // Back to List
  backToList = event => {
    event.preventDefault();
    return this.props.history.push("/orders");
  };

  // Complete Ordeer
  completeOrder = orderid => {
    if (orderid) {
      // Status = 3 (Ready for invoicing)
      OrderService.changeOrderStatus(orderid, 3).then(
        response => {
          Notification.Notify({
            text: `Order # ${orderid} is ready for invoicing!`,
            type: "success"
          });
          return this.props.history.push(`/orders`);
        },
        error => {
          return Notification.Notify({
            text: `Failed to mark the order as complete!`,
            type: "error"
          });
        }
      );
    }
  };

  // Download File
  downloadFile = file => {
    if (file) return Methods.downloadFile(file);
  };

  // Upload File
  uploadFile = (event, jobid, uploadfor) => {
    if (event.target.files && event.target.files.length) {
      let file = event.target.files[0];
      let { params } = this.props.match;

      // Form data
      let formData = new FormData();
      formData.append("file", file);

      // Determine upload domain
      let method = OrderService.addDesignerFile;
      if (uploadfor === "designer") method = OrderService.addDesignerFile;
      if (uploadfor === "printer") method = OrderService.addPrinterFile;

      // Call service
      method(params.id, jobid, formData).then(
        response => {
          // Update order details
          this.getOrderDetails(params.id);
          // Notify
          return Notification.Notify({
            text: response.message ? response.message : "File(s) uploaded.",
            type: "success"
          });
        },
        error => {
          return Notification.Notify({
            text: "Failed to upload file.",
            type: "error"
          });
        }
      );
    }
  };

  // changeJobStatus
  changeJobStatus = (jobid, status) => {
    if (jobid && status) {
      OrderService.changeJobStatus(jobid, status).then(
        response => {
          // Refresh order details
          this.getOrderDetails(this.props.match.params.id);
          // Notify
          return Notification.Notify({
            text: response.message ? response.message : "Updated job status",
            type: "success"
          });
        },
        error => {
          // Notify
          return Notification.Notify({
            text: "Failed to update job status",
            type: "error"
          });
        }
      );
    }
  };

  componentWillMount() {
    // Get Permisissions
    let role = PermissionService.getRole();
    let permissions = PermissionService.getPermissions(role);
    if (permissions) return this.setState({ permissions: permissions });
    return;
  }

  componentDidMount() {
    // Get Required Data
    let { params } = this.props.match;
    if (params.id) {
      this.getJobTypes();
      this.getJobQualities();
      this.getJobFeatures();
      this.getJobUoms();
      this.getOrderDetails(params.id);
    }
  }

  render() {
    let {
      order,
      party,
      jobs,
      jobTypes,
      jobMeasurements,
      jobQualities,
      jobFeatures,
      permissions
    } = this.state;

    return (
      <div className="lists">
        <div className="uk-grid">
          {/* Header */}
          <div className="uk-width-1-1 uk-margin-bottom">
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
                    Order Details
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="uk-width-2-3">
            <div className="order-details">
              {/* Order Details */}
              <div className="order-details__header">
                <div className="uk-text-lead">{order.name}</div>
                <div className="uk-text-subtitle">{order.description}</div>
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
                            <span className="uk-text-danger" uk-icon="bolt" />
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
                                return item.id == job.type ? item.type : null;
                              })}
                            </span>
                          </div>
                          <div className="uk-width-1-2">
                            <span className="uk-text-small">Quality : </span>
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
                            <span className="uk-text-small">Quantity : </span>
                            <span className="uk-text-small uk-text-primary">
                              {job.quantity}
                            </span>
                          </div>
                          <div className="uk-width-1-2">
                            <span className="uk-text-small">Dimensions : </span>
                            <span className="uk-text-small uk-text-primary">
                              {job.sizeUnits
                                ? jobMeasurements.map(
                                    size =>
                                      // eslint-disable-next-line
                                      size.id == job.sizeUnits
                                        ? (
                                            Methods.calculateSqFt(
                                              job.sizeWidth,
                                              size.unit
                                            ) *
                                            Methods.calculateSqFt(
                                              job.sizeHeight,
                                              size.unit
                                            )
                                          ).toFixed(2) + " sq.ft"
                                        : null
                                  )
                                : "-"}
                            </span>
                          </div>
                          <div className="uk-width-1-2">
                            <span className="uk-text-small">
                              Priority Status :{" "}
                            </span>
                            {job.is_high_priority ? (
                              <span className="uk-text-small uk-text-danger">
                                High Priority
                              </span>
                            ) : (
                              <span className="uk-text-small uk-text-primary">
                                Normal Priority
                              </span>
                            )}
                          </div>
                          <div className="uk-width-1-2">
                            <span className="uk-text-small">
                              Delivery Expected By :{" "}
                            </span>
                            <span className="uk-text-small uk-text-primary">
                              {job.delivery_expected_by
                                ? Methods.formatDate(job.delivery_expected_by)
                                : "-"}
                            </span>
                          </div>
                          <div className="uk-width-1-1">
                            <span className="uk-text-small">
                              Notes : {job.notes ? job.notes : "No notes"}
                            </span>
                          </div>
                        </div>

                        {/* Show if order is in progress */}
                        {order.status && order.status.id !== 1 ? (
                          <div className="uk-width-1-1 uk-margin-top">
                            <div className="uk-flex uk-flex-between">
                              {/* Downloads */}
                              <div className="uk-flex">
                                {permissions.canDownloadCustomerDesignFile
                                  ? order.files && order.files.length
                                    ? order.files.map((file, index) => {
                                        if (
                                          // eslint-disable-next-line
                                          file.job == job.id &&
                                          // eslint-disable-next-line
                                          file.type == 1
                                        ) {
                                          return (
                                            <button
                                              type="button"
                                              key={`download_customer_file_button_${index}`}
                                              className="uk-button uk-button-small uk-button-default uk-margin-small-right"
                                              onClick={() =>
                                                this.downloadFile(file)
                                              }
                                            >
                                              <span uk-icon="cloud-download" />{" "}
                                              Download Customer Design File
                                            </button>
                                          );
                                        }
                                        return null;
                                      })
                                    : null
                                  : null}
                                {permissions.canDownloadDesignerDesignFile
                                  ? order.files && order.files.length
                                    ? order.files.map((file, index) => {
                                        if (
                                          // eslint-disable-next-line
                                          file.job == job.id &&
                                          // eslint-disable-next-line
                                          file.type == 2
                                        ) {
                                          return (
                                            <button
                                              type="button"
                                              key={`download_designer_file_button_${index}`}
                                              className="uk-button uk-button-small uk-button-default uk-margin-small-right"
                                              onClick={() =>
                                                this.downloadFile(file)
                                              }
                                            >
                                              <span uk-icon="cloud-download" />{" "}
                                              Download Design File
                                            </button>
                                          );
                                        }
                                        return null;
                                      })
                                    : null
                                  : null}
                                {permissions.canAttachDesignFile ? (
                                  <div uk-form-custom="">
                                    <input
                                      type="file"
                                      onChange={event =>
                                        this.uploadFile(
                                          event,
                                          job.id,
                                          "designer"
                                        )
                                      }
                                      disabled={job.status !== 1 ? true : false}
                                      required
                                    />

                                    <button
                                      type="button"
                                      className="uk-button uk-button-small uk-button-default uk-margin-small-right"
                                      disabled={job.status !== 1 ? true : false}
                                    >
                                      <span uk-icon="cloud-upload" /> Attach
                                      Design File
                                    </button>
                                  </div>
                                ) : null}
                                {permissions.canAttachPrintFile ? (
                                  <div uk-form-custom="">
                                    <input
                                      type="file"
                                      onChange={event =>
                                        this.uploadFile(
                                          event,
                                          job.id,
                                          "printer"
                                        )
                                      }
                                      disabled={job.status !== 3 ? true : false}
                                      required
                                    />

                                    <button
                                      type="button"
                                      className="uk-button uk-button-small uk-button-default uk-margin-small-right"
                                      disabled={job.status !== 3 ? true : false}
                                    >
                                      <span uk-icon="cloud-upload" /> Attach
                                      REAP File
                                    </button>
                                  </div>
                                ) : null}
                              </div>

                              {/* Complete Job */}
                              <div className="uk-flex">
                                {permissions.canSendForPrinting ? (
                                  <button
                                    type="button"
                                    className="uk-button uk-button-small uk-button-secondary"
                                    disabled={job.status !== 1 ? true : false}
                                    onClick={() =>
                                      this.changeJobStatus(job.id, 3)
                                    }
                                  >
                                    <span uk-icon="check" />{" "}
                                    {job.status !== 1
                                      ? "Sent"
                                      : "Send for Printing"}
                                  </button>
                                ) : null}
                                {permissions.canMarkAsPrintingDone ? (
                                  <button
                                    type="button"
                                    className="uk-button uk-button-small uk-button-secondary"
                                    disabled={job.status === 4 ? true : false}
                                    onClick={() =>
                                      this.changeJobStatus(job.id, 4)
                                    }
                                  >
                                    <span uk-icon="check" />{" "}
                                    {job.status === 4
                                      ? "Completed"
                                      : "Mark as Printing Complete"}
                                  </button>
                                ) : null}
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
              <div className="order-details__footer">
                <div className="uk-flex uk-flex-between">
                  <button
                    type="button"
                    className="uk-button uk-button-small uk-button-default"
                    onClick={this.backToList}
                  >
                    Back to List
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="uk-width-1-3">
            <div className="order-details">
              <div className="order-details__header">
                <div className="uk-text-lead uk-margin-bottom">
                  Party Details
                </div>
                <div className="uk-text-small uk-margin-small-bottom">
                  <strong>Party: </strong> {party.name}
                </div>
                <div className="uk-text-small uk-margin-small-bottom">
                  <strong>Contact Person: </strong> {party.contact_person}
                </div>
                <div className="uk-text-small uk-margin-small-bottom">
                  <strong>Mobile: </strong>{" "}
                  {party.mobile ? party.mobile : "Not available"}
                </div>
                <div className="uk-text-small uk-margin-small-bottom">
                  <strong>Email: </strong>{" "}
                  {party.email ? party.email : "Not available"}
                </div>
                <div className="uk-text-small uk-margin-small-bottom">
                  <strong>GSTIN: </strong>{" "}
                  {party.gstin ? party.gstin : "Not available"}
                </div>
                <div className="uk-text-small uk-margin-small-bottom">
                  <strong>Address: </strong>
                  {party.address_line_1 ? `${party.address_line_1}, ` : null}
                  {party.city ? `${party.city}, ` : null}
                  {party.state ? `${party.state} ` : null}
                  {party.postal_code ? `- ${party.postal_code}` : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default JobOrderDetails;
