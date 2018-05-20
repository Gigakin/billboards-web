/*
  Component: Bills Table
  Props: columns (array)
         data (array)
*/

// Modules
import React from "react";
import { withRouter } from "react-router-dom";
import Methods from "../../methods";

// Classes
class BillsTable extends React.Component {
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

  // View Bill
  viewBill = billid => {
    if (billid) return this.props.history.push(`/bills/${billid}`);
  };

  // Send Reminder
  sendReminder = billid => {
    if (billid) return console.log(`Reminder sent for Bill #${billid}`);
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
              <label className="uk-form-label">Search by Billing Status</label>
              <div className="uk-form-controls">
                <select
                  id="searchJobStatus"
                  onChange={this.filterData}
                  className="uk-select"
                >
                  <option defaultChecked />
                  <option value="ready">Ready for Billing</option>
                  <option value="waitlisted">Waiting for Pickup</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="sor-table__table">
          <table className="uk-table uk-table-middle uk-table-striped uk-table-divider">
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
                    <td>{item.id}</td>
                    <td>{item.party}</td>
                    <td>{item.job}</td>
                    <td>{item.date ? item.date : "1/1/2000"}</td>
                    <td>
                      <span>
                        <button
                          type="button"
                          title="View and Edit Details"
                          onClick={() => this.viewBill(item.id)}
                          className="uk-icon-button uk-text-primary uk-margin-small-right"
                          uk-icon="pencil"
                        />
                        <button
                          type="button"
                          title="Send Reminder"
                          onClick={() => this.sendReminder(item.id)}
                          className="uk-icon-button uk-text-primary uk-margin-small-right"
                          uk-icon="mail"
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
      </div>
    );
  }
}

// Default Props
BillsTable.defaultProp = {
  columns: {},
  data: []
};

// Exports
export default withRouter(BillsTable);
