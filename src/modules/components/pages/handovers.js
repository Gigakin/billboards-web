// Modules
import React from "react";
import { Link } from "react-router-dom";

// Assets
import Methods from "../../methods";

// Components
import Modal from "../common/modal";
import Notification from "../common/notification";
import OrdersList from "../common/orders-list";

// Services
import OrderService from "../../services/order-service";
import JobService from "../../services/job-service";

// Classes
class Handovers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      ordersList: null,
      jobTypes: [],
      jobQualities: [],
      jobMeasurements: [],
      markedJobs: []
    };
    this.tableColumns = [
      "Order #",
      "Order Name",
      "Party Name",
      "Account Owner",
      "Order Status",
      "Actions"
    ];
  }

  // Get Orders
  getOrders = () => {
    OrderService.getOrders().then(
      orders => this.setState({ ordersList: orders }),
      error => {
        let { data } = error.response;
        return Notification.Notify({
          text: data.message ? data.message : "Failed to get orders",
          type: "error"
        });
      }
    );
  };

  // Get Order Details
  getOrderDetails = orderid => {
    OrderService.getOrderById(orderid).then(
      details => this.setState({ order: details }),
      error => {
        let { data } = error.response;
        Notification.Notify({
          text: data.message ? data.message : "Failed to get order details",
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

  // Trigger Modal
  triggerModal = () => {
    let { showModal } = this.state;
    return this.setState({
      markedJobs: [],
      showModal: !showModal
    });
  };

  // Set Modal Data
  setModalData = data => {
    if (data) return this.getOrderDetails(data.id);
    return false;
  };

  // Mark Job
  markJob = jobid => {
    if (jobid) {
      jobid = parseInt(jobid, 10);
      let { markedJobs } = this.state;
      // check if job is already marked
      let isMarked = false;
      if (markedJobs && markedJobs.length) {
        markedJobs.forEach(itemid => {
          if (itemid === jobid) return (isMarked = true);
        });
      }

      if (isMarked) {
        var jobIndex = markedJobs.indexOf(jobid);
        if (jobIndex !== -1) {
          this.setState({
            markedJobs: this.state.markedJobs.filter(
              element => element !== jobid
            )
          });
        }
      } else {
        return this.setState({
          markedJobs: this.state.markedJobs.concat(jobid)
        });
      }
    }
  };

  // Handover
  handover = () => {
    let { order, markedJobs } = this.state;
    OrderService.handoverJobs(order.id, markedJobs).then(
      response => {
        this.getOrders();
        this.getOrderDetails(order.id);
        this.setState({ markedJobs: [] });
        return Notification.Notify({
          text: "Selected jobs were marked as handed over.",
          type: "success"
        });
      },
      error => {
        return Notification.Notify({
          text: "Failed to hand over jobs. Please try again.",
          type: "error"
        });
      }
    );
  };

  componentDidMount() {
    this.getJobTypes();
    this.getJobQualities();
    this.getJobUoms();
    this.getOrders();
  }

  render() {
    let {
      order,
      ordersList,
      jobTypes,
      jobMeasurements,
      jobQualities,
      markedJobs,
      showModal
    } = this.state;

    return (
      <div className="lists">
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
                  Handovers
                </Link>
              </ul>
            </div>
          </div>

          {/* Order List */}
          <div className="uk-width-1-1">
            <OrdersList
              columns={this.tableColumns}
              data={ordersList}
              methods={{
                triggerModal: this.triggerModal,
                setModalData: this.setModalData
              }}
              showActionButtons={false}
              showPriorityIcon={false}
              showHandoverButton
            />
          </div>

          {order ? (
            /* Modal */
            <Modal
              isOpen={showModal}
              overlayClassName="uk-modal uk-open"
              className="uk-modal-dialog uk-modal-body"
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              ariaHideApp={false}
            >
              {/* Order Details */}
              <div className="uk-width-1-1">
                <div className="uk-text-lead">{order.job}</div>
                <div className="uk-text-meta">Order ID: {order.id}</div>
              </div>
              {/* Amount Overview */}
              <div className="uk-width-1-1 uk-margin">
                <div className="uk-text-subtitle uk-margin-small-bottom">
                  Amount Overview
                </div>
                <div className="sor-table__table">
                  <table className="uk-table uk-table-small uk-table-divider">
                    <thead>
                      <tr>
                        <th>Order Total</th>
                        <th>Amount Paid</th>
                        <th>Amount Remaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>₹22500</td>
                        <td>₹2500</td>
                        <td>₹20000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Jobs List */}
              <div className="uk-width-1-1 uk-margin">
                <div className="uk-text-subtitle uk-margin-small-bottom">
                  Jobs in this order
                </div>
                <div className="sor-table__table uk-margin-small-bottom">
                  <table className="uk-table uk-table-small uk-table-divider">
                    <thead>
                      <tr>
                        <th />
                        <th>Type</th>
                        <th>Size</th>
                        <th>Quality</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.jobs && order.jobs.length
                        ? order.jobs.map((job, index) => (
                            <tr
                              key={`modal_item_${index}`}
                              className={
                                job.is_handed_over ? "table-row-faded-out" : null
                              }
                            >
                              <td>
                                <input
                                  type="checkbox"
                                  className="uk-checkbox"
                                  onClick={() => this.markJob(job.id)}
                                  disabled={job.is_handed_over}
                                />
                              </td>
                              <td>
                                {jobTypes
                                  ? jobTypes.map(item => {
                                      return item.id === job.type
                                        ? item.type
                                        : null;
                                    })
                                  : "-"}
                              </td>
                              <td>
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
                              </td>
                              <td>
                                {jobQualities
                                  ? jobQualities.map(item => {
                                      // eslint-disable-next-line
                                      return item.id == job.quality
                                        ? item.quality
                                        : null;
                                    })
                                  : "-"}
                              </td>
                              <td>-</td>
                              <td>
                                {job.is_handed_over
                                  ? "Handed Over"
                                  : "Yet to be handed over"}
                              </td>
                            </tr>
                          ))
                        : "No jobs in this order"}
                    </tbody>
                  </table>
                </div>
                <div className="uk-width-1-1 uk-flex uk-flex-center">
                  <button
                    type="button"
                    onClick={this.triggerModal}
                    className="uk-button uk-button-danger uk-button-small uk-margin-small-right"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={this.handover}
                    className="uk-button uk-button-primary uk-button-small"
                    disabled={!markedJobs || markedJobs.length === 0}
                  >
                    Handover
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// Exports
export default Handovers;
