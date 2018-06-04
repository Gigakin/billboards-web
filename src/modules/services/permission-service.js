// Modules
import base64 from "base-64";

// Services
import StorageService from "./storage-service";
import Permissions from "../stores/permissions";

// Get Role
const getRole = () => {
  let role = StorageService.getLocalData("role");
  return base64.decode(role);
};

// Set Role
const setRole = role => {
  if (role) {
    role = base64.encode(role);
    return StorageService.setLocalData("role", role);
  }
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
