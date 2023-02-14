const isValidSkipAndLimit = async (skip, limit) => {
  if (skip && isNaN(skip)) {
    var error = new Error();
    error.message = "Enter a valid skip parameter";
    error.status = 400;

    throw error;
  }

  if (limit && isNaN(limit)) {
    var error = new Error();
    error.message = "Enter a valid limit parameter";
    error.status = 400;

    throw error;
  }

  return true;
};

module.exports = isValidSkipAndLimit;
