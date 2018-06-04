// Modules
import Axios from "./http-interceptors";
import decode from "jwt-decode";

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
  let token = StorageService.getLocalData("access_token");
  if (token && !isTokenExpired(token)) return true;
  return false;
};

// Is Token Expired
const isTokenExpired = token => {
  if (token) {
    token = decode(token);
    if (token.exp < Date.now() / 1000) return true;
  }
  return false;
};

// Exports
export default {
  login,
  logout,
  isLoggedIn
};
