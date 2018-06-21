// Get Local Data
let getLocalData = key => {
  return window.localStorage.getItem(key);
};

// Get Local Data as JSON
let getLocalDataAsJson = key => {
  if (key) {
    return JSON.parse(window.localStorage.getItem(key));
  }
};

// Set Local Data
let setLocalData = (key, value) => {
  window.localStorage.setItem(key, value);
};

// Set Local Data as JSON
let setLocalDataAsJson = (key, value) => {
  if (key && value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
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

// Get Session Data as JSON
let getSessionDataAsJson = key => {
  if (key) {
    return JSON.parse(window.sessionStorage.getItem(key));
  }
};

// Set Session Data
let setSessionData = (key, value) => {
  window.sessionStorage.setItem(key, value);
};

// Set Session Data as JSON
let setSessionDataAsJson = (key, value) => {
  if (key && value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
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
  getLocalDataAsJson,
  setLocalData,
  setLocalDataAsJson,
  removeLocalData,
  clearLocalData,
  getSessionData,
  getSessionDataAsJson,
  setSessionData,
  setSessionDataAsJson,
  removeSessionData,
  clearSessionData
};
