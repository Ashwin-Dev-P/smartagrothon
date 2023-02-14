//import services
const user_services = require("../services/user.services");

//import config
const config = require("../config/config");

//to be moved inside utils
const setCookie = (res, jwt) => {
  console.log("jwt", jwt);
  console.group("\nCookie");
  console.time("cookie time");

  //Set login cookies
  const cookie_options = config.cookie.cookie_options;
  const jwt_cookie_options = cookie_options.jwt_cookie_option;
  const loggedIn_cookie_options = cookie_options.logged_in_cookie_option;
  console.log(cookie_options, "cookie opyoond");
  res.status(202).cookie("jwt", jwt, jwt_cookie_options);
  res.status(202).cookie("loggedIn", true, loggedIn_cookie_options);
  //Set login cookies ends

  console.timeEnd("cookie time");
  console.groupEnd("Cookie");
  return true;
};

//register a user
const register_user_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (!req.body) {
    console.error("No request body found");
    const result = {
      message: "Something went wrong",
      status: 400,
    };
    return res.status(400).json(result);
  }

  const { email, password, password_confirmation, username } = req.body;

  console.group("User registration");

  const final_result = await user_services.register_user_service(
    email,
    password,
    password_confirmation,
    username
  );
  const status = final_result.status;

  console.groupEnd("User registration");

  if (status === 200) {
    const jwt = final_result.jwt;
    await setCookie(res, jwt);
  }
  return await res.status(status).json(final_result);
};

module.exports = {
  register_user_controller,
};
