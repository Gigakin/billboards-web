// Modules
import React from "react";

// Classes
class OrderList extends React.Component {
  render() {
    let { list } = this.props;
    return (
      <div className="order-list">
        {list && list.length ? (
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
        ) : (
          <span>
            There are no orders to show right now.<br />
            Use the <code>Create New Job Order</code> button to create new
            orders.
          </span>
        )}
      </div>
    );
  }
}

// Default Props
OrderList.defaultProps = {
  list: []
};

// Exports
export default OrderList;
