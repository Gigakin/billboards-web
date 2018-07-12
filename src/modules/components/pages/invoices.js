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
    let { payments } = this.state.order;

    // Reset error
    this.refs[`accept_payment_error_${index}`].innerHTML = "";
    this.setState({ canAcceptPayment: true });

    // Total Cost
    let totalCost = Math.ceil(
      parseFloat(jobs[index].rate.charge) *
        parseFloat(jobs[index].totalSizeInSqFt)
    );

    // Balance
    let totalBalance = 0;
    if (payments && payments.length) {
      payments.forEach(p => {
        // eslint-disable-next-line
        if (p.job_id == jobs[index].id) {
          totalBalance = parseFloat(totalBalance) + parseFloat(p.amount);
        }
      });
    }

    totalBalance = totalCost - totalBalance;

    if (totalBalance < value) {
      this.refs[
        `accept_payment_error_${index}`
      ].innerHTML = `Amount cannot be more than the balance: ₹${totalBalance}`;
      this.setState({ canAcceptPayment: false });
      return;
    }

    jobs[index].amount_received = value;
    jobs.splice(index, 1, jobs[index]);
    this.setState({
      order: {
        ...this.state.order,
        jobs: [...jobs]
      }
    });
  };

  // Calculate Balance
  calculateBalance = (job, index) => {
    let { payments } = this.state.order;

    // Total Cost
    let totalCost = 0;
    if (job.rate && job.rate.charge && job.totalSizeInSqFt) {
      totalCost = Math.ceil(
        parseFloat(job.rate.charge) * parseFloat(job.totalSizeInSqFt)
      ).toFixed(2);
    }

    if (payments && payments.length) {
      let totalPaid = 0;
      payments.forEach(p => {
        // eslint-disable-next-line
        if (p.job_id == job.id) {
          totalPaid = parseFloat(totalPaid) + parseFloat(p.amount);
          return;
        }
      });
      return `₹${totalCost - totalPaid}`;
    }
    return "-";
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

  // Render Save Button
  renderSaveButton = job => {
    let { payments } = this.state.order;

    // Total Cost
    let totalCost = 0;
    if (job.rate && job.rate.charge && job.totalSizeInSqFt) {
      totalCost = Math.ceil(
        parseFloat(job.rate.charge) * parseFloat(job.totalSizeInSqFt)
      ).toFixed(2);
    }

    let totalPaid = 0;
    if (payments && payments.length) {
      payments.forEach(p => {
        if (p.job_id === job.id) {
          totalPaid = parseFloat(totalPaid) + parseFloat(p.amount);
          return;
        }
      });
    }

    // Total Balance
    let totalBalance = totalCost - totalPaid;

    // Has remaining balance
    let hasRemainingBalance = true;
    // eslint-disable-next-line
    if (totalBalance == job.amount_received) {
      hasRemainingBalance = false;
    }

    return (
      <button
        type="button"
        className="uk-button uk-button-small uk-button-primary"
        onClick={() => this.savePaymentDetails(job.id)}
        disabled={
          !this.state.canAcceptPayment ||
          job.amount_received === 0 ||
          hasRemainingBalance
        }
      >
        Save
      </button>
    );
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
                        <th>Balance</th>
                        <th>Payment Received</th>
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
                                {`₹${Math.ceil(
                                  parseFloat(job.rate.charge) *
                                    parseFloat(job.totalSizeInSqFt)
                                ).toFixed(2)}`}
                              </td>

                              <td className="uk-width-auto">
                                {this.calculateBalance(job, index)}
                              </td>

                              <td className="uk-width-auto">
                                <input
                                  type="number"
                                  className="uk-input"
                                  onChange={event =>
                                    this.capturePayment(event, index)
                                  }
                                  value={job.amount_received}
                                  required
                                />
                                <span
                                  className="uk-text-danger uk-text-small"
                                  ref={`accept_payment_error_${index}`}
                                />
                              </td>
                              <td>{this.renderSaveButton(job, index)}</td>
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
