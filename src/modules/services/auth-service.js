// Modules
import Axios from "./http-interceptors";

// Imports
import Constants from "../constants";

// Services
import StorageService from "./storage-service";

// Login
const login = credentials => {
  return Axios.post(`${Constants.URLS.PATHS.LOGIN}`, credentials).then(
    response => {
      if (response.data) return response.data;
      return response;
    }
  );
};

// Logout
const logout = credentials => {
  StorageService.clearLocalData();
  StorageService.clearSessionData();
  return true;
};

// Is Logged In
const isLoggedIn = () => {
  if (StorageService.getLocalData("isLoggedIn")) return true;
  return false;
};

// Exports
export default {
  login,
  logout,
  isLoggedIn
};
