// Modules
import React from "react";

// Assets
import Methods from "../../methods";

// Classes
class JobList extends React.Component {

  

  render() {
    let { list, types, methods } = this.props;
    return (
      <div className="jobs-list">
        <table className="uk-table uk-table-middle uk-table-small uk-table-divider">
          <thead>
            <tr>
              <th className="uk-table-expand">Job Type</th>
              <th className="uk-table-small">Job Size</th>
              <th className="uk-width-small">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length ? (
              list.map((item, index) => (
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
                      title="Edit Item"
                      onClick={() => methods.deleteItem(index)}
                      className="uk-icon-button uk-text-primary uk-margin-small-right"
                      uk-icon="pencil"
                    />
                    <button
                      type="button"
                      title="Delete"
                      onClick={() => methods.deleteItem(index)}
                      className="uk-icon-button uk-text-danger uk-margin-small-right"
                      uk-icon="trash"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  <span className="uk-padding">
                    <div className="uk-text-center">
                      There are no jobs in this order right now.<br />
                      Use the form on the left to add jobs in this order.
                    </div>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

// Default Props
JobList.defaultProps = {
  list: [],
  types: [],
  methods: null
};

// Exports
export default JobList;
