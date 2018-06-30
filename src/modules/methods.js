// Conversion
const calculateSqFt = (value, unit) => {
  const ins = 0.0833333333;
  const cms = 0.032808399;
  const mts = 3.280839895;
  const fts = 1;
  if (value) {
    if (!unit) unit = "feets";
    unit = unit.toString().toLowerCase();
    if (unit === "inches") return (value * ins).toFixed(2);
    if (unit === "centimeters") return (value * cms).toFixed(2);
    if (unit === "meters") return (value * mts).toFixed(2);
    if (unit === "feets") return (value * fts).toFixed(2);
    return value;
  }
};

// Capitalize
const capitalize = string => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};

// Clone
const clone = object => {
  if (object) return JSON.parse(JSON.stringify(object));
};

// Download File
const downloadFile = file => {
  if (file) {
    let link = document.createElement("a");
    link.href = file.location;
    link.download = file.name;
    link.click();
  }
};

// Methods
export default {
  clone,
  calculateSqFt,
  capitalize,
  downloadFile
};
