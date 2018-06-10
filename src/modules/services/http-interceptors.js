// Modules
import Axios from "axios";

// Imports
import Constants from "../constants";

// Services
import StorageService from "./storage-service";

// Instantiate Axios
let AxiosInstance = Axios.create({
  baseURL: Constants.URLS.API_BASE_URL
});

// Request Interceptor
AxiosInstance.interceptors.request.use(config => {
  if (StorageService.getLocalData("access_token")) {
    config.headers["Authorization"] = StorageService.getLocalData("access_token");
  }
  return config;
});

// Exports
export default AxiosInstance;
