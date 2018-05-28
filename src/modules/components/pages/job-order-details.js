// Modules
import React from "react";
import { Link } from "react-router-dom";

// Services
import PermissionService from "../../services/permission-service";

// Classes
class JobOrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: {}
    };
  }

  // Back to List
  backToList = event => {
    event.preventDefault();
    return this.props.history.push("/orders");
  };

  // Complete Ordeer
  completeOrder = event => {
    event.preventDefault();
    return this.props.history.push("/orders");
  };

  componentDidMount() {
    let role = PermissionService.getRole();
    let permissions = PermissionService.getPermissions(role);
    if (permissions) return this.setState({ permissions: permissions });
    return false;
  }

  render() {
    let { permissions } = this.state;
    return (
      <div className="lists">
        <div className="uk-grid">
          {/* Header */}
          <div className="uk-width-1-1 uk-margin-bottom">
            <div className="lists__header">
              <div className="uk-width-1-1">
                <ul className="breadcrumbs">
                  <Link to="/dashboard" className="breadcrumbs__item">
                    <span uk-icon="home" />
                  </Link>
                  <Link to="/orders" className="breadcrumbs__item">
                    Order Management
                  </Link>
                  <Link to="#" className="breadcrumbs__item">
                    Order Details
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="uk-width-2-3">
            <div className="order-details">
              {/* Order Details */}
              <div className="order-details__header">
                <div className="uk-text-lead">Soundcloud</div>
                <div className="uk-text-subtitle">Waylin Zack</div>
              </div>
              <div className="order-details__jobs-list">
                <div className="order-details__jobs-list__item">
                  <div className="uk-text-lead order-details__jobs-list__item__title">
                    Vinyl
                  </div>
                  <div className="uk-grid uk-grid-small uk-margin-small">
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Type : </span>
                      <span className="uk-text-small uk-text-primary">
                        Vinyl
                      </span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Quality : </span>
                      <span className="uk-text-small uk-text-primary">
                        Transparent
                      </span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Quantity : </span>
                      <span className="uk-text-small uk-text-primary">2</span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Dimensions : </span>
                      <span className="uk-text-small uk-text-primary">
                        120 x 165 sq. ft.
                      </span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Other Features : </span>
                      <span className="uk-text-small uk-text-primary">
                        Foamsheet Pasting
                      </span>
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-margin-top">
                    <div className="uk-flex uk-flex-between">
                      {/* Downloads */}
                      <div className="uk-flex">
                        {permissions.canDownloadCustomerDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-download" /> Download Customer
                            Design File
                          </button>
                        ) : null}
                        {permissions.canDownloadDesignerDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-download" /> Download Design
                            File
                          </button>
                        ) : null}
                        {permissions.canAttachDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-upload" /> Attach Design File
                          </button>
                        ) : null}
                        {permissions.canAttachPrintFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-upload" /> Attach REAP File
                          </button>
                        ) : null}
                      </div>

                      {/* Complete Job */}
                      <div className="uk-flex">
                        {permissions.canSendForPrinting ? (
                          <button className="uk-button uk-button-small uk-button-secondary">
                            <span uk-icon="check" /> Designing Complete
                          </button>
                        ) : null}
                        {permissions.canMarkAsPrintingDone ? (
                          <button className="uk-button uk-button-small uk-button-secondary">
                            <span uk-icon="check" /> Printing Complete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-details__jobs-list__item">
                  <div className="uk-text-lead order-details__jobs-list__item__title">
                    Indoor
                  </div>
                  <div className="uk-grid uk-grid-small uk-margin-small">
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Type : </span>
                      <span className="uk-text-small uk-text-primary">
                        Indoor
                      </span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Quality : </span>
                      <span className="uk-text-small uk-text-primary">Eco</span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Quantity : </span>
                      <span className="uk-text-small uk-text-primary">2</span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Dimensions : </span>
                      <span className="uk-text-small uk-text-primary">
                        120 x 165 sq. ft.
                      </span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Other Features : </span>
                      <span className="uk-text-small uk-text-primary">
                        Matte Lamination
                      </span>
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-margin-top">
                    <div className="uk-flex uk-flex-between">
                      {/* Downloads */}
                      <div className="uk-flex">
                        {permissions.canDownloadCustomerDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-download" /> Download Customer
                            Design File
                          </button>
                        ) : null}
                        {permissions.canDownloadDesignerDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-download" /> Download Design
                            File
                          </button>
                        ) : null}
                        {permissions.canAttachDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-upload" /> Attach Design File
                          </button>
                        ) : null}
                        {permissions.canAttachPrintFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-upload" /> Attach REAP File
                          </button>
                        ) : null}
                      </div>

                      {/* Complete Job */}
                      <div className="uk-flex">
                        {permissions.canSendForPrinting ? (
                          <button className="uk-button uk-button-small uk-button-secondary">
                            <span uk-icon="check" /> Designing Complete
                          </button>
                        ) : null}
                        {permissions.canMarkAsPrintingDone ? (
                          <button className="uk-button uk-button-small uk-button-secondary">
                            <span uk-icon="check" /> Printing Complete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-details__jobs-list__item">
                  <div className="uk-text-lead order-details__jobs-list__item__title">
                    Front-lit
                  </div>
                  <div className="uk-grid uk-grid-small uk-margin-small">
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Type : </span>
                      <span className="uk-text-small uk-text-primary">
                        Front-lit
                      </span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Quality : </span>
                      <span className="uk-text-small uk-text-primary">
                        Banner
                      </span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Quantity : </span>
                      <span className="uk-text-small uk-text-primary">2</span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Dimensions : </span>
                      <span className="uk-text-small uk-text-primary">
                        120 x 165 sq. ft.
                      </span>
                    </div>
                    <div className="uk-width-1-2">
                      <span className="uk-text-small">Other Features : </span>
                      <span className="uk-text-small uk-text-primary">
                        Framing
                      </span>
                    </div>
                  </div>
                  <div className="uk-width-1-1 uk-margin-top">
                    <div className="uk-flex uk-flex-between">
                      {/* Downloads */}
                      <div className="uk-flex">
                        {permissions.canDownloadCustomerDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-download" /> Download Customer
                            Design File
                          </button>
                        ) : null}
                        {permissions.canDownloadDesignerDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-download" /> Download Design
                            File
                          </button>
                        ) : null}
                        {permissions.canAttachDesignFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-upload" /> Attach Design File
                          </button>
                        ) : null}
                        {permissions.canAttachPrintFile ? (
                          <button className="uk-button uk-button-small uk-button-default uk-margin-small-right">
                            <span uk-icon="cloud-upload" /> Attach REAP File
                          </button>
                        ) : null}
                      </div>

                      {/* Complete Job */}
                      <div className="uk-flex">
                        {permissions.canSendForPrinting ? (
                          <button className="uk-button uk-button-small uk-button-secondary">
                            <span uk-icon="check" /> Designing Complete
                          </button>
                        ) : null}
                        {permissions.canMarkAsPrintingDone ? (
                          <button className="uk-button uk-button-small uk-button-secondary">
                            <span uk-icon="check" /> Printing Complete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-details__footer">
                <div className="uk-flex uk-flex-between">
                  <button
                    type="button"
                    className="uk-button uk-button-small uk-button-default"
                    onClick={this.backToList}
                  >
                    Back to List
                  </button>
                  {permissions.canCompleteOrder ? (
                    <button
                      type="button"
                      className="uk-button uk-button-small uk-button-primary"
                      onClick={this.completeOrder}
                    >
                      Complete Order
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="uk-width-1-3">
            <div className="order-details">
              <div className="order-details__header">
                <div className="uk-text-subtitle uk-margin-bottom">
                  Order Details
                </div>
                {/* Size */}
                <div className="uk-text-small uk-margin-small-bottom">
                  <strong>Total Size: </strong> 110sq. ft.
                </div>
                {/* Notes: Frontdesk */}
                {permissions.canSeeFrontdeskNotes ? (
                  <div className="uk-text-small uk-margin-small-bottom">
                    <strong>Notes from Frontdesk: </strong> Lorem ipsum dolor
                    sit amet consectetur, adipisicing elit. Quia et praesentium
                    modi dolore pariatur, mollitia doloribus. Repellendus rerum
                    suscipit, officiis et minus dolor consequatur inventore
                    pariatur excepturi tempore dolore odit.
                  </div>
                ) : null}
                {/* Notes: Designer */}
                {permissions.canSeeDesignerNotes ? (
                  <div className="uk-text-small uk-margin-small-bottom">
                    <strong>Notes from Designer: </strong> Lorem ipsum dolor sit
                    amet consectetur, adipisicing elit. Quia et praesentium modi
                    dolore pariatur, mollitia doloribus. Repellendus rerum
                    suscipit, officiis et minus dolor consequatur inventore
                    pariatur excepturi tempore dolore odit.
                  </div>
                ) : null}
                {/* Notes: Printer */}
                {permissions.canSeePrinterNotes ? (
                  <div className="uk-text-small uk-margin-small-bottom">
                    <strong>Notes from Printer: </strong> Lorem ipsum dolor sit
                    amet consectetur, adipisicing elit. Quia et praesentium modi
                    dolore pariatur, mollitia doloribus. Repellendus rerum
                    suscipit, officiis et minus dolor consequatur inventore
                    pariatur excepturi tempore dolore odit.
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Exports
export default JobOrderDetails;
