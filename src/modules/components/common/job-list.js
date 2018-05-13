// Modules
import React from "react";
import Swal from "sweetalert";

// Assets
import Methods from "../../methods";

// Classes
class JobList extends React.Component {
  // Delete Item
  deleteItem = itemid => {
    Swal({
      title: "Delete Job Item",
      text: "Are you sure you want to delete this job item from this order?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willdelete => {
      if (willdelete) return this.props.methods.deleteItem(itemid);
      return false;
    });
  };

  render() {
    let { list, methods } = this.props;
    return (
      <div className="job-list">
        {list && list.length ? (
          <table className="uk-table uk-table-small uk-table-divider">
            <thead>
              <tr>
                <th>Job Type</th>
                <th>Job Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={`job_item_${index}`}>
                  <td>{item.type ? Methods.capitalize(item.type) : "-"}</td>
                  <td>
                    {item.sizeWidth && item.sizeHeight && item.sizeUnits
                      ? `${item.sizeWidth} x ${item.sizeHeight} ${
                          item.sizeUnits
                        }`
                      : "-"}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => methods.editItem(index)}
                      className="uk-icon-button uk-text-primary uk-margin-small-right"
                      uk-icon="pencil"
                    />
                    <button
                      type="button"
                      onClick={() => this.deleteItem(index)}
                      className="uk-icon-button uk-text-danger uk-margin-small-right"
                      uk-icon="trash"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>
            There are no jobs to show right now.<br />
            Use the above <code>Job Types</code> section to add jobs in this
            order.
          </p>
        )}
      </div>
    );
  }
}

// Default Props
JobList.defaultProps = {
  list: [],
  methods: null
};

// Exports
export default JobList;
