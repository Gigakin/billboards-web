// Modules
import React from "react";

// Datepicker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Classes
class CustomDatePicker extends React.Component {
  render() {
    return <DatePicker {...this.props} />;
  }
}

// Exports
export default CustomDatePicker;
