const isString = (string) => {
  if (!(typeof string === "string" || string instanceof String)) {
    return false;
  }
  return true;
};

module.exports = isString;
