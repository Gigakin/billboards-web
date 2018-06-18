// Modules
import React from "react";
import { Link } from "react-router-dom";

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
      jobMeasurements: [],
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
  completeOrder = event => {
    event.preventDefault();
    return this.props.history.push("/orders");
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
                          })}
                        </div>
                        <div className="uk-width-1-1">
                          <span className="uk-text-small uk-text-primary">
                            {`with Foamsheet Pasting`}
                          </span>
                        </div>
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
                              2
                            </span>
                          </div>
                          <div className="uk-width-1-2">
                            <span className="uk-text-small">Dimensions : </span>
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
                  {permissions.canCompleteOrder ? (
                    <button
                      type="button"
                      className="uk-button uk-button-small uk-button-primary"
                      onClick={this.completeOrder}
                    >
                      Complete Order
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="uk-width-1-3">
            <div className="order-details">
              <div className="order-details__header">
                <div className="uk-text-subtitle uk-margin-bottom">
                  Order Details
                </div>
                {/* Size */}
                <div className="uk-text-small uk-margin-small-bottom">
                  <strong>Total Size: </strong> 110sq. ft.
                </div>
                {/* Notes: Frontdesk */}
                {permissions.canSeeFrontdeskNotes ? (
                  <div className="uk-text-small uk-margin-small-bottom">
                    <strong>Notes from Frontdesk: </strong> Lorem ipsum dolor
                    sit amet consectetur, adipisicing elit. Quia et praesentium
                    modi dolore pariatur, mollitia doloribus. Repellendus rerum
                    suscipit, officiis et minus dolor consequatur inventore
                    pariatur excepturi tempore dolore odit.
                  </div>
                ) : null}
                {/* Notes: Designer */}
                {permissions.canSeeDesignerNotes ? (
                  <div className="uk-text-small uk-margin-small-bottom">
                    <strong>Notes from Designer: </strong> Lorem ipsum dolor sit
                    amet consectetur, adipisicing elit. Quia et praesentium modi
                    dolore pariatur, mollitia doloribus. Repellendus rerum
                    suscipit, officiis et minus dolor consequatur inventore
                    pariatur excepturi tempore dolore odit.
                  </div>
                ) : null}
                {/* Notes: Printer */}
                {permissions.canSeePrinterNotes ? (
                  <div className="uk-text-small uk-margin-small-bottom">
                    <strong>Notes from Printer: </strong> Lorem ipsum dolor sit
                    amet consectetur, adipisicing elit. Quia et praesentium modi
                    dolore pariatur, mollitia doloribus. Repellendus rerum
                    suscipit, officiis et minus dolor consequatur inventore
                    pariatur excepturi tempore dolore odit.
                  </div>
                ) : null}
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
