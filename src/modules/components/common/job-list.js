// Modules
import React from "react";

// Classes
class JobList extends React.Component {
  render() {
    return (
      <div className="job-list">
        <table className="uk-table uk-table-small uk-table-divider">
          <thead>
            <tr>
              <th>Job Type</th>
              <th>Job Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
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
export default JobList;
