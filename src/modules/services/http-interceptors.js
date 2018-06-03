// Modules
import Axios from "axios";

// Imports
import Constants from "../constants";

// Instantiate Axios
let AxiosInstance = Axios.create({
  baseURL: Constants.URLS.API_BASE_URL
});

// Exports
export default AxiosInstance;
