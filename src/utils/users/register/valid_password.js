const constants = require("../../../constants/constants");

//utils
const throwError = require("../../shared/throwError");

const validPassword = async (password, password_confirmation) => {
  var password_required_min_length = constants.PASSWORD_MIN_REQUIRED_LENGTH;

  //Check if password and password confirmation are defined
  if (!password || password.trim() < 1) {
    await throwError(400, "Please enter a password");
  }
  if (!password_confirmation || password_confirmation.trim() < 1) {
    await throwError(400, "Please enter a password confirmation");
  }

  //Check if password and password confirmation matches
  if (password !== password_confirmation) {
    await throwError(400, "Both the passwords do not match");
  }

  //check if the passwords match the minimum length
  if (password.trim().length < password_required_min_length) {
    await throwError(
      400,
      `Password should have a minimum length of ${password_required_min_length}`
    );
  }
};

module.exports = validPassword;
