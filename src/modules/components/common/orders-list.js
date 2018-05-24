/*
  Component: Orders List
  Props: columns (array)
         data (array)
*/

// Modules
import React from "react";
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
  handover = itemid => {
    return console.log(itemid);
  };

  componentDidMount() {
    let role = PermissionService.getRole();
    let permissions = PermissionService.getPermissions(role);
    if (permissions) return this.setState({ permissions: permissions });
    return;
  }

  render() {
    let { tableData, permissions } = this.state;
    let { columns, showActionButtons, showHandoverButton } = this.props;

    return (
      <div className="sor-table">
        {/* Actions */}
        <div className="uk-card uk-card-default uk-margin-bottom uk-padding">
          <div className="sor-table__actions">
            <div className="uk-grid uk-grid-small uk-form-stacked">
              <div className="uk-width-1-3">
                <label className="uk-form-label uk-text-bold">
                  Search by Party Name
                </label>
                <div className="uk-form-controls">
                  <input
                    id="party"
                    type="text"
                    onChange={this.filterData}
                    className="uk-input"
                  />
                </div>
              </div>
              <div className="uk-width-1-3">
                <label className="uk-form-label uk-text-bold">
                  Search by Job Name
                </label>
                <div className="uk-form-controls">
                  <input
                    id="job"
                    type="text"
                    onChange={this.filterData}
                    className="uk-input"
                  />
                </div>
              </div>
              <div className="uk-width-1-3">
                <label className="uk-form-label uk-text-bold">
                  Search by Job Status
                </label>
                <div className="uk-form-controls">
                  <select
                    id="searchJobStatus"
                    onChange={this.filterData}
                    className="uk-select"
                  >
                    <option defaultChecked />
                    <option value="assigned">Assigned</option>
                    <option value="unassigned">Un-assigned</option>
                  </select>
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
                {columns && columns.length
                  ? columns.map((item, index) => (
                      <th key={`tableheading_${index}`}>{item}</th>
                    ))
                  : null}
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.length ? (
                tableData.map((item, index) => (
                  <tr key={`sortable_item_${index}`}>
                    <td>{item ? item.party : "-"}</td>
                    <td>{item ? item.job : "-"}</td>
                    <td>{item ? item.size : "-"}</td>
                    <td>{item ? item.assignedTo : "-"}</td>
                    <td>{item ? item.status : "-"}</td>
                    <td>
                      <span>
                        {showActionButtons ? (
                          <span>
                            {/* View Order Details */}
                            {permissions.canViewOrderDetails ? (
                              <button
                                type="button"
                                onClick={this.viewOrder}
                                className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                              >
                                View
                              </button>
                            ) : null}
                            {/* Edit Order Details */}
                            {permissions.canEditOrderDetails ? (
                              <button
                                type="button"
                                onClick={this.editOrder}
                                className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                              >
                                Edit
                              </button>
                            ) : null}
                            {/* Delete Order */}
                            {permissions.canDeleteOrder ? (
                              <button
                                type="button"
                                onClick={this.deleteOrder}
                                className="uk-button uk-button-danger uk-button-small uk-margin-small-right"
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
                              onClick={() => this.handover(item.id)}
                              className="uk-button uk-button-primary uk-button-small uk-margin-small-right"
                            >
                              Handover
                            </button>
                          ) : null
                        ) : null}
                      </span>
                    </td>
                  </tr>
                ))
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
  showActionButtons: true
};

// Exports
export default OrdersList;
