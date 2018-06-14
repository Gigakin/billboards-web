// Modules
import Axios from "./http-interceptors";
import Constants from "../constants";

// Get Account Owners
let getJobTypes = () => {
  return Axios.get(Constants.URLS.PATHS.JOB_TYPES).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Exports
export default { getJobTypes };
