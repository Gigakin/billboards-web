// Modules
import React from "react";
import { Link } from "react-router-dom";

// Assets
import Methods from "../../methods";

// Components
import Notification from "../common/notification";

// Services
import OrderService from "../../services/order-service";
import JobService from "../../services/job-service";

// Classes
class ViewInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      party: null,
      jobTypes: [],
      jobFeatures: [],
      jobMeasurements: [],
      jobQualities: []
    };
  }

  // Get Order Details
  getOrderDetails = orderid => {
    OrderService.getOrderById(orderid).then(
      details => {
        return this.setState({
          order: details,
          party: details.party
        });
      },
      error => {
        return Notification.Notify({
          text: "Failed to get order details. Please try again!",
          type: "error"
        });
      }
    );
  };

  // Get Job Types
  getJobTypes = () => {
    JobService.getJobTypes().then(
      jobtypes => this.setState({ jobTypes: jobtypes }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of job types",
          type: "error"
        });
      }
    );
  };

  // Get Job Features
  getJobFeatures = () => {
    JobService.getJobFeatures().then(
      jobfeatures => this.setState({ jobFeatures: jobfeatures }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of job features",
          type: "error"
        });
      }
    );
  };

  // Get Job Uoms
  getJobUoms = () => {
    JobService.getJobUoms().then(
      uoms => this.setState({ jobMeasurements: uoms }),
      error => {
        return Notification.Notify({
          text: "Failed to get list of measurement units",
          type: "error"
        });
      }
    );
  };

  // Show Printing Modal
  showPrintModal = () => {
    let printContent = document.getElementById("invoice");
    let printWindow = window.open();
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write(
      `<link rel="stylesheet" href="${
        window.location.origin
      }/assets/css/app.min.css" />`
    );
    printWindow.document.write("<style>html { overflow: scroll }</style>");
    printWindow.document.close();
  };

  componentDidMount() {
    let { match } = this.props;
    if (match.params.orderid) {
      this.getJobTypes();
      this.getJobFeatures();
      this.getJobUoms();
      this.getOrderDetails(match.params.orderid);
    }
  }

  render() {
    let { order, party, jobTypes, jobFeatures, jobMeasurements } = this.state;

    return (
      <div className="lists">
        {/* Header */}
        <div className="lists__header">
          <div className="uk-width-1-1 uk-flex uk-flex-between">
            {/* Breadcrumbs */}
            <ul className="breadcrumbs">
              <Link to="/dashboard" className="breadcrumbs__item">
                <span uk-icon="home" />
              </Link>
              <Link to="/invoices" className="breadcrumbs__item">
                Invoice Management
              </Link>
              <Link to="#" className="breadcrumbs__item">
                View Invoice
              </Link>
            </ul>

            {/* Actions */}
            <div>
              <button
                type="button"
                className="uk-button uk-button-primary"
                onClick={this.showPrintModal}
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {order ? (
          <div className="lists__content">
            <div className="invoice" id="invoice">
              <div className="invoice__header">
                <div className="invoice__header__element invoice__logo">
                  Company logo
                </div>
                <div className="invoice__header__element invoice__logo__text">
                  <div className="uk-text-lead uk-text-bold">billboards</div>
                  <div className="uk-text-subtitle">
                    Beside Khare Town Post Office,<br />Dharampeth, Nagpur -
                    440025
                  </div>
                  <div className="uk-text-small uk-margin-small-top">
                    <span>Tel: 712-6618186, 6618187</span>
                    <br />
                    <span>GSTIN: XXXXXXXXXXXXXXXX</span>
                  </div>
                </div>
                <div className="invoice__header__element invoice__space" />
              </div>
              <div className="invoice__about">
                <div className="invoice__about__element invoice__title">
                  Tax Invoice
                </div>
                <div className="invoice__about__element invoice__details">
                  <div className="uk-grid">
                    <div className="uk-width-1-2 invoice__details__border-right">
                      <table className="uk-table uk-table-small uk-table-divider uk-text-left uk-text-small">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Invoice #:</strong> {order.id}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Invoice Date:</strong> 12th March, 2018
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Reverse Charge (Y/N):</strong>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>State:</strong> {party.state}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="uk-width-1-2 uk-padding-remove">
                      <table className="uk-table uk-table-small uk-table-divider uk-text-left uk-text-small">
                        <tbody>
                          <tr>
                            <td>
                              <strong>Bill to Party:</strong>{" "}
                              {party.contact_person}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Billing Address:</strong>{" "}
                              {party.address_line_1
                                ? `${party.address_line_1}, `
                                : null}
                              {party.city ? `${party.city}, ` : null}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>GSTIN:</strong>{" "}
                              {party.gstin ? party.gstin : "Not available"}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>State:</strong>{" "}
                              {party.postal_code ? party.postal_code : "-"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice__content">
                <div className="invoice__content__element invoice__particulars__title">
                  Particulars
                </div>
                <div className="invoice__content__element invoice__particulars__table">
                  <table className="uk-table uk-table-small uk-table-divider uk-table-middle uk-text-left">
                    <thead>
                      <tr>
                        <th colSpan="9" />
                        <th colSpan="2" className="uk-text-center">
                          CGST
                        </th>
                        <th colSpan="2" className="uk-text-center">
                          SGST
                        </th>
                        <th />
                      </tr>
                      <tr>
                        <th>#</th>
                        <th>Product/Service Description</th>
                        <th>HSN/SA Code</th>
                        <th>Size</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Discount</th>
                        <th>Taxable Amount</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.jobs && order.jobs.length
                        ? order.jobs.map((job, index) => (
                            <tr key={`invoice_item_${index}`}>
                              <td>{index + 1}</td>
                              <td>
                                {jobTypes.map(item => {
                                  // eslint-disable-next-line
                                  return item.id == job.type ? item.type : null;
                                })}
                                {jobFeatures && jobFeatures.length
                                  ? jobFeatures.map(item => {
                                      // eslint-disable-next-line
                                      return item.id == job.feature
                                        ? ` with ${item.feature}`
                                        : null;
                                    })
                                  : null}
                              </td>
                              <td>
                                {jobTypes.map(item => {
                                  return item.id === job.type
                                    ? item.hsn_code
                                    : null;
                                })}
                              </td>
                              <td>
                                {job.sizeUnits
                                  ? jobMeasurements.map(
                                      size =>
                                        // eslint-disable-next-line
                                        size.id == job.sizeUnits
                                          ? (
                                              Methods.calculateSqFt(
                                                job.sizeWidth,
                                                size.unit
                                              ) *
                                              Methods.calculateSqFt(
                                                job.sizeHeight,
                                                size.unit
                                              )
                                            ).toFixed(2) + " sq.ft."
                                          : null
                                    )
                                  : "-"}
                              </td>
                              <td>{job.quantity ? job.quantity : "-"}</td>
                              <td>
                                {job.rate && job.rate.charge
                                  ? `₹${job.rate.charge}`
                                  : null}
                              </td>
                              <td>
                                {job.rate && job.rate.charge
                                  ? `₹${Math.ceil(
                                      parseFloat(job.rate.charge) *
                                        parseInt(job.quantity) *
                                        parseFloat(job.totalSizeInSqFt)
                                    ).toFixed(2)}`
                                  : null}
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="uk-input"
                                  onChange={event =>
                                    this.calculateDiscount(event, index)
                                  }
                                  value={0}
                                  required
                                />
                              </td>
                              <td>₹60</td>
                              <td>₹45</td>
                              <td>₹60</td>
                              <td>₹45</td>
                              <td>₹60</td>
                              <td>₹1265</td>
                            </tr>
                          ))
                        : null}
                      {/* Static */}
                      <tr>
                        <td className="uk-text-lead" colSpan="4">
                          Total
                        </td>
                        <td className="uk-text-bold">4</td>
                        <td className="uk-text-bold">₹5000</td>
                        <td className="uk-text-bold">₹5000</td>
                        <td className="uk-text-bold">₹180</td>
                        <td className="uk-text-bold">₹240</td>
                        <td className="uk-text-bold">₹180</td>
                        <td className="uk-text-bold">₹240</td>
                        <td className="uk-text-bold">₹180</td>
                        <td className="uk-text-bold">₹240</td>
                        <td className="uk-text-bold uk-text-primary">₹5060</td>
                      </tr>
                      {/* Static */}
                      <tr>
                        <td className="uk-text-small" colSpan="9">
                          Total amount in words
                        </td>
                        <td className="uk-text-small" colSpan="4">
                          Total amount before Tax
                        </td>
                        <td className="uk-text-small" colSpan="2">
                          ₹
                        </td>
                      </tr>
                      {/* Static */}
                      <tr>
                        <td className="uk-text-small" rowSpan="5" colSpan="9" />
                        <td className="uk-text-small" colSpan="4">
                          Add: CGST
                        </td>
                        <td className="uk-text-small" colSpan="2">
                          ₹
                        </td>
                      </tr>
                      <tr>
                        <td className="uk-text-small" colSpan="4">
                          Add: SGST
                        </td>
                        <td className="uk-text-small" colSpan="2">
                          ₹
                        </td>
                      </tr>
                      <tr>
                        <td className="uk-text-small" colSpan="4">
                          Total Tax Amount
                        </td>
                        <td className="uk-text-small" colSpan="2">
                          ₹
                        </td>
                      </tr>
                      <tr>
                        <td className="uk-text-small" colSpan="4">
                          Total Amount after Tax
                        </td>
                        <td className="uk-text-small" colSpan="2">
                          ₹
                        </td>
                      </tr>
                      <tr>
                        <td className="uk-text-small" colSpan="4">
                          GST after Reverse Charge
                        </td>
                        <td className="uk-text-small" colSpan="2">
                          ₹
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="invoice__footer" />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

// Exports
export default ViewInvoice;
