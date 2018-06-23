// Modules
import React from "react";

// Services
import PermissionService from "../../services/permission-service";

// Classes
class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: {}
    };
  }

  componentWillMount() {
    // Get Permisissions
    let role = PermissionService.getRole();
    let permissions = PermissionService.getPermissions(role);
    if (permissions) return this.setState({ permissions: permissions });
  }

  render() {
    let { permissions } = this.state;
    let {
      list,
      jobTypes,
      jobQualities,
      jobFeatures,
      sizeUnits,
      methods
    } = this.props;

    return (
      <div className="jobs-list">
        <table className="uk-table uk-table-middle uk-table-small uk-table-divider">
          <thead>
            <tr>
              <th className="uk-table-small" />
              <th className="uk-table-expand">Job Type</th>
              <th className="uk-table-small">Size</th>
              <th className="uk-table-small">Quantity</th>
              <th className="uk-table-small">Quality</th>
              <th className="uk-table-small">Feature</th>
              {permissions.canDeleteJobFromJobsList ? (
                <th className="uk-width-small">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {list && list.length ? (
              list.map((item, index) => (
                <tr key={`job_item_${index}`}>
                  <td>
                    {item.is_high_priority ? (
                      <span className="uk-text-danger" uk-icon="bolt" />
                    ) : null}
                  </td>
                  <td>
                    {jobTypes.map(
                      // eslint-disable-next-line
                      job => (job.id == item.type ? job.type : null)
                    )}
                  </td>
                  <td>
                    {item.sizeWidth} x {item.sizeHeight}{" "}
                    {item.sizeUnits
                      ? sizeUnits.map(
                          // eslint-disable-next-line
                          size => (size.id == item.sizeUnits ? size.unit : null)
                        )
                      : "-"}
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    {item.quality
                      ? jobQualities.map(
                          quality =>
                            // eslint-disable-next-line
                            quality.id == item.quality ? quality.quality : null
                        )
                      : "-"}
                  </td>
                  <td>
                    {item.quality
                      ? jobFeatures.map(
                          feature =>
                            // eslint-disable-next-line
                            feature.id == item.feature ? feature.feature : null
                        )
                      : "-"}
                  </td>
                  {permissions.canDeleteJobFromJobsList ? (
                    <td>
                      <button
                        type="button"
                        title="Delete"
                        onClick={() => methods.deleteItem(item.id)}
                        className="uk-icon-button uk-text-danger uk-margin-small-right"
                        uk-icon="trash"
                      />
                    </td>
                  ) : null}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
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
  jobTypes: [],
  jobQualities: [],
  jobFeatures: [],
  sizeUnits: [],
  methods: {}
};

// Exports
export default JobList;
