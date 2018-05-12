// Modules
import StorageService from "./storage-service";

// Login
const login = credentials => {
  return StorageService.setLocalData("isLoggedIn", true);
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
