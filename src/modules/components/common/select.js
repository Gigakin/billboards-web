// Modules
import React from "react";
import { Creatable } from "react-select";
import "react-select/dist/react-select.min.css";

// Classes
class CreatableSelect extends React.Component {
  render() {
    return <Creatable {...this.props} />;
  }
}

// Exports
export default CreatableSelect;
