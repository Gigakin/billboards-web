/*
  Component: SorTable
  Props: columns (array)
         data (array)
*/

// Modules
import React from "react";
import Methods from "../../methods";

// Classes
class SorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    let { columns } = this.props;
    let { tableData } = this.state;
    return (
      <div className="sor-table">
        {/* Actions */}
        <div className="sor-table__actions">
          <div className="uk-grid uk-grid-small uk-form-stacked">
            <div className="uk-width-1-3">
              <label className="uk-form-label">Search by Party Name</label>
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
              <label className="uk-form-label">Search by Job Name</label>
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
              <label className="uk-form-label">Search by Job Status</label>
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
        {/* Table */}
        <div className="sor-table__table">
          <table className="uk-table uk-table-striped uk-table-divider">
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
                        <button
                          type="button"
                          title="View"
                          onClick={this.viewOrder}
                          className="uk-icon-button uk-text-primary uk-margin-small-right"
                          uk-icon="search"
                        />
                        <button
                          type="button"
                          title="Edit"
                          onClick={this.editOrder}
                          className="uk-icon-button uk-text-primary uk-margin-small-right"
                          uk-icon="pencil"
                        />
                        <button
                          type="button"
                          title="Delete"
                          onClick={this.deleteOrder}
                          className="uk-icon-button uk-text-danger uk-margin-small-right"
                          uk-icon="trash"
                        />
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
        <div className="uk-width-1-1 uk-flex uk-flex-center">
          <ul className="uk-pagination uk-margin-top">
            <li>
              <a href="#1">1</a>
            </li>
            <li>
              <a href="#2">2</a>
            </li>
            <li>
              <a href="#3">3</a>
            </li>
            <li>
              <a href="#4">4</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// Default Props
SorTable.defaultProp = {
  columns: {},
  data: []
};

// Exports
export default SorTable;
