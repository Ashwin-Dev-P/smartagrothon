//To enable .env file
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

console.log("Environment:", process.env.NODE_ENV);

const express = require("express");
const app = express();

//Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

var cors = require("cors");
const front_end_url = process.env.FRONT_END_URL;
var corsOptions = {
  credentials: true,
  origin: front_end_url,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors());

//DB connection
require("./src/models/");

//body parser deprecation replacement
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//import routes
const routes = require("./src/routes/");
app.use(routes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on  port ${PORT}`);
});
