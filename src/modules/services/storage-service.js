// Get Local Data
let getLocalData = key => {
  return window.localStorage.getItem(key);
};

// Set Local Data
let setLocalData = props => {
  window.localStorage.setItem(props.key, props.value);
};

// Remove Local Data
let removeLocalData = key => {
  window.localStorage.removeItem(key);
};

// Clear Local Data
let clearLocalData = () => {
  window.localStorage.clear();
};

// Get Session Data
let getSessionData = key => {
  return window.sessionStorage.getItem(key);
};

// Set Session Data
let setSessionData = props => {
  window.sessionStorage.setItem(props.key, props.value);
};

// Remove Session Data
let removeSessionData = key => {
  window.sessionStorage.removeItem(key);
};

// Clear Session Data
let clearSessionData = () => {
  window.sessionStorage.clear();
};

// Exports
export default {
  getLocalData,
  setLocalData,
  removeLocalData,
  clearLocalData,
  getSessionData,
  setSessionData,
  removeSessionData,
  clearSessionData
};
