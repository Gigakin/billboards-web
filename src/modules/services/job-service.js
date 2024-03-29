// Modules
import Axios from "./http-interceptors";
import Constants from "../constants";

// Get Account Owners
let getJobTypes = () => {
  return Axios.get(`${Constants.URLS.PATHS.JOBS}/types`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Get Job Qualities
let getJobQualities = () => {
  return Axios.get(`${Constants.URLS.PATHS.JOBS}/qualities`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Get Job Features
let getJobFeatures = () => {
  return Axios.get(`${Constants.URLS.PATHS.JOBS}/features`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Get Job Uoms
let getJobUoms = () => {
  return Axios.get(`${Constants.URLS.PATHS.JOBS}/uoms`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Get Job Uoms
let getJobCharges = () => {
  return Axios.get(`${Constants.URLS.PATHS.JOBS}/charges`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Get Job Statuses
let getJobStatuses = () => {
  return Axios.get(`${Constants.URLS.PATHS.JOBS}/statuses`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Exports
export default {
  getJobTypes,
  getJobQualities,
  getJobFeatures,
  getJobUoms,
  getJobCharges,
  getJobStatuses
};
