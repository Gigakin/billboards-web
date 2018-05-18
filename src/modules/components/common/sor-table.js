/*
  Componnet: SorTable
  Props: columns (array)
         data (array)
*/

// Modules
import React from "react";

// Classes
class SorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredList: props.data
    };
  }

  // Filter Table Data
  filterData = event => {
    let query = event.target.value;
    let { data } = this.props;
    if (!query) return false;
  };

  componentWillReceiveProps(props) {
    if (props.data !== this.props.data) {
      // Assign new list data to component
      return this.setState({ filteredList: props.data });
    }
  }

  render() {
    let { columns, data } = this.props;
    return (
      <div className="sor-table">
        {/* Actions */}
        <div className="sor-table__actions">
          <div className="uk-grid uk-grid-small uk-form-stacked">
            <div className="uk-width-1-3">
              <label className="uk-form-label">Search by Party Name</label>
              <div className="uk-form-controls">
                <input
                  type="text"
                  id="searchPartyName"
                  onChange={this.filterData}
                  className="uk-input"
                />
              </div>
            </div>
            <div className="uk-width-1-3">
              <label className="uk-form-label">Search by Job Name</label>
              <div className="uk-form-controls">
                <input
                  type="text"
                  id="searchJobName"
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
          <table className="uk-table uk-table-divider">
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
              {data && data.length ? (
                data.map((item, index) => (
                  <tr key={`sortable_item_${index}`}>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td>Table Data</td>
                    <td>Table Data</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length}>
                    <span className="uk-padding">
                      <div className="uk-text-center">
                        There are no orders to show right now.<br />
                        Use the <code>Create New Order</code> option from
                        sidebar to create a new order
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
SorTable.defaultProp = {
  columns: {},
  data: []
};

// Exports
export default SorTable;
