// Modules
import React from "react";

// Components
import JobList from "../common/job-list";

// Classes
class NewJobOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job: {},
      jobDetails: {
        type: "frontlit",
        quality: "quality1",
        sizeUnits: "meters"
      },
      jobsList: [],
      customer: {},
      designer: {},
      createOrderError: false,
      currentTab: "order"
    };
    this.jobDetails = {};
  }

  // Capture Job Details
  captureJobDescription = event => {
    return this.setState({
      job: {
        ...this.state.job,
        [event.target.id]: event.target.value
      }
    });
  };

  // Capture Job Details Options
  // Maybe push the values in an array?
  captureJobDescriptionOption = event => {
    return this.setState({
      job: {
        ...this.state.job,
        [event.target.id]: event.target.value
      }
    });
  };

  // Capture Customer Details
  captureCustomerInformation = event => {
    let value = event.target.value;
    if (event.target.id === "phoneNumber") {
      value = parseInt(value, 10);
    }
    return this.setState({
      customer: {
        ...this.state.customer,
        [event.target.id]: value
      }
    });
  };

  // Capture Billing Address
  captureBillingAddress = event => {
    return this.setState({
      customer: {
        ...this.state.customer,
        billingAddress: {
          ...this.state.customer.billingAddress,
          [event.target.id]: event.target.value
        }
      }
    });
  };

  // Capture Shipping Address
  captureShippingAddress = event => {
    return this.setState({
      customer: {
        ...this.state.customer,
        shippingAddress: {
          ...this.state.customer.shippingAddress,
          [event.target.id]: event.target.value
        }
      }
    });
  };

  // Match Billing and Shipping Addresses
  // What can be done here to make it work?
  matchBillingAndShippingAddresses = event => {
    console.log(event.target.value);
  };

  // Capture Designer Details
  captureDesignerDetails = event => {
    return this.setState({
      designer: {
        ...this.state.designer,
        [event.target.id]: event.target.value
      }
    });
  };

  // Job Type Tab Switching
  switchTab = tabid => {
    return this.setState({
      currentTab: tabid,
      // Reset job details on tab switch
      jobDetails: {
        ...this.state.jobDetails,
        type: tabid
      }
    });
  };

  // Capture Job Details
  captureJobDetails = event => {
    return this.setState({
      jobDetails: {
        ...this.state.jobDetails,
        [event.target.id]: event.target.value
      }
    });
  };

  // Add Job
  addJob = event => {
    event.preventDefault();
    let { jobDetails, jobsList } = this.state;
    return this.setState({
      jobsList: jobsList.concat(jobDetails)
    });
  };

  // Remove Job
  removeJob = jobid => {
    let { jobsList } = this.state;
    return this.setState({
      jobsList: jobsList.filter((_, index) => index !== jobid)
    });
  };

  // Create Order
  createOrder = event => {
    event.preventDefault();
    let { customer, designer, job } = this.state;
    let payload = { customer, designer, job };
    console.log(payload);
  };

  // Back to Order List
  goBack = event => {
    return this.props.history.push("/jobs");
  };

  render() {
    let { currentTab } = this.state;
    return (
      <div className="new-order">
        <div className="uk-width-1-1 uk-padding-large">
          {/* Header */}
          <div className="new-order__header">
            <div className="uk-width-1-1 uk-flex-inline">
              <button
                type="button"
                className="uk-icon-button"
                onClick={this.goBack}
                uk-icon="arrow-left"
              />
              <h2 className="new-order__header__title">New Job Order</h2>
            </div>
          </div>

          {/* Content */}
          <div className="new-order__content">
            {/* Tabs */}
            <div className="uk-width-1-1">
              <ul uk-tab="">
                <li>
                  <a onClick={() => this.switchTab("order")} href="#">
                    Order Details
                  </a>
                </li>
                <li>
                  <a onClick={() => this.switchTab("customer")} href="#">
                    Customer Details
                  </a>
                </li>
                <li>
                  <a onClick={() => this.switchTab("jobs")} href="#">
                    Jobs List
                  </a>
                </li>
                <li>
                  <a onClick={() => this.switchTab("finalize")} href="">
                    Finalize
                  </a>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="uk-width-1-1 uk-padding">
              {/* Order Details */}
              {currentTab === "order" ? "Order Details" : null}
              {/* Customer Details */}
              {currentTab === "customer" ? "Customer Details" : null}
              {/* Jobs List */}
              {currentTab === "jobs" ? "Jobs List" : null}
              {/* Final Submit */}
              {currentTab === "finalize" ? "Finalize" : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default NewJobOrder;
