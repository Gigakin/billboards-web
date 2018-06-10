// Modules
import Axios from "./http-interceptors";
import Constants from "../constants";

// Get Party By Phone
let getPartyByPhone = phonenumber => {
  return Axios.post(`${Constants.URLS.PATHS.PARTIES}/phone`, {
    phone: phonenumber
  }).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Exports
export default { getPartyByPhone };
