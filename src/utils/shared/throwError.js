const throwError = (statusCode, message) => {
  var error = new Error();
  error.message = message;
  error.status = statusCode;
  throw error;
};

module.exports = throwError;
