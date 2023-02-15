const express = require("express");
const router = express.Router();

//import controller
const shared_controllers = require("../../controllers/shared.controller");

//import routes
const user_routes = require("./user.routes");
const product_routes = require("./product.routes");

//routes
router.use("/user", user_routes);
router.use("/product", product_routes);

//Method or route not found
router.all("*", shared_controllers.method_not_found_controller);

module.exports = router;
