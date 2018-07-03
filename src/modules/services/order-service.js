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

// Mark as In Progress
let markAsInProgress = orderid => {
  return Axios.post(`${Constants.URLS.PATHS.ORDERS}/${orderid}/status`, {
    status: 2
  }).then(response => {
    if (response.data) return response.data;
    return response.data;
  });
};

// Add Jobs
let addJobs = (orderid, jobs) => {
  return Axios.post(
    `${Constants.URLS.PATHS.ORDERS}/${orderid}/jobs`,
    jobs
  ).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Remove Jobs
let removeJob = (orderid, jobid) => {
  return Axios.delete(
    `${Constants.URLS.PATHS.ORDERS}/${orderid}/jobs/${jobid}`
  ).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Set Advance Amounts
let setAdvanceAmounts = (orderid, amounts) => {
  return Axios.post(
    `${Constants.URLS.PATHS.ORDERS}/${orderid}/jobs/advance`,
    amounts
  ).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Add customer design file
let addCustomerFile = (orderid, jobid, formdata) => {
  return Axios.post(
    `${Constants.URLS.PATHS.ORDERS}/${orderid}/jobs/${jobid}/files/customer`,
    formdata
  ).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Add designer design file
let addDesignerFile = (orderid, jobid, formdata) => {
  return Axios.post(
    `${Constants.URLS.PATHS.ORDERS}/${orderid}/jobs/${jobid}/files/designer`,
    formdata
  ).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Add printer design file
let addPrinterFile = (orderid, jobid, formdata) => {
  return Axios.post(
    `${Constants.URLS.PATHS.ORDERS}/${orderid}/jobs/${jobid}/files/printer`,
    formdata
  ).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Change Job Status
let changeJobStatus = (jobid, status) => {
  return Axios.post(`${Constants.URLS.PATHS.JOBS}/${jobid}/status`, {
    status: status
  }).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Handover Jobs
let handoverJobs = (orderid, jobslist) => {
  return Axios.post(
    `${Constants.URLS.PATHS.ORDERS}/${orderid}/jobs/handovers`,
    jobslist
  ).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Exports
export default {
  getOrders,
  getOrderById,
  createOrder,
  editOrder,
  deleteOrder,
  markAsInProgress,
  addJobs,
  removeJob,
  setAdvanceAmounts,
  addCustomerFile,
  addDesignerFile,
  addPrinterFile,
  changeJobStatus,
  handoverJobs
};
