// Modules
import React from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert";

// Assets
import Methods from "../../methods";

// Components
import Notification from "./notification";

// Services
import AccountOwnerService from "../../services/account-owners-service";
import PermissionService from "../../services/permission-service";

// Classes
class OrdersList extends React.Component {
  constructor(props) {
    super(props);

    // Rearrange orders
    let rearrangedOrders = [];
    if (props.data) rearrangedOrders = this.rearrangeOrders(props.data);

    this.state = {
      permissions: {},
      accountOwners: [],
      tableData: rearrangedOrders,
      currentPage: 0
    };
    this.pageSize = 10;
    this.originalList = Methods.clone(rearrangedOrders);
    this.filteredList = [];
  }

  // Get Account Owners
  getAccountOwners = () => {
    AccountOwnerService.getAccountOwners().then(
      owners => this.setState({ accountOwners: owners }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of account owners",
          type: "error"
        });
      }
    );
  };

  // Rearrange Orders
  rearrangeOrders = orders => {
    if (orders && orders.length) {
      let rearrangedOrders = [];
      orders.forEach(order => {
        if (order.isHighPriority) return rearrangedOrders.push(order);
      });
      orders.forEach(order => {
        if (!order.isHighPriority) return rearrangedOrders.push(order);
      });
      return rearrangedOrders;
    }
  };

  // Start Designing
  startDesigning = itemid => {
    if (itemid) {
      let { history } = this.props;
      return history.push(`/orders/${itemid}`);
    }
    return false;
  };

  // Start Printing
  startPrinting = itemid => {
    if (itemid) return this.startDesigning(itemid);
    return false;
  };

  // View Order Details
  viewDetails = itemid => {
    if (itemid) return this.props.history.push(`/orders/${itemid}`);
  };

  // Edit Order
  editOrder = order => {
    return this.props.methods.editOrder(order);
  };

  // Delete Order
  deleteOrder = order => {
    return Swal({
      title: "Delete?",
      text: "Are you sure you want to delete this order?",
      buttons: ["Cancel", "Delete"],
      dangerMode: true
    }).then(shouldDelete => {
      if (shouldDelete) return this.props.methods.deleteOrder(order);
    });
  };

  // Filter Table Data
  filterData = event => {
    // Extract values
    let query = event.target.value;
    let filterBy = event.target.id;

    // Empty query
    // assing original list to state
    if (!query) {
      return this.setState({
        tableData: this.originalList
      });
    }

    // No "FilterBy" property
    // Assign the default manually
    if (!filterBy) filterBy = "id";

    // Find Entries and assign
    // them to filtered list
    this.filteredList = [];
    this.originalList.filter(item => {
      if (item[filterBy]) {
        query = query.toString().toLowerCase();
        if (
          item[filterBy]
            .toString()
            .toLowerCase()
            .includes(query)
        ) {
          return this.filteredList.push(item);
        }
      }
      return false;
    });

    // Update results
    return this.setState({ tableData: this.filteredList });
  };

  // Filter data by Status
  filterDataByStatus = event => {
    let query = event.target.value;
    // Empty query
    // assing original list to state
    if (!query) {
      return this.setState({
        tableData: this.originalList
      });
    }
    // Find Entries and assign
    // them to filtered list
    this.filteredList = [];
    this.originalList.filter(item => {
      if (item.status) {
        if (query === "draft") {
          if (item.status.id === 1) return this.filteredList.push(item);
        }
        if (query === "inprogress") {
          if (item.status.id === 2) return this.filteredList.push(item);
        }
        if (query === "readyforinvoicing") {
          if (item.status.id === 3) return this.filteredList.push(item);
        }
      }
      return false;
    });
    // Update results
    return this.setState({ tableData: this.filteredList });
  };

  // Filter data by Party Name
  filterDataByPartyName = event => {
    let query = event.target.value;
    // Empty query
    // assing original list to state
    if (!query) {
      return this.setState({
        tableData: this.originalList
      });
    }
    // Find Entries and assign
    // them to filtered list
    this.filteredList = [];
    this.originalList.filter(item => {
      if (item.party) {
        query = query.toString().toLowerCase();
        if (
          item.party.name
            .toString()
            .toLowerCase()
            .includes(query)
        )
          return this.filteredList.push(item);
      }
      return false;
    });
    // Update results
    return this.setState({ tableData: this.filteredList });
  };

  // Filter data by Account Owner
  filterDataByAccountOwner = event => {
    let query = event.target.value;
    // Empty query
    // assing original list to state
    if (!query) {
      return this.setState({
        tableData: this.originalList
      });
    }
    // Find Entries and assign
    // them to filtered list
    this.filteredList = [];
    this.originalList.filter(item => {
      if (item.party) {
        query = query.toString().toLowerCase();
        if (
          item.owner.owner
            .toString()
            .toLowerCase()
            .includes(query)
        )
          return this.filteredList.push(item);
      }
      return false;
    });
    // Update results
    return this.setState({ tableData: this.filteredList });
  };

  // Filter data by priority
  filterDataByPriority = event => {
    let query = event.target.value;
    // Empty query
    // assing original list to state
    if (!query) {
      return this.setState({
        tableData: this.originalList
      });
    }
    // Find Entries and assign
    // them to filtered list
    this.filteredList = [];
    this.originalList.filter(item => {
      if (query === "high") {
        if (item.isHighPriority) return this.filteredList.push(item);
      }
      if (query === "normal") {
        if (!item.isHighPriority) return this.filteredList.push(item);
      }
      return false;
    });
    // Update results
    return this.setState({ tableData: this.filteredList });
  };

  // Handover
  handover = item => {
    let { methods } = this.props;
    if (methods.setModalData) methods.setModalData(item);
    if (methods.triggerModal) return methods.triggerModal();
    return false;
  };

  // Accept Payment
  acceptPayment = item => {
    let { methods } = this.props;
    if (methods.setModalData) methods.setModalData(item);
    if (methods.triggerModal) return methods.triggerModal();
    return false;
  };

  // View Invoice
  viewInvoice = itemid => {
    if (itemid) {
      let { history } = this.props;
      return history.push(`/invoices/${itemid}`);
    }
    return false;
  };

  componentDidMount() {
    // Get permissions
    let role = PermissionService.getRole();
    let permissions = PermissionService.getPermissions(role);
    if (permissions) {
      this.getAccountOwners();
      return this.setState({
        permissions: permissions
      });
    }
  }

  componentWillReceiveProps(props) {
    if (props.data) {
      // Rearrange Data
      let rearrangedOrders = this.rearrangeOrders(props.data);
      // Update state data for table
      this.originalList = Methods.clone(rearrangedOrders);
      return this.setState({ tableData: rearrangedOrders });
    }
  }

  render() {
    let { tableData, accountOwners, permissions } = this.state;
    let {
      jobTypes,
      jobFeatures,
      jobQualities,
      jobStatuses,
      showActionButtons,
      showInvoiceButtons,
      showHandoverButton,
      showPriorityIcon
    } = this.props;

    return (
      <div className="sor-table">
        {/* Actions */}
        <div className="uk-card uk-card-default uk-margin-bottom uk-padding">
          <div className="sor-table__actions">
            <div className="uk-grid uk-grid-small uk-form-stacked">
              <div className="uk-flex uk-width-1-1">
                <div className="uk-width-1-3">
                  <label className="uk-form-label uk-text-bold">
                    Order Number
                  </label>
                  <div className="uk-form-controls">
                    <input
                      id="id"
                      type="text"
                      onChange={this.filterData}
                      className="uk-input"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="uk-width-1-3 uk-margin-left uk-margin-right">
                  <label className="uk-form-label uk-text-bold">
                    Party Name
                  </label>
                  <div className="uk-form-controls">
                    <input
                      id="name"
                      type="text"
                      onChange={this.filterDataByPartyName}
                      className="uk-input"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="uk-width-1-3">
                  <label className="uk-form-label uk-text-bold">
                    Order Status
                  </label>
                  <div className="uk-form-controls">
                    <select
                      id="status"
                      onChange={this.filterDataByStatus}
                      className="uk-select"
                      autoComplete="off"
                    >
                      <option value="" defaultChecked>
                        All
                      </option>
                      <option value="draft">Draft</option>
                      <option value="inprogress">In Progress</option>
                      <option value="readyforinvoicing">
                        Ready for Invoicing
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="uk-width-1-1 uk-flex uk-margin-top">
                <div className="uk-width-1-3">
                  <label className="uk-form-label uk-text-bold">
                    Account Owner
                  </label>
                  <div className="uk-form-controls">
                    <select
                      id="owner"
                      type="text"
                      onChange={this.filterDataByAccountOwner}
                      className="uk-select"
                      autoComplete="off"
                    >
                      <option value="" defaultChecked>
                        All
                      </option>
                      {accountOwners && accountOwners.length
                        ? accountOwners.map((owner, index) => (
                            <option
                              key={`account_owner_item_${index}`}
                              value={owner.owner}
                            >
                              {owner.owner}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className="uk-width-1-3 uk-margin-left uk-margin-right">
                  <label className="uk-form-label uk-text-bold">
                    Priority Status
                  </label>
                  <div className="uk-form-controls">
                    <select
                      id="isHighPriority"
                      onChange={this.filterDataByPriority}
                      className="uk-select"
                      autoComplete="off"
                    >
                      <option value="" defaultChecked>
                        All
                      </option>
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div className="uk-width-1-3">
                  <label className="uk-form-label uk-text-bold">
                    Time Period
                  </label>
                  <div className="uk-form-controls">
                    <input
                      id="timePeriod"
                      type="text"
                      onChange={this.filterData}
                      className="uk-input"
                      autoComplete="off"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="sor-table__table">
          <table className="uk-table uk-table-middle uk-table-striped uk-table-divider">
            <thead>
              <tr>
                {showPriorityIcon ? <th /> : null}
                <th>Order #</th>
                <th>Order Name</th>
                <th>Party Name</th>
                <th>Account Owner</th>
                <th>Order Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            {tableData && tableData.length ? (
              tableData.map((item, index) => {
                return (
                  <tbody key={`sortable_item_${index}`}>
                    <tr className="is-link">
                      {showPriorityIcon ? (
                        <td onClick={() => this.viewDetails(item.id)}>
                          {item.isHighPriority ? (
                            <span className="uk-text-danger" uk-icon="bolt" />
                          ) : null}
                        </td>
                      ) : null}
                      <td onClick={() => this.viewDetails(item.id)}>
                        {item.id ? item.id : "-"}
                      </td>
                      <td onClick={() => this.viewDetails(item.id)}>
                        {item.name ? item.name : "-"}
                      </td>
                      <td onClick={() => this.viewDetails(item.id)}>
                        {item.party ? item.party.name : "-"}
                      </td>
                      <td onClick={() => this.viewDetails(item.id)}>
                        {item.owner ? item.owner.owner : "-"}
                      </td>
                      <td onClick={() => this.viewDetails(item.id)}>
                        {item.status ? item.status.status : "-"}
                      </td>
                      <td>
                        <span>
                          {showActionButtons ? (
                            <span>
                              {/* Quick View */}
                              <label
                                className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                                htmlFor={`collapsible_toggle_${index}`}
                              >
                                Quick View
                              </label>

                              {/* Add Jobs/Review Order Details */}
                              {permissions.canEditOrderDetails ? (
                                <button
                                  type="button"
                                  onClick={() => this.editOrder(item)}
                                  className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                                  disabled={item.status.id !== 1}
                                >
                                  Add Jobs
                                </button>
                              ) : null}

                              {/* Review Order Details */}
                              {permissions.canReviewOrderDetails ? (
                                <button
                                  type="button"
                                  onClick={() => this.editOrder(item)}
                                  className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                                  disabled={
                                    item.status.id !== 1 ||
                                    !item.jobs ||
                                    !item.jobs.length
                                  }
                                >
                                  Review
                                </button>
                              ) : null}

                              {/* Start Design */}
                              {permissions.canStartDesign ? (
                                <button
                                  type="button"
                                  onClick={() => this.startDesigning(item.id)}
                                  className="uk-button uk-button-secondary uk-button-small uk-margin-small-right"
                                  disabled={item.status.id === 1}
                                >
                                  Start Designing
                                </button>
                              ) : null}

                              {/* Start Print */}
                              {permissions.canStartPrinting ? (
                                <button
                                  type="button"
                                  onClick={() => this.startPrinting(item.id)}
                                  className="uk-button uk-button-secondary uk-button-small uk-margin-small-right"
                                  disabled={item.status.id === 1}
                                >
                                  Start Printing
                                </button>
                              ) : null}

                              {/* Delete Order */}
                              {/* Allow delete only if order is draft */}
                              {permissions.canDeleteOrder ? (
                                <button
                                  type="button"
                                  onClick={() => this.deleteOrder(item)}
                                  className="uk-button uk-button-danger uk-button-small uk-margin-small-right"
                                  disabled={item.status.id !== 1}
                                >
                                  Delete
                                </button>
                              ) : null}
                            </span>
                          ) : null}
                          {/* Handover */}
                          {permissions.canHandoverJob ? (
                            showHandoverButton ? (
                              <button
                                type="button"
                                onClick={() => this.handover(item)}
                                className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                                disabled={item.status.id === 1}
                              >
                                Handover
                              </button>
                            ) : null
                          ) : null}
                          {/* Invoicing */}
                          {showInvoiceButtons ? (
                            <span>
                              <button
                                type="button"
                                onClick={() => this.acceptPayment(item)}
                                className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                              >
                                Accept Payment
                              </button>
                              <button
                                type="button"
                                onClick={() => this.viewInvoice(item.id)}
                                className="uk-button uk-button-secondary uk-button-small uk-margin-small-right"
                              >
                                View Invoice
                              </button>
                            </span>
                          ) : null}
                        </span>
                      </td>
                    </tr>
                    <input
                      type="checkbox"
                      className="collapsible_toggle"
                      id={`collapsible_toggle_${index}`}
                    />
                    <tr className="tr-content">
                      <td colSpan={7}>
                        {item.description ? (
                          <div className="uk-width-1-1 uk-margin-small-bottom">
                            <span className="uk-text-muted">
                              {item.description}
                            </span>
                          </div>
                        ) : null}
                        <div className="uk-width-1-1">
                          {item.jobs && item.jobs.length
                            ? item.jobs.map((job, index) => (
                                <li key={`quickview_job_item_${index}`}>
                                  {jobTypes.map(item => {
                                    // eslint-disable-next-line
                                    return item.id == job.type
                                      ? item.type
                                      : null;
                                  })}
                                  {jobFeatures && jobFeatures.length
                                    ? jobFeatures.map(item => {
                                        // eslint-disable-next-line
                                        return item.id == job.feature
                                          ? ` with ${item.feature}`
                                          : null;
                                      })
                                    : null}
                                  {jobStatuses && jobStatuses.length
                                    ? jobStatuses.map(
                                        j =>
                                          j.id === job.status ? (
                                            <span className="uk-text-primary">
                                              {` - ${j.status}`}
                                            </span>
                                          ) : null
                                      )
                                    : null}
                                </li>
                              ))
                            : "There are no jobs in this order yet!"}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })
            ) : (
              <tbody>
                <tr>
                  <td colSpan={7}>
                    <span className="uk-padding">
                      <div className="uk-text-center">
                        Nothing here!<br />
                        <div className="uk-text-meta uk-margin-small-top">
                          Looking for something? Try using more specific
                          keywords.
                        </div>
                      </div>
                    </span>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
        {/* Pagination */}
        <div className="uk-width-1-1 uk-flex uk-flex-right">
          <ul className="uk-pagination uk-margin-top">
            <li className="uk-disabled">
              <a href="#1">Previous</a>
            </li>
            <li className="uk-active">
              <a href="#1">1</a>
            </li>
            <li>
              <a href="#2">2</a>
            </li>
            <li>
              <a href="#3">3</a>
            </li>
            <li>
              <a href="#4">Next</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// Default Props
OrdersList.defaultProps = {
  data: [],
  jobTypes: [],
  jobFeatures: [],
  jobStatuses: [],
  jobQualities: [],
  showHandoverButton: false,
  showActionButtons: true,
  showInvoiceButtons: false,
  showPriorityIcon: true
};

// Exports
export default withRouter(OrdersList);
