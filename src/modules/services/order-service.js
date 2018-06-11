// Modules
import Axios from "./http-interceptors";
import Constants from "../constants";

// Get Orders
let getOrders = () => {
  return Axios.get(`${Constants.URLS.PATHS.ORDERS}`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Get Order by ID
let getOrderById = orderid => {
  return Axios.get(`${Constants.URLS.PATHS.ORDERS}/${orderid}`).then(
    response => {
      if (response.data) return response.data;
      return response;
    }
  );
};

// Create Order
let createOrder = orderdetails => {
  return Axios.post(`${Constants.URLS.PATHS.ORDERS}`, orderdetails).then(
    response => {
      if (response.data) return response.data;
      return response;
    }
  );
};

// Edit Order
let editOrder = (orderid, patch) => {
  return Axios.patch(`${Constants.URLS.PATHS.ORDERS}/${orderid}`, patch).then(
    response => {
      if (response.data) return response.data;
      return response;
    }
  );
};

// Delete Order
let deleteOrder = orderid => {
  return Axios.delete(`${Constants.URLS.PATHS.ORDERS}/${orderid}`).then(
    response => {
      if (response.data) return response.data;
      return response;
    }
  );
};

// Exports
export default {
  getOrders,
  getOrderById,
  createOrder,
  editOrder,
  deleteOrder
};