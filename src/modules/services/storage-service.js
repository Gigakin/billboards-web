// Get Local Data
let getLocalData = key => {
  return window.localStorage.getItem(key);
};

// Set Local Data
let setLocalData = (key, value) => {
  window.localStorage.setItem(key, value);
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
let setSessionData = (key, value) => {
  window.sessionStorage.setItem(key, value);
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
