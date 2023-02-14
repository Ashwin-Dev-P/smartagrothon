const config = {
  app: {
    PORT: 5000,
  },
  db: {
    name: "smartagrothon",
    USE_MONGODB_ATLAS: process.env.USE_MONGODB_ATLAS,
  },
  JWT_EXPIRES: 900000, //15 MINUTES,
  cookie: {
    cookie_options: {
      jwt_cookie_option: {
        path: "/",
        expires: new Date(Date.now() + 900000),
        secure: true,
        httpOnly: false,
        sameSite: "None",
      },
      logged_in_cookie_option: {
        path: "/",
        expires: new Date(Date.now() + 900000),
        secure: true,
        httpOnly: false,
        sameSite: "None",
      },
    },
  },
};

module.exports = config;
