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

// Get Job Qualitites
let getJobQualities = () => {
  return Axios.get(`${Constants.URLS.PATHS.JOBS}/qualities`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Exports
export default { getJobTypes, getJobQualities };
