/*
  Component: Orders List
  Props: columns (array)
         data (array)
*/

// Modules
import React from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert";

// Assets
import Methods from "../../methods";

// Services
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
      tableData: rearrangedOrders,
      currentPage: 0
    };
    this.pageSize = 10;
    this.originalList = Methods.clone(rearrangedOrders);
    this.filteredList = [];
  }

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

  componentDidMount() {
    // Get permissions
    let role = PermissionService.getRole();
    let permissions = PermissionService.getPermissions(role);
    if (permissions) return this.setState({ permissions: permissions });
    return;
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
    let { tableData, permissions } = this.state;
    let {
      columns,
      showActionButtons,
      showHandoverButton,
      showPriorityIcon
    } = this.props;

    return (
      <div className="sor-table">
        {/* Actions */}
        <div className="uk-card uk-card-default uk-margin-bottom uk-padding">
          <div className="sor-table__actions">
            <div className="uk-grid uk-grid-small uk-form-stacked">
              <div className="uk-width-1-6">
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
              <div className="uk-width-1-6">
                <label className="uk-form-label uk-text-bold">Party Name</label>
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
              <div className="uk-width-1-6">
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
                  </select>
                </div>
              </div>
              <div className="uk-width-1-6">
                <label className="uk-form-label uk-text-bold">
                  Account Owner
                </label>
                <div className="uk-form-controls">
                  <input
                    id="owner"
                    type="text"
                    onChange={this.filterDataByAccountOwner}
                    className="uk-input"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="uk-width-1-6">
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
              <div className="uk-width-1-6">
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
        {/* Table */}
        <div className="sor-table__table">
          <table className="uk-table uk-table-middle uk-table-striped uk-table-divider">
            <thead>
              <tr>
                {showPriorityIcon ? <th /> : null}
                {columns && columns.length
                  ? columns.map((item, index) => (
                      <th key={`tableheading_${index}`}>{item}</th>
                    ))
                  : null}
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.length ? (
                tableData.map((item, index) => {
                  return (
                    <tr key={`sortable_item_${index}`} className="is-link">
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
                              {/* Add Jobs/Review Order Details */}
                              <button
                                type="button"
                                onClick={() => this.editOrder(item)}
                                className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                                disabled={item.status.id !== 1}
                              >
                                {permissions.canEditOrderDetails
                                  ? "Add Jobs"
                                  : "Review"}
                              </button>

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
                              >
                                Handover
                              </button>
                            ) : null
                          ) : null}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length + 1}>
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
              )}
            </tbody>
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
  columns: {},
  showHandoverButton: false,
  showActionButtons: true,
  showPriorityIcon: true
};

// Exports
export default withRouter(OrdersList);
