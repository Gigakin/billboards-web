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
class Bills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      orders: [],
      jobTypes: [],
      jobFeatures: [],
      jobMeasurements: [],
      canAcceptPayment: true,
      showModal: false
    };
  }

  // Get Orders
  getOrders = () => {
    OrderService.getOrders().then(
      orders => {
        // Sort orders by status
        // Only printing done orders should be shown
        let array = [];
        orders.forEach(order => {
          if (order.status && order.status.id === 3) {
            return array.push(order);
          }
        });
        return this.setState({ orders: array });
      },
      error => {
        return Notification.Notify({
          text: "Failed to get the list of orders",
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
        return Notification.Notify({
          text: "Failed to get the list of orders",
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

  // Capture Payment
  capturePayment = (event, index) => {
    let value = event.target.value;
    if (!value) value = 0;
    let jobs = [...this.state.order.jobs];

    // Reset error
    this.refs[`accept_payment_error_${index}`].innerHTML = "";
    this.setState({ canAcceptPayment: true });

    let totalCost = jobs[index].rate.charge * jobs[index].totalSizeInSqFt;
    if (totalCost < value) {
      this.refs[
        `accept_payment_error_${index}`
      ].innerHTML = `Amount cannot be more than the total cost: ₹${totalCost}`;
      this.setState({ canAcceptPayment: false });
      return;
    }

    jobs[index].advance = value;
    jobs.splice(index, 1, jobs[index]);
    this.setState({
      order: {
        ...this.state.order,
        jobs: [...jobs]
      }
    });
  };

  // Calculate Balance
  calculateBalance = index => {
    let { jobs } = this.state.order;
    let balance = 0;
    balance =
      jobs[index].rate.charge * jobs[index].totalSizeInSqFt -
      jobs[index].advance;
    return balance;
  };

  // Save Payment Details
  savePaymentDetails = jobid => {
    let { order } = this.state;
    if (order.jobs && order.jobs.length) {
      let thisJob = null;
      order.jobs.forEach(j => {
        // eslint-disable-next-line
        if (j.id == jobid) thisJob = j;
        return;
      });

      OrderService.acceptPayment(order.id, thisJob.id, thisJob).then(
        response => {
          return Notification.Notify({
            text: "Payment was accepted",
            type: "success"
          });
        },
        error => {
          return Notification.Notify({
            text: "Failed to accept the payment",
            type: "error"
          });
        }
      );
    }
  };

  // Trigger Modal
  triggerModal = () => {
    let { showModal } = this.state;
    return this.setState({ showModal: !showModal });
  };

  // Set Modal Data
  setModalData = item => {
    if (item) return this.getOrderDetails(item.id);
    return false;
  };

  componentDidMount() {
    this.getJobTypes();
    this.getJobFeatures();
    this.getJobUoms();
    this.getOrders();
  }

  render() {
    let {
      order,
      orders,
      jobTypes,
      jobMeasurements,
      jobFeatures,
      canAcceptPayment,
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
                <Link to="/invoices" className="breadcrumbs__item">
                  Invoice Management
                </Link>
                <Link to="#" className="breadcrumbs__item">
                  Orders List
                </Link>
              </ul>
            </div>
          </div>

          {/* Bills */}
          <div className="uk-width-1-1">
            <OrdersList
              data={orders}
              showInvoiceButtons={true}
              showHandoverButton={false}
              showActionButtons={false}
              showPriorityIcon={false}
              methods={{
                triggerModal: this.triggerModal,
                setModalData: this.setModalData
              }}
            />
          </div>

          {order ? (
            /* Modal */
            <Modal
              isOpen={showModal}
              overlayClassName="uk-modal uk-open"
              className="uk-modal-dialog uk-modal-body ReactModal__Content--1020"
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              ariaHideApp={false}
            >
              {/* Order Details */}
              <div className="uk-width-1-1">
                <div className="uk-text-lead">Accept Payments</div>
              </div>
              {/* Amount Overview */}
              <div className="uk-width-1-1 uk-margin-small">
                <div className="uk-text">
                  Order #: <span className="uk-text-primary">{order.id}</span>
                </div>
                <div className="uk-text">
                  Party:{" "}
                  <span className="uk-text-primary">{order.party.id}</span>
                </div>
              </div>
              {/* Jobs List */}
              <div className="uk-width-1-1 uk-margin">
                <div className="uk-text-subtitle ">Jobs in this order</div>
                <div className="sor-table__table uk-margin-small">
                  <table className="uk-table uk-table-small uk-table-divider">
                    <thead>
                      <tr>
                        <th>Job</th>
                        <th>Description</th>
                        <th>Job Amount</th>
                        <th>Payment Received</th>
                        <th>Balance</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {order.jobs && order.jobs.length
                        ? order.jobs.map((job, index) => (
                            <tr key={`invoice_item_${index}`}>
                              <td className="uk-width-auto">
                                {jobTypes &&
                                  jobTypes.map(item => {
                                    // eslint-disable-next-line
                                    return item.id == job.type
                                      ? item.type
                                      : null;
                                  })}
                              </td>
                              <td className="uk-width-medium">
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
                                            ).toFixed(2) + " sq.ft."
                                          : null
                                    )
                                  : "-"}
                                {" — "}
                                {jobTypes.map(item => {
                                  // eslint-disable-next-line
                                  return item.id == job.type ? item.type : null;
                                })}
                                {jobFeatures && jobFeatures.length
                                  ? jobFeatures.map(item => {
                                      // eslint-disable-next-line
                                      return item.id == job.feature
                                        ? ` with ${item.feature}`
                                        : null;
                                    })
                                  : null}
                              </td>
                              <td className="uk-width-auto">
                                <input
                                  type="text"
                                  className="uk-input"
                                  value={job.rate.charge * job.totalSizeInSqFt}
                                  disabled
                                />
                              </td>
                              <td className="uk-width-auto">
                                <input
                                  type="number"
                                  className="uk-input"
                                  onChange={event =>
                                    this.capturePayment(event, index)
                                  }
                                  value={job.advance}
                                  required
                                />
                                <span
                                  className="uk-text-danger uk-text-small"
                                  ref={`accept_payment_error_${index}`}
                                />
                              </td>
                              <td className="uk-width-auto">
                                <input
                                  type="number"
                                  className="uk-input"
                                  value={this.calculateBalance(index)}
                                  max={job.rate ? job.rate.cost : ""}
                                  min={0}
                                  disabled
                                />
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className="uk-button uk-button-small uk-button-primary"
                                  onClick={() =>
                                    this.savePaymentDetails(job.id)
                                  }
                                  disabled={
                                    !canAcceptPayment || job.advance === 0
                                  }
                                >
                                  Save
                                </button>
                              </td>
                            </tr>
                          ))
                        : null}
                    </tbody>
                  </table>
                </div>
                <div className="uk-width-1-1 uk-flex uk-flex-center uk-margin-top">
                  <button
                    type="button"
                    onClick={this.triggerModal}
                    className="uk-button uk-button-danger uk-button-small uk-margin-small-right"
                  >
                    Cancel
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
export default Bills;
