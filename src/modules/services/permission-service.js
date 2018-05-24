// Modules
import StorageService from "./storage-service";
import Permissions from "../stores/permissions";

// Get Role
const getRole = () => {
  return StorageService.getLocalData("role");
};

// Set Role
const setRole = role => {
  if (role) return StorageService.setLocalData("role", role);
};

// Get Permissions
const getPermissions = role => {
  if (role) return Permissions[role];
  return {};
};

// Exports
export default {
  getRole,
  setRole,
  getPermissions
};
