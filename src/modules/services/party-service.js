// Modules
import Axios from "./http-interceptors";
import Constants from "../constants";

// Get Parties
let getParties = () => {
  return Axios.get(`${Constants.URLS.PATHS.PARTIES}`).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Get Party By ID
let getPartyById = partyid => {
  return Axios.get(`${Constants.URLS.PATHS.PARTIES}/${partyid}`).then(
    response => {
      if (response.data) return response.data;
      return response;
    }
  );
};

// Get Party By Phone
let getPartyByPhone = phonenumber => {
  return Axios.post(`${Constants.URLS.PATHS.PARTIES}/phone`, {
    phone: phonenumber
  }).then(response => {
    if (response.data) return response.data;
    return response;
  });
};

// Add Party
let addParty = details => {
  return Axios.post(`${Constants.URLS.PATHS.PARTIES}`, details).then(
    response => {
      if (response.data) return response.data;
      return response;
    }
  );
};

// Exports
export default {
  getParties,
  getPartyById,
  getPartyByPhone,
  addParty
};
