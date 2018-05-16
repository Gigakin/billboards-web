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
          <input
            type="text"
            className="uk-input uk-width-medium"
            onChange={this.filterData}
            placeholder="Search"
          />
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
              <tr>
                <td>Table Data</td>
                <td>Table Data</td>
                <td>Table Data</td>
                <td>Table Data</td>
                <td>Table Data</td>
              </tr>
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
