// Modules
import React from "react";

// Classes
class OrderList extends React.Component {
  render() {
    return (
      <div className="order-list">
        <table className="uk-table uk-table-small uk-table-divider">
          <thead>
            <tr>
              <th>Party Name</th>
              <th>Job Name</th>
              <th>Total Sq. Ft.</th>
              <th>Status</th>
              <th>Actions</th>
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
    );
  }
}

// Exports
export default OrderList;
