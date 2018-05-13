// Methods
export default {
  capitalize: string => {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
