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
    this.state = {
      permissions: {},
      tableData: props.data,
      currentPage: 0
    };
    this.pageSize = 10;
    this.originalList = Methods.clone(props.data);
    this.filteredList = [];
  }

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
        query = query.toLowerCase();
        if (item[filterBy].toLowerCase().includes(query)) {
          return this.filteredList.push(item);
        }
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
      // Update state data for table
      this.originalList = Methods.clone(props.data);
      return this.setState({ tableData: props.data });
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
              <div className="uk-width-1-1">
                <div className="uk-text-lead uk-margin-bottom">Search</div>
              </div>
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
                    onChange={this.filterData}
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
                    onChange={this.filterData}
                    className="uk-select"
                    autoComplete="off"
                  >
                    <option defaultChecked />
                    <option value="1">Draft</option>
                    <option value="2">In Progress</option>
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
                    onChange={this.filterData}
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
                    onChange={this.filterData}
                    className="uk-select"
                    autoComplete="off"
                  >
                    <option defaultChecked />
                    <option value="1">Normal</option>
                    <option value="2">High</option>
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
          <table className="uk-table uk-table-middle uk-table-divider">
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
                    <tr key={`sortable_item_${index}`}>
                      {showPriorityIcon ? (
                        <td>
                          {item.isHighPriority ? (
                            <span className="uk-text-danger" uk-icon="bolt" />
                          ) : null}
                        </td>
                      ) : null}
                      <td>{item.id ? item.id : "-"}</td>
                      <td>{item.name ? item.name : "-"}</td>
                      <td>{item.party ? item.party.name : "-"}</td>
                      <td>{item.owner ? item.owner.owner : "-"}</td>
                      <td>{item.status ? item.status.status : "-"}</td>
                      <td>
                        <span>
                          {showActionButtons ? (
                            <span>
                              {/* Edit Order Details */}
                              {permissions.canEditOrderDetails ? (
                                <button
                                  type="button"
                                  onClick={() => this.editOrder(item)}
                                  className="uk-button uk-button-secondary uk-button-small uk-margin-small-right"
                                  disabled={item.status.id !== 1}
                                >
                                  Edit
                                </button>
                              ) : null}

                              {/* Start Design */}
                              {permissions.canStartDesign ? (
                                <button
                                  type="button"
                                  onClick={() => this.startDesigning(item.id)}
                                  className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                                >
                                  Start Designing
                                </button>
                              ) : null}

                              {/* Start Print */}
                              {permissions.canStartPrinting ? (
                                <button
                                  type="button"
                                  onClick={() => this.startPrinting(item.id)}
                                  className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
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
                  <td colSpan={columns.length}>
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
