// Modules
import React from "react";
import { Link } from "react-router-dom";

// Components
import Modal from "../common/modal";
import OrdersList from "../common/orders-list";
import MockData from "../../stores/mock_data.json";

// Classes
class Handovers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsList: MockData,
      modalData: {}
    };
    this.tableColumns = [
      "Party Name",
      "Job Name",
      "Total Sq. Ft.",
      "Assigned To",
      "Status",
      "Actions"
    ];
  }

  // Trigger Modal
  triggerModal = () => {
    let { showModal } = this.state;
    return this.setState({
      showModal: !showModal
    });
  };

  // Set Modal Data
  setModalData = data => {
    console.log(data);
    if (data) return this.setState({ modalData: data });
    return false;
  };

  render() {
    let { jobsList, modalData, showModal } = this.state;
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
              data={jobsList}
              methods={{
                triggerModal: this.triggerModal,
                setModalData: this.setModalData
              }}
              showActionButtons={false}
              showHandoverButton
            />
          </div>

          {/* Modal */}
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
              <div className="uk-text-lead">{modalData.job}</div>
              <div className="uk-text-meta">Order ID: {modalData.id}</div>
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
                      <th>Description</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Vinyl</td>
                      <td>11 sq.ft.</td>
                      <td>₹8000</td>
                      <td>-</td>
                      <td>Incomplete</td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td>Indoor</td>
                      <td>125 sq.ft.</td>
                      <td>₹12000</td>
                      <td>-</td>
                      <td>Incomplete</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="uk-width-1-1 uk-flex uk-flex-center">
                <button
                  type="button"
                  onClick={this.triggerModal}
                  className="uk-button uk-button-danger uk-button-small uk-margin-small-right"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={this.handover}
                  className="uk-button uk-button-primary uk-button-small"
                >
                  Handover
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

// Exports
export default Handovers;
