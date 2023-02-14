const throwError = require("../../shared/throwError");
const validEmail = require("./valid_email");
const validPassword = require("./valid_password");

//validate user
const validUser = async (email, password, password_confirmation, username) => {
  //Check for email validity
  await validEmail(email);

  //check for valid password
  await validPassword(password, password_confirmation);

  if (!username) {
    await throwError(400, "Enter an username");
  }
};

module.exports = validUser;
