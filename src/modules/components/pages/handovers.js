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
      jobsList: MockData
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
    if (data) return this.setState({ modalData: data });
    return false;
  };

  render() {
    let { jobsList, showModal } = this.state;
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
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
          >
            <button
              type="button"
              className="uk-button uk-button-small uk-button-primary"
              onClick={this.triggerModal}
            >
              Close
            </button>
          </Modal>
        </div>
      </div>
    );
  }
}

// Exports
export default Handovers;
