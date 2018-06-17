// Modules
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Notifier
const Notify = options => {
  let { type, text } = options;
  if (!text) text = "Forgot to add text?";
  if (!type) type = "success";
  type = type.toLowerCase();
  return toast[type](text);
};

// Classes
class Container extends React.Component {
  render() {
    return <ToastContainer position={"top-right"} {...this.props} />;
  }
}

// Exports
export default { Container, Notify };
