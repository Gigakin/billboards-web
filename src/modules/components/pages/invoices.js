// Modules
import React from "react";
import { Link } from "react-router-dom";

// Assets
import Strings from "../../strings";

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

  // Trigger Modal
  triggerModal = () => {
    let { showModal } = this.state;
    return this.setState({ showModal: !showModal });
  };

  // Set Modal Data
  setModalData = item => {
    if (item) return this.setState({ order: item });
    return false;
  };

  componentDidMount() {
    return this.getOrders();
  }

  render() {
    let { order, orders, showModal } = this.state;

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
                  <table className="uk-table uk-table-small uk-table-middle uk-table-divider">
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
                      <tr>
                        <td className="uk-width-auto">Vinyl</td>
                        <td className="uk-width-large">
                          12 x 12 sq. ft. &mdash; Transparent with Foamsheet
                          Pasting
                        </td>
                        <td className="uk-width-auto">
                          <input type="number" className="uk-input" required />
                        </td>
                        <td className="uk-width-auto">
                          <input type="number" className="uk-input" required />
                        </td>
                        <td className="uk-width-auto">
                          <input type="number" className="uk-input" required />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="uk-button uk-button-small uk-button-primary"
                            onClick={this.savePaymentDetails}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="uk-width-auto">Vinyl</td>
                        <td className="uk-width-large">
                          12 x 12 sq. ft. &mdash; Transparent with Foamsheet
                          Pasting
                        </td>
                        <td className="uk-width-auto">
                          <input type="number" className="uk-input" required />
                        </td>
                        <td className="uk-width-auto">
                          <input type="number" className="uk-input" required />
                        </td>
                        <td className="uk-width-auto">
                          <input type="number" className="uk-input" required />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="uk-button uk-button-small uk-button-primary"
                            onClick={this.savePaymentDetails}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
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
