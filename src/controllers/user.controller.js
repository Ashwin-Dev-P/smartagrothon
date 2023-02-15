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

  const {
    email,
    password,
    password_confirmation,
    username,
    address,
    phone_number,
    type,
  } = req.body;

  console.group("User registration");

  const final_result = await user_services.register_user_service(
    email,
    password,
    password_confirmation,
    username,
    address,
    phone_number,
    type
  );
  const status = final_result.status;

  console.groupEnd("User registration");

  if (status === 200) {
    const jwt = final_result.jwt;
    await setCookie(res, jwt);
  }
  return await res.status(status).json(final_result);
};

//login user
const login_user_controller = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.group("\nLogin");
  console.time("login time");

  const { email, password } = req.body;

  const final_result = await user_services.login_user_service(email, password);

  const status = final_result.status;

  if (status === 200) {
    const jwt = final_result.jwt;
    await setCookie(res, jwt);
  }

  console.timeEnd("login time");
  console.groupEnd("\nLogin");

  return await res.status(status).json(final_result);
};

//logout
const logout_controller = async (req, res) => {
  console.log("req.cookies:", req.cookies);
  //Clear cookies only if it is present since Mozilla Firefox browser causes warning if cleared cookies whoich are not present already.
  if (req.cookies.jwt) {
    await res.clearCookie("jwt");
  } else {
    console.warn("jwt cookie not found");
  }

  if (req.cookies.loggedIn) {
    await res.clearCookie("loggedIn");
  } else {
    console.warn("LoggedIn cookie not found");
  }

  return await res
    .status(200)
    .json({ message: "Logged out successfully", status: 200 });
};

module.exports = {
  register_user_controller,
  login_user_controller,
  logout_controller,
};
