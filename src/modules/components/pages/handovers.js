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
      totalPaidOfOrder: 0,
      totalBalanceOfOrder: 0,
      totalAmountOfOrder: 0,
      ordersList: null,
      jobTypes: [],
      jobQualities: [],
      jobMeasurements: [],
      markedJobs: [],
      canAcceptAmounts: true
    };
  }

  // Get Orders
  getOrders = () => {
    OrderService.getOrders().then(
      orders => this.setState({ ordersList: orders }),
      error => {
        return Notification.Notify({
          text: "Failed to get orders",
          type: "error"
        });
      }
    );
  };

  // Get Order Details
  getOrderDetails = orderid => {
    OrderService.getOrderById(orderid).then(
      details => {
        // Calculate total
        let totalAmount = 0;
        let totalPaid = 0;
        let totalBalance = 0;
        if (details.jobs && details.jobs.length) {
          details.jobs.forEach(job => {
            totalPaid = job.advance;
            totalBalance = job.rate.charge * job.totalSizeInSqFt - job.advance;
            totalAmount = job.rate.charge * job.totalSizeInSqFt;
          });
        }

        this.setState({
          order: details,
          totalAmountOfOrder: totalAmount,
          totalBalanceOfOrder: totalBalance,
          totalPaidOfOrder: totalPaid
        });
      },
      error => {
        Notification.Notify({
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

  // Capture Amount Received
  captureAmountReceived = (event, index) => {
    let value = event.target.value;
    if (!value) value = 0;
    let jobs = [...this.state.order.jobs];

    // Reset error
    this.refs[`handover_job_error_${index}`].innerHTML = "";
    this.setState({ canAcceptAmounts: true });

    let totalCost = jobs[index].rate.charge * jobs[index].totalSizeInSqFt;
    if (totalCost < value) {
      this.refs[
        `handover_job_error_${index}`
      ].innerHTML = `Amount cannot be more than the total cost: ₹${totalCost}`;
      this.setState({ canAcceptAmounts: false });
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

  // Capture Payment Mode
  capturePaymentMode = (event, index) => {
    let value = event.target.value;
    if (!value) value = "cash";
    let jobs = [...this.state.order.jobs];
    jobs[index].payment_mode = value;
    jobs.splice(index, 1, jobs[index]);
    this.setState({
      order: {
        ...this.state.order,
        jobs: [...jobs]
      }
    });
  };

  // Capture Payment Mode Details
  capturePaymentModeDetails = (event, index) => {
    let value = event.target.value;
    if (!value) value = 0;
    let jobs = [...this.state.order.jobs];
    jobs[index].payment_mode_details = value;
    jobs.splice(index, 1, jobs[index]);
    this.setState({
      order: {
        ...this.state.order,
        jobs: [...jobs]
      }
    });
  };

  // Handover
  handover = jobid => {
    let { order } = this.state;

    if (order.jobs && order.jobs.length) {
      let thisJob = null;
      order.jobs.forEach(job => {
        if (job.id === jobid) {
          thisJob = job;
          return;
        }
      });

      OrderService.handoverJobs(order.id, thisJob).then(
        response => {
          this.getOrders();
          this.getOrderDetails(order.id);
          return Notification.Notify({
            text: "The job was marked as handed over.",
            type: "success"
          });
        },
        error => {
          return Notification.Notify({
            text: "Failed to hand over the job. Please try again.",
            type: "error"
          });
        }
      );
    }
  };

  // Print Delivery Memo
  printDeliveryMemo = jobid => {
    console.log("What to do here?", jobid);
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
      totalAmountOfOrder,
      totalBalanceOfOrder,
      totalPaidOfOrder,
      jobTypes,
      jobMeasurements,
      jobQualities,
      canAcceptAmounts,
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
              className="uk-modal-dialog uk-modal-body ReactModal__Content--1020"
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              ariaHideApp={false}
            >
              {/* Order Details */}
              <div className="uk-width-1-1">
                <div className="uk-text-lead">
                  {order.name} <small>for {order.party.name}</small>
                </div>
                <div className="uk-text-subtitle">{order.description}</div>
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
                        <td>{`₹${totalAmountOfOrder}`}</td>
                        <td>{`₹${totalPaidOfOrder}`}</td>
                        <td>{`₹${totalBalanceOfOrder}`}</td>
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
                        <th>Type</th>
                        <th>Size</th>
                        <th>Quality</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Amount Received</th>
                        <th>Payment Mode</th>
                        <th>Cheque #/Card Number/Wallet Name</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {order.jobs && order.jobs.length ? (
                        order.jobs.map((job, index) => (
                          <tr
                            key={`modal_item_${index}`}
                            className={
                              job.status !== 3 ? "table-row-faded-out" : null
                            }
                          >
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
                            <td>{job.is_handed_over ? "Handed Over" : "-"}</td>
                            <td>
                              {job.rate && job.rate.charge
                                ? `₹${job.rate.charge * job.totalSizeInSqFt}`
                                : "-"}
                            </td>
                            <td>
                              <input
                                type="number"
                                className="uk-input"
                                value={job.amount_received}
                                onChange={event =>
                                  this.captureAmountReceived(event, index)
                                }
                                disabled={
                                  job.is_handed_over || job.status !== 3
                                }
                                min={0}
                              />
                              <span
                                className="uk-text-danger uk-text-small"
                                ref={`handover_job_error_${index}`}
                              />
                            </td>
                            <td>
                              <select
                                className="uk-select"
                                value={job.payment_mode}
                                onChange={event =>
                                  this.capturePaymentMode(event, index)
                                }
                                disabled={
                                  job.is_handed_over || job.status !== 3
                                }
                              >
                                <option value="cash">Cash</option>
                                <option value="card">Debit/Credit Card</option>
                                <option value="cheque">Cheque</option>
                                <option value="wallet">Wallet</option>
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="uk-input"
                                value={
                                  job.payment_mode_details
                                    ? job.payment_mode_details
                                    : undefined
                                }
                                disabled={
                                  job.is_handed_over ||
                                  job.status !== 3 ||
                                  job.payment_mode === "cash"
                                }
                              />
                            </td>
                            <td>
                              {job.is_handed_over ? (
                                <button
                                  type="button"
                                  onClick={() => this.printDeliveryMemo(job.id)}
                                  className="uk-button uk-button-small uk-button-primary"
                                >
                                  Print DM
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => this.handover(job.id)}
                                  className="uk-button uk-button-small uk-button-primary"
                                  disabled={
                                    job.is_handed_over ||
                                    job.status !== 3 ||
                                    !canAcceptAmounts
                                  }
                                >
                                  Handover
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="uk-text-center" colSpan={6}>
                            There are no jobs that can be handed over right now!
                          </td>
                        </tr>
                      )}
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
