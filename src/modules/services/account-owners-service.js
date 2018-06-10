// Modules
import Axios from "./http-interceptors";
import Constants from "../constants";

// Get Account Owners
let getAccountOwners = () => {
  return Axios.get(Constants.URLS.PATHS.ACCOUNT_OWNERS).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Exports
export default { getAccountOwners };
