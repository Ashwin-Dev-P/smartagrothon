//import utils
const valid_user_function = require("../utils/users/register/valid_user");
const hash_password = require("../utils/users/register/hash_password");
const setJWT = require("../utils/users/login/setJWT");
const throwError = require("../utils/shared/throwError");

//import repositories
const {
  createUser,
  get_user_by_email_repository,
} = require("../repositories/user.repository");

const register_user_service = async (
  email,
  password,
  password_confirmation,
  username
) => {
  try {
    var result;

    await valid_user_function(email, password, password_confirmation, username);

    //Hash the password
    const hash_password_result = await hash_password(password);
    if ((await hash_password_result).status !== 200) {
      console.error("Error hashing the password");
      await throwError(500, "Unable to register");
    }

    const hashed_password = hash_password_result.hashed_password;

    try {
      const user = await createUser(email, hashed_password, username);

      const json_web_token = await setJWT(user._id);

      const user_data = {
        email: user.email,
        username: user.username,
      };
      result = {
        message: "Registered successfully",
        status: 200,
        jwt: json_web_token,
        user: user_data,
      };
    } catch (error) {
      if (error.code === 11000 && error.keyPattern.email) {
        await throwError(
          400,
          `Email id ${error.keyValue.email} is already in use by another account`
        );
      } else {
        console.error(error);
        await throwError(500, `Unable to register user`);
      }
    }

    return result;
  } catch (error) {
    console.error("Try catch error caught");
    console.error(error);
    const result = {
      message: error.status === 400 ? error.message : "Something went wrong",
      status: error.status || 500,
    };
    return result;
  }
};

//login
const login_user_service = async (email, password) => {
  try {
    var result;

    if (!email || email.trim().length < 1) {
      await throwError(400, "Please enter an email id");
    }
    if (!password || password.trim().length < PASSWORD_MIN_REQUIRED_LENGTH) {
      await throwError(400, "Please enter a password");
    }

    await validEmail(email);

    const user = await get_user_by_email_repository(email);

    //User will be undefined if the email is not registered
    if (!user) {
      console.log("Email id is not registered");
      await throwError(401, "Invalid credentials");
    }

    //check if the password is correct
    try {
      var verify_password_check = await verify_password(
        user.password,
        password
      );
    } catch (error) {
      console.error("argon2 verify password function throws error \n", error);
    }

    //if invalid password
    if (verify_password_check !== true) {
      console.log("Invalid password");
      await throwError(401, "Invalid credentials");
    }

    //login success
    delete user["password"];
    const json_web_token = await setJWT(user._id, user.admin);
    result = {
      message: "Login success",
      status: 200,
      jwt: json_web_token,
      user: user,
    };

    return result;
  } catch (error) {
    console.error("Try catch error caught");
    console.error(error);

    //check if error is class code 4.(Eg 400 , 401)
    var class_code = error.status.toString()[0];

    const result = {
      message: class_code === "4" ? error.message : "Something went wrong",
      status: error.status || 500,
    };
    return result;
  }
};

module.exports = {
  register_user_service,
  login_user_service,
};
