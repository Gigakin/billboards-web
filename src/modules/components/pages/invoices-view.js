// Modules
import React from "react";
import { Link } from "react-router-dom";

// Classes
class ViewInvoice extends React.Component {
  showPrintModal = () => {
    let printContent = document.getElementById("invoice");
    let printWindow = window.open();
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write(`<link rel="stylesheet" href="${window.location.origin}/assets/css/app.min.css" />`);
    printWindow.document.write("<style>html { overflow: scroll }</style>");
    printWindow.document.close();
  };

  render() {
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
                            <strong>Invoice #:</strong> ABC123
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
                            <strong>State:</strong> Maharashtra
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
                            <strong>Bill to Party:</strong> Ajay Khanna
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Billing Address:</strong> 901, Oceanic Drive
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>GSTIN:</strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>State:</strong> Goa
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
                      <th>#</th>
                      <th>Product/Service Description</th>
                      <th>HSN/SA Code</th>
                      <th>UOM</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Amount</th>
                      <th>Discount</th>
                      <th>Taxable Amount</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Some description</td>
                      <td>X126</td>
                      <td>cms</td>
                      <td>1</td>
                      <td>₹1250</td>
                      <td>₹1250</td>
                      <td>₹45</td>
                      <td>₹60</td>
                      <td>₹1265</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Some description</td>
                      <td>X126</td>
                      <td>cms</td>
                      <td>1</td>
                      <td>₹1250</td>
                      <td>₹1250</td>
                      <td>₹45</td>
                      <td>₹60</td>
                      <td>₹1265</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Some description</td>
                      <td>X126</td>
                      <td>cms</td>
                      <td>1</td>
                      <td>₹1250</td>
                      <td>₹1250</td>
                      <td>₹45</td>
                      <td>₹60</td>
                      <td>₹1265</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Some description</td>
                      <td>X126</td>
                      <td>cms</td>
                      <td>1</td>
                      <td>₹1250</td>
                      <td>₹1250</td>
                      <td>₹45</td>
                      <td>₹60</td>
                      <td>₹1265</td>
                    </tr>
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
                      <td className="uk-text-bold uk-text-primary">₹5060</td>
                    </tr>
                    {/* Static */}
                    <tr>
                      <td className="uk-text-small" colSpan="4">
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
                      <td className="uk-text-small" rowSpan="5" colSpan="4" />
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
      </div>
    );
  }
}

// Exports
export default ViewInvoice;
