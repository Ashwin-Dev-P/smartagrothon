//import utils
const stringContains = require("../../shared/stringContains");
const throwError = require("../../shared/throwError");

//function
const validEmail = async (email) => {
  //check if email is defined
  if (email === undefined || email.trim().length < 1) {
    console.error("email is undefined");

    await throwError(400, "Please enter an email id");
  }

  //check if email contains '@'
  if (!(await stringContains(email, "@"))) {
    const error_message = `Email '${email}' is invalid. Email '${email}' does not contain '@'`;
    console.error(error_message);

    await throwError(400, error_message);
  }

  //check if email contains a minimum length of 3 if split into three parts using @
  const text = email.split("@");
  if (
    text.length < 2 ||
    text[0].trim().length < 1 ||
    text[1].trim().length < 1
  ) {
    const error_message = `Email '${email}' is invalid`;
    console.error(error_message, text);
    await throwError(400, error_message);
  }

  //check if email contains a maximum length of 320 characters
  if (email.length > 320) {
    const error_message = `Email can have a maximum length of 320 characters. Email "${email}" is invalid`;
    console.error(error_message);

    await throwError(400, `Email can have a maximum lenght of 320 characters`);
  }
};

module.exports = validEmail;
